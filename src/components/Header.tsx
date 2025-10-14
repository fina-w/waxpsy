// Header avec animations Framer Motion - Version simple et smooth
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface HeaderProps {
    currentPath?: string;
    onProtectedClick?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onProtectedClick }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

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

    const currentPath = window.location.pathname;
    const isHomePage = ["/home", "/contact"].includes(currentPath);
    const textColor = isHomePage ? "text-white" : "text-black";

    const handleClick = (item: typeof navItems[0]) => {
        if (item.protected && !isAuthenticated) {
            if (onProtectedClick) {
                onProtectedClick(item.href.slice(1)); // remove leading /
            }
        } else {
            navigate(item.href);
        }
    };

    return (
        <header className="p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center">
                <img
                    src={isHomePage ? "/white-logo.png" : "/black-logo.png"}
                    alt="WaxPsy Logo"
                    className="h-15 w-auto mr-4"
                />
            </div>

            <nav className=" md:flex space-x-6 text-sm">
                    {navItems.map((item) => {
                        const isActive = item.href === currentPath;
                        return (

                        <motion.a
                            key={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(item);
                            }}
                            className={`${textColor} relative py-1 cursor-pointer ${isActive ? "font-bold underline" : ''}`}
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.2 }}
                        >
                            {item.label}
                            <motion.div
                                className={`absolute left-0 right-0 bottom-0 h-0.5`}
                                initial={{ scaleX: isActive ? 1 : 0 }}
                                animate={{ scaleX: isActive ? 1 : 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                style={{ originX: 0 }}
                            />
                        </motion.a>
                        )
                    })}
            </nav>
        </header>
    );
}

export default Header;
