import React, { useState } from 'react';
import { login } from '../api';

export default function Login() {
  const [email, setEmail] = useState('recruiter@example.com');
  const [password, setPassword] = useState('Password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(email, password);
      window.location.hash = '#/';
      window.location.reload();
    } catch (e) { setError(e?.message || 'Login failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-2">Welcome back</h1>
      <p className="text-gray-600 mb-4">Login to manage resumes and jobs.</p>
      <form onSubmit={submit} className="space-y-3 bg-white p-5 rounded-xl shadow border">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-slate-200" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-slate-200" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button disabled={loading} className="w-full bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 disabled:opacity-60">{loading?'Logging in...':'Login'}</button>
        {error && <p className="text-red-600 text-sm whitespace-pre-wrap break-words">{error}</p>}
        <p className="text-xs text-gray-500">New here? <a href="#/register" className="text-indigo-600">Create an account</a></p>
      </form>
    </div>
  );
}
