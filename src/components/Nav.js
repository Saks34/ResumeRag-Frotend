import React from 'react';
import { currentUser, logout } from '../api';

export default function Nav() {
  const user = currentUser();
  const onLogout = () => { logout(); window.location.reload(); };
  
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Resume<span className="text-teal-600">RAG</span></span>
            </a>
            <div className="hidden md:flex items-center gap-1">
              <a href="#/upload" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition-all font-medium">
                Upload
              </a>
              <a href="#/search" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition-all font-medium">
                Search
              </a>
              <a href="#/ask" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition-all font-medium">
                Ask
              </a>
              <a href="#/jobs" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition-all font-medium">
                Jobs
              </a>
              <a href="#/analytics" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-teal-600 transition-all font-medium">
                Analytics
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{user.email[0].toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-700">{user.email}</span>
                  <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">{user.role}</span>
                </div>
                <button onClick={onLogout} className="px-4 py-2 rounded-lg border-2 border-red-500 text-red-600 hover:bg-red-50 transition-colors font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="#/login" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium">
                  Login
                </a>
                <a href="#/register" className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 transition-all font-medium shadow-md hover:shadow-lg">
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}