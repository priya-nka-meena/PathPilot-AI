import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'AI Career Chat', to: '/dashboard/ai' },
  { label: 'Profile', to: '/profile' },
  { label: 'Jobs', to: '/dashboard/jobs' },
  { label: 'Recommendations', to: '/dashboard/recommendations' },
  { label: 'Skill Gap', to: '/dashboard/skill-gap' },
  { label: 'Learning Roadmap', to: '/dashboard/roadmap' },
  { label: 'Resume (Coming Soon)', to: '/dashboard/resume' },
  { label: 'Settings', to: '/dashboard/settings' },
];

export default function Sidebar({ active = 'Dashboard', onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 w-72 md:w-80 flex-shrink-0">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold">PP</div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">PathPilot-AI</h1>
                <p className="text-xs text-gray-500">Career Assistant</p>
              </div>
            </div>
            <button
              aria-label="Toggle sidebar"
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
          </div>

          <nav className="px-3 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.to || (item.to === '/dashboard' && pathname === '/dashboard');

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md mb-1 transition-colors duration-150 ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'} dark:text-gray-300 dark:hover:bg-gray-800`}
                >
                  <span className="h-6 w-6 flex items-center justify-center text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600">
                    {item.label.charAt(0)}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-5 py-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img src="https://via.placeholder.com/40" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Priyanka</div>
              <div className="text-xs text-gray-500">Aspiring Backend SDE</div>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
