"use client";

import { postPrompt } from "@/lib/chatGPT";
import { useState } from "react";

const page = () => {
  const [input, setInput] = useState("");
  const postToAI = async () => {
    const response = await postPrompt(input);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 text-center">
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
    </div>
  );
};

export default page;
