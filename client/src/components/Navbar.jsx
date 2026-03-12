import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, BarChart2, Bookmark, Search, Menu, X } from 'lucide-react';
import { useCompare } from '../context/CompareContext.jsx';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { compareList } = useCompare();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl shrink-0">
            <Car size={24} />
            <span>AutoCompare</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search make, model, or type..."
                className="input pl-9 pr-4 py-2 text-sm"
              />
            </div>
          </form>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-1">
            <Link
              to="/compare"
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <BarChart2 size={16} />
              Compare
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>
            <Link
              to="/garage"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Bookmark size={16} />
              My Bookmark
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 space-y-2">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cars..."
                  className="input pl-9 text-sm"
                />
              </div>
            </form>
            <Link
              to="/compare"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <BarChart2 size={16} />
              Compare {compareList.length > 0 && `(${compareList.length})`}
            </Link>
            <Link
              to="/garage"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Bookmark size={16} />
              My Bookmark
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
