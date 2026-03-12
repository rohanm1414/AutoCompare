import { useEffect, useState } from 'react';
import { getSimilarCars } from '../utils/api.js';
import CarCard from './CarCard.jsx';
import Skeleton from './Skeleton.jsx';

export default function SimilarCars({ carId }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSimilarCars(carId)
      .then(setCars)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [carId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
      </div>
    );
  }

  if (cars.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cars.map((car) => <CarCard key={car.id} car={car} />)}
      </div>
    </div>
  );
}
