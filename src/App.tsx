import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";

import Register from "./components/Register";
import Troubles from "./components/Troubles";
import Temoignages from "./components/Temoignages";
import ProfessionalsList from "./components/ProfessionalsList";
import Articles from "./components/Articles";
import ShareExperience from "./components/ShareExperience";
import Homepage from "./components/Homepage";
import Glossaire from "./components/Glossaire";
import APropos from "./components/APropos";

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

        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
        
        
        {/* Cette route doit toujours être accessible */}
        <Route path="/professionals" element={<ProfessionalsList />} />
        <Route path="/share-experience" element={<ShareExperience />} />
        <Route path="/test" element={<h1>Test OK</h1>} />
        <Route path="/troubles" element={<Troubles />} />
        <Route path="/temoignages" element={<Temoignages />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/glossaire" element={<Glossaire />} />
        <Route path="/apropos" element={<APropos />} />

        
      </Routes>
    </Router>
  );
}

export default App;
