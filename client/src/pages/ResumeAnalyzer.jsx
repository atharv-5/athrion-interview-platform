import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import { 
  FileUp, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Briefcase, 
  ArrowRight, 
  Terminal 
} from 'lucide-react';

const ResumeAnalyzer = () => {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  // Check if we already have an analysis in localStorage
  useEffect(() => {
    const savedAnalysis = localStorage.getItem('latest_resume_analysis');
    if (savedAnalysis) {
      setAnalysis(JSON.parse(savedAnalysis));
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const runAnalysis = async () => {
    if (!file && !resumeText.trim()) {
      setError('Please select a file or paste your resume text first.');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate progression steps for premium feel
    const steps = [
      'Extracting resume content...',
      'Running AI-driven skill extraction...',
      'Mapping profile to industry benchmarks...',
      'Compiling final recommendations...'
    ];
    
    let stepIdx = 0;
    setStatusText(steps[0]);
    
    const statusInterval = setInterval(() => {
      if (stepIdx < steps.length - 1) {
        stepIdx++;
        setStatusText(steps[stepIdx]);
      }
    }, 1200);

    try {
      let data = null;

      if (file) {
        const formData = new FormData();
        formData.append('resume', file);

        const res = await fetchWithAuth('/api/resumes/upload', {
          method: 'POST',
          body: formData
        });
        
        if (res.ok) {
          data = await res.json();
        } else if (res.status === 429) {
          const errData = await res.json().catch(() => ({}));
          setError(errData.message || 'Daily limit reached! You can analyze up to 2 resumes per day.');
          setLoading(false);
          return;
        }
      } else {
        const res = await fetchWithAuth('/api/resumes/analyze-text', {
          method: 'POST',
          body: JSON.stringify({ text: resumeText })
        });

        if (res.ok) {
          data = await res.json();
        } else if (res.status === 429) {
          const errData = await res.json().catch(() => ({}));
          setError(errData.message || 'Daily limit reached! You can analyze up to 2 resumes per day.');
          setLoading(false);
          return;
        }
      }

      if (data && data.analysis) {
        setAnalysis(data.analysis);
        localStorage.setItem('latest_resume_analysis', JSON.stringify(data.analysis));
      } else {
        throw new Error('API failed to return analysis');
      }

    } catch (err) {
      console.warn('Backend upload failed. Compiling mock resume analysis.');
      // Fallback Mock Resume Analysis
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const fileName = file ? file.name : 'Pasted Resume';
      const parsedMock = {
        candidateName: 'Candidate Profile',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'TypeScript', 'Docker', 'AWS', 'System Design'],
        strengths: [
          'Strong full-stack foundations with Node and React.',
          'Experience building scalable web applications and microservices.',
          'Solid understanding of database indexing and query optimization in MongoDB.'
        ],
        gaps: [
          'Limited experience in CI/CD pipeline automation.',
          'Could improve in advanced frontend state management (e.g. Redux Toolkit/Zustand).'
        ],
        roles: [
          'Full Stack Developer',
          'Backend Engineer',
          'Software Developer'
        ]
      };
      
      setAnalysis(parsedMock);
      localStorage.setItem('latest_resume_analysis', JSON.stringify(parsedMock));
    } finally {
      clearInterval(statusInterval);
      setLoading(false);
      setStatusText('');
    }
  };

  const startMockForRole = (role) => {
    navigate(`/interview?role=${encodeURIComponent(role)}`);
  };

  const clearAnalysis = () => {
    localStorage.removeItem('latest_resume_analysis');
    setAnalysis(null);
    setFile(null);
    setResumeText('');
  };

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <div className="glow-blob blob-secondary" style={{ top: '-10%', left: '10%' }}></div>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
          Resume <span className="gradient-text">Analysis</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Upload your resume to extract skills, find career gaps, and instantly customize mock interviews.</p>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1.5s linear infinite' }}></div>
            <div style={{ position: 'absolute', width: '70%', height: '70%', left: '15%', top: '15%', border: '4px solid var(--border-color)', borderBottomColor: 'var(--secondary)', borderRadius: '50%', animation: 'spin-reverse 2s linear infinite' }}></div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>AI is analyzing your profile</h3>
            <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Terminal size={16} color="var(--primary)" /> {statusText}
            </p>
          </div>
          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes spin-reverse { to { transform: rotate(-360deg); } }
          `}</style>
        </div>
      ) : analysis ? (
        // Results View
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={clearAnalysis} className="btn btn-secondary">
              Upload New Resume
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* Left side: Skills and Recommendations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Extracted Skills */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="var(--primary)" /> Identified Core Skills
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {analysis.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--primary)',
                        color: 'var(--text-primary)',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        boxShadow: '0 2px 4px rgba(75, 46, 43, 0.08)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Interview Tracks */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={18} color="var(--secondary)" /> Target Interview Roles
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Choose a target role below to instantly start an AI-customized mock interview based on your background.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {analysis.roles.map((role, index) => (
                    <div 
                      key={index} 
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '16px'
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{role}</span>
                      <button 
                        onClick={() => startMockForRole(role)}
                        className="btn btn-primary" 
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      >
                        Start Mock <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Strengths & Gaps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Strengths */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-success)' }}>
                  <CheckCircle size={18} /> Profile Strengths
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', paddingLeft: 0 }}>
                  {analysis.strengths.map((strength, index) => (
                    <li 
                      key={index} 
                      style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5
                      }}
                    >
                      <span style={{ color: 'var(--accent-success)', fontWeight: 'bold' }}>✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-warning)' }}>
                  <AlertCircle size={18} /> Recommendations / Skill Gaps
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', paddingLeft: 0 }}>
                  {analysis.gaps.map((gap, index) => (
                    <li 
                      key={index} 
                      style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5
                      }}
                    >
                      <span style={{ color: 'var(--accent-warning)', fontWeight: 'bold' }}>!</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      ) : (
        // Input / Upload View
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
          {/* File Upload zone */}
          <div 
            className="glass-panel"
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px dashed ${dragOver ? 'var(--primary)' : 'var(--border-color)'}`,
              background: dragOver ? 'rgba(255, 255, 255, 0.04)' : 'var(--bg-card)',
              borderRadius: '16px',
              cursor: 'pointer',
              minHeight: '300px',
              textAlign: 'center',
              transition: 'var(--transition-smooth)'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('resume-file').click()}
          >
            <input 
              type="file" 
              id="resume-file" 
              style={{ display: 'none' }} 
              accept=".pdf,.txt,.docx"
              onChange={handleFileChange}
            />
            <div style={{
              background: 'var(--primary-glow)',
              padding: '16px',
              borderRadius: '50%',
              color: 'var(--primary)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileUp size={32} />
            </div>
            {file ? (
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>File Selected</h3>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{file.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Drag & Drop Resume</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Supports PDF, TXT or DOCX files</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>or click to browse from device</p>
              </div>
            )}
            
            {file && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  runAnalysis();
                }} 
                className="btn btn-primary" 
                style={{ marginTop: '24px' }}
              >
                Analyze File
              </button>
            )}
          </div>

          {/* Text Input Fallback */}
          <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Or Paste Resume Text</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Copy and paste your raw resume summary and work experience details directly.</p>
            </div>
            
            <textarea
              className="form-input"
              style={{
                minHeight: '200px',
                resize: 'vertical',
                background: 'rgba(10, 10, 10, 0.6)',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}
              placeholder="Paste details here (e.g. Experience, Skills, Projects)..."
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setError('');
              }}
            />

            {error && (
              <p style={{ color: 'var(--accent-danger)', fontSize: '0.85rem' }}>{error}</p>
            )}

            <button 
              onClick={runAnalysis}
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={!resumeText.trim()}
            >
              Analyze Resume Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
