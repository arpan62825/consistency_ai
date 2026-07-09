# Self-Consistency AI

This project compares AI models (OpenAI, Groq, and OpenRouter) and uses a self-consistency prompting technique to combine their responses into the best possible answer.

## How to Run

1. **Install Dependencies:**
   Make sure you have Node.js installed. Then, run the following command in the terminal to install all necessary packages:
   ```bash
   npm install
   ```

2. **Set Up Environment Variables:**
   You will need API keys for Groq, OpenAI, and OpenRouter to run this.
   - Copy the `.env.example` file and rename it to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and fill in your actual API keys. 
   *(Note: Never share your `.env` file or commit it to GitHub. It is safely ignored by `.gitignore`.)*

3. **Run the Script:**
   Start the main script to prompt the AI:
   ```bash
   node getTheBestResult.js
   ```

## How It Works
- The code asks for a prompt in your terminal.
- It sends your prompt to `gpt-4o-mini` (OpenAI), `openai/gpt-oss-120b` (Groq), and `nvidia/nemotron-3-ultra-550b-a55b:free` (OpenRouter) concurrently.
- It then uses Groq (`openai/gpt-oss-20b`) to analyze all three responses, resolve any contradictions, and produce a single combined answer using the self-consistency technique.
