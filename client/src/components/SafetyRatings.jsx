import { Shield } from 'lucide-react';

function StarRating({ value, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-sm ${i < value ? 'bg-green-500' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default function SafetyRatings({ safety }) {
  if (!safety) return null;

  const rows = [
    { label: 'Overall Rating', value: safety.overallRating },
    { label: 'Front Crash', value: safety.frontCrash },
    { label: 'Side Crash', value: safety.sideCrash },
    { label: 'Rollover', value: safety.rollover },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Shield size={18} className="text-green-600" />
        <h3 className="font-semibold text-gray-900">Safety Ratings</h3>
        <span className="text-xs text-gray-500 ml-auto">{safety.source}</span>
      </div>
      <div className="space-y-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600 w-32">{label}</span>
            <StarRating value={value} />
            <span className="text-sm font-semibold text-gray-800 w-12 text-right">{value}/5 ★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
