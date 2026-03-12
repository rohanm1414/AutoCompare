import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCars } from '../utils/api.js';
import CarCard from '../components/CarCard.jsx';
import { CarCardSkeleton } from '../components/Skeleton.jsx';
import { SlidersHorizontal } from 'lucide-react';

const sortOptions = [
  { value: '', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A–Z' },
];

export default function SearchResultsPage() {
  const [params, setParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');

  const q = params.get('q') || '';
  const category = params.get('category') || '';

  useEffect(() => {
    setLoading(true);
    searchCars({ q, category, sort })
      .then(({ results, total }) => {
        setCars(results);
        setTotal(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q, category, sort]);

  const title = q ? `Results for "${q}"` : category ? `${category} Cars` : 'All Cars';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {!loading && <p className="text-sm text-gray-500 mt-0.5">{total} vehicles found</p>}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-gray-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input py-2 pr-8 text-sm w-auto"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <CarCardSkeleton key={i} />)}
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-medium">No cars found.</p>
          <p className="text-sm mt-1">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      )}
    </div>
  );
}
