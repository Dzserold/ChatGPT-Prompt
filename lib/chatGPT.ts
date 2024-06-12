"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function postPrompt() {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Helló how are you" }],
      model: "gpt-3.5-turbo",
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return error;
  }
}
