import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-green-100 font-sans items-center justify-center">
      <div className="bg-white m-10 rounded-lg p-8 shadow-md text-center">
        <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-800 text-white py-2 px-4 rounded-full hover:bg-red-900 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
