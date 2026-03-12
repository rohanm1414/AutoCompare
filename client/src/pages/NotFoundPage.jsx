import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-4">🚗</div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">Looks like this page took a wrong turn.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
