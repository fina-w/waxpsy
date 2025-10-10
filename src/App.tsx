import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
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
        <Route path="/" element={isAuthenticated ? <Navigate to="/professionals" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/professionals" /> : <Register />} />


        {/* Cette route est protégée */}
        <Route path="/professionals" element={isAuthenticated ? <ProfessionalsList /> : <Navigate to="/" />} />
        
        {/* Page de test en cas de besoin */}
        <Route path="/test" element={<h1>Test OK</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
