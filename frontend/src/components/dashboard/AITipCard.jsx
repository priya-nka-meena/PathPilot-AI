import React from 'react';

export default function AITipCard({ tip = 'Based on your profile, learning Docker and System Design will significantly improve your chances for Backend SDE roles.' }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-white rounded-2xl p-5 border border-amber-100 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">AI Tip</div>
          <div className="text-xs text-gray-600 mt-1">{tip}</div>
        </div>
      </div>
    </div>
  );
}
