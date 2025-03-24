// File: pages/api/chat.ts or app/api/chat/route.ts (depending on Next.js version)
"use client"
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Type definitions
interface ChatRequest {
  message: string;
  user_id: string;
  conversation_id?: string;
}

interface ChatResponse {
  response: string;
  conversation_id: string;
  success: boolean;
  error?: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json() as ChatRequest;
    const { message, user_id, conversation_id } = body;
    
    // Validate input
    if (!message || !user_id) {
      return NextResponse.json(
        { error: 'Missing message or user_id' },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!process.env.LANGFLOW_TOKEN || !process.env.LANGFLOW_SECRET) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    try {
      // Generate a new conversation ID if not provided
      const activeConversationId = conversation_id || generateConversationId();
      
      // Call LangFlow API
      const langflowResponse = await fetch(
        "https://astra.datastax.com/api/v1/run/0d27cd2c-be0f-4f7c-99be-6d9f4a59a98e?stream=false",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.LANGFLOW_TOKEN}`,
            "Content-Type": "application/json",
            "x-api-key": process.env.LANGFLOW_SECRET,
          },
          body: JSON.stringify({
            input_value: message,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "ChatInput-Xilja": {},
              "ChatOutput-M8bpL": {},
              "Memory-Tj7pK": {},
              "Prompt-MXwhW": {},
              "GoogleGenerativeAIModel-TnXjz": {},
            },
          }),
          signal: AbortSignal.timeout(30000), // 30 second timeout
        }
      );

      if (!langflowResponse.ok) {
        const errorText = await langflowResponse.text();
        console.error(`LangFlow API error (${langflowResponse.status}):`, errorText);
        return NextResponse.json(
          { error: `Chat service unavailable` },
          { status: 502 }
        );
      }

      // Extract the response
      const contentType = langflowResponse.headers.get('content-type') || '';
      let aiResponse: string;
      
      if (contentType.includes('application/json')) {
        const data = await langflowResponse.json();
        aiResponse = typeof data?.output === 'string' ? data.output : JSON.stringify(data?.output || {});
      } else {
        const text = await langflowResponse.text();
        
        try {
          const parsedData = JSON.parse(text);
          aiResponse = typeof parsedData?.output === 'string' ? parsedData.output : text;
        } catch (e) {
          aiResponse = text;
        }
      }

      // Store conversation in database
      const timestamp = new Date().toISOString();
      
      const { error: userMsgError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: activeConversationId,
          user_id: user_id,
          message: message,
          is_user: true,
          timestamp: timestamp
        });
        
      const { error: aiMsgError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: activeConversationId,
          user_id: user_id,
          message: aiResponse,
          is_user: false,
          timestamp: new Date().toISOString()
        });

      if (userMsgError || aiMsgError) {
        console.error("Database error:", userMsgError || aiMsgError);
      }

      // Return the response
      return NextResponse.json({
        response: aiResponse,
        conversation_id: activeConversationId,
        success: true
      } as ChatResponse);
      
    } catch (error: any) {
      console.error("API call error:", error);
      
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: "Request timed out" },
          { status: 504 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to get response from chat service" },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// Helper function to generate a unique conversation ID
function generateConversationId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}