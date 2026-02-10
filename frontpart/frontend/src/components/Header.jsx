import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SignLanguageAI
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-8 text-gray-600 font-medium">
            {["/", "/features", "/sign"].map((path) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`relative px-2 py-1 transition-colors hover:text-blue-600 ${isActive(path) ? "text-blue-600 font-semibold" : ""
                    }`}
                >
                  {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                  {isActive(path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-fade-in" />
                  )}
                </Link>
              </li>
            ))}
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
