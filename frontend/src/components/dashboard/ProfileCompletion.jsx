import React from 'react';

export default function ProfileCompletion({ percent = 72, missing = ['Resume', 'Experience', 'Career Preferences'] }) {
  const stroke = 12;
  const radius = 48 - stroke / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        <svg width="120" height="120" viewBox="0 0 120 120" className="flex-shrink-0">
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <g transform="translate(60,60)">
            <circle r={radius} stroke="#F3F4F6" strokeWidth={stroke} fill="none" />
            <circle r={radius} stroke="url(#g1)" strokeWidth={stroke} strokeLinecap="round" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90)" />
            <text x="0" y="4" textAnchor="middle" className="text-gray-900" style={{fontSize: '20px', fontWeight: 600}}>{percent}%</text>
          </g>
        </svg>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
          <p className="text-sm text-gray-500 mt-1">Complete the items below to improve job matches and recommendations.</p>

          <ul className="mt-3 text-sm text-gray-600 space-y-1">
            {missing.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <span className="h-2 w-2 bg-red-400 rounded-full" /> {m}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <button className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm">Complete Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
