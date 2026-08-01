import React from 'react';

export default function JobCard({ company, role, location, match = 82 }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">{company.charAt(0)}</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{role}</div>
              <div className="text-xs text-gray-500">{company} • {location}</div>
            </div>
          </div>
          <div className="text-sm font-medium text-indigo-600">{match}% match</div>
        </div>

        <p className="mt-3 text-sm text-gray-600">Brief description of the role and why it might fit your profile. Placeholder content for UI.</p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button className="px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50">Save</button>
        <button className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">View</button>
      </div>
    </div>
  );
}
