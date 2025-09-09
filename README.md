# League of Legends Chatbot

A NestJS + React chatbot powered by Google Gemini that answers questions about League of Legends.

## Project Structure
```
pruebanest/
├── backend/          # NestJS API with Gemini integration
├── frontend/         # React chat interface
├── vercel.json       # Deployment configuration
└── README.md
```

## Setup

### Prerequisites
- Node.js 18+
- npm
- Google Gemini API key ([Get it here](https://aistudio.google.com/app/apikey))

### Backend
```bash
cd backend
npm install
cp .env.example .env  # MUST: Add your LLM_API_KEY
npm run start:dev     # Backend runs on http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev          # Frontend runs on http://localhost:5173
```

### Access the Application
- **Frontend:** Open http://localhost:5173 in your browser
- **Backend API:** Available at http://localhost:3000

### Local Development
```bash
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Frontend  
cd frontend && npm run dev

# Then open http://localhost:5173 to use the chatbot
```

## Sample Questions

1. **"Who is Jinx in League of Legends?"**  
   Expected: Description of Jinx as an ADC champion from Zaun with explosive weapons and Vi rivalry.

2. **"What is Baron Nashor and why is it important?"**  
   Expected: Explanation of Baron as a powerful neutral monster that provides team buffs.

3. **"How do you cook pasta?"** (off-topic)  
   Expected: "I can only help with League of Legends questions. Please ask about LoL champions, items, or gameplay!"

## Environment Variables

Create `.env` in the backend folder:
```
LLM_API_KEY=your_gemini_api_key_here
LLM_MODEL=gemini-1.5-flash
LLM_API_URL=https://generativelanguage.googleapis.com/v1beta/models
```

## Technologies Used

- **Backend:** NestJS, TypeScript, Google Gemini API, Axios
- **Frontend:** React 18, TypeScript, Vite
- **Testing:** Jest with mocked LLM calls
- **Deployment:** Vercel

## Features

- ✅ League of Legends domain expert
- ✅ Polite rejection of off-topic questions
- ✅ Responsive chat interface
- ✅ Real-time typing indicators


## Testing

```bash
cd backend
npm test                    # Run all tests
npm test llm.service.spec   # Run LLM service tests only
```

## Ports

- **Backend:** 3000 (NestJS API)
- **Frontend:** 5173 (Vite dev server)

Make sure both ports are available before starting the development servers.