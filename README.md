# League of Legends Chatbot

A NestJS + React chatbot powered by Google Gemini that answers questions about League of Legends.

## Project Structure
```
lolbot
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


### Access the Application
- **Frontend:** Available https://lolbot-8yhh8tvaq-kevs-projects-095cbcff.vercel.app/ 
- **Backend API:** Available at https://lolbot-o5dx.onrender.com/api/chat


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
LLM_MODEL=gemini-2.5-flash
LLM_API_URL=https://generativelanguage.googleapis.com/v1beta/models
```

## Technologies Used

- **Backend:** NestJS, TypeScript, Google Gemini API, Axios
- **Frontend:** React 18, TypeScript, Vite
- **Testing:** Jest with mocked LLM calls
- **Deployment:** Vercel for frontend and Render for backend

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
