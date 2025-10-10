import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC<{ setIsAuthenticated: (value: boolean) => void }> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <div className="min-h-screen bg-green-100 font-sans">
      <div className="flex items-center justify-center py-20">
        <div className="bg-white m-10 rounded-lg p-8 shadow-md text-center">
          <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
          <p>Welcome to your dashboard!</p>
          <button
            onClick={() => navigate('/professionals')}
            className="mt-4 bg-blue-800 text-white py-2 px-4 rounded-full hover:bg-blue-900 transition-colors"
          >
            View Professionals
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              setIsAuthenticated(false);
              navigate('/');
            }}
            className="mt-4 bg-red-800 text-white py-2 px-4 rounded-full hover:bg-red-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
