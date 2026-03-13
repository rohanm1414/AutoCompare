import { Link } from 'react-router-dom';
import { Heart, BarChart2, Star } from 'lucide-react';
import clsx from 'clsx';
import { useCompare } from '../context/CompareContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function CarCard({ car }) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const inCompare   = isInCompare(car.id);
  const inFavorites = isFavorite(car.id);

  // ── Derived display values (safe against missing fields) ──────────────
  const reviewCount = car.reviewCount ?? 0;

  const isElectric  = (car.specs?.fuelType || '').toLowerCase().includes('electric');
  // Prefer explicit mpgCombined; fall back to average of city/highway; then range
  const mpgCombined =
    car.specs?.mpgCombined ||
    (car.specs?.mpg?.city && car.specs?.mpg?.highway
      ? Math.round((car.specs.mpg.city + car.specs.mpg.highway) / 2)
      : null);
  const efficiencyValue = isElectric
    ? (car.specs?.range ? `${car.specs.range} mi` : mpgCombined ? `${mpgCombined}` : '--')
    : (mpgCombined ? `${mpgCombined}` : '--');
  const efficiencyLabel = isElectric && car.specs?.range ? 'Range' : isElectric ? 'MPGe' : 'MPG';

  return (
    <div className="card group hover:shadow-md transition-shadow duration-200">
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=500&fit=crop&q=80';
            e.currentTarget.onerror = null;
          }}
        />
        <div className="absolute top-2 right-2 flex gap-1.5">
          <button
            onClick={() => (inFavorites ? removeFavorite(car.id) : addFavorite(car))}
            className={clsx(
              'p-1.5 rounded-full backdrop-blur-sm transition-all',
              inFavorites ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
            )}
            title={inFavorites ? 'Remove from garage' : 'Save to garage'}
          >
            <Heart size={14} fill={inFavorites ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => (inCompare ? removeFromCompare(car.id) : addToCompare(car))}
            className={clsx(
              'p-1.5 rounded-full backdrop-blur-sm transition-all',
              inCompare ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-blue-50 hover:text-blue-500'
            )}
            title={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            <BarChart2 size={14} />
          </button>
        </div>
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
          {car.category}
        </span>
      </div>

      <div className="p-4">
        <Link to={`/car/${car.id}`}>
          <h3 className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors leading-tight">
            {car.year} {car.make} {car.model}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1 mb-3">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{car.rating ?? '—'}</span>
          {reviewCount > 0 && (
            <span className="text-sm text-gray-400">({reviewCount.toLocaleString()} reviews)</span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="font-semibold text-gray-900">{car.specs?.horsepower ?? '--'}</div>
            <div className="text-xs">HP</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="font-semibold text-gray-900">{efficiencyValue}</div>
            <div className="text-xs">{efficiencyLabel}</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="font-semibold text-gray-900">{car.specs?.seating ?? '--'}</div>
            <div className="text-xs">Seats</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-blue-600 font-bold text-lg">
              ${(car.price?.base ?? 0).toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 ml-1">base MSRP</span>
          </div>
          <Link to={`/car/${car.id}`} className="btn-primary text-sm py-1.5 px-3">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
