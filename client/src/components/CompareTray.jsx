import { Link } from 'react-router-dom';
import { X, BarChart2 } from 'lucide-react';
import { useCompare } from '../context/CompareContext.jsx';

export default function CompareTray() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 shrink-0">
          <BarChart2 size={16} className="text-blue-600" />
          <span>Compare ({compareList.length}/4)</span>
        </div>

        <div className="flex items-center gap-3 flex-1 overflow-x-auto">
          {compareList.map((car) => (
            <div key={car.id} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 shrink-0">
              <span className="text-sm font-medium text-gray-800">
                {car.year} {car.make} {car.model}
              </span>
              <button
                onClick={() => removeFromCompare(car.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={clearCompare} className="btn-secondary text-sm py-1.5 px-3">
            Clear
          </button>
          {compareList.length >= 2 && (
            <Link to="/compare" className="btn-primary text-sm py-1.5 px-3">
              Compare Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
