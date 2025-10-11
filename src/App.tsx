import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Homepage from "./components/Homepage.tsx";

import Register from "./components/Register";
import ProfessionalsList from "./components/ProfessionalsList";

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

        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/home" element={isAuthenticated ? <Homepage /> : <Navigate to="/" />} />
        
        {/* Cette route doit toujours être accessible */}
        <Route path="/professionals" element={<ProfessionalsList />} />
        
        {/* Page de test en cas de besoin */}
        <Route path="/test" element={<h1>Test OK</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
