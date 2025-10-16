import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface HeaderProps {
    currentPath?: string;
}

export const Header: React.FC<HeaderProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const isHomePage = ["/home", "/"].includes(currentPath);
    const textColor = isHomePage && !scrolled ? "text-white" : "text-gray-800";
    const bgColor = isHomePage && !scrolled ? "bg-transparent" : "bg-white shadow-md";

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${bgColor}`}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img 
                            src={isHomePage && !scrolled ? "/white-logo.png" : "/black-logo.png"} 
                            alt="WaxPsy Logo" 
                            className="h-12 w-auto" 
                        />
                    </div>
                    
                    {/* Menu Desktop */}
                    <nav className="hidden md:flex space-x-6 text-sm">
                        {navItems.map((item) => {
                            const isActive = item.href === currentPath;
                            return (
                                <motion.a 
                                    key={item.href}
                                    href={item.href} 
                                    className={`${textColor} relative py-2 px-1 ${isActive ? 'font-bold' : 'hover:opacity-80'}`}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div 
                                            className="absolute left-0 right-0 bottom-0 h-0.5 bg-current"
                                            layoutId="underline"
                                        />
                                    )}
                                </motion.a>
                            );
                        })}
                    </nav>

                    {/* Bouton Menu Mobile */}
                    <button 
                        className="md:hidden p-2 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? (
                            <X className={`h-6 w-6 ${textColor}`} />
                        ) : (
                            <Menu className={`h-6 w-6 ${textColor}`} />
                        )}
                    </button>
                </div>

                {/* Menu Mobile */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav 
                            className="md:hidden mt-4 pb-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col space-y-2">
                                {navItems.map((item) => {
                                    const isActive = item.href === currentPath;
                                    return (
                                        <motion.a
                                            key={item.href}
                                            href={item.href}
                                            className={`${textColor} py-2 px-4 rounded-lg ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {item.label}
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

export default Header;