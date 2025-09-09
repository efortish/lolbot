# League of Legends Chatbot

A NestJS + React chatbot powered by Google Gemini that answers questions about League of Legends.

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env  # MUST: Add your LLM_API_KEY
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Sample Questions

1. **"Who is Jinx in League of Legends?"**  
   Expected: Description of Jinx as an ADC champion from Zaun...

2. **"What is Baron Nashor and why is it important?"**  
   Expected: Explanation of Baron as a powerful neutral monster...

3. **"How do you cook pasta?"** (off-topic)  
   Expected: "I can only help with League of Legends questions..."

## Environment Variables

Create `.env` in the backend folder:
```
LLM_API_KEY=your_gemini_api_key_here
LLM_MODEL=gemini-2.5-flash
LLM_API_URL=https://generativelanguage.googleapis.com/v1beta/models
```