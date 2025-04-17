import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  ListBulletIcon, 
  XMarkIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Overlay for mobile - improved transition */}
      <div 
        className={`fixed inset-0 bg-black/30 z-20 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />
      
      {/* Sidebar container - smoother transition and better shadow */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-all duration-300 ease-in-out`}>
        
        {/* Sidebar header - more polished */}
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-blue-500">
          <h2 className="text-lg font-semibold text-white tracking-tight">Financial Tracker</h2>
          <button 
            onClick={closeSidebar}
            className="lg:hidden text-white p-1 rounded-md hover:bg-blue-700/30 focus:outline-none transition-colors"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Navigation - improved spacing and active states */}
        <nav className="mt-2 pb-4">
          <div className="px-2 space-y-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `flex items-center px-4 py-3 mx-2 rounded-lg ${
                isActive 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-colors`}
              onClick={closeSidebar}
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink
              to="/add-transaction"
              className={({ isActive }) => `flex items-center px-4 py-3 mx-2 rounded-lg ${
                isActive 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-colors`}
              onClick={closeSidebar}
            >
              <PlusCircleIcon className="h-5 w-5 mr-3" />
              <span>Add Transaction</span>
            </NavLink>
            
            <NavLink
              to="/transactions"
              className={({ isActive }) => `flex items-center px-4 py-3 mx-2 rounded-lg ${
                isActive 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-colors`}
              onClick={closeSidebar}
            >
              <ListBulletIcon className="h-5 w-5 mr-3" />
              <span>Transactions</span>
            </NavLink>

          
          </div>

          {/* Bottom section - settings and logout */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 px-2 py-3">
            <NavLink
              to="/settings"
              className={({ isActive }) => `flex items-center px-4 py-3 mx-2 rounded-lg ${
                isActive 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-colors`}
              onClick={closeSidebar}
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </NavLink>

            <button
              className="flex items-center w-full px-4 py-3 mx-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => {
                // Add your logout logic here
                closeSidebar();
              }}
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;