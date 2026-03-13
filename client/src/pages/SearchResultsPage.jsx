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
  const [params] = useSearchParams();

  // Read every possible filter from the URL so deep-links / home-page buttons work
  const q           = params.get('q')        || '';
  const category    = params.get('category') || '';
  const urlFuelType = params.get('fuelType') || '';
  const urlMinYear  = params.get('minYear')  || '';
  const urlMaxYear  = params.get('maxYear')  || '';

  // Local state — initialised from URL params
  const [sort,     setSort]     = useState('');
  const [minYear,  setMinYear]  = useState(urlMinYear);
  const [maxYear,  setMaxYear]  = useState(urlMaxYear);
  // 'Electric' category button now routes to ?fuelType=Electric, so pick that up
  const [fuelType, setFuelType] = useState(
    urlFuelType || (category.toLowerCase() === 'electric' ? 'Electric' : '')
  );
  const [showFilters, setShowFilters] = useState(false);

  const [cars,    setCars]    = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);

  // Re-sync state when URL params change (e.g. user clicks another category btn)
  useEffect(() => {
    setFuelType(urlFuelType || (category.toLowerCase() === 'electric' ? 'Electric' : ''));
    setMinYear(urlMinYear);
    setMaxYear(urlMaxYear);
  }, [urlFuelType, urlMinYear, urlMaxYear, category]);

  // Active filter count badge
  const activeFilterCount = [minYear, maxYear, fuelType].filter(Boolean).length;

  // ── Fetch results ─────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);

    const apiParams = { q, sort };

    // Don't pass category=Electric — it's handled via fuelType on the backend
    if (category && category.toLowerCase() !== 'electric') {
      apiParams.category = category;
    }
    if (fuelType) apiParams.fuelType = fuelType;
    if (minYear)  apiParams.minYear  = minYear;
    if (maxYear)  apiParams.maxYear  = maxYear;

    searchCars(apiParams)
      .then(({ results, total }) => {
        setCars(results);
        setTotal(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q, category, sort, fuelType, minYear, maxYear]);

  const clearFilters = () => {
    setMinYear('');
    setMaxYear('');
    setFuelType('');
    setSort('');
  };

  // Smart page title
  const title = q
    ? `Results for "${q}"`
    : fuelType && !category
    ? `${fuelType} Cars`
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

      {/* ── Active filter chips (collapsed state) ───────────────────── */}
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
          <p className="text-sm mt-2">
            Try a different search term, adjust the year range, or change the fuel type filter.
          </p>
          {(minYear || maxYear || fuelType) && (
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:underline text-sm"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      )}
    </div>
  );
}
