import clsx from 'clsx';

function Row({ label, cars, field, format, highlight }) {
  const values = cars.map((c) => {
    const val = field.split('.').reduce((obj, k) => obj?.[k], c);
    return format ? format(val) : val;
  });

  const nums = values.map((v) => parseFloat(v));
  const allNums = nums.every((n) => !isNaN(n));
  const best = allNums ? (highlight === 'max' ? Math.max(...nums) : Math.min(...nums)) : null;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-4 text-sm font-medium text-gray-600 w-40 shrink-0">{label}</td>
      {values.map((val, i) => (
        <td
          key={i}
          className={clsx(
            'py-3 px-4 text-sm text-center font-medium',
            allNums && parseFloat(val) === best ? 'text-green-600 font-bold' : 'text-gray-800'
          )}
        >
          {val ?? '—'}
        </td>
      ))}
    </tr>
  );
}

export default function SpecsTable({ cars }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-40">
              Spec
            </th>
            {cars.map((car) => (
              <th key={car.id} className="py-3 px-4 text-center text-sm font-bold text-gray-900">
                {car.year} {car.make} {car.model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Row label="Engine" cars={cars} field="specs.engine" />
          <Row label="Horsepower" cars={cars} field="specs.horsepower" format={(v) => `${v} hp`} highlight="max" />
          <Row label="Torque" cars={cars} field="specs.torque" format={(v) => `${v} lb-ft`} highlight="max" />
          <Row label="Transmission" cars={cars} field="specs.transmission" />
          <Row label="Drivetrain" cars={cars} field="specs.drivetrain" />
          <Row label="Fuel Type" cars={cars} field="specs.fuelType" />
          <Row label="City MPG" cars={cars} field="specs.mpgCity" format={(v) => v || '—'} highlight="max" />
          <Row label="Hwy MPG" cars={cars} field="specs.mpgHighway" format={(v) => v || '—'} highlight="max" />
          <Row label="Combined" cars={cars} field="specs.mpgCombined" format={(v) => v || '—'} highlight="max" />
          <Row label="EV Range" cars={cars} field="specs.range" format={(v) => (v ? `${v} mi` : '—')} highlight="max" />
          <Row label="Seating" cars={cars} field="specs.seating" format={(v) => `${v} passengers`} highlight="max" />
          <Row label="Cargo (cu ft)" cars={cars} field="specs.cargo" format={(v) => `${v} cu ft`} highlight="max" />
          <Row label="Length" cars={cars} field="specs.length" format={(v) => `${v}"`} />
          <Row label="Width" cars={cars} field="specs.width" format={(v) => `${v}"`} />
          <Row label="Height" cars={cars} field="specs.height" format={(v) => `${v}"`} />
          <Row label="Wheelbase" cars={cars} field="specs.wheelbase" format={(v) => `${v}"`} />
          <Row label="Curb Weight" cars={cars} field="specs.curbWeight" format={(v) => `${v?.toLocaleString()} lbs`} highlight="min" />
          <Row label="Base MSRP" cars={cars} field="price.base" format={(v) => `$${v?.toLocaleString()}`} highlight="min" />
        </tbody>
      </table>
      <p className="text-xs text-gray-400 px-4 py-2">Green highlights indicate best value in category.</p>
    </div>
  );
}
