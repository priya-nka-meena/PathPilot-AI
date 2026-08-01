import React from 'react';
import DashboardLayout from './DashboardLayout';
import ChatPage from '../ChatUI';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ChatPage />
    </DashboardLayout>
  );
}
