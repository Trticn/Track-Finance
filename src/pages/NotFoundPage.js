import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-lg text-gray-700">Stranica nije pronađena.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Vrati se na početnu
      </Link>
    </div>
  );
}
