import React from 'react';
import { Link } from 'react-router-dom';
import { CodeIcon } from '@heroicons/react/outline';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <CodeIcon className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">GitTimeMachine</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <a 
              href="https://github.com/yourusername/gittimemachine" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;