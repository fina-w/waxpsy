import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Import direct pour les pages critiques (auth + homepage)
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";

// Import direct pour les pages AVEC skeletons (pour éviter double loading)
import Troubles from "./components/Troubles";
import Temoignages from "./components/Temoignages";
import TemoignageDetail from "./components/TemoignageDetail";
import ProfessionalsList from "./components/ProfessionalsList";
import ProfessionnelDetail from "./components/ProfessionnelDetail";
import Articles from "./components/Articles";
import Histoire from "./components/Histoire";
import Glossaire from "./components/Glossaire";
import QuizPage from "./components/QuizPage";
import CalendrierEvenements from "./components/CalendrierEvenements";
import DashbordProfessionnal from "./components/dashbordprofessionnal";
import DahsbordAdmin from "./components/dahsbordAdmin";

// Lazy loading UNIQUEMENT pour les pages SANS skeletons (pages statiques)
const ShareExperience = lazy(() => import("./components/ShareExperience"));
const APropos = lazy(() => import("./components/APropos"));
const Contact = lazy(() => import("./components/Contact"));
const MentionsLegales = lazy(() => import("./components/MentionsLegales"));
const Confidentialite = lazy(() => import("./components/Confidentialite"));
const ConditionsUtilisation = lazy(() => import("./components/ConditionsUtilisation"));
const UrgenceSOS = lazy(() => import("./components/Urgence-SOS"));
const Profil = lazy(() => import("./components/Profil"));


// Composant de fallback pour le chargement - Simple et rapide
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-r from-white via-white to-blue-100 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">Chargement...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          
          {/* Pages sans Layout (auth + homepage avec header custom) */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          
          {/* Routes protégées avec Layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/professionals" element={<Layout><ProfessionalsList /></Layout>} />
            <Route path="/troubles" element={<Layout><Troubles /></Layout>} />
            <Route path="/troubles/:id" element={<Layout><Troubles /></Layout>} />
            <Route path="/temoignages" element={<Layout><Temoignages /></Layout>} />
            <Route path="/temoignages/:id" element={<Layout><TemoignageDetail /></Layout>} />
            <Route path="/histoires/:id" element={<Layout><Histoire /></Layout>} />
            <Route path="/urgences" element={<Layout><UrgenceSOS /></Layout>} />
            <Route path="/DashbordProfessionnal" element={<DashbordProfessionnal />} />
            <Route path="/admin" element={<Layout><DahsbordAdmin /></Layout>} />
          </Route>
          
          {/* Route de détail du professionnel (temporairement en dehors de la protection) */}
          <Route path="/professionals/:id" element={<Layout><ProfessionnelDetail /></Layout>} />
          
          {/* Routes publiques avec Layout */}
          <Route path="/share-experience" element={<Layout><ShareExperience /></Layout>} />
          <Route path="/articles" element={<Layout><Articles /></Layout>} />
          <Route path="/articles/:id" element={<Layout><Articles /></Layout>} />
          <Route path="/glossaire" element={<Layout><Glossaire /></Layout>} />
          <Route path="/apropos" element={<Layout><APropos /></Layout>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Layout><MentionsLegales /></Layout>} />
          <Route path="/confidentialite" element={<Layout><Confidentialite /></Layout>} />
          <Route path="/conditions-utilisation" element={<Layout><ConditionsUtilisation /></Layout>} />
          <Route path="/calendrier-evenements" element={<Layout><CalendrierEvenements /></Layout>} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/quizpage" element={<Layout><QuizPage /></Layout>} />

          
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
