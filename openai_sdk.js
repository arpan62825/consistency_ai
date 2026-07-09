import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI();

const getOpenAiResponse = async (message) => {
  try {
    const input = [
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
    ];
    return await openai.responses.create({
      model: "gpt-5-nano",
      reasoning: { effort: "medium" },
      input,
    });
  } catch (error) {
    console.log(
      `An error occurred while trying to generate response from openai: ${error.message}`,
    );
  }
};

export default getOpenAiResponse;
