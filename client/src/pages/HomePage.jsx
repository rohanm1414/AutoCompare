import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, Shield, BarChart2 } from 'lucide-react';

// Category config — label, emoji, and where it navigates
const categories = [
  { label: 'Sedan',        emoji: '🚗', url: '/search?category=Sedan' },
  { label: 'SUV',          emoji: '🚙', url: '/search?category=SUV' },
  { label: 'Truck',        emoji: '🛻', url: '/search?category=Truck' },
  { label: 'Sports',       emoji: '🏎️', url: '/search?category=Sports' },
  // Electric filters by fuelType, not category, so the backend handles it correctly
  { label: 'Electric',     emoji: '⚡', url: '/search?fuelType=Electric' },
  { label: 'Hybrid',       emoji: '🔋', url: '/search?fuelType=Hybrid' },
  { label: 'Luxury Sedan', emoji: '💎', url: '/search?category=Luxury%20Sedan' },
  { label: 'Van',          emoji: '🚐', url: '/search?category=Van' },
];

const popularSearches = [
  'Toyota Camry',
  'Honda Accord',
  'Tesla Model 3',
  'Ford Mustang',
  'BMW 3 Series',
  'Cadillac CT4',
  'Chevrolet Silverado',
  'Jeep Wrangler',
  'Porsche 911',
  'Hyundai Ioniq 6',
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Find Your Perfect Car
          </h1>
          <p className="text-blue-100 text-lg mb-10">
            Compare specs, safety ratings, and reviews side by side. Make confident decisions.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search make, model, year..."
                className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Popular search pills */}
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => navigate(`/search?q=${encodeURIComponent(s)}`)}
                className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1.5 rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature highlights ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart2 size={28} className="text-blue-600" />,
              title: 'Side-by-Side Comparison',
              desc: 'Compare up to 4 cars at once with detailed specs, pricing, and features.',
            },
            {
              icon: <Shield size={28} className="text-green-600" />,
              title: 'Safety Ratings',
              desc: 'NHTSA safety ratings for every vehicle, so you can prioritize what matters.',
            },
            {
              icon: <Zap size={28} className="text-yellow-500" />,
              title: 'Expert Reviews & Videos',
              desc: 'Watch the latest YouTube reviews and read expert opinions.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center p-6">
              <div className="flex justify-center mb-3">{icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse by Category ───────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-200 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map(({ label, emoji, url }) => (
              <button
                key={label}
                onClick={() => navigate(url)}
                className="card p-5 text-center hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-2xl mb-2">{emoji}</div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors leading-tight">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
