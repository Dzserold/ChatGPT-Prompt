"use client";
import { postPrompt } from "@/lib/chatGPT";
import { getPost } from "@/lib/sheets";
import { useEffect, useState } from "react";
import { PromptCard } from "./PromptCard";

export default function Input() {
  const [input, setInput] = useState("");
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    getFromAI();
  }, []);

  const postToAI = async () => {
    const response = await postPrompt(input);
    if (response.staus === 200) getFromAI();
    setInput("");
  };

  const getFromAI = async () => {
    const response = await getPost();
    const data = response.data || [];
    setPrompts(data);
  };

  return (
    <div className="flex gap-3 flex-col items-center min-h-screen p-4 text-center">
      <form
        className="flex flex-col items-center gap-3"
        action=""
      >
        <p className="text-lg text-green-600">
          Enter Your Prompt so the AI generate a Social Media
          post for you
        </p>
        <textarea
          className="w-full p-1 font-semibold text-green-700 border-4 rounded-md outline-none bg-slate-200 focus:border-green-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-40 p-1 text-lg font-bold text-black bg-green-600 rounded-md hover:scale-105"
          type="button"
          onClick={() => postToAI()}
        >
          Enter
        </button>
      </form>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {prompts.length > 0 &&
          prompts.map((prompt, index) => (
            <PromptCard key={index} prompt={prompt} />
          ))}
      </div>
    </div>
  );
}
