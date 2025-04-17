
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} FinTracker. All rights reserved.</p>
          
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-blue-500 transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-500 transition-colors duration-150">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-blue-500 transition-colors duration-150">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
