"use client";
import { postPrompt } from "@/lib/chatGPT";
import { getPost } from "@/lib/sheets";
import { useEffect, useState } from "react";
import { PromptCard } from "./PromptCard";

export default function Input() {
  const [input, setInput] = useState("");
  const [prompts, setPrompts] = useState<any[]>([]);
  const [isPendling, setIsPendling] = useState(false);

  useEffect(() => {
    getFromAI();
  }, []);

  const postToAI = async () => {
    setIsPendling(true);
    const response = await postPrompt(input);
    if (response) getFromAI();
    setInput("");
    setIsPendling(false);
  };

  const getFromAI = async () => {
    const response = await getPost();
    const data = response.data || [];
    setPrompts(data);
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-3 p-4 text-center">
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
          disabled={isPendling}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-40 p-1 text-lg font-bold text-black bg-green-600 rounded-md hover:scale-105"
          type="button"
          disabled={isPendling}
          onClick={() => postToAI()}
        >
          Enter
        </button>
        <p className="h-6 text-lg text-yellow-300">
          {isPendling && "The AI is thinking...."}
        </p>
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
