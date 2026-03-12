import { Check } from 'lucide-react';

export default function TrimTable({ trims }) {
  if (!trims || trims.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Trim</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">MSRP</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Features</th>
          </tr>
        </thead>
        <tbody>
          {trims.map((trim, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <span className="font-bold text-gray-900">{trim.name}</span>
              </td>
              <td className="py-4 px-4">
                <span className="font-semibold text-blue-600">${trim.price.toLocaleString()}</span>
              </td>
              <td className="py-4 px-4">
                <ul className="space-y-1">
                  {trim.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check size={14} className="text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
