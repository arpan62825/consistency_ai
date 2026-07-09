import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const getOpenRouterResponse = async (message) => {
  try {
    return await openRouter.chat.send({
      chatRequest: {
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
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
        maxTokens: 1000,
      },
    });
  } catch (error) {
    console.log(
      `An error occurred while trying to fetch response from open router: ${error}`,
    );
  }
};

export default getOpenRouterResponse;
