"use server";
import OpenAI from "openai";
import { createPost } from "./sheets";

interface Data {
  prompt: String;
  result: String;
  timestamp: Date;
}
const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function postPrompt(prompt: String) {
  try {
    //Geting text from ChatGPT based on user prompt
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Create a social media post text for this prompt. 
          It needs to be polite, manny people agree on it. Here is the prompt: ${prompt}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const data = {
      prompt,
      result: chatCompletion.choices[0].message.content,
      timestamp: new Date(),
    };

    //Save data
    const response = await createPost(data as Data);
    return response;
  } catch (error) {
    console.log(error);
    return {
      staus: 500,
      message: "Something went wrong",
    };
  }
}
