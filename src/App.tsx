import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Homepage from "./components/Homepage.tsx";
import ProfessionalsList from "./components/ProfessionalsList";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('user'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('user'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/Homepage" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/Homepage" /> : <Register />} />
        <Route path="/home" element={<Homepage/>} />
        <Route path="/professionals" element={<ProfessionalsList />} />
      </Routes>
    </Router>
  );
}

export default App;
