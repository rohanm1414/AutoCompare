import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCars } from '../utils/api.js';
import CarCard from '../components/CarCard.jsx';
import { CarCardSkeleton } from '../components/Skeleton.jsx';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

const sortOptions = [
  { value: '',           label: 'Relevance' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'year-desc',  label: 'Newest First' },
  { value: 'year-asc',   label: 'Oldest First' },
  { value: 'name',       label: 'Name A–Z' },
];

const fuelTypeOptions = [
  { value: '',               label: 'All Fuel Types' },
  { value: 'Gasoline',       label: 'Gasoline' },
  { value: 'Electric',       label: 'Electric (EV)' },
  { value: 'Hybrid',         label: 'Hybrid' },
  { value: 'Plug-In Hybrid', label: 'Plug-In Hybrid' },
  { value: 'Diesel',         label: 'Diesel' },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);

export default function SearchResultsPage() {
  const [params, setParams] = useSearchParams();

  const q        = params.get('q')        || '';
  const category = params.get('category') || '';

  const [sort,     setSort]     = useState('');
  const [minYear,  setMinYear]  = useState('');
  const [maxYear,  setMaxYear]  = useState('');
  const [fuelType, setFuelType] = useState(
    // If user clicked "Electric" category button, pre-set the fuel type filter
    category.toLowerCase() === 'electric' ? 'Electric' : ''
  );
  const [showFilters, setShowFilters] = useState(false);

  const [cars,    setCars]    = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);

  // Determine active filter count for badge
  const activeFilterCount = [minYear, maxYear, fuelType].filter(Boolean).length;

  useEffect(() => {
    setLoading(true);

    // Build params — only send non-empty values
    const apiParams = { q, sort };
    // Don't send category=Electric — it's handled via fuelType on backend
    if (category && category.toLowerCase() !== 'electric') apiParams.category = category;
    if (minYear)  apiParams.minYear  = minYear;
    if (maxYear)  apiParams.maxYear  = maxYear;
    if (fuelType) apiParams.fuelType = fuelType;

    searchCars(apiParams)
      .then(({ results, total }) => {
        setCars(results);
        setTotal(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q, category, sort, minYear, maxYear, fuelType]);

  const clearFilters = () => {
    setMinYear('');
    setMaxYear('');
    setFuelType('');
    setSort('');
  };

  const title = q
    ? `Results for "${q}"`
    : category
    ? `${category} Cars`
    : 'All Cars';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ── Header row ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {!loading && (
            <p className="text-sm text-gray-500 mt-0.5">
              {total} vehicle{total !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors relative"
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Filter panel ────────────────────────────────────────────── */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-end">
          {/* Year from */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Year From</label>
            <select
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Year to */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Year To</label>
            <select
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Fuel type */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Fuel Type</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fuelTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg px-3 py-2 hover:bg-red-50 transition-colors"
            >
              <X size={14} />
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* ── Active filter chips ──────────────────────────────────────── */}
      {activeFilterCount > 0 && !showFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {minYear && (
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              From {minYear}
              <button onClick={() => setMinYear('')}><X size={11} /></button>
            </span>
          )}
          {maxYear && (
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              To {maxYear}
              <button onClick={() => setMaxYear('')}><X size={11} /></button>
            </span>
          )}
          {fuelType && (
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              {fuelType}
              <button onClick={() => setFuelType('')}><X size={11} /></button>
            </span>
          )}
        </div>
      )}

      {/* ── Results grid ────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <CarCardSkeleton key={i} />)}
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-medium">No cars found.</p>
          <p className="text-sm mt-1">Try a different search term, adjust the year range, or change the fuel type filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      )}
    </div>
  );
}
