import getGroqResponse from "./groq_sdk.js";
import getOpenAiResponse from "./openai_sdk.js";
import getOpenRouterResponse from "./openRouter_sdk.js";
import readLine from "node:readline/promises";

import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

let message = "";
let showIndividualResponse = "";
const getQuestion = async () => {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    message = await rl.question("Enter your prompt here: ");
    showIndividualResponse = await rl.question(
      "Do you want to see the individual response of the models? (y/n): ",
    );
  } finally {
    rl.close();
  }
};
await getQuestion();

const [groqResponse, openAiResponse, openRouterResponse] = await Promise.all([
  getGroqResponse(message),
  getOpenAiResponse(message),
  getOpenRouterResponse(message),
]);

const responseType = showIndividualResponse.trim().toLowerCase();
if (responseType === "y" || responseType === "yes") {
  console.log(
    "This is the response from Groq:\n\n" +
      (groqResponse.choices[0]?.message?.content || "") +
      "\n--------------------------------------------\n",
  );

  console.log(
    "This is the response from OpenAI:\n\n" +
      (openAiResponse.output_text || "") +
      "\n--------------------------------------------\n",
  );

  console.log(
    "This is the response from OpenRouter:\n\n" +
      (openRouterResponse.choices[0]?.message?.content || "") +
      "\n--------------------------------------------\n",
  );
}

async function compareUsingGroq() {
  const groqText = groqResponse.choices[0]?.message?.content || "";
  const openAiText = openAiResponse.output_text || "";
  const openRouterText = openRouterResponse.choices[0]?.message?.content || "";

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert reasoning agent using the self-consistency technique.
        You will receive a user's prompt along with three different AI-generated responses.
        Your task is to:
        1. Analyze all three responses for consistency, factual accuracy, and reasoning paths.
        2. Identify the most common, correct consensus among them.
        3. Synthesize the best parts of all three into a single, comprehensive final answer.
        4. Resolve any contradictions by determining the most logically sound conclusion.
        Do not mention the original models, just provide the final synthesized response.

        CRITICAL RULES YOU MUST FOLLOW:
        - NO plain text tables (do not use characters like |, -, or + to draw tables).
        - NO markdown styling (do not use ###, **, _, or similar formatting).
        - USE standard bullet points (- or *) if listing items is necessary.
        Respond in plain text ONLY.`,
      },
      {
        role: "user",
        content: `User Prompt: ${message}\n\nResponse 1:\n${groqText}\n\nResponse 2:\n${openAiText}\n\nResponse 3:\n${openRouterText}`,
      },
    ],
    model: "openai/gpt-oss-20b",
    max_completion_tokens: 1200,
    stream: true,
  });
  console.log("This is the final combined response using Self-Consistency:\n");
  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
  console.log("\n--------------------------------------------\n");
}

await compareUsingGroq();
