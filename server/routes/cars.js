const express = require('express');
const router = express.Router();

const cars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    price: { base: 27315, asFeatured: 35000 },
    category: 'Sedan',
    rating: 4.5,
    reviewCount: 1243,
    specs: {
      engine: '2.5L 4-Cylinder',
      horsepower: 203,
      torque: 184,
      transmission: '8-Speed Automatic',
      drivetrain: 'FWD',
      fuelType: 'Gasoline',
      mpgCity: 28,
      mpgHighway: 39,
      mpgCombined: 32,
      seating: 5,
      cargo: 15.1,
      length: 192.1,
      width: 72.4,
      height: 56.9,
      wheelbase: 111.2,
      curbWeight: 3351,
    },
    safety: {
      overallRating: 5,
      frontCrash: 5,
      sideCrash: 5,
      rollover: 4,
      source: 'NHTSA 2024',
    },
    trims: [
      { name: 'LE', price: 27315, features: ['8" Touchscreen', 'Wireless CarPlay', 'Toyota Safety Sense 3.0', 'LED Headlights'] },
      { name: 'SE', price: 29345, features: ['Sport-tuned suspension', 'Sport mesh grille', 'Black badges', '18" Alloy wheels'] },
      { name: 'XLE', price: 31960, features: ['Dual-zone climate', 'Heated front seats', 'Power driver seat', 'SiriusXM'] },
      { name: 'XSE', price: 32075, features: ['V6 engine available', 'Sport appearance', 'Paddle shifters', 'Larger wheels'] },
      { name: 'TRD', price: 33145, features: ['TRD-tuned suspension', 'TRD exhaust', 'TRD front fascia', 'Sport seats'] },
    ],
    pros: ['Excellent fuel economy', 'Spacious interior', 'Reliability reputation', 'Strong resale value'],
    cons: ['Bland styling', 'Soft suspension', 'Average tech features'],
    tags: ['reliable', 'fuel-efficient', 'family'],
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Accord',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    price: { base: 28895, asFeatured: 38000 },
    category: 'Sedan',
    rating: 4.6,
    reviewCount: 987,
    specs: {
      engine: '1.5L Turbocharged 4-Cylinder',
      horsepower: 192,
      torque: 192,
      transmission: 'CVT',
      drivetrain: 'FWD',
      fuelType: 'Gasoline',
      mpgCity: 29,
      mpgHighway: 37,
      mpgCombined: 32,
      seating: 5,
      cargo: 16.7,
      length: 195.7,
      width: 73.3,
      height: 57.1,
      wheelbase: 111.4,
      curbWeight: 3131,
    },
    safety: {
      overallRating: 5,
      frontCrash: 5,
      sideCrash: 4,
      rollover: 4,
      source: 'NHTSA 2024',
    },
    trims: [
      { name: 'LX', price: 28895, features: ['7" Touchscreen', 'Honda Sensing', 'Apple CarPlay', 'LED Headlights'] },
      { name: 'Sport', price: 31895, features: ['9" Touchscreen', 'Sport grille', '19" Alloy wheels', 'Wireless CarPlay'] },
      { name: 'EX-L', price: 34895, features: ['Leather seats', 'Heated front seats', 'Sunroof', 'Power driver seat'] },
      { name: 'Touring', price: 37895, features: ['2.0L Turbo', 'HUD', 'Bose audio', 'Remote start'] },
    ],
    pros: ['Roomy interior', 'Comfortable ride', 'Latest tech features', 'Strong powertrain options'],
    cons: ['CVT not sporty', 'Firm rear seats', 'Limited cargo space vs competitors'],
    tags: ['spacious', 'tech', 'comfortable'],
  },
  {
    id: 3,
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    price: { base: 38990, asFeatured: 55000 },
    category: 'Electric',
    rating: 4.4,
    reviewCount: 2156,
    specs: {
      engine: 'Dual Motor Electric',
      horsepower: 358,
      torque: 394,
      transmission: 'Single-Speed Fixed Gear',
      drivetrain: 'AWD',
      fuelType: 'Electric',
      mpgCity: 138,
      mpgHighway: 126,
      mpgCombined: 132,
      range: 358,
      seating: 5,
      cargo: 23,
      length: 184.8,
      width: 72.8,
      height: 56.8,
      wheelbase: 113.2,
      curbWeight: 4048,
    },
    safety: {
      overallRating: 5,
      frontCrash: 5,
      sideCrash: 5,
      rollover: 5,
      source: 'NHTSA 2024',
    },
    trims: [
      { name: 'RWD', price: 38990, features: ['272 mi range', '15" Touchscreen', 'Autopilot', 'Glass roof'] },
      { name: 'Long Range AWD', price: 45990, features: ['358 mi range', 'Dual motor AWD', 'Enhanced Autopilot available', '4.2s 0-60'] },
      { name: 'Performance', price: 50990, features: ['3.1s 0-60', 'Track Mode', 'Performance brakes', 'Sport suspension'] },
    ],
    pros: ['Zero emissions', 'Incredible performance', 'Over-the-air updates', 'Low running costs'],
    cons: ['Charging infrastructure gaps', 'Build quality concerns', 'No physical controls', 'Range anxiety'],
    tags: ['electric', 'fast', 'tech', 'eco'],
  },
  {
    id: 4,
    make: 'Ford',
    model: 'Mustang',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800',
    price: { base: 30920, asFeatured: 58000 },
    category: 'Sports',
    rating: 4.3,
    reviewCount: 876,
    specs: {
      engine: '5.0L V8',
      horsepower: 480,
      torque: 418,
      transmission: '6-Speed Manual',
      drivetrain: 'RWD',
      fuelType: 'Gasoline',
      mpgCity: 15,
      mpgHighway: 24,
      mpgCombined: 18,
      seating: 4,
      cargo: 13.5,
      length: 188.5,
      width: 75.4,
      height: 54.8,
      wheelbase: 107.1,
      curbWeight: 3862,
    },
    safety: {
      overallRating: 4,
      frontCrash: 4,
      sideCrash: 4,
      rollover: 3,
      source: 'NHTSA 2024',
    },
    trims: [
      { name: 'EcoBoost', price: 30920, features: ['2.3L Turbo', '315hp', '10-Speed Auto', 'SYNC 4'] },
      { name: 'GT', price: 36920, features: ['5.0L V8', '480hp', 'Brembo brakes available', 'Sport seats'] },
      { name: 'GT Premium', price: 41920, features: ['Leather seats', 'B&O audio', 'MagneRide suspension', 'Digital cluster'] },
      { name: 'Dark Horse', price: 57920, features: ['500hp', 'Track-ready', 'Unique styling', 'Enhanced cooling'] },
    ],
    pros: ['Iconic styling', 'Thrilling V8 sound', 'Strong performance', 'Affordable sports car'],
    cons: ['Poor fuel economy', 'Small rear seat', 'Stiff ride', 'Dated interior'],
    tags: ['sporty', 'powerful', 'iconic', 'v8'],
  },
  {
    id: 5,
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    price: { base: 43800, asFeatured: 62000 },
    category: 'Luxury Sedan',
    rating: 4.5,
    reviewCount: 654,
    specs: {
      engine: '2.0L TwinPower Turbo',
      horsepower: 255,
      torque: 295,
      transmission: '8-Speed Automatic',
      drivetrain: 'RWD',
      fuelType: 'Gasoline',
      mpgCity: 26,
      mpgHighway: 36,
      mpgCombined: 30,
      seating: 5,
      cargo: 17,
      length: 185.7,
      width: 71.9,
      height: 56.8,
      wheelbase: 112.2,
      curbWeight: 3582,
    },
    safety: {
      overallRating: 5,
      frontCrash: 5,
      sideCrash: 5,
      rollover: 4,
      source: 'NHTSA 2024',
    },
    trims: [
      { name: '330i', price: 43800, features: ['255hp turbo', 'iDrive 8', 'LED headlights', 'Driving Assist'] },
      { name: '330i xDrive', price: 46400, features: ['AWD', 'Sport suspension', 'xDrive badge', 'Heated mirrors'] },
      { name: 'M340i', price: 57800, features: ['382hp inline-6', 'M Sport brakes', 'Sport exhaust', 'Adaptive M suspension'] },
      { name: 'M3', price: 74900, features: ['503hp', 'Track ready', 'M-specific chassis', 'Carbon fiber options'] },
    ],
    pros: ['Excellent driving dynamics', 'Premium interior', 'Powerful engine options', 'Advanced tech'],
    cons: ['Expensive options', 'Firm ride', 'Reliability concerns', 'High maintenance costs'],
    tags: ['luxury', 'sporty', 'premium', 'german'],
  },
  {
    id: 6,
    make: 'Jeep',
    model: 'Wrangler',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    price: { base: 33495, asFeatured: 60000 },
    category: 'SUV',
    rating: 4.2,
    reviewCount: 1102,
    specs: {
      engine: '3.6L Pentastar V6',
      horsepower: 285,
      torque: 260,
      transmission: '8-Speed Automatic',
      drivetrain: '4WD',
      fuelType: 'Gasoline',
      mpgCity: 17,
      mpgHighway: 25,
      mpgCombined: 20,
      seating: 5,
      cargo: 31.7,
      length: 166.8,
      width: 73.8,
      height: 73.6,
      wheelbase: 96.8,
      curbWeight: 4449,
    },
    safety: {
      overallRating: 3,
      frontCrash: 3,
      sideCrash: 4,
      rollover: 3,
      source: 'NHTSA 2024',
    },
    trims: [
      { name: 'Sport', price: 33495, features: ['Removable doors', 'Fold-down windshield', 'Trail Rated badge', 'Dana 44 axles'] },
      { name: 'Sahara', price: 44595, features: ['Body-color fenders', '18" alloys', 'Leather-wrapped wheel', 'Heated seats'] },
      { name: 'Rubicon', price: 48595, features: ['Locking front/rear differentials', 'Disconnecting sway bar', 'Rock-Trac 4WD', 'Rock rails'] },
      { name: '392', price: 78995, features: ['470hp V8', '0-60 in 4.5s', 'Performance exhaust', 'Unique 392 styling'] },
    ],
    pros: ['Legendary off-road capability', 'Open-air experience', 'Customizable', 'Strong resale value'],
    cons: ['Poor on-road dynamics', 'Noisy highway', 'Average fuel economy', 'Expensive options'],
    tags: ['offroad', '4wd', 'outdoor', 'iconic'],
  },
  {
    id: 7,
    make: 'Chevrolet',
    model: 'Silverado 1500',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    price: { base: 35600, asFeatured: 65000 },
    category: 'Truck',
    rating: 4.3,
    reviewCount: 1456,
    specs: {
      engine: '5.3L EcoTec3 V8',
      horsepower: 355,
      torque: 383,
      transmission: '8-Speed Automatic',
      drivetrain: '4WD',
      fuelType: 'Gasoline',
      mpgCity: 16,
      mpgHighway: 20,
      mpgCombined: 18,
      seating: 6,
      cargo: 62.9,
      towingCapacity: 13300,
      payloadCapacity: 2280,
      length: 231.7,
      width: 81.2,
      height: 75.6,
      wheelbase: 147.4,
      curbWeight: 4850,
    },
    safety: {
      overallRating: 4,
      frontCrash: 4,
      sideCrash: 4,
      rollover: 4,
      source: 'NHTSA 2024',
    },
    trims: [
      { name: 'WT', price: 35600, features: ['Work truck basics', 'Durable vinyl', '17" steel wheels', 'GVWR 7000lb'] },
      { name: 'LT', price: 42600, features: ['8" touchscreen', 'WiFi hotspot', 'Remote start', 'Spray-in bedliner available'] },
      { name: 'LTZ', price: 52600, features: ['Leather seats', 'Bose audio', 'Heated/cooled seats', 'Power running boards'] },
      { name: 'High Country', price: 62600, features: ['Premium leather', 'Signature chrome', 'Max Trailering Package', 'Head-up display'] },
    ],
    pros: ['High towing capacity', 'V8 power', 'Comfortable cab', 'Wide trim selection'],
    cons: ['Poor fuel economy', 'Large size in cities', 'Expensive trims', 'Stiff rear suspension unloaded'],
    tags: ['truck', 'towing', 'work', 'powerful'],
  },
  {
    id: 8,
    make: 'Hyundai',
    model: 'Ioniq 6',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1677056979079-8ea9594ecf05?w=800',
    price: { base: 38615, asFeatured: 52000 },
    category: 'Electric',
    rating: 4.6,
    reviewCount: 423,
    specs: {
      engine: 'Dual Motor Electric',
      horsepower: 320,
      torque: 446,
      transmission: 'Single-Speed Fixed Gear',
      drivetrain: 'AWD',
      fuelType: 'Electric',
      mpgCity: 140,
      mpgHighway: 121,
      mpgCombined: 131,
      range: 266,
      seating: 5,
      cargo: 11.1,
      length: 191.1,
      width: 74,
      height: 59.1,
      wheelbase: 116.1,
      curbWeight: 4575,
    },
    safety: {
      overallRating: 5,
      frontCrash: 5,
      sideCrash: 5,
      rollover: 4,
      source: 'NHTSA 2024',
    },
    trims: [
      { name: 'Standard RWD', price: 38615, features: ['149mi range', 'Single motor', 'Vehicle-to-load', '18" wheels'] },
      { name: 'Long Range RWD', price: 41450, features: ['361mi range', 'Ultra-fast charging', '7.4kW onboard', 'Pixel headlights'] },
      { name: 'Long Range AWD', price: 45450, features: ['266mi range', 'Dual motor', 'E-GMP platform', '800V architecture'] },
    ],
    pros: ['Ultra-fast 800V charging', 'Sleek aerodynamic design', 'Spacious interior', 'Great range'],
    cons: ['Limited cargo space', 'Less brand prestige', 'Dealership experience', 'No frunk'],
    tags: ['electric', 'eco', 'efficient', 'sleek'],
  },
];

// GET /api/cars - list all or search
router.get('/', (req, res) => {
  const { q, category, make, sort } = req.query;
  let results = [...cars];

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(
      (c) =>
        c.make.toLowerCase().includes(query) ||
        c.model.toLowerCase().includes(query) ||
        c.year.toString().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.tags.some((t) => t.includes(query))
    );
  }

  if (category) {
    results = results.filter((c) => c.category.toLowerCase() === category.toLowerCase());
  }

  if (make) {
    results = results.filter((c) => c.make.toLowerCase() === make.toLowerCase());
  }

  if (sort === 'price-asc') results.sort((a, b) => a.price.base - b.price.base);
  if (sort === 'price-desc') results.sort((a, b) => b.price.base - a.price.base);
  if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
  if (sort === 'name') results.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));

  res.json({ results, total: results.length });
});

// GET /api/cars/:id
router.get('/:id', (req, res) => {
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json(car);
});

// GET /api/cars/:id/similar
router.get('/:id/similar', (req, res) => {
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ error: 'Car not found' });

  const similar = cars
    .filter((c) => c.id !== car.id && (c.category === car.category || c.make === car.make))
    .slice(0, 4);

  res.json(similar);
});

module.exports = router;
