import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getGroqResponse = async (message) => {
  return await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant.

        CRITICAL RULES YOU MUST FOLLOW:
        - NO plain text tables (do not use characters like |, -, or + to draw tables).
        - NO markdown styling (do not use ###, **, _, or similar formatting).
        - USE standard bullet points (- or *) if listing items is necessary.
        Respond in plain text ONLY.`,
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "openai/gpt-oss-120b",
    max_completion_tokens: 1000,
  });
};

export default getGroqResponse;
