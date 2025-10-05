import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function JobMatch({ jobId }) {
  const [job, setJob] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [topN, setTopN] = useState(5);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('');
      try {
        const res = await apiFetch(`/api/jobs/${jobId}/match?top_n=${topN}`);
        setJob(res.job);
        setMatches(res.matches || []);
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    };
    if (jobId) load();
  }, [jobId, topN]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <a href="#/jobs" className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-2">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Jobs
          </a>
          <h1 className="text-3xl font-bold text-gray-900">Job Matches</h1>
          {job && <p className="text-gray-600">{job.title}</p>}
        </div>
        <div className="flex items-end gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Top N</label>
            <input type="number" min={1} max={20} value={topN} onChange={(e)=>setTopN(Number(e.target.value))} className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none" />
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="animate-spin h-12 w-12 text-teal-600 mb-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          <p className="text-gray-600 text-lg">Loading matches...</p>
        </div>
      )}

      {!loading && matches.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches yet</h3>
          <p className="text-gray-600">Create a job and try again.</p>
        </div>
      )}

      <div className="space-y-4">
        {matches.map((m, idx) => (
          <div key={m.id} className="border border-gray-200 rounded-xl p-6 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">#{idx+1}</div>
                <div>
                  <a href={`#/candidates/${m.id}`} className="font-semibold text-gray-900 hover:text-teal-600">{m.filename}</a>
                  <div className="text-xs text-gray-500">Match Score: <span className="font-semibold text-teal-700">{m.score}</span></div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-xs font-medium text-gray-700 mb-1">Matched Skills</div>
              <div className="flex flex-wrap gap-2">
                {(m.matchedSkills||[]).length === 0 && <span className="text-xs text-gray-500">None</span>}
                {(m.matchedSkills||[]).map((s) => (
                  <span key={s} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{s}</span>
                ))}
              </div>
            </div>

            {m.missingSkills && m.missingSkills.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-700 mb-1">Missing Skills</div>
                <div className="flex flex-wrap gap-2">
                  {m.missingSkills.map((s) => (
                    <span key={s} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {m.highlightedSnippet && (
              <div className="bg-gray-50 rounded-lg p-3 border" dangerouslySetInnerHTML={{ __html: m.highlightedSnippet }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
