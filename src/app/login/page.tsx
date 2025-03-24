'use client';

import { useState } from 'react';
import { supabase } from '../../utils/superbase/serve';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGithubLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // Optional: redirect URL after successful login
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      console.error('Error during GitHub login:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-sm w-full animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to your account and start generating documents automatically.
        </p>
        <button
          onClick={handleGithubLogin}
          className={`w-full py-3 rounded-full font-semibold transition-colors duration-300 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
          } text-white`}
          disabled={loading}
        >
          {loading ? 'Redirecting...' : 'Sign in with GitHub'}
        </button>
      </div>
    </div>
  );
}
