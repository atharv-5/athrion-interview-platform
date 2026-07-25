import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Check if API key is configured and valid
const apiKey = process.env.GEMINI_API_KEY;
const isMockMode = !apiKey || (!apiKey.startsWith('AIzaSy') && !apiKey.startsWith('AQ.')) || apiKey.startsWith('your_gemini') || apiKey === '';

let genAI = null;
let model = null;

if (!isMockMode) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    console.log('🤖 AI System: Gemini 1.5 Flash initialized successfully.');
  } catch (err) {
    console.error('🤖 AI System Error: Failed to initialize Gemini client:', err.message);
  }
} else {
  console.log('🤖 AI System: Running in SIMULATION (Mock) mode. (No valid Gemini API key detected).');
}

// Helper to clean JSON responses from LLM in case it returns markdown blocks
const cleanJsonResponse = (text) => {
  try {
    if (text.includes('```json')) {
      text = text.split('```json')[1].split('```')[0].trim();
    } else if (text.includes('```')) {
      text = text.split('```')[1].split('```')[0].trim();
    }
    return JSON.parse(text);
  } catch (err) {
    console.error('Failed to parse JSON text from AI response:', text);
    throw err;
  }
};

export const aiService = {
  /**
   * Analyzes resume text and returns structured skills, strengths, gaps, and roles.
   */
  analyzeResume: async (text) => {
    const getSimulationAnalysis = (text) => {
      const lowerText = (text || '').toLowerCase();
      const skills = [];
      if (lowerText.includes('react') || lowerText.includes('vue') || lowerText.includes('angular')) {
        skills.push('Frontend Architecture', 'React.js', 'State Management');
      }
      if (lowerText.includes('node') || lowerText.includes('express') || lowerText.includes('python') || lowerText.includes('django')) {
        skills.push('Backend APIs', 'Node.js', 'Express.js', 'RESTful Design');
      }
      if (lowerText.includes('mongo') || lowerText.includes('sql') || lowerText.includes('postgres') || lowerText.includes('db')) {
        skills.push('Database Schemas', 'NoSQL Datastores', 'Query Optimization');
      }
      if (lowerText.includes('docker') || lowerText.includes('kubernetes') || lowerText.includes('aws') || lowerText.includes('cloud')) {
        skills.push('DevOps', 'Docker Containerization', 'Cloud Deployment (AWS)');
      }

      const finalSkills = skills.length > 0 ? skills : ['Software Engineering', 'Algorithms', 'Full-stack Architecture', 'Data Structures'];
      const defaultStrengths = [
        'Solid knowledge of software lifecycle and architecture principles.',
        'Demonstrates structured and logical approach to software creation.',
        'Good alignment with modern tech frameworks.'
      ];
      const defaultGaps = [
        'Could elaborate further on system optimization and profiling tools.',
        'Would benefit from more exposure to end-to-end integration test suites.'
      ];
      const defaultRoles = ['Full Stack Engineer', 'Backend Developer', 'Software Engineer'];

      return {
        candidateName: 'Candidate Profile',
        skills: finalSkills,
        strengths: defaultStrengths,
        gaps: defaultGaps,
        roles: defaultRoles
      };
    };

    if (isMockMode || !model) {
      console.log('🤖 AI Simulation: Analyzing Resume Text...');
      await new Promise(r => setTimeout(r, 1000));
      return getSimulationAnalysis(text);
    }

    try {
      const prompt = `
        You are an expert resume parsing assistant. Analyze the following resume text and extract candidate profiles details.
        You must return a JSON object with the following structure:
        {
          "candidateName": "The candidate's name (default to 'Candidate Profile' if not found)",
          "skills": ["List of 6-10 core technologies and soft skills"],
          "strengths": ["List of 3 major candidate strengths based on experience"],
          "gaps": ["List of 2 areas of improvement or skill gaps for targeting high-end roles"],
          "roles": ["List of 3 recommended roles e.g., 'Full Stack Developer', 'System Architect'"]
        }
        Do not include any conversational text before or after the JSON.
        Resume Text:
        ${text}
      `;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      return cleanJsonResponse(responseText);
    } catch (err) {
      console.warn('⚠️ Gemini Resume Analysis failed (using simulated fallback):', err.message);
      return getSimulationAnalysis(text);
    }
  },

  /**
   * Generates mock interview questions based on role, difficulty, and type.
   */
  generateQuestions: async (role, difficulty, type, numQuestions) => {
    const getSimulationQuestions = (role, difficulty, type, numQuestions) => {
      const typeLower = (type || 'technical').toLowerCase();
      let pool = [];

      if (typeLower === 'technical') {
        pool = [
          `What is the difference between client-side rendering and server-side rendering in React/NextJS? When would you use one over the other?`,
          `How does Node.js handle async tasks underneath the hood? Explain the role of the Event Loop and thread pool (libuv).`,
          `Explain how indexing works in MongoDB. What is a compound index and how do you analyze query performance?`,
          `What are the SOLID design principles? Can you give an example of how you apply the Single Responsibility Principle in JavaScript?`,
          `Explain the concept of WebSockets. How is it different from HTTP polling, and how would you build a chat app connection pool?`
        ];
      } else if (typeLower === 'system-design') {
        pool = [
          `How would you design a scalable URL shortener like bit.ly? Walk through API endpoints, DB schema, and redirect caching.`,
          `Design a rate limiter middleware for a public API. Describe the algorithms you could use (e.g., sliding window, token bucket).`,
          `How would you design a system to store and stream video content? What technologies would you use for content delivery (CDNs)?`,
          `Design a distributed chat system supporting active statuses and group messages. How would you maintain websocket state?`
        ];
      } else {
        pool = [
          `Describe a situation where you had a tight deadline and a major blocker appeared. How did you coordinate the resolution?`,
          `Tell me about a time you had to work with a legacy codebase that lacked documentation. How did you approach onboarding yourself?`,
          `Describe a technical conflict you had with a senior team member or architect. How did you resolve the disagreement constructively?`,
          `Tell me about a time you noticed an engineering process bottleneck. What steps did you take to automate or improve it?`
        ];
      }

      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numQuestions || 3);
    };

    if (isMockMode || !model) {
      console.log(`🤖 AI Simulation: Generating ${numQuestions} questions for ${role} (${difficulty})...`);
      await new Promise(r => setTimeout(r, 1000));
      return getSimulationQuestions(role, difficulty, type, numQuestions);
    }

    try {
      const prompt = `
        You are an expert interviewer. Generate a list of questions for a candidate interview.
        Role: ${role}
        Difficulty: ${difficulty}
        Interview Type: ${type}
        Number of questions required: ${numQuestions}

        You must return a JSON object with this structure:
        {
          "questions": ["Question 1 text", "Question 2 text", ...]
        }
        Make sure the questions are highly relevant, targeted, and match the specified difficulty.
      `;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      const parsed = cleanJsonResponse(responseText);

      // Guard against malformed responses (missing/wrong-shaped "questions" field)
      if (!parsed || !Array.isArray(parsed.questions)) {
        throw new Error('Gemini response missing a valid "questions" array');
      }
      return parsed.questions;
    } catch (err) {
      console.warn('⚠️ Gemini Question Generation failed (using simulated fallback):', err.message);
      return getSimulationQuestions(role, difficulty, type, numQuestions);
    }
  },

  /**
   * Evaluates a single question/answer pair.
   */
  evaluateAnswer: async (question, answer) => {
    const getSimulationEvaluation = () => {
      const score = Math.floor(Math.random() * 4) + 6;
      return {
        rating: score,
        positives: 'Answer directly addresses the core question, showing key understanding of concepts. Used correct industry vocabulary.',
        improvements: 'Could provide a specific example of applying this in a real project. Explain trade-offs in structural complexity.',
        modelAnswer: `An outstanding response would start by explaining the foundational architecture, explicitly walk through code paradigms or system schemas, highlight production edge cases (like server concurrency or memory management), and provide a concrete case study showing business value.`
      };
    };

    if (isMockMode || !model) {
      console.log('🤖 AI Simulation: Evaluating answer...');
      await new Promise(r => setTimeout(r, 800));
      return getSimulationEvaluation();
    }

    try {
      const prompt = `
        You are an AI interviewer assessing a candidate's answer.
        Question: ${question}
        Candidate Answer: ${answer}

        Evaluate the answer. You must return a JSON object with the following structure:
        {
          "rating": 7, // Score out of 10
          "positives": "Detailed string of what the candidate did well in their response",
          "improvements": "Detailed string of how the candidate could improve this specific response",
          "modelAnswer": "A comprehensive example of what a perfect response would look like"
        }
        Make the assessment constructive, realistic, and detailed.
      `;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      return cleanJsonResponse(responseText);
    } catch (err) {
      console.warn('⚠️ Gemini Answer Evaluation failed (using simulated fallback):', err.message);
      return getSimulationEvaluation();
    }
  },

  /**
   * Reviews the transcript of an entire session and compiles a detailed final assessment.
   */
  compileFinalReport: async (role, difficulty, type, qaList) => {
    const getSimulationReport = (role, difficulty, type, qaList) => {
      const ratings = (qaList || []).map(qa => qa.rating || 7);
      const avgRating = ratings.length > 0 ? (ratings.reduce((sum, val) => sum + val, 0) / ratings.length) : 7.5;
      const scorePercentage = Math.round(avgRating * 10);

      return {
        score: scorePercentage,
        overallFeedback: `You demonstrated a good understanding of ${role} topics. Your technical communication is strong, showing you can articulate design layouts and functional concepts. Structuring your responses with clear problem definitions, trade-off comparisons, and concrete examples will elevate your candidacy for advanced levels.`,
        rubricBreakdown: [
          { name: 'Technical Depth', score: Math.round(scorePercentage + (Math.random() * 4 - 2)), description: 'Good knowledge of core schemas and workflow stacks.' },
          { name: 'Problem Solving', score: Math.round(scorePercentage + (Math.random() * 4 - 2)), description: 'Logical decomposition of issues, but needs more trade-off evaluations.' },
          { name: 'Communication Clarity', score: Math.round(scorePercentage + (Math.random() * 4 - 2)), description: 'Clear voice delivery, well paced, direct to points.' }
        ],
        suggestions: [
          { topic: 'Data Structures and Algorithms', resource: 'Practice sliding window and hash-mapping problems on Leetcode.' },
          { topic: 'Distributed Scaling', resource: 'Review System Design Primer tutorials on database sharding and caching topologies.' },
          { topic: 'Behavioral STAR alignment', resource: 'Draft 3 project examples detailing the Situation, Task, Action, and Business Result.' }
        ]
      };
    };

    if (isMockMode || !model) {
      console.log('🤖 AI Simulation: Compiling Final Report...');
      await new Promise(r => setTimeout(r, 1000));
      return getSimulationReport(role, difficulty, type, qaList);
    }

    try {
      const prompt = `
        You are the Head Interviewer compiler. Review this transcript of a full candidate interview.
        Role: ${role}
        Difficulty: ${difficulty}
        Interview Type: ${type}

        Transcript details (Questions and Answers with their individual ratings):
        ${JSON.stringify(qaList, null, 2)}

        Analyze this entire interview and return a comprehensive evaluation in a JSON object with this structure:
        {
          "score": 78, // Overall score percentage (0-100)
          "overallFeedback": "Detailed summary paragraph analyzing the candidate's performance across all questions, including strong areas and areas requiring general work.",
          "rubricBreakdown": [
            { "name": "Technical Depth", "score": 80, "description": "Short feedback summary" },
            { "name": "Problem Solving", "score": 75, "description": "Short feedback summary" },
            { "name": "Communication", "score": 85, "description": "Short feedback summary" }
          ],
          "suggestions": [
            { "topic": "Name of weak topic area", "resource": "Specific recommendation of what they should read, practice, or review to close this gap" }
          ]
        }
      `;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      return cleanJsonResponse(responseText);
    } catch (err) {
      console.warn('⚠️ Gemini Compile Report failed (using simulated fallback):', err.message);
      // FIX: this was missing — without it, a failed Gemini call returned
      // `undefined` instead of falling back, breaking whatever called this function.
      return getSimulationReport(role, difficulty, type, qaList);
    }
  }
};