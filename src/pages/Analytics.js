import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('');
      try {
        const res = await apiFetch('/api/resumes/analytics/basic');
        setData(res);
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Resume Analytics</h1>
        <p className="text-gray-600">Basic stats across uploaded resumes</p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}
      {loading && <div className="text-gray-600">Loading analytics...</div>}

      {data && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white border rounded-xl p-5">
              <div className="text-sm text-gray-500">Total Resumes</div>
              <div className="text-3xl font-bold text-teal-600">{data.totalResumes}</div>
            </div>
            <div className="bg-white border rounded-xl p-5 sm:col-span-2">
              <div className="text-sm text-gray-500 mb-2">Top 5 Skills</div>
              <div className="flex flex-wrap gap-2">
                {data.topSkills.map((s) => (
                  <span key={s.skill} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {s.skill}
                    <span className="ml-2 text-xs bg-white text-indigo-700 px-2 py-0.5 rounded-full border">{s.count}</span>
                  </span>
                ))}
                {data.topSkills.length === 0 && <span className="text-sm text-gray-500">No skills yet</span>}
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <div className="text-sm text-gray-500 mb-2">Uploads per Month</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2 pr-4">Month</th>
                    <th className="py-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {data.uploadsPerMonth.map((r) => (
                    <tr key={r.month} className="border-t">
                      <td className="py-2 pr-4">{r.month}</td>
                      <td className="py-2">{r.count}</td>
                    </tr>
                  ))}
                  {data.uploadsPerMonth.length === 0 && (
                    <tr><td className="py-3 text-gray-500" colSpan={2}>No data yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
