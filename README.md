# AI Resume Analyzer 🚀

An AI-powered Resume Analyzer that evaluates resumes against job descriptions using Google Gemini AI. It extracts resume content from PDF files, analyzes relevant skills and experience, and provides insights to help candidates improve their resumes.

## 🌐 Live Demo

- **Frontend:** [https://ai-resume-anal.netlify.app]
**Deployed on Render:** https://ai-resume-analyzer-backend-4v1x.onrender.com
Note: The backend is an API service and does not provide a standalone webpage. It processes requests from the React frontend.
- **GitHub Repository:** https://github.com/syedaafnan9-collab/AI-Resume-Analyzer

## ✨ Features

- Upload resumes in PDF format.
- Enter job title, company name, and job description.
- Extract resume text using PDF parsing.
- Analyze resumes using Google Gemini AI.
- Generate an AI-based resume match score.
- Display skills, experience, education, and keyword analysis.
- Identify strengths and weaknesses.
- Highlight missing keywords relevant to the job description.
- Generate an AI-powered resume summary.
- Store resume analysis results in MongoDB.
- Responsive user interface.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- React Router
- Recharts
- Vite

### Backend
- Node.js
- Express.js
- Multer
- PDF parsing
- Google Gemini AI
- MongoDB Atlas
- Mongoose

### Tools
- Visual Studio Code
- Git and GitHub
- Netlify
- Render
- Google AI Studio

## 📁 Project Structure

```text
AI-Resume-Analyzer/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── route/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── index.html
│
└── .gitignore
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/syedaafnan9-collab/AI-Resume-Analyzer.git
```

```bash
cd AI-Resume-Analyzer
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
mongoose_URI=your_mongodb_connection_string
```

Start the backend:

```bash
node server.js
```

Backend runs locally at:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs locally at:

```text
http://localhost:5173
```

## 🔗 API Endpoint

**Analyze Resume**

```http
POST /api/resumes/analyze
```

The endpoint accepts:
- Resume PDF file
- Job title
- Company name
- Job description

The backend extracts resume text, sends it to Gemini AI for analysis, and stores the analysis result in MongoDB.

## ☁️ Deployment

| Component | Platform |
|---|---|
| Frontend | Netlify |
| Backend | Render |
| Database | MongoDB Atlas |
| AI Model | Google Gemini |

## 🔮 Future Improvements

- User authentication and authorization.
- Resume history and management.
- Delete and update saved resumes.
- User-specific resume storage.
- Additional resume improvement suggestions.
- Enhanced error handling.

## ⚠️ Disclaimer

The resume match score and recommendations are AI-generated guidance. They are not official ATS scores and do not guarantee recruitment or selection.

## 👩‍💻 Developer

**Syeda Afnan**

B.Com Computer Applications | Aspiring Frontend Developer

GitHub: [syedaafnan9-collab](https://github.com/syedaafnan9-collab)
