// Reusable API utility for making authenticated HTTP requests with JWT tokens

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('mock_user');
  localStorage.removeItem('local_user');
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getToken();
  const url = endpoint.startsWith('http') ? endpoint : `${BACKEND_URL}${endpoint}`;

  const headers = {
    ...options.headers,
  };

  // If request has a body and is not FormData, default to application/json
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // Attach JWT Bearer token if present
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle unauthorized responses (expired/invalid token)
  if (response.status === 401) {
    clearAuth();
    // Dispatch a custom event so AuthContext or app can react to session expiration
    window.dispatchEvent(new Event('auth:unauthorized'));
  }

  return response;
};

export default fetchWithAuth;
