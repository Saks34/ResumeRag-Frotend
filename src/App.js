import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Upload from './pages/Upload';
import Search from './pages/Search';
import Jobs from './pages/Jobs';
import Candidate from './pages/Candidate';
import Login from './pages/Login';
import Register from './pages/Register';
import Ask from './pages/Ask';
import JobMatch from './pages/JobMatch';
import Analytics from './pages/Analytics';

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return hash;
}

function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">ResumeRAG</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload resumes, search candidates, and match jobs with AI-powered intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <a href="#/upload" className="group block">
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:border-teal-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Upload Resumes</h2>
            </div>
            <p className="text-gray-600">
              Upload and process candidate resumes to build your talent database with AI-powered parsing.
            </p>
          </div>
        </a>

        <a href="#/search" className="group block">
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:border-indigo-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Search Candidates</h2>
            </div>
            <p className="text-gray-600">
              Find the perfect candidates using natural language queries and advanced filtering options.
            </p>
          </div>
        </a>

        <a href="#/ask" className="group block">
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:border-amber-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 20l.8-4A8.994 8.994 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Ask</h2>
            </div>
            <p className="text-gray-600">
              Ask natural language questions to retrieve evidence from your resume database.
            </p>
          </div>
        </a>

        <a href="#/jobs" className="group block">
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Job Matching</h2>
            </div>
            <p className="text-gray-600">
              Match job descriptions with the best candidates using AI-powered recommendation algorithms.
            </p>
          </div>
        </a>

        
      </div>

      <div className="mt-16 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">Why Choose ResumeRAG?</h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Leverage cutting-edge AI technology to streamline your hiring process. Our platform combines natural language processing with retrieval-augmented generation to deliver intelligent candidate matching and insights.
        </p>
      </div>
    </div>
  );
}

function Router() {
  const hash = useHashRoute();
  const path = hash.replace(/^#/, '') || '/';
  
  if (path.startsWith('/upload')) return <Upload />;
  if (path.startsWith('/search')) return <Search />;
  // Specific job match route before generic /jobs
  if (path.startsWith('/jobs/') && path.endsWith('/match')) {
    const id = path.split('/')[2];
    return <JobMatch jobId={id} />;
  }
  if (path.startsWith('/jobs')) return <Jobs />;
  if (path.startsWith('/ask')) return <Ask />;
  if (path.startsWith('/login')) return <Login />;
  if (path.startsWith('/register')) return <Register />;
  if (path.startsWith('/analytics')) return <Analytics />;
  if (path.startsWith('/candidates/')) {
    const id = path.split('/')[2];
    return <Candidate id={id} />;
  }
  
  return <HomePage />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Nav />
      <Router />
    </div>
  );
}