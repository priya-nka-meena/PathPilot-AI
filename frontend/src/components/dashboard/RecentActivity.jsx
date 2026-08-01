import React from 'react';

const items = [
  { time: '2 days ago', title: 'Uploaded Resume', desc: 'You uploaded a new resume (resume_v2.pdf) so recruiters can find you.' },
  { time: '5 days ago', title: 'Completed Profile', desc: 'Profile completion reached 72% — add experience to improve matches.' },
  { time: '1 week ago', title: 'Viewed Job', desc: 'Viewed Senior Backend Engineer at Acme.' },
  { time: '2 weeks ago', title: 'Asked AI Career Advisor', desc: 'Received tips on interview preparation and learning roadmap.' },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-medium">{idx + 1}</div>
            <div>
              <div className="text-sm font-medium text-gray-900">{it.title}</div>
              <div className="text-xs text-gray-500">{it.desc}</div>
              <div className="text-xs text-gray-400 mt-1">{it.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
