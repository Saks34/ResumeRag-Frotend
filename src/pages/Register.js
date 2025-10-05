import React, { useState } from 'react';
import { register } from '../api';

export default function Register() {
  const [name, setName] = useState('Recruiter');
  const [email, setEmail] = useState('recruiter@example.com');
  const [password, setPassword] = useState('Password123');
  const [role, setRole] = useState('recruiter');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await register({ name, email, password, role });
      setSuccess('Account created. You can log in now.');
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 800);
    } catch (e) {
      setError(e.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-2">Create an account</h1>
      <p className="text-gray-600 mb-4">Register to start uploading resumes and matching jobs.</p>
      <form onSubmit={submit} className="space-y-3 bg-white p-5 rounded-xl shadow border">
        <div>
          <label className="block text-sm font-medium mb-1">Full name</label>
          <input className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-slate-200" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-slate-200" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-slate-200" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select className="border rounded px-3 py-2 w-full bg-white" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="recruiter">Recruiter</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <button disabled={loading} className="w-full bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 disabled:opacity-60">{loading? 'Creating account...' : 'Create account'}</button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-700 text-sm">{success}</p>}
        <p className="text-xs text-gray-500">Already have an account? <a href="#/login" className="text-indigo-600">Login</a></p>
      </form>
    </div>
  );
}
