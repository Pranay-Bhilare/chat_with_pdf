"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Upload } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Home() {
  const { userId } = useAuth();
  const isAuth = !!userId;
  const navigate = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-red-100 via-indigo-100 to-indigo-400 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      <div className="backlight" />
      
      <div className="relative z-10 w-full max-w-4xl space-y-8 animate-fade-up">
        <div className="text-center space-y-4">
          <h1 className="mr-3 text-5xl sm:text-5xl font-semibold tracking-tight bg-clip-text "> Chat With Any PDF</h1>
          <UserButton />
          <p className="text-lg sm:text-xl text-muted-foreground">
            Effortlessly chat with any PDF using RAG For Students and Professionals
          </p>
        </div>
        {isAuth ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <Button onClick={() => navigate.push("/chat")}>Go to Chats</Button>
              {/* onClick={() => navigate.push("/chat")}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity backdrop-blur-sm bg-opacity-20 hover:bg-opacity-30"

              Go to Chats */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mt-8 p-12 border-2 border-dashed rounded-lg transition-all duration-200 backdrop-blur-sm bg-white/5 ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">Upload your file here</p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your PDF or click to browse
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity cursor-pointer backdrop-blur-sm bg-opacity-20 hover:bg-opacity-30"
                >
                  Choose File
                </label>
              </div>
            </div>
          </div>
        ) : (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => navigate.push("/sign-in")}>
            Sign In To Get Started !
          </Button>
        </div>)}
      </div>
    </div>
  );
}
