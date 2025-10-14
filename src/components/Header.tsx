// Header avec animations Framer Motion - Version simple et smooth
import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
    currentPath?: string;
}

export const Header: React.FC<HeaderProps> = () => {
    const navItems = [
        { href: "/home", label: "Accueil" },
        { href: "/troubles", label: "Troubles" },
        { href: "/temoignages", label: "Témoignages" },
        { href: "/professionals", label: "Professionnels" },
        { href: "/glossaire", label: "Glossaire" },
        { href: "/urgences", label: "Urgences ?" },
        { href: "/apropos", label: "A propos" },
        { href: "/contact", label: "Contact" },
        { href: "/profil", label: "Profil" }
    ];

    const currentPath = window.location.pathname;
    const isHomePage = ["/home", "/contact"].includes(currentPath);
    const textColor = isHomePage ? "text-white" : "text-black";

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
                            href={item.href} 
                            className={`${textColor} relative py-1 ${isActive ? "font-bold underline" : ''}`}
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