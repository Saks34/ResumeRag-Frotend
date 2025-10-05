import React, { useEffect, useState } from 'react';
import { apiFetch, API_BASE, currentUser } from '../api';

export default function Candidate({ id }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
      <div className="max-w-6xl mx-auto px-6 py-12">
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
      <div className="max-w-6xl mx-auto px-6 py-12">
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
      <div className="max-w-6xl mx-auto px-6 py-12">
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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <a href="#/search" className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium mb-4">
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
                {(data.pii?.name || data.filename)?.charAt(0).toUpperCase() || 'C'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{data.pii?.name || data.filename}</h1>
              <p className="text-teal-100">Candidate Profile</p>
              {data.filename && data.pii?.name && (
                <p className="text-white/80 text-sm">{data.filename}</p>
              )}
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="bg-gray-100 rounded-lg p-1 inline-flex gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'overview' ? 'bg-white text-teal-700 shadow' : 'text-gray-700 hover:bg-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'resume' ? 'bg-white text-teal-700 shadow' : 'text-gray-700 hover:bg-white'
              }`}
            >
              Full Resume
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' ? (
          <div className="px-8 py-6">
            <div className="grid lg:grid-cols-3 gap-6 justify-items-center">
              {/* Left: Contact + Skills + Preview */}
              <div className="space-y-6 w-full max-w-xl">
                {data.pii && (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 px-5 py-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-white font-semibold">Contact Information</h3>
                    </div>
                    <div className="p-5 space-y-3 text-sm">
                      {data.pii.name && <div><span className="font-medium text-gray-900">Name:</span> {data.pii.name}</div>}
                      {data.pii.email && (
                        <div>
                          <span className="font-medium text-gray-900">Email: </span>
                          <a className="text-teal-700 hover:underline" href={`mailto:${data.pii.email}`}>{data.pii.email}</a>
                        </div>
                      )}
                      {data.pii.phone && <div><span className="font-medium text-gray-900">Phone:</span> {data.pii.phone}</div>}
                      {!data.pii.email && !data.pii.phone && !data.pii.name && (
                        <p className="text-gray-500">No contact details available</p>
                      )}
                    </div>
                  </div>
                )}

                {data.skills && data.skills.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <h3 className="text-white font-semibold">Skills & Expertise</h3>
                    </div>
                    <div className="p-5 flex flex-wrap gap-2 justify-center">
                      {data.skills.map((skill, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-800 border border-purple-200">
                          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resume Preview (first lines) */}
                {data.text && (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-blue-600 px-5 py-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-white font-semibold">Resume Preview</h3>
                    </div>
                    <div className="p-5">
                      <div className="bg-gray-50 rounded-md p-4 border border-gray-200 max-h-72 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                          {data.text.split('\n').slice(0, 15).join('\n')}
                          {data.text.split('\n').length > 15 && '\n\n...(view full resume in "Full Resume" tab)'}
                        </pre>
                      </div>
                      <div className="mt-3 text-right">
                        <button onClick={() => setActiveTab('resume')} className="text-blue-600 hover:text-blue-700 font-semibold">View Full Resume →</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Education + Projects */}
              <div className="lg:col-span-2 space-y-6 w-full max-w-3xl mx-auto">
                {data.education && data.education.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-amber-600 px-5 py-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <h3 className="text-white font-semibold">Education</h3>
                    </div>
                    <div className="p-5 space-y-4">
                      {data.education.map((edu, idx) => (
                        <div key={idx} className="border-l-4 border-amber-500 pl-4">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h4 className="text-gray-900 font-semibold">{edu.degree}</h4>
                            {edu.gpa && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">GPA: {edu.gpa}</span>}
                          </div>
                          <p className="text-gray-700">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.projects && data.projects.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-emerald-600 px-5 py-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <h3 className="text-white font-semibold">Projects</h3>
                    </div>
                    <div className="p-5 space-y-4">
                      {data.projects.map((project, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="text-gray-900 font-semibold">{project.title}</h4>
                            {project.link && (
                              <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline flex-shrink-0">Open ↗</a>
                            )}
                          </div>
                          <p className="text-gray-700 mb-3">{project.description}</p>
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, tIdx) => (
                                <span key={tIdx} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md text-xs font-semibold border border-emerald-200">{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="px-8 py-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Complete Resume Content</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">{data.text}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
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
          className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg disabled:opacity-60"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {data?.pii?.email ? 'Email Candidate' : data?.pii?.phone ? (copied ? 'Phone Copied!' : 'Copy Phone') : 'Contact Unavailable'}
          </span>
        </button>
        {currentUser()?.role === 'recruiter' ? (
          <button
            onClick={() => {
              // Navigate to server endpoint that 302-redirects to Cloudinary when available
              const url = `${API_BASE}/api/resumes/${id}/download`;
              window.open(url, '_blank', 'noopener');
            }}
            className="w-full sm:flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </span>
          </button>
        ) : (
          <div className="w-full sm:flex-1 bg-gray-100 border-2 border-dashed border-gray-300 text-gray-500 px-6 py-3 rounded-lg text-center flex items-center justify-center">
            Recruiter access required to download
          </div>
        )}
      </div>
    </div>
  );
}