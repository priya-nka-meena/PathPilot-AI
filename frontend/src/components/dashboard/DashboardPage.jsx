import React from 'react';
import DashboardLayout from './DashboardLayout';
import WelcomeCard from './WelcomeCard';
import ProfileCompletion from './ProfileCompletion';
import QuickStats from './QuickStats';
import JobCard from './JobCard';
import RecentActivity from './RecentActivity';
import AITipCard from './AITipCard';

export default function DashboardPage() {
  const jobs = [
    { company: 'Acme Corp', role: 'Senior Backend Engineer', location: 'Remote', match: 92 },
    { company: 'Globex', role: 'Platform Engineer', location: 'San Francisco, CA', match: 85 },
    { company: 'Initech', role: 'Backend SDE', location: 'New York, NY', match: 78 },
    { company: 'Umbrella', role: 'Distributed Systems Engineer', location: 'Remote', match: 74 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WelcomeCard />
          </div>
          <div className="space-y-4">
            <ProfileCompletion />
            <AITipCard />
          </div>
        </div>

        <div>
          <QuickStats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recommended Jobs</h3>
              <div className="text-sm text-gray-500">Showing jobs matched to your profile</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((j) => (
                <JobCard key={j.role} company={j.company} role={j.role} location={j.location} match={j.match} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <RecentActivity />
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Learning Roadmap</h3>
              <p className="text-xs text-gray-500 mt-2">Continue with the next module: System Design Basics</p>
              <div className="mt-3">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-2 bg-indigo-600 w-2/5" />
                </div>
                <div className="text-xs text-gray-400 mt-2">40% complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
