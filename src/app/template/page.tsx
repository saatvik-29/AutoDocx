"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { marked } from "marked";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return <div className={`spinner ${className || ""}`} />;
};

const CodeSummarizer = () => {
  const [codeInput, setCodeInput] = useState("");
  const [summary, setSummary] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleSummarize = async () => {
    if (!codeInput.trim()) {
      setError("Please enter code or a valid code file URL");
      return;
    }

    setLoading(true);
    setSummary("");
    setHtmlContent("");
    setError("");

    try {
      const response = await axios.post("/api/summarize", { code: codeInput });

      if (response.data && response.data.summary) {
        const textSummary = response.data.summary;

        const cleanSummary = textSummary
          .replace(/^\s*#+\s*/gm, "")
          .replace(/^\s*[*-]\s*/gm, "• ")
          .replace(/`([^`]+)`/g, "$1")
          .replace(/\*\*([^*]+)\*\*/g, "$1")
          .replace(/\*([^*]+)\*/g, "$1")
          .replace(/_{2,}([^_]+)_{2,}/g, "$1");

        setSummary(cleanSummary);
        const html = await marked.parse(textSummary);
        setHtmlContent(html);
      } else {
        throw new Error("No summary returned");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to summarize the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code_summary.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    if (!summaryRef.current || !summary) return;
    try {
      setLoading(true);

      const canvas = await html2canvas(summaryRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      const scaledWidth = imgWidth * ratio - 40;
      const scaledHeight = imgHeight * ratio;

      let heightLeft = scaledHeight;
      let position = 20;

      pdf.addImage(imgData, "PNG", 20, position, scaledWidth, scaledHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 20, position, scaledWidth, scaledHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("code_summary.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError("Failed to generate PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Code Summarizer</h1>
      <p className="text-gray-600 mb-6 text-center">
        Enter a code file URL or paste your code to generate an intelligent summary
      </p>

      <div className="flex flex-col mb-4">
        <textarea
          rows={8}
          placeholder="Paste code here or enter a raw file URL"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          className="w-full p-3 border rounded-md text-sm font-mono"
          disabled={loading}
        />
        <Button onClick={handleSummarize} disabled={loading} className="mt-4">
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Summarizing...
            </>
          ) : (
            "Generate Summary"
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {summary && (
        <>
          <Card className="mt-6 border shadow-md">
            <CardContent className="p-6">
              <div
                ref={summaryRef}
                className="prose prose-sm md:prose-base max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <Button
              onClick={handleDownloadMarkdown}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              Download as Markdown
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Generating PDF...
                </>
              ) : (
                "Download as PDF"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CodeSummarizer;
