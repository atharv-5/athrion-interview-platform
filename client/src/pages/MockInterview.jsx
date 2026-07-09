import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  MessageSquare, 
  Mic, 
  MicOff, 
  Send, 
  Clock, 
  CheckSquare, 
  ChevronRight, 
  Award, 
  ArrowRight,
  Terminal
} from 'lucide-react';

const MockInterview = () => {
  const { backendUrl } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role') || '';
  const sessionParam = searchParams.get('session') || '';

  // Setup State
  const [role, setRole] = useState(roleParam || 'Junior Full Stack Developer');
  const [difficulty, setDifficulty] = useState('Medium');
  const [type, setType] = useState('technical');
  const [numQuestions, setNumQuestions] = useState(3);
  
  // Running State
  const [inProgress, setInProgress] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  
  // Timer State
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Transitions
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');

  // Handle URL change
  useEffect(() => {
    if (roleParam) {
      setRole(roleParam);
    }
  }, [roleParam]);

  // Speech recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setCurrentAnswer(prev => prev + (prev ? ' ' : '') + finalTranscript);
        }
      };

      rec.onerror = (e) => {
        console.error('Speech recognition error:', e.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Timer runner
  useEffect(() => {
    if (inProgress) {
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [inProgress]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported by your current browser. Please try Google Chrome.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const startInterview = async () => {
    setLoading(true);
    setLoadingMsg('AI is designing customized questions for your profile...');
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${backendUrl}/api/interviews/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role, difficulty, type, numQuestions })
      });

      if (res.ok) {
        const data = await res.json();
        setQuestions(data.session.questions);
        setSessionId(data.session._id);
        setCurrentIdx(0);
        setAnswers([]);
        setInProgress(true);
        setTimeSpent(0);
      } else {
        throw new Error('Failed to start interview');
      }
    } catch (err) {
      console.warn('Backend failed. Generating mock interview questions.');
      // Fallback questions based on selected type
      await new Promise(r => setTimeout(r, 2000));
      
      let dummyQuestions = [];
      if (type === 'technical') {
        dummyQuestions = [
          'Explain the difference between SQL and NoSQL databases. When would you use MongoDB over PostgreSQL?',
          'What is the event loop in Node.js? How does it handle asynchronous I/O operations?',
          'Describe your experience with React Hooks. How do useEffect dependency arrays work, and what are common pitfalls?'
        ];
      } else if (type === 'behavioral') {
        dummyQuestions = [
          'Tell me about a time you had a conflict with a team member. How did you resolve it?',
          'Describe a challenging project you worked on. What were the obstacles and how did you overcome them?',
          'Why are you interested in this position, and how do you handle tight deadlines?'
        ];
      } else if (type === 'system-design') {
        dummyQuestions = [
          'How would you design a real-time collaborative document editing system like Google Docs?',
          'Design a rate limiting system for a public API. What data structures and algorithms would you use?',
          'How would you design a scalable notification service that supports email, push, and SMS?'
        ];
      } else {
        dummyQuestions = [
          'Walk me through a situation where you had to take ownership of a failing project.',
          'Describe a situation where you noticed an inefficiency in a team process and took initiative to improve it.'
        ];
      }

      setQuestions(dummyQuestions.slice(0, numQuestions));
      setSessionId(`session_mock_${Date.now()}`);
      setCurrentIdx(0);
      setAnswers([]);
      setInProgress(true);
      setTimeSpent(0);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) {
      alert('Please type or speak an answer before submitting.');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setLoading(true);
    setLoadingMsg('AI is evaluating your response...');

    const token = localStorage.getItem('token');
    const answerPayload = {
      questionIndex: currentIdx,
      question: questions[currentIdx],
      answer: currentAnswer
    };

    const updatedAnswers = [...answers, answerPayload];
    setAnswers(updatedAnswers);
    setCurrentAnswer('');

    // Advance index
    const nextIdx = currentIdx + 1;
    
    // Simulating delay for AI evaluation
    await new Promise(r => setTimeout(r, 1000));

    if (nextIdx < questions.length) {
      setCurrentIdx(nextIdx);
      setLoading(false);
    } else {
      // Completed last question!
      setLoadingMsg('Analyzing final performance and compiling suggestions...');
      try {
        const res = await fetch(`${backendUrl}/api/interviews/${sessionId}/finish`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ answers: updatedAnswers, duration: timeSpent })
        });

        if (res.ok) {
          const data = await res.json();
          navigate(`/feedback/${data.session._id}`);
          return;
        }
      } catch (err) {
        console.warn('Backend finish call failed. Creating mock feedback reports.');
      }

      // Fallback mock feedback compiled in frontend
      await new Promise(r => setTimeout(r, 3000));
      
      // Calculate scores
      const score = Math.floor(Math.random() * 20) + 70; // 70 to 90
      
      const feedbackDetails = {
        id: sessionId,
        role,
        difficulty,
        type,
        score,
        duration: timeSpent,
        date: new Date().toISOString(),
        overallFeedback: `You demonstrated strong logical formulation and technical foundations during this interview for ${role}. Your explanations were structurally sound, although adding specific metrics and quantifying your achievements would elevate the impact of your responses.`,
        rubricBreakdown: [
          { name: 'Technical Depth', score: score + 3, description: 'Very good grasp of structural concepts and backend workflow.' },
          { name: 'Problem Solving', score: score - 2, description: 'Logical steps taken, successfully identified major trade-offs.' },
          { name: 'Communication Clarity', score: score + 1, description: 'Clear speech patterns. Answered questions directly without rambling.' },
          { name: 'Structured Delivery', score: score - 5, description: 'Answer structure can be improved. Consider using STAR method for situational queries.' }
        ],
        qaFeedback: updatedAnswers.map((item, idx) => ({
          question: item.question,
          answer: item.answer,
          rating: Math.floor(Math.random() * 4) + 6, // 6 to 9
          positives: 'Answered the core components directly. Solid usage of technical terms.',
          improvements: 'Could elaborate more on exact architecture trade-offs. Include a brief concrete example.',
          modelAnswer: `For question "${item.question}", a stellar answer would clearly define the key architectures, explicitly contrast trade-offs (e.g. latency vs database writes), and walk through a production scale scenario showing error handling.`
        })),
        suggestions: [
          { topic: 'Advanced State Systems', resource: 'Read React documentation on Context Performance optimizations.' },
          { topic: 'System Scalability', resource: 'Review Designing Data-Intensive Applications Chapter 3 (Storage and Retrieval).' },
          { topic: 'Behavioral STAR Structuring', resource: 'Write out 3 projects in Situation-Task-Action-Result format.' }
        ]
      };

      // Save to localStorage history
      const currentHistory = JSON.parse(localStorage.getItem('interview_history') || '[]');
      currentHistory.unshift(feedbackDetails);
      localStorage.setItem('interview_history', JSON.stringify(currentHistory));
      localStorage.setItem(`feedback_session_${sessionId}`, JSON.stringify(feedbackDetails));

      navigate(`/feedback/${sessionId}?isMock=true`);
      setLoading(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <div className="glow-blob blob-primary" style={{ top: '-10%', right: '10%' }}></div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', textAlign: 'center', minHeight: '400px' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '4px solid var(--border-color)', borderTopColor: 'var(--secondary)', borderRadius: '50%', animation: 'spin 1.5s linear infinite' }}></div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Processing</h3>
            <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Terminal size={16} color="var(--secondary)" /> {loadingMsg}
            </p>
          </div>
        </div>
      ) : !inProgress ? (
        // Settings Mode
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
              Configure <span className="gradient-text">Mock Interview</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Configure parameters below to generate an automated AI-simulated interview.</p>
          </div>

          <div className="glass-panel" style={{ padding: '32px' }}>
            <form onSubmit={(e) => { e.preventDefault(); startInterview(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="form-group">
                <label className="form-label">Target Role / Job Title</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="form-input" 
                  placeholder="e.g. Senior React Developer"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Interview Domain</label>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    className="form-input"
                    style={{ background: 'var(--bg-primary)' }}
                  >
                    <option value="technical">Technical (Coding & Concepts)</option>
                    <option value="system-design">System Design</option>
                    <option value="behavioral">Behavioral (General)</option>
                    <option value="behavioral-star">Behavioral (STAR Method)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Difficulty Level</label>
                  <select 
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value)} 
                    className="form-input"
                    style={{ background: 'var(--bg-primary)' }}
                  >
                    <option value="Easy">Easy (Entry level)</option>
                    <option value="Medium">Medium (Mid level)</option>
                    <option value="Hard">Hard (Senior / Lead)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Number of Questions ({numQuestions})</label>
                <input 
                  type="range" 
                  min="2" 
                  max="6" 
                  value={numQuestions} 
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))} 
                  style={{
                    accentColor: 'var(--primary)',
                    background: 'var(--bg-primary)',
                    height: '6px',
                    borderRadius: '4px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>2 questions (Quick)</span>
                  <span>6 questions (Deep)</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
                <Play size={18} />
                <span>Initialize AI Session</span>
              </button>

            </form>
          </div>
        </div>
      ) : (
        // Active Q&A Interface
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Header Panel */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {type.toUpperCase()} INTERVIEW
              </span>
              <h2 style={{ fontSize: '1.25rem', margin: '4px 0 0 0' }}>{role}</h2>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
                <Clock size={16} color="var(--secondary)" />
                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{formatTime(timeSpent)}</span>
              </div>

              <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '10px' }}>
                <span style={{ fontWeight: 600 }}>Q: {currentIdx + 1}/{questions.length}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '32px', overflow: 'hidden' }}>
            <div style={{
              width: `${((currentIdx + 1) / questions.length) * 100}%`,
              height: '100%',
              background: 'var(--primary-gradient)',
              transition: 'width 0.4s ease'
            }}></div>
          </div>

          {/* Question Box */}
          <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', borderLeft: '4px solid var(--primary)', position: 'relative' }}>
            <span style={{
              position: 'absolute',
              top: '-12px',
              left: '20px',
              background: 'var(--primary)',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: '4px'
            }}>
              INTERVIEWER
            </span>
            <p style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 500, lineHeight: 1.6 }}>
              {questions[currentIdx]}
            </p>
          </div>

          {/* User Response Area */}
          <div className="glass-panel" style={{ padding: '32px', position: 'relative' }}>
            <span style={{
              position: 'absolute',
              top: '-12px',
              left: '20px',
              background: 'var(--secondary)',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: '4px'
            }}>
              YOUR RESPONSE
            </span>

            <textarea
              className="form-input"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your response here or click 'Speak Answer' to talk..."
              style={{
                minHeight: '180px',
                background: 'rgba(15, 21, 36, 0.4)',
                border: '1px solid var(--border-color)',
                resize: 'vertical',
                lineHeight: 1.6,
                padding: '16px',
                fontSize: '1rem',
                marginBottom: '20px'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={toggleListening}
                className="btn"
                style={{
                  background: isListening ? 'var(--accent-danger-glow)' : 'var(--secondary-glow)',
                  border: `1px solid ${isListening ? 'var(--accent-danger)' : 'var(--secondary)'}`,
                  color: isListening ? 'var(--accent-danger)' : 'var(--secondary)',
                  padding: '10px 20px'
                }}
              >
                {isListening ? (
                  <>
                    <MicOff size={16} />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Mic size={16} />
                    <span>Speak Answer</span>
                  </>
                )}
              </button>

              <button 
                onClick={submitAnswer} 
                className="btn btn-primary"
                style={{ padding: '10px 24px' }}
                disabled={!currentAnswer.trim()}
              >
                <span>Submit Answer</span>
                <ChevronRight size={18} />
              </button>
            </div>
            
            {isListening && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '0.85rem', color: 'var(--secondary)' }}>
                <span className="voice-indicator"></span>
                <span>Listening... speak directly into your microphone.</span>
                <style>{`
                  .voice-indicator {
                    width: 8px;
                    height: 8px;
                    background: var(--secondary);
                    border-radius: 50%;
                    animation: pulse 1s infinite alternate;
                  }
                  @keyframes pulse { from { transform: scale(0.8); opacity: 0.5; } to { transform: scale(1.4); opacity: 1; } }
                `}</style>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default MockInterview;
