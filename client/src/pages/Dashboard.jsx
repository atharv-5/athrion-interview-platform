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
        // Load from local storage
        const localHistory = localStorage.getItem('interview_history');
        let parsedHistory = [];
        if (localHistory) {
          try {
            parsedHistory = JSON.parse(localHistory);
          } catch (e) {}
        }

        const count = parsedHistory.length > 0 ? parsedHistory.length : 1;
        const avgScore = parsedHistory.length > 0 
          ? Math.round(parsedHistory.reduce((a, b) => a + (b.score || 70), 0) / count)
          : 82;

        setStats({
          averageScore: avgScore,
          interviewsCompleted: count,
          focusAreas: ['System Design', 'STAR Method'],
          skills: [
            { name: 'Technical Knowledge', value: 85 },
            { name: 'Problem Solving', value: 80 },
            { name: 'Communication', value: 75 },
            { name: 'Behavioral Skills', value: 70 }
          ],
          scoreHistory: parsedHistory.map(h => h.score || 70)
        });

        if (parsedHistory.length > 0) {
          setRecentInterviews(parsedHistory.slice(0, 3));
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
            }
          ]);
        }
        setLoading(false);
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

          {/* Dynamic SVG Line Graph */}
          {(() => {
            // Compute real score history from actual interviews
            const historyList = (recentInterviews && recentInterviews.length > 0)
              ? [...recentInterviews].reverse()
              : [];

            if (historyList.length === 0) {
              return (
                <div style={{ height: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '8px' }}>
                  <Activity size={32} opacity={0.5} />
                  <p style={{ fontSize: '0.9rem' }}>No interview sessions completed yet.</p>
                  <span style={{ fontSize: '0.8rem' }}>Complete a mock interview to track progress here!</span>
                </div>
              );
            }

            const chartHeight = 130;
            const chartWidth = 400;
            const paddingX = 40;

            const points = historyList.map((item, idx) => {
              const x = historyList.length === 1 
                ? chartWidth / 2 
                : paddingX + (idx * (chartWidth - 2 * paddingX)) / (historyList.length - 1);
              const score = item.score || 70;
              // Map score 0-100 to Y coordinates (120 is bottom, 20 is top)
              const y = 130 - (score / 100) * 100;
              return { x, y, score, role: item.role, date: item.date || item.createdAt };
            });

            // SVG Path command
            const pathD = points.length === 1 
              ? '' 
              : points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`, '');

            const areaD = points.length > 1 
              ? `${pathD} L ${points[points.length - 1].x},140 L ${points[0].x},140 Z`
              : '';

            return (
              <div style={{ width: '100%', position: 'relative' }}>
                <div style={{ width: '100%', height: '160px', position: 'relative' }}>
                  <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 400 140" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid Lines */}
                    <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(75,46,43,0.06)" strokeWidth="1" />
                    <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(75,46,43,0.06)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(75,46,43,0.06)" strokeWidth="1" />

                    {/* Area fill */}
                    {areaD && <path d={areaD} fill="url(#chartGradient)" />}

                    {/* Connecting line */}
                    {pathD && <path d={pathD} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />}

                    {/* Interactive Data Points with Tooltips */}
                    {points.map((pt, i) => (
                      <g key={i} className="chart-point-group" style={{ cursor: 'pointer' }}>
                        <circle cx={pt.x} cy={pt.y} r="6" fill="var(--primary)" stroke="var(--bg-primary)" strokeWidth="2.5" />
                        
                        {/* Hover Tooltip Popup */}
                        <g className="chart-tooltip" style={{ pointerEvents: 'none', transition: 'opacity 0.2s' }}>
                          <rect 
                            x={Math.max(10, Math.min(310, pt.x - 45))} 
                            y={Math.max(0, pt.y - 45)} 
                            width="90" 
                            height="32" 
                            rx="6" 
                            fill="var(--text-primary)" 
                          />
                          <text 
                            x={Math.max(10, Math.min(310, pt.x - 45)) + 45} 
                            y={Math.max(0, pt.y - 45) + 16} 
                            fill="#FFF8F0" 
                            fontSize="11" 
                            fontWeight="bold" 
                            textAnchor="middle" 
                            alignmentBaseline="central"
                          >
                            Score: {pt.score}%
                          </text>
                        </g>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Session Axis Labels */}
                <div style={{ display: 'flex', justifyContent: historyList.length === 1 ? 'center' : 'space-between', marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {historyList.map((item, idx) => (
                    <span key={idx}>
                      Session {idx + 1} {idx === historyList.length - 1 ? '(Latest)' : ''}
                    </span>
                  ))}
                </div>

                <style>{`
                  .chart-tooltip { opacity: 0; }
                  .chart-point-group:hover .chart-tooltip { opacity: 1; }
                  .chart-point-group:hover circle { r: 8; fill: var(--primary-hover); }
                `}</style>
              </div>
            );
          })()}
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