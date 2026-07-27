import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWithAuth, getToken, setToken, clearAuth } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        const mockUser = localStorage.getItem('mock_user');
        
        if (!token && !mockUser) {
          return;
        }

        if (mockUser && !token) {
          try {
            setUser(JSON.parse(mockUser));
            return;
          } catch (e) {
            localStorage.removeItem('mock_user');
          }
        }

        if (token) {
          const res = await fetchWithAuth('/api/auth/me');
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          } else {
            clearAuth();
            setUser(null);
          }
        }
      } catch (err) {
        console.warn('Backend verification offline:', err.message);
        try {
          const localUser = localStorage.getItem('local_user');
          if (localUser) {
            setUser(JSON.parse(localUser));
          }
        } catch (e) {
          localStorage.removeItem('local_user');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();


    // Event listener for unauthorized 401 triggers across the app
    const handleUnauthorized = () => {
      setUser(null);
      setError('Session expired. Please sign in again.');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetchWithAuth('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        setLoading(false);
        return true;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      console.warn('Login error:', err.message);
      // Fallback simulated login if server endpoint unreachable (development only)
      if (import.meta.env.DEV && err.message === 'Failed to fetch' && email && password) {
        const dummyToken = `user_mock_${Date.now()}`;
        const dummyUser = {
          id: 'user_mock_123',
          name: email.split('@')[0].replace('.', ' '),
          email: email,
          createdAt: new Date().toISOString()
        };
        setToken(dummyToken);
        localStorage.setItem('mock_user', JSON.stringify(dummyUser));
        setUser(dummyUser);
        setLoading(false);
        return true;
      }
      setError(err.message === 'Failed to fetch' ? 'Unable to connect to authentication server.' : (err.message || 'Authentication failed'));
      setLoading(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetchWithAuth('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        setLoading(false);
        return true;
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.warn('Registration error:', err.message);
      if (import.meta.env.DEV && err.message === 'Failed to fetch' && name && email) {
        const dummyToken = `user_mock_${Date.now()}`;
        const dummyUser = {
          id: 'user_mock_123',
          name,
          email,
          createdAt: new Date().toISOString()
        };
        setToken(dummyToken);
        localStorage.setItem('mock_user', JSON.stringify(dummyUser));
        setUser(dummyUser);
        setLoading(false);
        return true;
      }
      setError(err.message === 'Failed to fetch' ? 'Unable to connect to authentication server.' : (err.message || 'Registration failed'));
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    backendUrl
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

