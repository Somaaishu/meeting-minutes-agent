🤖 Meeting Minutes Agent
An AI-powered web application that automatically generates structured meeting minutes from uploaded audio or text input. Built with Node.js, Express, and Google Gemini AI.

✨ Features

📄 Upload meeting recordings or paste raw transcript text
🤖 AI-powered summarization using Google Gemini
📝 Automatically extracts:

Meeting summary
Key discussion points
Decisions made
Action items & owners


🌐 Clean, responsive web interface (no framework needed)
⚡ Fast REST API backend with Express.js


🛠️ Tech Stack
LayerTechnologyBackendNode.js, Express.jsAI ModelGoogle Gemini (@google/generative-ai)File UploadMulterFrontendHTML, CSS, JavaScript (vanilla)Configdotenv

📁 Project Structure
meeting-minutes-agent/
├── public/              # Frontend (HTML, CSS, JS)
├── server.js            # Express server & API routes
├── package.json         # Dependencies & scripts
├── .gitignore
└── README.md

🚀 Getting Started
Prerequisites

Node.js v18+
A Google Gemini API key

Installation
bash# 1. Clone the repository
git clone https://github.com/Somaaishu/meeting-minutes-agent.git
cd meeting-minutes-agent

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env
Environment Variables
Create a .env file in the root directory:
envGEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
Run the App
bashnpm start
Open your browser and go to: http://localhost:3000

📡 API Endpoints
MethodEndpointDescriptionPOST/uploadUpload audio/text for processingGET/Serves the frontend UI

📸 How It Works

User uploads a meeting audio file or pastes a transcript
The file is handled by Multer and sent to the backend
Google Gemini AI processes the content
The agent returns structured meeting minutes with summary, decisions, and action items
Results are displayed on the frontend


🔮 Future Improvements

 Direct audio transcription using Whisper API
 Export minutes as PDF or DOCX
 Speaker diarization (who said what)
 Email minutes directly from the app
 Meeting history & dashboard


👩‍💻 Author
Soma Aishwarya

GitHub: @Somaaishu
LinkedIn: soma-aishwarya


📄 License
This project is licensed under the ISC License.
