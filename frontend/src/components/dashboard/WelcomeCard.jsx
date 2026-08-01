import React from 'react';

export default function WelcomeCard() {
  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back!</h2>
          <p className="mt-2 text-sm text-gray-600">Continue building your Software Engineering career.</p>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Continue Learning</button>
            <button className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50">Explore Jobs</button>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <img src="https://via.placeholder.com/160x100" alt="illustration" className="rounded-lg shadow-sm" />
        </div>
      </div>
    </div>
  );
}
