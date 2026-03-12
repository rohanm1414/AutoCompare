import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';
import CarCard from '../components/CarCard.jsx';
import { Bookmark } from 'lucide-react';

export default function MyBookmarkPage() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookmark</h1>
      <p className="text-gray-500 text-sm mb-8">Your saved vehicles — {favorites.length} car{favorites.length !== 1 ? 's' : ''}</p>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Your garage is empty</h2>
          <p className="text-gray-400 mb-6">Save cars by clicking the heart icon on any listing.</p>
          <Link to="/search" className="btn-primary">Browse Cars</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      )}
    </div>
  );
}
