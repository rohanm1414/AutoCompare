import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, BarChart2, Star, ThumbsUp, ThumbsDown, ChevronLeft } from 'lucide-react';
import { getCarById, getVideos } from '../utils/api.js';
import { useCompare } from '../context/CompareContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import TrimTable from '../components/TrimTable.jsx';
import SafetyRatings from '../components/SafetyRatings.jsx';
import VideoCard from '../components/VideoCard.jsx';
import SimilarCars from '../components/SimilarCars.jsx';
import Skeleton from '../components/Skeleton.jsx';
import clsx from 'clsx';

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs');

  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    getCarById(id)
      .then((data) => {
        setCar(data);
        return getVideos(`${data.year} ${data.make} ${data.model}`);
      })
      .then((data) => setVideos(data.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-80 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-bold text-gray-700">Car not found.</p>
        <Link to="/" className="btn-primary mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  const inCompare = isInCompare(car.id);
  const inFavorites = isFavorite(car.id);
  const tabs = ['specs', 'trims', 'safety', 'videos'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <Link to="/search" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        <ChevronLeft size={16} />
        Back to results
      </Link>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-80 object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {car.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
              {car.year} {car.make} {car.model}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{car.rating}</span>
              <span className="text-gray-400 text-sm">({car.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-blue-600">${car.price.base.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">base MSRP</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Horsepower', value: `${car.specs.horsepower} HP` },
              { label: car.specs.fuelType === 'Electric' ? 'Range' : 'Combined MPG', value: car.specs.fuelType === 'Electric' ? `${car.specs.range} mi` : `${car.specs.mpgCombined} MPG` },
              { label: 'Drivetrain', value: car.specs.drivetrain },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="font-bold text-gray-900 text-lg">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => (inFavorites ? removeFavorite(car.id) : addFavorite(car))}
              className={clsx('btn-secondary flex items-center gap-2 flex-1 justify-center', inFavorites && 'border-red-300 text-red-600 bg-red-50')}
            >
              <Heart size={16} fill={inFavorites ? 'currentColor' : 'none'} />
              {inFavorites ? 'Saved' : 'Save to Garage'}
            </button>
            <button
              onClick={() => (inCompare ? removeFromCompare(car.id) : addToCompare(car))}
              className={clsx('btn-secondary flex items-center gap-2 flex-1 justify-center', inCompare && 'border-blue-300 text-blue-600 bg-blue-50')}
            >
              <BarChart2 size={16} />
              {inCompare ? 'In Compare' : 'Add to Compare'}
            </button>
          </div>

          {/* Pros / Cons */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-green-700 flex items-center gap-1 mb-2"><ThumbsUp size={14} /> Pros</h4>
              <ul className="space-y-1">
                {car.pros?.map((p) => <li key={p} className="text-xs text-gray-700">• {p}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-600 flex items-center gap-1 mb-2"><ThumbsDown size={14} /> Cons</h4>
              <ul className="space-y-1">
                {car.cons?.map((c) => <li key={c} className="text-xs text-gray-700">• {c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-6 py-3 text-sm font-medium capitalize transition-colors',
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries({
                Engine: car.specs.engine,
                Horsepower: `${car.specs.horsepower} hp`,
                Torque: `${car.specs.torque} lb-ft`,
                Transmission: car.specs.transmission,
                Drivetrain: car.specs.drivetrain,
                'Fuel Type': car.specs.fuelType,
                'City MPG': car.specs.mpgCity || '—',
                'Highway MPG': car.specs.mpgHighway || '—',
                'EV Range': car.specs.range ? `${car.specs.range} mi` : '—',
                Seating: `${car.specs.seating} passengers`,
                'Cargo Space': `${car.specs.cargo} cu ft`,
                'Curb Weight': `${car.specs.curbWeight?.toLocaleString()} lbs`,
              }).map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{k}</span>
                  <span className="text-sm font-medium text-gray-900">{v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'trims' && <TrimTable trims={car.trims} />}
          {activeTab === 'safety' && <SafetyRatings safety={car.safety} />}
          {activeTab === 'videos' && (
            videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((v, i) => <VideoCard key={i} video={v} />)}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No videos available. Add a YouTube API key in .env to enable.</p>
            )
          )}
        </div>
      </div>

      {/* Similar Cars */}
      <SimilarCars carId={id} />
    </div>
  );
}
