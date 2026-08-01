import React from 'react';

export default function TopNavbar({ greeting = 'Good Morning, Priyanka' }) {
  return (
    <header className="w-full border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
            <div className="w-full md:max-w-md">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input id="search" aria-label="Search" placeholder="Search" className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <button onClick={() => console.log('Notifications clicked')} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Notifications">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{greeting}</div>
                  <div className="text-xs text-gray-500">Welcome back — here’s your dashboard</div>
                </div>
                <button onClick={() => console.log('Profile clicked')} aria-label="Profile" className="rounded-full focus:outline-none">
                  <img className="h-9 w-9 rounded-full object-cover" src="https://via.placeholder.com/40" alt="avatar" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
