import React, { useState, useEffect} from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore'; 
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if(currentUser) {
        setUser(currentUser);

        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if(userDoc.exists()) {
          setUsername(userDoc.data().name || "User"); 
        }
      } else {
        setUser(null);
        setUsername("");
      }
    });

    return () => unsubscribe();
  }, []);

  const loggedOutLinks = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ];

  const loggedInLinks = [
    { name: "AI Symptom Checker", href: "/symptom-checker" },
    { name: "Seasonal Prediction", href: "/seasonal-prediction" },
    { name: "Blood Donation", href: "/blood-donation" },
    { name: "About Us", href: "/about" },
  ];

  const navLinks = user ? loggedInLinks : loggedOutLinks;
  return (
    <nav className="relative flex justify-between items-center px-8 py-4
    bg-gradient-to-r from-red-50/95 via-rose-50/95 to-red-50/95 font-primary
    dark:from-gray-900/95 dark:via-red-950/95 dark:to-gray-900/95
    backdrop-blur-xl shadow-lg sticky top-0 z-50 
    transition-all duration-500 border-b border-red-200/30 dark:border-red-800/30">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-rose-500/5 to-red-600/5 
         dark:from-red-400/5 dark:via-rose-400/5 dark:to-red-500/5 
         animate-pulse opacity-70" />

      {/* Logo */}
      <div className="relative z-10">
        <Link to="/">
          <h1 className="text-3xl font-bold font-heading">AnemoScan</h1>
        </Link>
        
      </div>

      {/* Navigation Links */}
      <ul className="relative z-10 flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = window.location.pathname === link.href;
          return (
            <li key={link.name} className="relative">
              <a
                href={link.href}
                className={`group relative px-3 py-1 font-medium overflow-hidden 
                  ${isActive ? "text-white" : "text-gray-700 dark:text-gray-200"}`}
              >
                <span className="relative z-10">{link.name}</span>
                <span
                  className={`absolute left-0 bottom-0 w-full bg-red-600 rounded-md transition-all duration-500 ease-in-out
                    ${isActive ? "h-full" : "h-0 group-hover:h-full"}`}
                  style={{ zIndex: 0 }}
                />
              </a>
            </li>
          );
        })}
      </ul>

      {/* Right side buttons */}
      <div className="relative z-10 flex items-center gap-5">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="bg-red-200 rounded-full border border-red-700 p-2"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-red-800" /> : <Moon className="w-5 h-5 text-red-800" />}
        </button>

        {/* Login / Logout */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white text-2xl">
              <Link to="/dashboard">
                {username?.charAt(0).toUpperCase() || "U"}
              </Link>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="bg-red-400 py-2 rounded-full cursor-pointer px-3 text-white font-medium tracking-wide"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="bg-red-400 py-2 rounded-full cursor-pointer px-3 text-white font-medium tracking-wide"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}