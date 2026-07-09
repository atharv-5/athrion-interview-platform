import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  ArrowLeft, 
  BookOpen, 
  RefreshCw 
} from 'lucide-react';

const FeedbackPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isMock = searchParams.get('isMock') === 'true';
  const { backendUrl } = useAuth();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openQuestionIdx, setOpenQuestionIdx] = useState(0);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (isMock) {
        // Load from mock local storage
        const saved = localStorage.getItem(`feedback_session_${id}`);
        if (saved) {
          setFeedback(JSON.parse(saved));
          setLoading(false);
          return;
        }
      }

      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${backendUrl}/api/interviews/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setFeedback(data.session);
        }
      } catch (err) {
        console.warn('Backend connection failed, looking for local mockup database.');
        const saved = localStorage.getItem(`feedback_session_${id}`);
        if (saved) {
          setFeedback(JSON.parse(saved));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id, isMock, backendUrl]);

  const toggleQuestion = (idx) => {
    setOpenQuestionIdx(openQuestionIdx === idx ? -1 : idx);
  };

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}m ${remaining}s`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p>Retrieving your assessment report...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }}>
        <XCircle size={48} color="var(--accent-danger)" style={{ marginBottom: '16px' }} />
        <h2>Feedback Session Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px 0' }}>The requested interview feedback is missing or couldn't be loaded.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <div className="glow-blob blob-primary" style={{ top: '-10%', right: '10%', opacity: 0.15 }}></div>
      <div className="glow-blob blob-secondary" style={{ bottom: '-10%', left: '10%', opacity: 0.15 }}></div>

      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ padding: '8px 12px' }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>ASSESSMENT REPORT</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>{feedback.role}</h1>
        </div>
      </div>

      {/* Main Score Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '32px' }}>
        {/* Score Ring Summary */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Circular SVG Score Chart */}
          <div style={{ position: 'relative', width: '130px', height: '130px' }}>
            <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="65" cy="65" r="55" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle 
                cx="65" 
                cy="65" 
                r="55" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="10" 
                strokeDasharray="345" 
                strokeDashoffset={345 - (345 * feedback.score) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800 }}>{feedback.score}%</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Overall Score</span>
            </div>
          </div>

          <div style={{ flexGrow: 1, minWidth: '220px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Performance Overview</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {feedback.overallFeedback}
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> Time Spent: {formatDuration(feedback.duration)}
              </span>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={14} /> Difficulty: {feedback.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Rubric Breakdown */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Category Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {feedback.rubricBreakdown ? (
              feedback.rubricBreakdown.map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.name}</span>
                    <span style={{ fontWeight: 700 }}>{item.score}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${item.score}%`, 
                      background: item.score >= 80 ? 'var(--accent-success)' : item.score >= 70 ? 'var(--accent-warning)' : 'var(--accent-danger)',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                </div>
              ))
            ) : (
              // Hardcoded default breakdown if not found
              ['Technical Depth', 'Communication', 'Problem Solving', 'Structured Delivery'].map((cat, idx) => {
                const score = idx === 0 ? 82 : idx === 1 ? 78 : idx === 2 ? 80 : 70;
                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{cat}</span>
                      <span style={{ fontWeight: 700 }}>{score}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${score}%`, background: 'var(--primary)', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 3fr))', gap: '32px' }}>
        
        {/* Q&A Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Response-by-Response Breakdown</h3>
          
          {feedback.qaFeedback?.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-panel" 
              style={{ 
                borderRadius: '12px',
                borderLeft: openQuestionIdx === idx ? '4px solid var(--primary)' : '1px solid var(--border-color)',
                overflow: 'hidden'
              }}
            >
              {/* Accordion Trigger */}
              <div 
                onClick={() => toggleQuestion(idx)}
                style={{
                  padding: '20px 24px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: openQuestionIdx === idx ? 'rgba(255,255,255,0.01)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1, paddingRight: '12px' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '450px', color: '#ffffff' }}>
                    {item.question}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    background: item.rating >= 8 ? 'var(--accent-success-glow)' : item.rating >= 6 ? 'var(--accent-warning-glow)' : 'var(--accent-danger-glow)',
                    color: item.rating >= 8 ? 'var(--accent-success)' : item.rating >= 6 ? 'var(--accent-warning)' : 'var(--accent-danger)',
                    border: `1px solid ${item.rating >= 8 ? 'var(--accent-success)' : item.rating >= 6 ? 'var(--accent-warning)' : 'var(--accent-danger)'}`,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    Rating: {item.rating}/10
                  </span>
                  {openQuestionIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Accordion Content */}
              {openQuestionIdx === idx && (
                <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(10, 10, 10, 0.3)' }}>
                  
                  {/* Your Answer */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Your Answer</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.5, background: 'rgba(255,255,255,0.01)', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                      "{item.answer}"
                    </p>
                  </div>

                  {/* Highlights */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '8px', padding: '16px' }}>
                      <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <CheckCircle size={14} /> Key Strengths
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {item.positives}
                      </p>
                    </div>

                    <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: '8px', padding: '16px' }}>
                      <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-warning)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <TrendingUp size={14} /> Areas to Improve
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {item.improvements}
                      </p>
                    </div>
                  </div>

                  {/* Model Answer */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Recommended Model Answer Structure</h4>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--text-primary)', 
                      lineHeight: 1.5, 
                      background: 'rgba(20, 20, 20, 0.5)', 
                      padding: '16px', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '8px',
                      fontFamily: 'var(--font-sans)'
                    }}>
                      {item.modelAnswer}
                    </p>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar: Recommendations & Next Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '380px' }}>
          
          {/* Personalized Learning Suggestions */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--primary)" /> Learning Suggestions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {feedback.suggestions ? (
                feedback.suggestions.map((sugg, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>
                      {sugg.topic}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {sugg.resource}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No direct learning suggestions compiled.</p>
              )}
            </div>
          </div>

          {/* Action Callouts */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--primary-gradient)', border: 'none', color: '#ffffff' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Ready to try again?</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
              Practice makes perfect. Redo this session or configure a new topic to test your progress on these gaps.
            </p>
            <button 
              onClick={() => navigate(`/interview?role=${encodeURIComponent(feedback.role)}`)} 
              className="btn btn-secondary" 
              style={{ background: '#ffffff', color: 'var(--bg-primary)', fontWeight: 700, border: 'none', width: '100%', marginTop: '8px' }}
            >
              <RefreshCw size={16} /> Re-Take Interview
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FeedbackPage;
