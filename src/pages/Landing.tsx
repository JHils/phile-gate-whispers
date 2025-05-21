import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { BookCode } from '@/utils/jonahAdvancedBehavior/types';

const Landing: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [bookCodes, setBookCodes] = useState<BookCode[]>([]);

  useEffect(() => {
    // Load book codes from localStorage
    const storedCodes = localStorage.getItem('bookCodes');
    if (storedCodes) {
      setBookCodes(JSON.parse(storedCodes));
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const someFunction = (input: string) => {
    console.log("Function called with:", input);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Landing Page</h1>
      {isLoggedIn ? (
        <>
          <p className="text-lg mb-4">You are logged in!</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Logout
          </button>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Unlocked Book Codes:</h2>
            {bookCodes.length > 0 ? (
              <ul>
                {bookCodes.map((code) => (
                  <li key={code.code} className="mb-1">
                    {code.name}: {code.code}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No book codes unlocked yet.</p>
            )}
          </div>

          <button
            onClick={() => router.push('/TalkToJonah')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Talk to Jonah
          </button>
        </>
      ) : (
        <>
          <p className="text-lg mb-4">You are not logged in.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </>
      )}
      {someFunction("true")}
    </div>
  );
};

export default Landing;
