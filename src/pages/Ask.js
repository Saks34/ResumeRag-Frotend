import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function Ask() {
  const [query, setQuery] = useState('');
  const [k, setK] = useState(5);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await apiFetch('/api/ask', {
        method: 'POST',
        body: JSON.stringify({ query, k })
      });
      setAnswers(res.answers || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await apiFetch('/api/ask/history');
        setHistory(res.items || []);
      } catch (e) {
        // ignore
      }
    };
    loadHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask Your Talent DB</h1>
        <p className="text-gray-600">Type a question to retrieve relevant snippets from uploaded resumes.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Query</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Who has GraphQL and AWS experience?"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Results</label>
              <input
                type="number"
                min="1"
                max="20"
                value={k}
                onChange={(e) => setK(Number(e.target.value))}
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
          )}
        </form>
      </div>

      <div className="space-y-4">
        {answers.length === 0 && !loading ? (
          <div className="text-gray-500 text-sm">No results yet. Try asking a question.</div>
        ) : (
          answers.map((a) => (
            <a key={a.id} href={`#/candidates/${a.id}`} className="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{a.filename}</h3>
                <span className="text-xs text-gray-500">View profile</span>
              </div>
              {a.evidence && (
                <p className="text-sm text-gray-700 line-clamp-3">{a.evidence}</p>
              )}
            </a>
          ))
        )}
      </div>

      {/* Recent Queries */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Queries</h2>
        <div className="bg-white rounded-xl shadow-md">
          <div className="divide-y">
            {history.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">No recent queries.</div>
            ) : (
              history.map((h) => (
                <div key={h.id} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-500">{new Date(h.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="font-medium text-gray-900 mb-2">{h.query}</div>
                  {(h.answers || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {h.answers.map((a, i) => (
                        <a key={i} href={`#/candidates/${a.id}`} className="text-xs text-teal-700 hover:text-teal-800 underline">
                          {a.filename || 'Result'}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
