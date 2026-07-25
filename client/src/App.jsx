import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dock from './components/Dock';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import MockInterview from './pages/MockInterview';
import FeedbackPage from './pages/FeedbackPage';
import History from './pages/History';
import Login from './pages/Login';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: 'var(--bg-primary)',
        color: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid var(--border-color)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Preparing Workspace...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Redirect to Login if not authenticated
  if (!user) {
    return <Login />;
  }

  return (
    <div className="dashboard-layout">
      {/* Background Blobs */}
      <div className="glow-blob blob-primary"></div>
      <div className="glow-blob blob-secondary"></div>

      {/* Navigation Dock */}
      <Dock />

      {/* Page Routing */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeAnalyzer />} />
          <Route path="/interview" element={<MockInterview />} />
          <Route path="/feedback/:id" element={<FeedbackPage />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
