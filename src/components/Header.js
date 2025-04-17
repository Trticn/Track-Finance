import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      <header className="w-screen fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>

              <NavLink to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FT</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                  Fin Tracker
                </span>
              </NavLink>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 ">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                {[
                  { path: '/', name: 'Dashboard' },
                  { path: '/transactions', name: 'Transactions' },
                  { path: '/add-transaction', name: 'Add Transaction' },
                  { path: '/settings', name: 'Settings' },
                ].map((item) => (
                  <NavLink
                  key={item.path}
                  to={item.path}
              
                 
                  className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ?  'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                  
                >
                  {item.name}
                </NavLink>
                ))}
              </div>
            </nav>

            {/* Right section */}
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="sr-only">Notifications</span>
                <div className="h-6 w-6 text-gray-500 relative">
                  <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </button>

              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center text-white font-medium">
                    U
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">User</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16"></div>
    </>
  );
}

export default Header;
