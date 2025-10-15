

// =================================================================
// Header.tsx - Version mise à jour sans Framer Motion
// =================================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { AuthModal } from "./AuthModal";

interface HeaderProps {
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath: propCurrentPath }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [attemptedRoute, setAttemptedRoute] = useState("");

  const navItems = [
    { href: "/home", label: "Accueil", protected: false },
    { href: "/troubles", label: "Troubles", protected: true },
    { href: "/temoignages", label: "Témoignages", protected: true },
    { href: "/professionals", label: "Professionnels", protected: true },
    { href: "/glossaire", label: "Glossaire", protected: false },
    { href: "/urgences", label: "Urgences ?", protected: true },
    { href: "/apropos", label: "A propos", protected: false },
    { href: "/contact", label: "Contact", protected: false },
    { href: "/profil", label: "Profil", protected: false }
  ];

  const currentPath = propCurrentPath || window.location.pathname;
  const isHomePage = ["/home", "/contact"].includes(currentPath);
  const textColor = isHomePage ? "text-white" : "text-black";

  const handleClick = (item: typeof navItems[0]) => {
    if (item.protected && !isAuthenticated) {
      setAttemptedRoute(item.label);
      setShowAuthModal(true);
    } else {
      navigate(item.href);
    }
  };

  const handleLogin = () => {
    setShowAuthModal(false);
    navigate("/login");
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img
            src={isHomePage ? "/white-logo.png" : "/black-logo.png"}
            alt="WaxPsy Logo"
            className="h-15 w-auto mr-4"
          />
        </div>

        <nav className="md:flex space-x-6 text-sm">
          {navItems.map((item) => {
            const isActive = item.href === currentPath;
            return (
              <a
                key={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item);
                }}
                className={`${textColor} relative py-1 cursor-pointer transition-all hover:scale-105 ${
                  isActive ? "font-bold underline" : ""
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </header>

      {/* Modal d'authentification */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        attemptedRoute={attemptedRoute}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Header;