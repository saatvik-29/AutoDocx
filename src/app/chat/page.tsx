// File: pages/chat.tsx or app/chat/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Chatbot from '../../component/Chatbot';

export default function ChatPage() {
  const [userId, setUserId] = useState<string>('');
  
  // Get or generate user ID on component mount
  useEffect(() => {
    // Try to get user ID from localStorage
    const storedUserId = localStorage.getItem('chat_user_id');
    
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Generate a new ID if none exists
      const newUserId = `user_${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;
      localStorage.setItem('chat_user_id', newUserId);
      setUserId(newUserId);
    }
  }, []);
  
  if (!userId) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">AI Assistant</h1>
        <p className="text-gray-600">Ask me anything about your code or programming questions</p>
      </div>
      
      <div className="flex justify-center">
        <Chatbot 
          userId={userId}
          title="Code Assistant"
          placeholder="Ask about your code..."
        />
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Powered by DataStax LangFlow</p>
      </div>
    </div>
  );
}