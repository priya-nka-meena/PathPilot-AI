import React from 'react';

const stats = [
  { label: 'Recommended Jobs', value: 24 },
  { label: 'Skills', value: 12 },
  { label: 'Roadmap Progress', value: '58%' },
  { label: 'Resume Score', value: '78' },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">{s.label}</div>
              <div className="text-xl font-semibold text-gray-900 mt-1">{s.value}</div>
            </div>
            <div className="h-10 w-10 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
