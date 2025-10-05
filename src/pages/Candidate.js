import React, { useEffect, useState } from 'react';
import { apiFetch, API_BASE, getToken } from '../api';

export default function Candidate({ id }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true); 
      setError('');
      try {
        const res = await apiFetch(`/api/resumes/${id}`);
        setData(res);
      } catch (e) { 
        setError(e.message); 
      } finally { 
        setLoading(false); 
      }
    };
    if (id) load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="animate-spin h-12 w-12 text-teal-600 mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600 text-lg">Loading candidate profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-1">Error Loading Candidate</h3>
            <p className="text-red-700">{error}</p>
            <a href="#/search" className="inline-block mt-4 text-red-600 hover:text-red-800 font-medium">
              ← Back to Search
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600 mb-6">Could not find candidate information</p>
          <a href="#/search" className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Back to Search
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <a href="#/search" className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-4">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </a>
      </div>

      {/* Candidate Info Card */
      }
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-teal-600">
                {data.filename?.charAt(0).toUpperCase() || 'C'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{data.filename}</h1>
              <p className="text-teal-100">Candidate Profile</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Skills & Expertise</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800 border border-teal-200"
                >
                  <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Details (Recruiter only) */}
        {data.pii && (
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              {data.pii.name && (
                <div><span className="font-medium text-gray-900">Name:</span> {data.pii.name}</div>
              )}
              {data.pii.email && (
                <div><span className="font-medium text-gray-900">Email:</span> {data.pii.email}</div>
              )}
              {data.pii.phone && (
                <div><span className="font-medium text-gray-900">Phone:</span> {data.pii.phone}</div>
              )}
            </div>
            {!data.pii.email && !data.pii.phone && (
              <p className="text-sm text-gray-500 mt-2">No contact details extracted.</p>
            )}
          </div>
        )}

        {/* Resume Content */}
        <div className="px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Resume Content</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {data.text}
            </pre>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            if (data?.pii?.email) {
              window.location.href = `mailto:${data.pii.email}?subject=Regarding your profile: ${encodeURIComponent(data.filename || '')}`;
            } else if (data?.pii?.phone) {
              navigator.clipboard.writeText(String(data.pii.phone)).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }
          }}
          disabled={!data?.pii?.email && !data?.pii?.phone}
          className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg disabled:opacity-60"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {data?.pii?.email ? 'Email Candidate' : data?.pii?.phone ? (copied ? 'Phone Copied!' : 'Copy Phone') : 'Contact Unavailable'}
          </span>
        </button>
        <button
          onClick={async () => {
            try {
              const res = await fetch(`${API_BASE}/api/resumes/${id}/download`, {
                headers: {
                  Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
                },
              });
              if (!res.ok) {
                // fallback to text download if server not available
                throw new Error('download failed');
              }
              const blob = await res.blob();
              const dlUrl = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = dlUrl;
              const safe = (data?.filename || 'resume').replace(/[^a-z0-9_\-\.]/gi, '_');
              a.download = safe;
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(dlUrl);
            } catch (e) {
              const text = data?.text || '';
              const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${(data?.filename || 'resume').replace(/[^a-z0-9_\-\.]/gi, '_')}.txt`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(url);
            }
          }}
          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </span>
        </button>
      </div>
    </div>
  );
}