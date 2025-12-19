import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-base-100)] font-sans">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-theme border-b border-[var(--color-base-300)]/20 shadow-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="group flex items-center space-x-3 text-lg sm:text-xl font-bold text-theme-gradient hover:scale-105 transition-transform duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary-content)] shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-sm sm:text-lg font-bold">A</span>
                </div>
                <span className="hidden xs:inline">Anikii</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-xl text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300 font-medium hover:scale-105 active:scale-95"
              >
                Home
              </Link>
              <Link 
                to="/browse" 
                className="px-4 py-2 rounded-xl text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300 font-medium hover:scale-105 active:scale-95"
              >
                Browse
              </Link>
              <Link 
                to="/search" 
                className="px-4 py-2 rounded-xl text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300 font-medium hover:scale-105 active:scale-95"
              >
                Search
              </Link>
              <Link 
                to="/fyp" 
                className="px-4 py-2 rounded-xl text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300 font-medium hover:scale-105 active:scale-95"
              >
                For You
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-xl text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 mobile-backdrop-blur" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="fixed inset-0 mobile-transform mobile-scale-95 mobile-transition-all">
              <div className="relative mt-16 mx-4">
                <div 
                  className="rounded-2xl shadow-2xl mobile-backdrop-blur border"
                  style={{ 
                    backgroundColor: 'var(--color-base-100)',
                    borderColor: 'var(--color-base-300)'
                  }}
                >
                  <div className="p-6 space-y-3">
                    <Link 
                      to="/" 
                      onClick={closeMobileMenu}
                      className="mobile-nav-item text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300 font-medium"
                    >
                      🏠 Home
                    </Link>
                    <Link 
                      to="/browse" 
                      onClick={closeMobileMenu}
                      className="mobile-nav-item text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300 font-medium"
                    >
                      📺 Browse Anime
                    </Link>
                    <Link 
                      to="/search" 
                      onClick={closeMobileMenu}
                      className="mobile-nav-item text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300 font-medium"
                    >
                      🔍 Search
                    </Link>
                    <Link 
                      to="/fyp" 
                      onClick={closeMobileMenu}
                      className="mobile-nav-item text-[var(--color-base-content)] hover:bg-[var(--color-base-200)]/50 transition-all duration-300 font-medium"
                    >
                      ❤️ For You
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative">
        <div className="absolute inset-0 bg-[var(--color-primary)]/5 pointer-events-none" />
        <div className="relative container mx-auto px-4 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-12 sm:mt-20 bg-[var(--color-neutral)] text-[var(--color-neutral-content)]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative container mx-auto px-4 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary-content)] shadow-lg">
                  <span className="text-sm sm:text-lg font-bold">A</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Anikii</h3>
              </div>
              <p className="text-[var(--color-neutral-content)]/80 max-w-md leading-relaxed text-sm sm:text-base">
                Your ultimate anime discovery and streaming platform. Dive into thousands of anime series and movies with an elegant, modern interface designed for the perfect viewing experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-neutral-content)]/10 hover:bg-[var(--color-neutral-content)]/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-neutral-content)]/10 hover:bg-[var(--color-neutral-content)]/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-[var(--color-neutral-content)]/70 hover:text-[var(--color-neutral-content)] transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="text-[var(--color-neutral-content)]/70 hover:text-[var(--color-neutral-content)] transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base">
                    Browse Anime
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="text-[var(--color-neutral-content)]/70 hover:text-[var(--color-neutral-content)] transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base">
                    Search
                  </Link>
                </li>
                <li>
                  <Link to="/fyp" className="text-[var(--color-neutral-content)]/70 hover:text-[var(--color-neutral-content)] transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base">
                    For You Page
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[var(--color-neutral-content)]/70 hover:text-[var(--color-neutral-content)] transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[var(--color-neutral-content)]/70 hover:text-[var(--color-neutral-content)] transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[var(--color-neutral-content)]/70 hover:text-[var(--color-neutral-content)] transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[var(--color-neutral-content)]/70 hover:text-[var(--color-neutral-content)] transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[var(--color-neutral-content)]/10 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-[var(--color-neutral-content)]/60 text-xs sm:text-sm text-center sm:text-left">
                © 2025 Anikii. All rights reserved. Built with React Router v7, TypeScript, and Tailwind CSS.
              </p>
              <div className="flex items-center space-x-6 text-xs sm:text-sm text-[var(--color-neutral-content)]/60">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-success)' }}></div>
                  <span className="hidden sm:inline">All systems operational</span>
                  <span className="sm:hidden">Online</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}