import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import { Clock, Calendar, ChevronRight, Award, Trash2, ShieldAlert } from 'lucide-react';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetchWithAuth('/api/interviews/history');
        if (res.ok) {
          const data = await res.json();
          setHistory(data.history);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend connection failed, loading local mockup history.');
      }


      // Local storage fallback
      const saved = localStorage.getItem('interview_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      } else {
        // default dummy history
        const dummyHistory = [
          {
            id: 'mock_1',
            role: 'Senior Full Stack Engineer',
            type: 'technical',
            difficulty: 'Hard',
            score: 85,
            duration: 540,
            date: '2026-06-25T14:30:00Z',
          },
          {
            id: 'mock_2',
            role: 'Product Manager',
            type: 'behavioral',
            difficulty: 'Medium',
            score: 72,
            duration: 620,
            date: '2026-06-22T10:15:00Z',
          }
        ];
        setHistory(dummyHistory);
        localStorage.setItem('interview_history', JSON.stringify(dummyHistory));
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);


  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    return `${mins} min`;
  };

  const deleteSession = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this session from your history?')) {
      const updated = history.filter(item => item.id !== id && item._id !== id);
      setHistory(updated);
      localStorage.setItem('interview_history', JSON.stringify(updated));
      localStorage.removeItem(`feedback_session_${id}`);
    }
  };

  const handleRowClick = (item) => {
    const sessionId = item.id || item._id;
    // Check if it's a local mock session
    const isMock = String(sessionId).startsWith('session_mock_') || String(sessionId).startsWith('mock_');
    navigate(`/feedback/${sessionId}?isMock=${isMock}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p>Loading your history...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <div className="glow-blob blob-secondary" style={{ bottom: '-10%', left: '10%' }}></div>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
          Practice <span className="gradient-text">History</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review evaluations and learning suggestions from all your past AI mock interviews.</p>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {history.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
                  <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Target Role</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Domain</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Difficulty</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Duration</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Score</th>
                  <th style={{ padding: '16px 24px', width: '80px' }}></th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr 
                    key={item.id || item._id || index}
                    onClick={() => handleRowClick(item)}
                    className="history-row"
                    style={{ 
                      borderBottom: index !== history.length - 1 ? '1px solid var(--border-color)' : 'none',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <td style={{ padding: '20px 24px', fontWeight: 600, color: '#ffffff' }}>{item.role}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{item.type}</td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-color)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                      }}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} />
                        {formatDate(item.date || item.createdAt)}
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} />
                        {formatDuration(item.duration)}
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{
                        background: item.score >= 80 ? 'var(--accent-success-glow)' : 'var(--accent-warning-glow)',
                        color: item.score >= 80 ? 'var(--accent-success)' : 'var(--accent-warning)',
                        border: `1px solid ${item.score >= 80 ? 'var(--accent-success)' : 'var(--accent-warning)'}`,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Award size={14} />
                        {item.score}%
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button 
                          onClick={(e) => deleteSession(item.id || item._id, e)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            transition: 'color 0.2s'
                          }}
                          className="delete-btn"
                        >
                          <Trash2 size={16} />
                        </button>
                        <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <ShieldAlert size={40} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
            <h3>No Interviews Practiced Yet</h3>
            <p style={{ color: 'var(--text-muted)', margin: '8px 0 20px 0' }}>Your completed session transcripts and evaluation cards will be stored here.</p>
            <button onClick={() => navigate('/interview')} className="btn btn-primary">
              Practice Now
            </button>
          </div>
        )}
      </div>

      <style>{`
        .history-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .history-row:hover .delete-btn {
          color: var(--accent-danger) !important;
        }
      `}</style>
    </div>
  );
};

export default History;
