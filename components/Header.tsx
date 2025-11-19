
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import AuthModal from './AuthModal';
import { AuthMode } from '../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold flex items-baseline">
                <span className="text-brand-red">Ziva</span>
                <span className="text-dark-gray font-semibold text-xl">.pdf</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <nav className="flex space-x-4">
                {/* Add nav links if needed */}
              </nav>
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 text-sm">{currentUser.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 hover:text-brand-red"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-4 py-2 text-sm font-medium text-brand-red bg-brand-red/10 rounded-md hover:bg-brand-red/20"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-red rounded-md hover:bg-opacity-90"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {currentUser ? (
                 <div className="px-2 py-2">
                  <p className="text-gray-600 text-sm mb-2">{currentUser.email}</p>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-red hover:bg-gray-50"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => { openAuthModal('login'); setIsMenuOpen(false); }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-brand-red hover:text-opacity-80 hover:bg-gray-50"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => { openAuthModal('signup'); setIsMenuOpen(false); }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-brand-red hover:bg-opacity-90"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      {isAuthModalOpen && <AuthModal mode={authMode} onClose={() => setIsAuthModalOpen(false)} />}
    </>
  );
};

export default Header;
