import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Register";
import Home from "./components/Homepage";
import Troubles from "./components/Troubles";
import Temoignages from "./components/Temoignages";
import ProfessionalsList from "./components/ProfessionalsList";
import Articles from "./components/Articles";
import ShareExperience from "./components/ShareExperience";

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
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/troubles" element={<Troubles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/temoignages" element={<Temoignages />} />
        <Route path="/professionals" element={<ProfessionalsList />} />
        <Route path="/share-experience" element={<ShareExperience />} />
        <Route path="/test" element={<h1>Test OK</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
