import React, { useState } from 'react';
import { apiFetch } from '../api';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [idem, setIdem] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    
    if (!file) return setError('Please select a file to upload');
    
    const form = new FormData();
    form.append('file', file);
    setLoading(true);
    
    try {
      const headers = idem ? { 'Idempotency-Key': idem } : {};
      const data = await apiFetch('/api/resumes', { 
        method: 'POST', 
        body: form, 
        headers 
      });
      setResult(data);
      setFile(null);
      setIdem('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (filename) => {
    if (!filename) return null;
    const ext = filename.split('.').pop().toLowerCase();
    if (ext === 'pdf') {
      return (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    } else if (ext === 'docx' || ext === 'doc') {
      return (
        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    } else if (ext === 'zip') {
      return (
        <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload Resumes</h1>
        <p className="text-gray-600">Upload individual resumes or batch upload multiple files at once</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">PDF Files</h3>
          <p className="text-sm text-gray-600">Standard resume format</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Word Files</h3>
          <p className="text-sm text-gray-600">DOCX format supported</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Batch Upload</h3>
          <p className="text-sm text-gray-600">ZIP multiple resumes</p>
        </div>
      </div>

      {/* Upload Form */}
      <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Drag and Drop Area */}
        <div 
          className={`relative border-2 border-dashed rounded-t-xl p-12 text-center transition-all ${
            dragActive 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-300 bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.docx,.doc,.txt,.zip"
          />
          
          {file ? (
            <div className="flex flex-col items-center">
              {getFileIcon(file.name)}
              <p className="mt-3 text-lg font-semibold text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Remove file
              </button>
            </div>
          ) : (
            <div>
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-lg font-semibold text-teal-600 hover:text-teal-700">
                  Click to upload
                </span>
                <span className="text-gray-600"> or drag and drop</span>
              </label>
              <p className="text-sm text-gray-500 mt-2">
                PDF, DOCX, TXT up to 50MB or ZIP for batch upload
              </p>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Idempotency Key (Optional)
              <span className="ml-2 text-gray-500 font-normal">- Prevents duplicate uploads</span>
            </label>
            <input 
              value={idem} 
              onChange={(e) => setIdem(e.target.value)} 
              placeholder="Enter a unique identifier (e.g., UUID)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
            />
            <p className="text-xs text-gray-500 mt-1">
              Use the same key to prevent uploading the same resume multiple times
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading || !file} 
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading and Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Resume{file?.name.endsWith('.zip') ? 's' : ''}
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Success Result */}
      {result && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-1">Upload Successful!</h3>
              <p className="text-sm text-green-700">Your resume(s) have been processed and added to the database.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Response Details</h4>
              <button
                onClick={() => setResult(null)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Dismiss
              </button>
            </div>
            <pre className="text-xs text-gray-700 overflow-x-auto bg-gray-50 p-3 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
          <div className="mt-4 flex gap-3">
            <a 
              href="#/search" 
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Search Candidates
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Upload Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}