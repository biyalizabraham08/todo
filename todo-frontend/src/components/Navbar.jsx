import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiSun, FiMoon, FiLogOut, FiCheckSquare } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/25">
              <FiCheckSquare className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-green-500 bg-clip-text text-transparent dark:from-brand-500 dark:to-green-400">
              TaskFlow
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
            </button>

            {user && (
              <>
                {/* User Profile */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-sm font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-800">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                      {user.name || 'User'}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {user.email}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex h-10 w-10 sm:h-auto sm:w-auto items-center justify-center gap-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 sm:px-3.5 sm:py-2 sm:text-sm sm:font-semibold dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all duration-200"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
