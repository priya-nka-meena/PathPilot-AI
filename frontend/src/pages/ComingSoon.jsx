import React from 'react';

export default function ComingSoon({ title = 'Coming Soon' }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">This section is coming soon. Stay tuned for updates.</p>
      </div>
    </div>
  );
}
