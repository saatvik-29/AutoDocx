'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/superbase/serve';
import Sidebar from '../../component/Sidebar';

interface User {
  id: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch session on mount
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Redirect to login page if not authenticated
        router.push('/login');
      } else {
        setUser(session.user as User);
      }
    };

    fetchSession();
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
          <p className="mb-6">
            Welcome, <span className="font-medium text-indigo-600">{user.email}</span>!
          </p>
          <p className="text-gray-600">
            This is your AutoDocx dashboard where you can manage your document generation, view recent activity,
            and customize your workflow. Use the sidebar to navigate through Documents, Templates, Settings, and more.
          </p>
          {/* Additional dashboard content can be added here */}
        </div>
      </div>
    </div>
  );
}
