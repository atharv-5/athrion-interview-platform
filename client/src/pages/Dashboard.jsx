import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import {
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  Play,
  ArrowRight,
  Sparkles,
  Activity,
  Plus,
  Check
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetchWithAuth('/api/dashboard/stats');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setStats(data.stats);
            setRecentInterviews(data.recentInterviews || []);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend offline, loading mock dashboard statistics.');
      }


      // Fallback Mock Data
      setTimeout(() => {
        setStats({
          averageScore: 78,
          interviewsCompleted: 4,
          focusAreas: ['System Design', 'Concurrency', 'STAR Method'],
          skills: [
            { name: 'Technical Knowledge', value: 85 },
            { name: 'Problem Solving', value: 80 },
            { name: 'Communication', value: 75 },
            { name: 'Behavioral Skills', value: 70 }
          ],
          scoreHistory: [65, 72, 75, 78, 85]
        });

        // Try load from local storage
        const localHistory = localStorage.getItem('interview_history');
        if (localHistory) {
          const parsed = JSON.parse(localHistory);
          setRecentInterviews(parsed.slice(0, 3));
        } else {
          setRecentInterviews([
            {
              id: 'mock_1',
              role: 'Senior Full Stack Engineer',
              type: 'technical',
              difficulty: 'Hard',
              score: 85,
              date: '2026-06-25T14:30:00Z',
              totalQuestions: 4
            },
            {
              id: 'mock_2',
              role: 'Product Manager',
              type: 'behavioral',
              difficulty: 'Medium',
              score: 72,
              date: '2026-06-22T10:15:00Z',
              totalQuestions: 5
            }
          ]);
        }
        setLoading(false);
      }, 500);
    };

    fetchDashboardData();
  }, []);


  if (loading) {
    return (
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p>Loading your dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      {/* Decorative Blob */}
      <div className="glow-blob blob-primary" style={{ top: '-10%', right: '10%' }}></div>

      {/* Header Summary — score leads, greeting shrunk */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>
            Welcome back, {user?.name || 'Practitioner'}
          </p>
          <h1 className="data-text" style={{ fontSize: '2.25rem', fontWeight: 500, color: 'var(--primary)' }}>
            {stats?.averageScore}% <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>average readiness</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/resume')} className="btn btn-secondary">
            <FileText size={18} />
            <span>Upload Resume</span>
          </button>
          <button onClick={() => navigate('/interview')} className="btn btn-primary">
            <Play size={18} />
            <span>Start Mock Interview</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'var(--accent-success-glow)', border: '1px solid var(--accent-success)', padding: '12px', borderRadius: '12px', color: 'var(--accent-success)' }}>
            <Award size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Avg Score</span>
            <h3 className="data-text" style={{ fontSize: '1.75rem', fontWeight: 700, margin: '4px 0 0 0' }}>{stats?.averageScore}%</h3>
          </div>
        </div>

        <div className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'var(--primary-glow)', border: '1px solid var(--primary)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}>
            <Activity size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Completed</span>
            <h3 className="data-text" style={{ fontSize: '1.75rem', fontWeight: 700, margin: '4px 0 0 0' }}>{stats?.interviewsCompleted} Sessions</h3>
          </div>
        </div>

        <div className="glass-panel glass-panel-hover" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'var(--secondary-glow)', border: '1px solid var(--secondary)', padding: '12px', borderRadius: '12px', color: 'var(--secondary)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Focus Areas</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '4px 0 0 0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '180px' }}>
              {stats?.focusAreas?.join(', ') || 'General'}
            </h3>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '32px' }}>
        {/* Performance Trend Chart */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Performance Progress</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={16} color="var(--accent-success)" /> Improving
            </span>
          </div>

          {/* Custom SVG Line Graph */}
          <div style={{ width: '100%', height: '180px', position: 'relative' }}>
            <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 400 150">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="400" y2="25" stroke="rgba(75,46,43,0.06)" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(75,46,43,0.06)" strokeWidth="1" />
              <line x1="0" y1="125" x2="400" y2="125" stroke="rgba(75,46,43,0.06)" strokeWidth="1" />

              {/* The Line & Area */}
              <path
                d="M 10,120 L 100,105 L 200,98 L 300,90 L 390,75 L 390,150 L 10,150 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M 10,120 L 100,105 L 200,98 L 300,90 L 390,75"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="10" cy="120" r="5" fill="var(--primary)" stroke="var(--bg-primary)" strokeWidth="2" />
              <circle cx="100" cy="105" r="5" fill="var(--primary)" stroke="var(--bg-primary)" strokeWidth="2" />
              <circle cx="200" cy="98" r="5" fill="var(--primary)" stroke="var(--bg-primary)" strokeWidth="2" />
              <circle cx="300" cy="90" r="5" fill="var(--primary)" stroke="var(--bg-primary)" strokeWidth="2" />
              <circle cx="390" cy="75" r="6" fill="var(--primary)" stroke="var(--bg-primary)" strokeWidth="2" />
            </svg>

            {/* Axis labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Session 1</span>
              <span>Session 2</span>
              <span>Session 3</span>
              <span>Session 4</span>
              <span>Session 5 (Latest)</span>
            </div>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px' }}>Skills Diagnostic</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stats?.skills?.map((skill, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{skill.name}</span>
                  <span className="data-text" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{skill.value}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(75,46,43,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${skill.value}%`,
                    background: 'var(--primary-gradient)',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Recent Interviews — flat list style with checkmarks */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Recent Mock Interviews</h3>
            <button onClick={() => navigate('/history')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div>
            {recentInterviews.length > 0 ? (
              recentInterviews.map((session) => (
                <div
                  key={session.id}
                  onClick={() => navigate(`/interview?session=${session.id}`)}
                  className="list-row"
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="check-circle">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }}>{session.role}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {session.type.toUpperCase()} • {session.difficulty}
                      </span>
                    </div>
                  </div>
                  <span className="data-text" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {session.score}%
                  </span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                No interviews practicing history yet.
              </div>
            )}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--primary)" /> Smart Suggestions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '10px', color: 'var(--primary)', flexShrink: 0 }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>Boost Communication Rating</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Your technical responses score highly, but communication can be polished. Try a Behavioral Mock Interview practicing STAR technique.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--secondary-glow)', padding: '10px', borderRadius: '10px', color: 'var(--secondary)', flexShrink: 0 }}>
                <BookOpen size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>Strengthen System Design</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Brush up on Data Partitioning and Caching Strategy which were identified as areas of improvement in your last session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so the last row of cards always clears the floating dock */}
      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default Dashboard;