import { NavLink } from 'react-router-dom';
import { HomeIcon, PlusCircleIcon, ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
        className="fixed inset-0 bg-[rgba(0,0,0,0.4)]  z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-4 bg-blue-600">
          <h2 className="text-lg mx-auto font-semibold text-white">Menu</h2>
          <button 
            onClick={closeSidebar}
            className="lg:hidden text-white p-1 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `flex items-center px-6 py-3 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={closeSidebar}
          >
            <HomeIcon className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/add-transaction"
            className={({ isActive }) => `flex items-center px-6 py-3 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={closeSidebar}
          >
            <PlusCircleIcon className="h-5 w-5 mr-3" />
            <span>Add Transaction</span>
          </NavLink>
          
          <NavLink
            to="/transactions"
            className={({ isActive }) => `flex items-center px-6 py-3 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={closeSidebar}
          >
            <ListBulletIcon className="h-5 w-5 mr-3" />
            <span>All Transactions</span>
          </NavLink>
          
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;