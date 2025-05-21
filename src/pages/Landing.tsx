
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookCode } from '@/utils/jonahAdvancedBehavior/types';

// Simple mock AuthContext for now
const useAuth = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.reload();
  };
  
  return { isLoggedIn, logout };
};

const Landing: React.FC = () => {
  const navigate = useNavigate();
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
    navigate('/login');
  };

  const someFunction = (input: string) => {
    console.log("Function called with:", input);
    return null; // Return null explicitly
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
            onClick={() => navigate('/TalkToJonah')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Talk to Jonah
          </button>
        </>
      ) : (
        <>
          <p className="text-lg mb-4">You are not logged in.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </>
      )}
      {/* We need to return null or a valid React node here, not void */}
      {someFunction("test") && <div>Function returned true</div>}
    </div>
  );
};

export default Landing;
