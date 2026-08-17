<div align="center">

# 🎯 AI Interview Preparation Platform

**Practice smarter. Interview better. Land the job.**

An AI-powered full-stack platform that simulates real interview experiences — generating role-specific questions, evaluating your responses in real-time, analyzing your resume, and tracking your progress over time.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## ✨ Features

### 🎤 AI Mock & Company-Specific Interviews
- **Two Interview Modes**: Toggle between **Normal Interview** (custom role, difficulty, domain) and **Company Interview** (past interview questions from top firms)
- **15 Target Companies** across 3 categories with authentic brand logos:
  - **Technical Firms**: Google, Amazon, Meta, Apple, Netflix, Microsoft, Oracle
  - **Big 4**: Deloitte, PwC, EY, KPMG
  - **Consultancy**: McKinsey, BCG, Bain & Company, Accenture
- **270+ Curated PYQs**: Exactly 6 questions per category (Technical, Behavioral, System Design) for every company with sample answers
- Configure **2–6 questions** per session
- Built-in **speech-to-text** — answer questions by voice using the Web Speech API
- Real-time **session timer** and **progress tracking** during the interview

### 📄 Resume Analyzer
- **Drag & drop PDF upload** or paste resume text directly
- AI extracts **core skills**, identifies **strengths**, highlights **skill gaps**, and recommends **target roles**
- One-click transition from analysis → start a mock interview for any recommended role

### 📊 AI-Powered Feedback, Scoring & Per-Question Verdicts
- **Interactive Question Scorecard**: Instant visual pills (`Q1 ✓`, `Q2 ✗`) showing exact correct vs incorrect answer count
- **Per-Question Verdict Banners**: Clear visual indicators (`✓ Strong Answer` vs `✗ Needs Improvement`) for each response
- **Highlighted Model Answers**: Elevated styling for incorrect answers providing *"💡 Here's what a strong answer looks like:"*
- **Overall Performance Score** with animated circular progress visualization
- **Rubric Category Breakdown** — Technical Depth, Problem Solving, Communication, Structured Delivery
- **Personalized Learning Suggestions** with specific resources and topics to study

### 📈 Dashboard & Analytics
- Performance overview with **average readiness score**
- **SVG line chart** tracking score progression across sessions
- **Skills diagnostic** with progress bars for each competency area
- **Smart suggestions** — AI-driven recommendations to improve weak areas

### 📜 Interview History
- Full history table of all completed sessions with role/company, domain, difficulty, date, duration, and score
- Click any session to review detailed feedback
- Delete sessions from history

### 🔐 Authentication System
- Secure **JWT-based authentication** with registration and login
- Password hashing with **bcrypt**
- Protected API routes with auth middleware
- Graceful offline fallback — works without backend connection using localStorage

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (React + Vite)              │
│                                                         │
│  Login ─→ Dashboard ─→ Mock Interview ─→ Feedback       │
│                  ↕              ↕                        │
│           Resume Analyzer    History                     │
└────────────────────┬────────────────────────────────────┘
                     │ REST API (fetch + JWT)
┌────────────────────▼────────────────────────────────────┐
│                    SERVER (Express.js)                   │
│                                                         │
│  Routes ─→ Controllers ─→ AI Service ─→ Database        │
│                              │                          │
│              ┌───────────────┼───────────────┐          │
│              ▼               ▼               ▼          │
│          Groq API      OpenRouter API    Simulation      │
│        (Primary)     (Multi-Model       (Offline         │
│                       Failover)          Fallback)       │
└────────────────────┬────────────────────────────────────┘
                     │
              ┌──────▼──────┐
              │   MongoDB   │
              │  (Atlas /   │
              │   Local)    │
              └─────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router v6, Lucide Icons |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | MongoDB + Mongoose (with local JSON fallback) |
| **AI Engine** | Groq API (LLaMA 3.3 70B) → OpenRouter (multi-model failover) → Local simulation |
| **Auth** | JWT + bcrypt |
| **File Handling** | Multer (memory storage) + pdf-parse |
| **Speech Input** | Web Speech API (SpeechRecognition) |
| **Styling** | Custom CSS with glassmorphism, gradients, and micro-animations |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)
- AI API Key — one of the following (optional, works without in simulation mode):
  - [Groq API Key](https://console.groq.com/) (recommended — ultra-fast inference)
  - [OpenRouter API Key](https://openrouter.ai/)

### 1. Clone the Repository

```bash
git clone https://github.com/atharv-5/smart-resume-platform.git
cd smart-resume-platform
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/ai-interview-platform

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# AI Providers (at least one recommended, but optional)
GROQ_API_KEY=your_groq_api_key
OPENROUTER_API_KEY=your_openrouter_api_key

# Client URL for CORS
CLIENT_URL=http://localhost:5173

# Development only — enables mock auth tokens
ALLOW_MOCK_AUTH=true
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd ../client
npm install
npm run dev
```

### 4. Open the App

Navigate to **http://localhost:5173** in your browser.

> **💡 Tip:** The platform works in three AI modes:
> - **Groq Mode** — fastest, powered by LLaMA 3.3 70B at 500+ tokens/sec
> - **OpenRouter Mode** — multi-model failover chain (Nvidia Nemotron, Google Gemma, Meta LLaMA)
> - **Simulation Mode** — no API key needed, uses intelligent local fallbacks

---

## 📁 Project Structure

```
ai-interview-platform/
├── client/                      # React Frontend (Vite)
│   ├── public/
│   │   └── logos/               # Brand logos for 15 companies
│   ├── src/
│   │   ├── components/
│   │   │   └── Dock.jsx         # Bottom navigation dock
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   ├── data/
│   │   │   └── pyqData.js       # Curated 270+ PYQ dataset & company metadata
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Main dashboard with analytics
│   │   │   ├── Login.jsx        # Auth (login + register)
│   │   │   ├── MockInterview.jsx # AI & Company interview sessions
│   │   │   ├── ResumeAnalyzer.jsx # Resume upload & analysis
│   │   │   ├── FeedbackPage.jsx # Detailed score & per-question verdicts
│   │   │   └── History.jsx      # Past interview sessions
│   │   ├── utils/
│   │   │   └── api.js           # API client with auth headers
│   │   ├── App.jsx              # Root component with routing
│   │   └── index.css            # Global styles & design system
│   └── index.html
│
├── server/                      # Express Backend
│   ├── config/
│   │   └── db.js                # MongoDB connection with fallback
│   ├── controllers/
│   │   ├── authController.js    # Register, login, getMe
│   │   ├── resumeController.js  # Upload, analyze, get latest
│   │   ├── interviewController.js # Start, finish, history
│   │   └── dashboardController.js # Aggregated stats
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── models/
│   │   └── Schemas.js           # User, Resume, InterviewSession
│   ├── routes/
│   │   └── apiRoutes.js         # All API endpoint definitions
│   ├── utils/
│   │   └── ai.js                # Multi-tier AI pipeline
│   └── server.js                # Express app entry point
│
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Sign in and receive JWT |
| `GET` | `/api/auth/me` | Get current user profile |

### Resume
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/resumes/upload` | Upload PDF and run AI analysis |
| `POST` | `/api/resumes/analyze-text` | Analyze pasted resume text |
| `GET` | `/api/resumes/latest` | Get most recent analysis |

### Interview
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/interviews/start` | Start a new AI interview session |
| `POST` | `/api/interviews/:id/finish` | Submit answers and get evaluation |
| `GET` | `/api/interviews/history` | Get all past sessions |
| `GET` | `/api/interviews/:id` | Get detailed session feedback |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/stats` | Get aggregated performance stats |

> All endpoints except auth require a valid JWT token in the `Authorization: Bearer <token>` header.

---

## 🎨 Design Highlights

- **Glassmorphism UI** — frosted glass panels with subtle backdrop blur
- **Animated glow blobs** — dynamic floating gradient backgrounds
- **Custom SVG charts** — hand-built performance trend graphs with hover tooltips
- **Micro-animations** — smooth fade-ins, spinning loaders, and pulse indicators
- **Dark theme** — carefully crafted warm-toned dark palette
- **Responsive layout** — CSS Grid with auto-fit for all screen sizes
- **Dock navigation** — macOS-style bottom navigation bar

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using React, Node.js, and AI**

⭐ Star this repo if you found it helpful!

</div>
