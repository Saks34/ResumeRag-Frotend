import React, { useState } from 'react';
import { apiFetch } from '../api';

export default function Jobs() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('react,node,mongodb');
  const [job, setJob] = useState(null);
  const [matches, setMatches] = useState([]);
  const [topN, setTopN] = useState(5);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const create = async (e) => {
    e.preventDefault(); 
    setError(''); 
    setLoading(true);
    try {
      const body = { 
        title, 
        description, 
        skills: skills.split(',').map(s=>s.trim()).filter(Boolean) 
      };
      const res = await apiFetch('/api/jobs', { 
        method: 'POST', 
        body: JSON.stringify(body) 
      });
      setJob(res);
    } catch (e) { 
      setError(e.message); 
    } finally { 
      setLoading(false); 
    }
  };

  const match = async () => {
    if (!job?.id) return;
    setLoading(true); 
    setError('');
    try {
      const res = await apiFetch(`/api/jobs/${job.id}/match`, { 
        method: 'POST', 
        body: JSON.stringify({ top_n: topN }) 
      });
      setMatches(res.matches || []);
    } catch (e) { 
      setError(e.message); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Matching</h1>
        <p className="text-gray-600">Create a job posting and find the best matching candidates</p>
      </div>

      {/* Create Job Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Job</h2>
        <form onSubmit={create} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
              placeholder="e.g. Senior Full Stack Developer" 
              value={title} 
              onChange={e=>setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
              placeholder="Describe the role, responsibilities, and requirements..." 
              rows={5} 
              value={description} 
              onChange={e=>setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Skills
            </label>
            <input 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
              placeholder="Separate skills with commas (e.g. react, node, mongodb)" 
              value={skills} 
              onChange={e=>setSkills(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Current skills: {skills.split(',').map(s=>s.trim()).filter(Boolean).map(s => (
                <span key={s} className="inline-block bg-gray-100 rounded px-2 py-0.5 mr-1 mt-1">{s}</span>
              ))}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading} 
            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Job...
              </span>
            ) : 'Create Job & Find Matches'}
          </button>
        </form>
      </div>

      {/* Job Created Success & Matching Section */}
      {job?.id && (
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Job Created Successfully!</h3>
              <p className="text-sm text-green-700 mt-1">Now find the best matching candidates for this position.</p>
            </div>
          </div>

          {/* Match Controls */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Find Matching Candidates</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of candidates to show
                </label>
                <input 
                  type="number" 
                  min="1"
                  max="50"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none" 
                  value={topN} 
                  onChange={e=>setTopN(Number(e.target.value))} 
                />
              </div>
              <button 
                onClick={match} 
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-6"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Matching...
                  </span>
                ) : 'Find Matches'}
              </button>
            </div>
          </div>

          {/* Results */}
          {matches.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Top {matches.length} Matching Candidates
                </h2>
                <span className="text-sm text-gray-500">
                  Sorted by relevance score
                </span>
              </div>
              
              <div className="space-y-4">
                {matches.map((m, idx) => (
                  <a 
                    key={m.id} 
                    href={`#/candidates/${m.id}`} 
                    className="block border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-teal-300 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                          #{idx + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                            {m.filename}
                          </h3>
                          <p className="text-sm text-gray-500">Click to view full profile</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Match Score</div>
                          <div className="text-2xl font-bold text-teal-600">{m.score}</div>
                        </div>
                        <div className="w-16 h-16">
                          <svg className="transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#14b8a6"
                              strokeWidth="3"
                              strokeDasharray={`${m.score}, 100`}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Matched skills */}
                    {m.matchedSkills && m.matchedSkills.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-2">
                        {m.matchedSkills.map((s) => (
                          <span key={s} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{s}</span>
                        ))}
                      </div>
                    )}

                    {/* Highlighted snippet */}
                    {m.highlightedSnippet ? (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3 border" dangerouslySetInnerHTML={{ __html: m.highlightedSnippet }} />
                    ) : m.snippet ? (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-700 line-clamp-3">{m.snippet}</p>
                      </div>
                    ) : null}

                    {m.missingSkills?.length > 0 && (
                      <div className="flex items-start gap-2 text-xs">
                        <svg className="w-4 h-4 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-amber-700">
                          <span className="font-medium">Missing skills:</span> {m.missingSkills.map(skill => (
                            <span key={skill} className="inline-block bg-amber-100 rounded px-2 py-0.5 mr-1 ml-1">{skill}</span>
                          ))}
                        </span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
              {job?.id && (
                <div className="mt-4 text-right">
                  <a href={`#/jobs/${job.id}/match`} className="text-sm text-teal-700 hover:text-teal-800 font-medium">View detailed match view →</a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}