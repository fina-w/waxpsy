import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Troubles from "./components/Troubles";
import Temoignages from "./components/Temoignages";
import ProfessionalsList from "./components/ProfessionalsList";
import Articles from "./components/Articles";
import Histoire from "./components/Histoire";
import ShareExperience from "./components/ShareExperience";
import Homepage from "./components/Homepage";
import Glossaire from "./components/Glossaire";
import APropos from "./components/APropos";
import Contact from "./components/Contact";
import MentionsLegales from "./components/MentionsLegales";
import Confidentialite from "./components/Confidentialite";
import ConditionsUtilisation from "./components/ConditionsUtilisation";
import UrgenceSOS from "./components/Urgence-SOS";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<Register onClose={() => {}} onSwitchToLogin={() => {}} />} />
        <Route path="/login" element={<Login onClose={() => {}} onSwitchToRegister={() => {}} />} />
        <Route path="/professionals" element={<ProfessionalsList />} />
        <Route path="/share-experience" element={<ShareExperience />} />
        <Route path="/test" element={<h1>Test OK</h1>} />
        <Route path="/troubles" element={<Troubles />} />
        <Route path="/temoignages" element={<Temoignages />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/glossaire" element={<Glossaire />} />
        <Route path="/apropos" element={<APropos />} />
        <Route path="/articles/:id" element={<Articles />} />
        <Route path="/histoires/:id" element={<Histoire />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
        <Route path="/urgences" element={<UrgenceSOS />} />
      </Routes>
    </Router>
  );
}

export default App;
