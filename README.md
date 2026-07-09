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

## About the Project

### Interface
This project is **CLI-based (Command Line Interface)**. You interact with it directly through your terminal; there is no web or graphical user interface. 

### How It Works & The Self-Consistency Flow
1. **User Input:** The script prompts you for a question or task via the terminal.
2. **Concurrent Generation:** Your prompt is sent simultaneously to three different AI models to get diverse answers.
3. **Self-Consistency Resolution:** Instead of just picking one answer, the system takes all three generated responses and feeds them back into a final "consensus" model.
4. **Final Output:** The consensus model acts as an expert reasoning agent. It analyzes the three responses, identifies the most factually accurate and consistent information across them, resolves any contradictions, and outputs a single, highly refined final answer to the terminal.

### Models and Providers Used
- **Generation Phase (The 3 Initial Models):**
  - **OpenAI:** `gpt-4o-mini`
  - **Groq:** `openai/gpt-oss-120b`
  - **OpenRouter:** `nvidia/nemotron-3-ultra-550b-a55b:free`
- **Consensus/Self-Consistency Phase:**
  - **Groq:** `openai/gpt-oss-20b`
