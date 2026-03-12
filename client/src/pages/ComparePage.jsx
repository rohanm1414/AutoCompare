import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext.jsx';
import SpecsTable from '../components/SpecsTable.jsx';
import { X, BarChart2 } from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <BarChart2 size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">No Cars to Compare</h1>
        <p className="text-gray-500 mb-6">Add at least 2 cars to the compare tray to get started.</p>
        <Link to="/search" className="btn-primary">Browse Cars</Link>
      </div>
    );
  }

  if (compareList.length < 2) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <BarChart2 size={48} className="text-yellow-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Add One More Car</h1>
        <p className="text-gray-500 mb-6">You need at least 2 cars to compare. Go add another.</p>
        <Link to="/search" className="btn-primary">Browse Cars</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Compare Cars</h1>
        <button onClick={clearCompare} className="btn-secondary text-sm">Clear All</button>
      </div>

      {/* Car Headers */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, 1fr)` }}>
        <div />
        {compareList.map((car) => (
          <div key={car.id} className="card overflow-hidden">
            <div className="relative">
              <img src={car.image} alt={car.make} className="w-full h-40 object-cover" />
              <button
                onClick={() => removeFromCompare(car.id)}
                className="absolute top-2 right-2 bg-white/80 hover:bg-red-50 text-gray-600 hover:text-red-500 p-1.5 rounded-full transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="p-3 text-center">
              <Link to={`/car/${car.id}`} className="font-bold text-gray-900 hover:text-blue-600 text-sm">
                {car.year} {car.make} {car.model}
              </Link>
              <div className="text-blue-600 font-bold mt-1">${car.price.base.toLocaleString()}</div>
              <div className="text-xs text-gray-500">base MSRP</div>
            </div>
          </div>
        ))}
      </div>

      {/* Specs Table */}
      <div className="card">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900">Full Specs Comparison</h2>
        </div>
        <SpecsTable cars={compareList} />
      </div>
    </div>
  );
}
