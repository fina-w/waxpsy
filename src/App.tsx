import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Register";
import Home from "./components/Homepage";
import Troubles from "./components/Troubles";
import Temoignages from "./components/Temoignages";

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
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/homepage" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/troubles" element={<Troubles />} />
        <Route path="/temoignages" element={<Temoignages />} />
        <Route path="/test" element={<h1>Test OK</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
