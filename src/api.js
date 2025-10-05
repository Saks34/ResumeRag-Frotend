export const API_BASE = process.env.REACT_APP_API_BASE || 'https://resumerag-server.onrender.com';
  
  export function getToken() {
    return localStorage.getItem('token') || '';
  }
  
  export async function apiFetch(path, opts = {}) {
    const headers = opts.headers || {};
    if (!headers['Content-Type'] && !(opts.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `HTTP ${res.status}`);
    }
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return res.json();
    return res.text();
  }
  
  export async function login(email, password) {
    const data = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user || null));
  }

  // Register a new user
  // params: { name, email, password, role }
  export async function register({ name, email, password, role = 'recruiter' }) {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role })
    });
    return data;
  }

  // User helpers
  export function currentUser() {
    try {
      const s = localStorage.getItem('user');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  }

  export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Role helpers
  export function isRecruiter() {
    try {
      const u = currentUser();
      return String(u?.role || '').toLowerCase() === 'recruiter';
    } catch { return false; }
  }

  export function isViewer() {
    try {
      const u = currentUser();
      const role = String(u?.role || '').toLowerCase();
      return !!role && role !== 'recruiter';
    } catch { return false; }
  }
