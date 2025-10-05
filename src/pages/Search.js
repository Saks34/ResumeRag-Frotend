import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function Search() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async (off = 0) => {
    setLoading(true); 
    setError('');
    try {
      const data = await apiFetch(`/api/resumes?limit=${limit}&offset=${off}&q=${encodeURIComponent(q)}`);
      setItems(data.items); 
      setTotal(data.total); 
      setOffset(off);
    } catch (e) { 
      setError(e.message); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    load(0);
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    load(0);
  };

  const pages = Math.ceil(total / limit);
  const page = Math.floor(offset / limit) + 1;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Candidates</h1>
        <p className="text-gray-600">Find the perfect candidate using keywords, skills, or experience</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
              placeholder="Search by keywords, skills, or experience (e.g. React Node AWS)" 
              value={q} 
              onChange={(e)=>setQ(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Searching...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2 mb-6">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Results Header */}
      {!loading && items.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Found {total} {total === 1 ? 'candidate' : 'candidates'}
          </h2>
          <span className="text-sm text-gray-500">
            Showing {offset + 1}-{Math.min(offset + limit, total)} of {total}
          </span>
        </div>
      )}

      {/* Results Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="animate-spin h-12 w-12 text-teal-600 mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600 text-lg">Searching candidates...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600 mb-6">
            {q ? `No results matching "${q}". Try different keywords.` : 'Start searching to find candidates.'}
          </p>
          {q && (
            <button 
              onClick={() => { setQ(''); load(0); }}
              className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((it, idx) => (
            <a 
              key={it.id} 
              href={`#/candidates/${it.id}`} 
              className="block border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg hover:border-teal-300 transition-all group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {it.filename?.charAt(0).toUpperCase() || 'C'}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {it.filename}
                    </h3>
                    <div className="text-sm text-gray-500 ml-4">
                      Result #{offset + idx + 1}
                    </div>
                  </div>

                  {/* Skills */}
                  {it.skills && it.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {it.skills.slice(0, 6).map((skill, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                        >
                          {skill}
                        </span>
                      ))}
                      {it.skills.length > 6 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          +{it.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Preview Text */}
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {(it.text || 'No preview available').slice(0, 240)}
                    {it.text && it.text.length > 240 ? '...' : ''}
                  </p>

                  {/* View Profile Link */}
                  <div className="mt-3 flex items-center text-sm text-teal-600 group-hover:text-teal-700 font-medium">
                    View full profile
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && items.length > 0 && (
        <div className="mt-8 flex items-center justify-between bg-white rounded-xl shadow-md p-4">
          <button 
            disabled={page <= 1} 
            onClick={() => load(offset - limit)} 
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Page <span className="font-semibold text-gray-900">{page}</span> of <span className="font-semibold text-gray-900">{pages || 1}</span>
            </span>
            <span className="hidden sm:block text-sm text-gray-400">•</span>
            <span className="hidden sm:block text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{total}</span> total results
            </span>
          </div>
          
          <button 
            disabled={page >= pages} 
            onClick={() => load(offset + limit)} 
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium"
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}