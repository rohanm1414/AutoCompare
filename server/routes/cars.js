const express = require('express');
const router = express.Router();

const cars = [
  // ─── LAMBORGHINI ───────────────────────────────────────────────
  {
    id: 101,
    make: 'Lamborghini', model: 'Urus', year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    price: { base: 229495, asFeatured: 280000 },
    category: 'Luxury SUV', rating: 4.7, reviewCount: 312,
    specs: { engine: '4.0L Twin-Turbo V8', horsepower: 657, torque: 627, transmission: '8-Speed Automatic', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 12, mpgHighway: 17, mpgCombined: 14, seating: 5, cargo: 21.8, length: 201.8, width: 79.9, height: 64.4, wheelbase: 118.2, curbWeight: 4850 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'Urus', price: 229495, features: ['657hp V8', '0-60 in 3.5s', 'Air suspension', 'Carbon ceramic brakes optional'] },
      { name: 'Urus S', price: 239495, features: ['666hp', 'Sport exhaust', 'Forged wheels', 'Alcantara interior'] },
      { name: 'Urus Performante', price: 274390, features: ['657hp lightweight', '200lbs lighter', 'Track-tuned', 'Sport exhaust'] },
    ],
    pros: ['Supercar performance', 'Practical SUV space', 'Exotic styling', 'All-weather AWD'],
    cons: ['Extremely expensive', 'Poor fuel economy', 'Polarizing looks', 'High running costs'],
    tags: ['luxury', 'supercar', 'suv', 'fast', 'exotic'],
  },
  {
    id: 102,
    make: 'Lamborghini', model: 'Huracán', year: 2024,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: { base: 261274, asFeatured: 320000 },
    category: 'Supercar', rating: 4.9, reviewCount: 178,
    specs: { engine: '5.2L Naturally Aspirated V10', horsepower: 630, torque: 443, transmission: '7-Speed DCT', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 13, mpgHighway: 18, mpgCombined: 15, seating: 2, cargo: 4.5, length: 175.6, width: 75.7, height: 45.9, wheelbase: 103.1, curbWeight: 3135 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'EVO', price: 261274, features: ['630hp V10', '0-60 in 2.9s', 'AWD', 'LDVI dynamics system'] },
      { name: 'EVO RWD', price: 218009, features: ['610hp', 'RWD only', 'Lighter weight', 'Drift mode'] },
      { name: 'STO', price: 328422, features: ['640hp', 'RWD track car', 'Aerodinamica package', '0-60 in 3.0s'] },
    ],
    pros: ['Screaming V10 engine', 'Incredible handling', 'Exotic looks', 'Raw driving experience'],
    cons: ['Very expensive', 'Limited practicality', 'Harsh ride', 'Poor visibility'],
    tags: ['supercar', 'exotic', 'v10', 'fast', 'lamborghini'],
  },
  {
    id: 103,
    make: 'Lamborghini', model: 'Aventador', year: 2022,
    image: 'https://images.unsplash.com/photo-1621248715190-394d4eaac459?w=800',
    price: { base: 507353, asFeatured: 700000 },
    category: 'Supercar', rating: 4.9, reviewCount: 89,
    specs: { engine: '6.5L Naturally Aspirated V12', horsepower: 769, torque: 531, transmission: '7-Speed ISR', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 9, mpgHighway: 13, mpgCombined: 11, seating: 2, cargo: 3.5, length: 188.2, width: 79.9, height: 44.7, wheelbase: 106.3, curbWeight: 3472 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'LP 780-4 Ultimae', price: 507353, features: ['769hp V12', '0-60 in 2.8s', 'Final edition', 'Carbon fiber body'] },
    ],
    pros: ['Legendary V12 sound', 'Jaw-dropping looks', 'Collector\'s item', 'Incredible performance'],
    cons: ['Extremely expensive', 'Discontinued model', 'Very impractical', 'High maintenance'],
    tags: ['supercar', 'v12', 'exotic', 'collector', 'lamborghini'],
  },
  // ─── FERRARI ───────────────────────────────────────────────────
  {
    id: 201,
    make: 'Ferrari', model: 'F8 Tributo', year: 2023,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800',
    price: { base: 280626, asFeatured: 380000 },
    category: 'Supercar', rating: 4.9, reviewCount: 134,
    specs: { engine: '3.9L Twin-Turbo V8', horsepower: 710, torque: 568, transmission: '7-Speed DCT', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 15, mpgHighway: 19, mpgCombined: 16, seating: 2, cargo: 4.0, length: 178.0, width: 80.0, height: 47.4, wheelbase: 104.3, curbWeight: 2932 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'F8 Tributo', price: 280626, features: ['710hp V8', '0-60 in 2.9s', 'Side Slip Control', 'Ferrari Dynamic Enhancer'] },
      { name: 'F8 Spider', price: 305526, features: ['Retractable hardtop', 'Open-air driving', 'Same performance', 'Carbon fiber roof'] },
    ],
    pros: ['Incredible V8 sound', 'Razor-sharp handling', 'Stunning design', 'Track-ready'],
    cons: ['Very expensive', 'Limited luggage space', 'Firm ride', 'High running costs'],
    tags: ['supercar', 'ferrari', 'v8', 'exotic', 'fast'],
  },
  {
    id: 202,
    make: 'Ferrari', model: 'SF90 Stradale', year: 2023,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    price: { base: 507000, asFeatured: 700000 },
    category: 'Hybrid Supercar', rating: 5.0, reviewCount: 67,
    specs: { engine: '4.0L Twin-Turbo V8 Hybrid', horsepower: 986, torque: 590, transmission: '8-Speed DCT', drivetrain: 'AWD', fuelType: 'Hybrid', mpgCity: 16, mpgHighway: 19, mpgCombined: 17, range: 15, seating: 2, cargo: 3.5, length: 178.7, width: 82.7, height: 46.9, wheelbase: 104.3, curbWeight: 3461 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'SF90 Stradale', price: 507000, features: ['986hp hybrid', '0-60 in 2.5s', 'AWD', 'EV mode 15mi range'] },
      { name: 'SF90 Spider', price: 577000, features: ['Retractable roof', 'Same 986hp', 'Open air hypercar', 'Carbon fiber'] },
    ],
    pros: ['Nearly 1000hp', 'EV mode capability', 'AWD traction', 'Top Ferrari technology'],
    cons: ['Over $500k', 'Complex hybrid system', 'Very limited production', 'Expensive maintenance'],
    tags: ['hypercar', 'hybrid', 'ferrari', 'exotic', 'fastest'],
  },
  {
    id: 203,
    make: 'Ferrari', model: '296 GTB', year: 2023,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    price: { base: 322986, asFeatured: 420000 },
    category: 'Hybrid Supercar', rating: 4.9, reviewCount: 98,
    specs: { engine: '3.0L Twin-Turbo V6 Hybrid', horsepower: 819, torque: 546, transmission: '8-Speed DCT', drivetrain: 'RWD', fuelType: 'Hybrid', mpgCity: 17, mpgHighway: 21, mpgCombined: 19, seating: 2, cargo: 4.3, length: 178.2, width: 83.0, height: 46.5, wheelbase: 104.3, curbWeight: 3263 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: '296 GTB', price: 322986, features: ['819hp V6 hybrid', '0-60 in 2.9s', 'New V6 engine', 'Assetto Fiorano package available'] },
      { name: '296 GTS', price: 352986, features: ['Spider version', 'Retractable hardtop', 'Same performance', 'Open air'] },
    ],
    pros: ['New V6 screams', 'Hybrid efficiency', 'Stunning design', 'Daily driveable'],
    cons: ['Expensive', 'V6 polarizing for purists', 'Limited cargo', 'High insurance'],
    tags: ['supercar', 'hybrid', 'ferrari', 'v6', 'exotic'],
  },
  // ─── PORSCHE ───────────────────────────────────────────────────
  {
    id: 301,
    make: 'Porsche', model: '911 Carrera', year: 2024,
    image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800',
    price: { base: 106100, asFeatured: 160000 },
    category: 'Sports Car', rating: 4.8, reviewCount: 876,
    specs: { engine: '3.0L Twin-Turbo Flat-6', horsepower: 379, torque: 331, transmission: '8-Speed PDK', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 18, mpgHighway: 25, mpgCombined: 21, seating: 4, cargo: 4.9, length: 178.2, width: 74.0, height: 51.1, wheelbase: 96.5, curbWeight: 3268 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'Carrera', price: 106100, features: ['379hp flat-6', '0-60 in 4.0s', 'RWD', 'PASM suspension'] },
      { name: 'Carrera S', price: 122300, features: ['443hp', '0-60 in 3.5s', 'Sport Chrono available', 'PDCC optional'] },
      { name: 'Carrera 4S', price: 129800, features: ['443hp AWD', 'Wider body', '0-60 in 3.4s', 'All-weather capable'] },
      { name: 'Turbo S', price: 207000, features: ['640hp', '0-60 in 2.6s', 'AWD', 'Carbon ceramic brakes'] },
    ],
    pros: ['Iconic design', 'Exceptional handling', 'Daily driveable supercar', 'Strong resale value'],
    cons: ['Expensive options', 'Rear engine quirks', 'Limited rear seats', 'High maintenance'],
    tags: ['sports', 'porsche', 'iconic', 'fast', 'german'],
  },
  {
    id: 302,
    make: 'Porsche', model: 'Cayenne', year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    price: { base: 73200, asFeatured: 145000 },
    category: 'Luxury SUV', rating: 4.7, reviewCount: 654,
    specs: { engine: '3.0L Turbocharged V6', horsepower: 335, torque: 332, transmission: '8-Speed Tiptronic', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 19, mpgHighway: 23, mpgCombined: 21, seating: 5, cargo: 27.1, length: 193.3, width: 78.3, height: 65.3, wheelbase: 113.9, curbWeight: 4564 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'Cayenne', price: 73200, features: ['335hp V6', 'Air suspension optional', 'PCM infotainment', 'Off-road mode'] },
      { name: 'Cayenne S', price: 90800, features: ['434hp V8', 'Sport Chrono', '0-60 in 4.6s', 'PASM active suspension'] },
      { name: 'Cayenne GTS', price: 112000, features: ['473hp V8', 'Sport exhaust', 'Lower ride height', 'GTS interior'] },
      { name: 'Cayenne Turbo E-Hybrid', price: 163000, features: ['729hp hybrid', '0-60 in 3.4s', '25mi EV range', 'Turbo styling'] },
    ],
    pros: ['Sports car performance in SUV', 'Premium interior', 'Versatile powertrain options', 'Great resale value'],
    cons: ['Very expensive options', 'Heavy', 'Complex electronics', 'High maintenance costs'],
    tags: ['luxury', 'suv', 'porsche', 'german', 'performance'],
  },
  // ─── MERCEDES-BENZ ─────────────────────────────────────────────
  {
    id: 401,
    make: 'Mercedes-Benz', model: 'AMG GT 63', year: 2024,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    price: { base: 161050, asFeatured: 220000 },
    category: 'Luxury Sports', rating: 4.7, reviewCount: 243,
    specs: { engine: '4.0L Twin-Turbo V8', horsepower: 630, torque: 664, transmission: '9-Speed Automatic', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 16, mpgHighway: 21, mpgCombined: 18, seating: 4, cargo: 12.8, length: 197.0, width: 76.6, height: 55.4, wheelbase: 116.2, curbWeight: 4235 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'AMG GT 63', price: 161050, features: ['630hp V8', '0-60 in 3.1s', 'Drift mode', 'AMG Active Ride Control'] },
      { name: 'AMG GT 63 S', price: 190000, features: ['720hp', '0-60 in 2.9s', 'Carbon ceramics', 'AMG Performance exhaust'] },
    ],
    pros: ['Outrageous V8 power', '4 real seats', 'Luxurious interior', 'Stunning grand tourer'],
    cons: ['Very expensive', 'Heavy', 'Firm ride on track setting', 'High fuel costs'],
    tags: ['luxury', 'amg', 'v8', 'german', 'sports'],
  },
  {
    id: 402,
    make: 'Mercedes-Benz', model: 'G-Class', year: 2024,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    price: { base: 142000, asFeatured: 250000 },
    category: 'Luxury SUV', rating: 4.5, reviewCount: 421,
    specs: { engine: '4.0L Twin-Turbo V8', horsepower: 577, torque: 627, transmission: '9-Speed Automatic', drivetrain: '4WD', fuelType: 'Gasoline', mpgCity: 13, mpgHighway: 17, mpgCombined: 15, seating: 5, cargo: 26.1, length: 186.0, width: 76.1, height: 77.6, wheelbase: 112.2, curbWeight: 5765 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'NHTSA 2024' },
    trims: [
      { name: 'G 550', price: 142000, features: ['416hp V8', 'Three locking diffs', 'Iconic boxy design', 'Luxury interior'] },
      { name: 'AMG G 63', price: 182000, features: ['577hp AMG V8', '0-60 in 4.5s', 'AMG exhaust', 'Designo interior'] },
    ],
    pros: ['Iconic status symbol', 'Serious off-road ability', 'Ultra-luxurious', 'Strong resale value'],
    cons: ['Terrible fuel economy', 'Dated driving dynamics', 'Very expensive', 'Large and hard to park'],
    tags: ['luxury', 'offroad', 'iconic', 'suv', 'mercedes'],
  },
  {
    id: 403,
    make: 'Mercedes-Benz', model: 'S-Class', year: 2024,
    image: 'https://images.unsplash.com/photo-1619362280286-f1f8fd5032ed?w=800',
    price: { base: 114900, asFeatured: 190000 },
    category: 'Luxury Sedan', rating: 4.8, reviewCount: 389,
    specs: { engine: '3.0L Turbocharged Inline-6 Mild Hybrid', horsepower: 429, torque: 384, transmission: '9-Speed Automatic', drivetrain: 'RWD', fuelType: 'Mild Hybrid', mpgCity: 20, mpgHighway: 29, mpgCombined: 24, seating: 5, cargo: 12.9, length: 208.2, width: 76.9, height: 59.0, wheelbase: 126.2, curbWeight: 4718 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'S 500', price: 114900, features: ['429hp inline-6', 'MBUX Hyperscreen optional', 'Air suspension', 'Rear axle steering'] },
      { name: 'S 580', price: 133900, features: ['496hp V8', 'Executive rear seating', '4MATIC AWD', 'Burmester 4D audio'] },
      { name: 'Maybach S 680', price: 230000, features: ['621hp V12', 'Maybach luxury package', 'Extended wheelbase', 'Champagne cooler'] },
    ],
    pros: ['Pinnacle of luxury', 'Cutting-edge technology', 'Supremely comfortable', 'Prestigious badge'],
    cons: ['Very expensive', 'Complex technology', 'High maintenance', 'Large size'],
    tags: ['luxury', 'sedan', 'mercedes', 'german', 'flagship'],
  },
  // ─── BMW ───────────────────────────────────────────────────────
  {
    id: 501,
    make: 'BMW', model: 'M3', year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    price: { base: 74900, asFeatured: 105000 },
    category: 'Sports Sedan', rating: 4.7, reviewCount: 543,
    specs: { engine: '3.0L Twin-Turbo Inline-6', horsepower: 503, torque: 479, transmission: '6-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 16, mpgHighway: 23, mpgCombined: 19, seating: 5, cargo: 13.0, length: 187.5, width: 74.9, height: 56.3, wheelbase: 112.5, curbWeight: 3824 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'M3', price: 74900, features: ['503hp', 'Manual or auto', 'M-specific chassis', 'M Drive modes'] },
      { name: 'M3 Competition', price: 83900, features: ['530hp', 'Auto only', 'Firmer suspension', 'M Carbon seats optional'] },
      { name: 'M3 CS', price: 119900, features: ['543hp', 'Carbon fiber hood/roof', '0-60 in 3.2s', 'Track-focused'] },
    ],
    pros: ['Driver\'s dream', 'Practical 4-door', 'Incredible inline-6', 'Manual option available'],
    cons: ['Controversial styling', 'Firm ride', 'Pricey options', 'High running costs'],
    tags: ['sports', 'sedan', 'bmw', 'german', 'track'],
  },
  {
    id: 502,
    make: 'BMW', model: 'M5', year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    price: { base: 107999, asFeatured: 160000 },
    category: 'Sports Sedan', rating: 4.8, reviewCount: 312,
    specs: { engine: '4.4L Twin-Turbo V8 Hybrid', horsepower: 717, torque: 738, transmission: '8-Speed Automatic', drivetrain: 'AWD', fuelType: 'Hybrid', mpgCity: 18, mpgHighway: 24, mpgCombined: 20, seating: 5, cargo: 13.8, length: 195.7, width: 75.5, height: 57.3, wheelbase: 117.4, curbWeight: 4898 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'M5', price: 107999, features: ['717hp V8 hybrid', '0-60 in 3.3s', 'AWD', 'M xDrive'] },
      { name: 'M5 Competition', price: 117999, features: ['Same power', 'Stiffer suspension', 'Sport exhaust', 'Competition seats'] },
    ],
    pros: ['Massive power', 'Practical luxury sedan', 'Advanced hybrid', 'Incredibly fast'],
    cons: ['Very heavy', 'Complex hybrid', 'Very expensive', 'Divisive exterior'],
    tags: ['sports', 'sedan', 'bmw', 'v8', 'hybrid', 'fast'],
  },
  // ─── AUDI ──────────────────────────────────────────────────────
  {
    id: 601,
    make: 'Audi', model: 'R8', year: 2023,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    price: { base: 158600, asFeatured: 220000 },
    category: 'Supercar', rating: 4.8, reviewCount: 267,
    specs: { engine: '5.2L Naturally Aspirated V10', horsepower: 562, torque: 406, transmission: '7-Speed DCT', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 14, mpgHighway: 20, mpgCombined: 16, seating: 2, cargo: 3.5, length: 174.6, width: 76.8, height: 48.7, wheelbase: 104.9, curbWeight: 3583 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'R8 V10', price: 158600, features: ['562hp V10', '0-60 in 3.5s', 'AWD', 'Magnetic ride suspension'] },
      { name: 'R8 V10 Performance', price: 196900, features: ['602hp', '0-60 in 3.2s', 'Sport exhaust', 'Carbon fiber package'] },
    ],
    pros: ['Screaming V10', 'Daily driveable supercar', 'AWD confidence', 'Beautiful design'],
    cons: ['Being discontinued', 'Expensive', 'Limited cargo', 'No manual option'],
    tags: ['supercar', 'v10', 'audi', 'german', 'exotic'],
  },
  {
    id: 602,
    make: 'Audi', model: 'RS6 Avant', year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    price: { base: 118900, asFeatured: 160000 },
    category: 'Luxury Wagon', rating: 4.8, reviewCount: 198,
    specs: { engine: '4.0L Twin-Turbo V8 Mild Hybrid', horsepower: 621, torque: 590, transmission: '8-Speed Automatic', drivetrain: 'AWD', fuelType: 'Mild Hybrid', mpgCity: 15, mpgHighway: 22, mpgCombined: 18, seating: 5, cargo: 31.0, length: 196.0, width: 76.3, height: 58.6, wheelbase: 115.7, curbWeight: 4740 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'Euro NCAP' },
    trims: [
      { name: 'RS6 Avant', price: 118900, features: ['621hp V8', '0-60 in 3.5s', 'Wagon practicality', 'Air suspension'] },
    ],
    pros: ['Supercar performance in wagon', 'Massive cargo space', 'Family friendly', 'Understated looks'],
    cons: ['Very expensive', 'Heavy', 'Thirsty V8', 'Limited availability in US'],
    tags: ['wagon', 'luxury', 'audi', 'v8', 'practical', 'fast'],
  },
  // ─── DODGE ─────────────────────────────────────────────────────
  {
    id: 701,
    make: 'Dodge', model: 'Challenger SRT Hellcat', year: 2023,
    image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800',
    price: { base: 60295, asFeatured: 90000 },
    category: 'Muscle Car', rating: 4.4, reviewCount: 876,
    specs: { engine: '6.2L Supercharged HEMI V8', horsepower: 717, torque: 656, transmission: '8-Speed Automatic', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 13, mpgHighway: 21, mpgCombined: 16, seating: 5, cargo: 16.2, length: 197.9, width: 75.7, height: 56.9, wheelbase: 116.2, curbWeight: 4439 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'NHTSA 2023' },
    trims: [
      { name: 'Hellcat', price: 60295, features: ['717hp supercharged V8', 'Line Lock', 'Launch Assist', 'SRT drive modes'] },
      { name: 'Jailbreak', price: 72195, features: ['807hp', 'Unrestricted top speed', 'Ultimate performance', 'Final editions'] },
      { name: 'Super Stock', price: 79595, features: ['807hp', 'Drag-strip ready', 'W29 engine package', 'Skinny front tires'] },
      { name: 'Demon 170', price: 96666, features: ['1025hp', '0-60 in 1.66s', '1/4 mile in 8.91s', 'Most powerful muscle car ever'] },
    ],
    pros: ['Insane V8 power', 'Practical 4-seat muscle car', 'Affordable supercar performance', 'American icon'],
    cons: ['Poor fuel economy', 'Heavy', 'Dated interior', 'Being discontinued'],
    tags: ['muscle', 'v8', 'american', 'fast', 'iconic'],
  },
  {
    id: 702,
    make: 'Dodge', model: 'Viper', year: 2017,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    price: { base: 95895, asFeatured: 150000 },
    category: 'Supercar', rating: 4.6, reviewCount: 234,
    specs: { engine: '8.4L Naturally Aspirated V10', horsepower: 645, torque: 600, transmission: '6-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 12, mpgHighway: 19, mpgCombined: 14, seating: 2, cargo: 4.0, length: 175.7, width: 75.8, height: 47.8, wheelbase: 98.8, curbWeight: 3374 },
    safety: { overallRating: 3, frontCrash: 3, sideCrash: 3, rollover: 3, source: 'NHTSA 2017' },
    trims: [
      { name: 'SRT', price: 95895, features: ['645hp V10', 'Manual only', 'Raw sports car', 'Track-focused'] },
      { name: 'ACR', price: 121895, features: ['645hp', 'Extreme aero package', 'Nurburgring record', 'Cup 2 tires'] },
    ],
    pros: ['Raw V10 experience', 'American supercar', 'Collector value', 'Track weapon'],
    cons: ['Discontinued', 'Unforgiving to drive', 'No modern safety tech', 'Very hot cabin'],
    tags: ['supercar', 'v10', 'american', 'raw', 'collector'],
  },
  // ─── CHEVROLET ─────────────────────────────────────────────────
  {
    id: 801,
    make: 'Chevrolet', model: 'Corvette Z06', year: 2024,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    price: { base: 109295, asFeatured: 160000 },
    category: 'Supercar', rating: 4.8, reviewCount: 345,
    specs: { engine: '5.5L Flat-Plane Crank V8', horsepower: 670, torque: 460, transmission: '8-Speed DCT', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 14, mpgHighway: 21, mpgCombined: 17, seating: 2, cargo: 12.6, length: 182.3, width: 76.1, height: 48.6, wheelbase: 107.2, curbWeight: 3366 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'NHTSA 2024' },
    trims: [
      { name: 'Z06', price: 109295, features: ['670hp flat-plane V8', 'Ferrari-rivaling sound', 'Magnetic Ride 4.0', 'Track focused'] },
      { name: 'Z06 Z07', price: 132295, features: ['Performance package', 'Carbon ceramic brakes', 'Michelin Cup 2R tires', 'Front lift'] },
    ],
    pros: ['Ferrari-beating performance at fraction of price', 'Screaming V8', 'American pride', 'Mid-engine layout'],
    cons: ['Limited cargo with top down', 'Firm ride', 'Dealer markup issues', 'Interior quality'],
    tags: ['supercar', 'corvette', 'v8', 'american', 'track', 'fast'],
  },
  {
    id: 802,
    make: 'Chevrolet', model: 'Camaro ZL1', year: 2024,
    image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800',
    price: { base: 72090, asFeatured: 95000 },
    category: 'Muscle Car', rating: 4.5, reviewCount: 432,
    specs: { engine: '6.2L Supercharged LT4 V8', horsepower: 650, torque: 650, transmission: '10-Speed Automatic', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 13, mpgHighway: 20, mpgCombined: 16, seating: 4, cargo: 9.1, length: 188.3, width: 74.7, height: 53.1, wheelbase: 110.7, curbWeight: 3940 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'NHTSA 2024' },
    trims: [
      { name: 'ZL1', price: 72090, features: ['650hp supercharged', 'Brembo brakes', 'Magnetic Ride Control', 'FE4 suspension'] },
      { name: 'ZL1 1LE', price: 81090, features: ['650hp', 'Aerodynamics package', 'Cup 2 tires', 'Semi-slick track package'] },
    ],
    pros: ['Brutal power', 'Track capable', 'Affordable supercar performance', 'American muscle icon'],
    cons: ['Poor visibility', 'Small back seat', 'Heavy', 'Being discontinued'],
    tags: ['muscle', 'v8', 'american', 'fast', 'track'],
  },
  // ─── NISSAN ────────────────────────────────────────────────────
  {
    id: 901,
    make: 'Nissan', model: 'GT-R', year: 2024,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: { base: 115735, asFeatured: 210000 },
    category: 'Sports Car', rating: 4.6, reviewCount: 543,
    specs: { engine: '3.8L Twin-Turbo V6', horsepower: 565, torque: 467, transmission: '6-Speed DCT', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 16, mpgHighway: 22, mpgCombined: 18, seating: 4, cargo: 8.8, length: 183.9, width: 74.6, height: 54.2, wheelbase: 109.4, curbWeight: 3858 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'NHTSA 2024' },
    trims: [
      { name: 'Premium', price: 115735, features: ['565hp V6', '0-60 in 2.9s', 'AWD', 'Brembo brakes'] },
      { name: 'T-spec', price: 145735, features: ['600hp', 'Special color', 'Upgraded audio', 'Carbon fiber trim'] },
      { name: 'Nismo', price: 212435, features: ['600hp', 'Nismo suspension', 'Carbon fiber body parts', 'Track-tuned'] },
    ],
    pros: ['Supercar performance', 'AWD all-weather', '4 seats', 'Engineering masterpiece'],
    cons: ['Aging interior', 'Heavy', 'Expensive', 'Fuel thirsty'],
    tags: ['sports', 'gtr', 'nissan', 'japanese', 'fast', 'awd'],
  },
  // ─── TOYOTA ────────────────────────────────────────────────────
  {
    id: 1001,
    make: 'Toyota', model: 'Camry', year: 2024,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    price: { base: 27315, asFeatured: 35000 },
    category: 'Sedan', rating: 4.5, reviewCount: 1243,
    specs: { engine: '2.5L 4-Cylinder', horsepower: 203, torque: 184, transmission: '8-Speed Automatic', drivetrain: 'FWD', fuelType: 'Gasoline', mpgCity: 28, mpgHighway: 39, mpgCombined: 32, seating: 5, cargo: 15.1, length: 192.1, width: 72.4, height: 56.9, wheelbase: 111.2, curbWeight: 3351 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'LE', price: 27315, features: ['8" Touchscreen', 'Wireless CarPlay', 'Toyota Safety Sense 3.0', 'LED Headlights'] },
      { name: 'SE', price: 29345, features: ['Sport-tuned suspension', 'Sport mesh grille', 'Black badges', '18" Alloy wheels'] },
      { name: 'XLE', price: 31960, features: ['Dual-zone climate', 'Heated front seats', 'Power driver seat', 'SiriusXM'] },
      { name: 'TRD', price: 33145, features: ['TRD-tuned suspension', 'TRD exhaust', 'TRD front fascia', 'Sport seats'] },
    ],
    pros: ['Excellent fuel economy', 'Spacious interior', 'Reliability reputation', 'Strong resale value'],
    cons: ['Bland styling', 'Soft suspension', 'Average tech features'],
    tags: ['reliable', 'fuel-efficient', 'family', 'sedan'],
  },
  {
    id: 1002,
    make: 'Toyota', model: 'Supra', year: 2024,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: { base: 43540, asFeatured: 60000 },
    category: 'Sports Car', rating: 4.5, reviewCount: 432,
    specs: { engine: '3.0L Twin-Turbo Inline-6', horsepower: 382, torque: 368, transmission: '8-Speed Automatic', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 22, mpgHighway: 30, mpgCombined: 25, seating: 2, cargo: 10.2, length: 172.5, width: 73.0, height: 50.9, wheelbase: 97.2, curbWeight: 3181 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'NHTSA 2024' },
    trims: [
      { name: '3.0', price: 43540, features: ['382hp inline-6', '0-60 in 3.9s', 'RWD', 'Adaptive suspension'] },
      { name: 'A91-CF', price: 58540, features: ['Carbon fiber roof/mirror caps', 'Limited edition', 'Same powertrain', 'Special badges'] },
    ],
    pros: ['Sharp handling', 'Powerful inline-6', 'Great looks', 'Affordable sports car'],
    cons: ['BMW-derived', 'Only automatic', 'Small interior', 'Limited storage'],
    tags: ['sports', 'toyota', 'japanese', 'fast', 'rwd'],
  },
  {
    id: 1003,
    make: 'Toyota', model: 'Land Cruiser', year: 2024,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    price: { base: 57345, asFeatured: 80000 },
    category: 'SUV', rating: 4.6, reviewCount: 678,
    specs: { engine: '2.4L Twin-Turbo 4-Cylinder Hybrid', horsepower: 326, torque: 465, transmission: '8-Speed Automatic', drivetrain: '4WD', fuelType: 'Hybrid', mpgCity: 23, mpgHighway: 26, mpgCombined: 24, seating: 8, cargo: 82.8, length: 193.3, width: 77.8, height: 74.2, wheelbase: 112.2, curbWeight: 5170 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: '1958', price: 57345, features: ['326hp hybrid', 'Locking rear diff', 'Crawl control', 'Multi-terrain select'] },
      { name: 'First Edition', price: 79345, features: ['Premium audio', 'Panoramic roof', 'All luxury features', 'Special badges'] },
    ],
    pros: ['Legendary reliability', 'Serious off-road', 'Comfortable on-road', 'Holds value extremely well'],
    cons: ['Expensive', 'Limited availability', 'Heavy', 'Complex tech'],
    tags: ['suv', 'offroad', 'toyota', 'reliable', '4wd', 'family'],
  },
  // ─── HONDA ─────────────────────────────────────────────────────
  {
    id: 1101,
    make: 'Honda', model: 'Accord', year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    price: { base: 28895, asFeatured: 38000 },
    category: 'Sedan', rating: 4.6, reviewCount: 987,
    specs: { engine: '1.5L Turbocharged 4-Cylinder', horsepower: 192, torque: 192, transmission: 'CVT', drivetrain: 'FWD', fuelType: 'Gasoline', mpgCity: 29, mpgHighway: 37, mpgCombined: 32, seating: 5, cargo: 16.7, length: 195.7, width: 73.3, height: 57.1, wheelbase: 111.4, curbWeight: 3131 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 4, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'LX', price: 28895, features: ['7" Touchscreen', 'Honda Sensing', 'Apple CarPlay', 'LED Headlights'] },
      { name: 'Sport', price: 31895, features: ['9" Touchscreen', 'Sport grille', '19" Alloy wheels', 'Wireless CarPlay'] },
      { name: 'EX-L', price: 34895, features: ['Leather seats', 'Heated front seats', 'Sunroof', 'Power driver seat'] },
      { name: 'Touring', price: 37895, features: ['2.0L Turbo', 'HUD', 'Bose audio', 'Remote start'] },
    ],
    pros: ['Roomy interior', 'Comfortable ride', 'Latest tech features', 'Strong powertrain options'],
    cons: ['CVT not sporty', 'Firm rear seats', 'Limited cargo space vs competitors'],
    tags: ['spacious', 'tech', 'comfortable', 'sedan', 'honda'],
  },
  {
    id: 1102,
    make: 'Honda', model: 'Civic Type R', year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    price: { base: 44990, asFeatured: 55000 },
    category: 'Sports Hatchback', rating: 4.7, reviewCount: 567,
    specs: { engine: '2.0L Turbocharged 4-Cylinder', horsepower: 315, torque: 310, transmission: '6-Speed Manual', drivetrain: 'FWD', fuelType: 'Gasoline', mpgCity: 22, mpgHighway: 28, mpgCombined: 24, seating: 5, cargo: 22.6, length: 180.1, width: 74.4, height: 55.9, wheelbase: 107.7, curbWeight: 3117 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'Type R', price: 44990, features: ['315hp', 'Manual only', 'Limited-slip diff', 'Brembo brakes'] },
    ],
    pros: ['Best FWD handling', 'Practical hatchback', 'Manual transmission', 'Track ready'],
    cons: ['Front-wheel drive limits', 'Aggressive styling divisive', 'Expensive for a Honda', 'Firm ride'],
    tags: ['sports', 'hatchback', 'honda', 'manual', 'track', 'fwd'],
  },
  // ─── TESLA ─────────────────────────────────────────────────────
  {
    id: 1201,
    make: 'Tesla', model: 'Model S Plaid', year: 2024,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    price: { base: 89990, asFeatured: 110000 },
    category: 'Electric', rating: 4.5, reviewCount: 876,
    specs: { engine: 'Tri Motor Electric', horsepower: 1020, torque: 1050, transmission: 'Single-Speed', drivetrain: 'AWD', fuelType: 'Electric', mpgCity: 120, mpgHighway: 107, mpgCombined: 113, range: 396, seating: 5, cargo: 28, length: 196.0, width: 77.3, height: 56.9, wheelbase: 116.5, curbWeight: 4766 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 5, source: 'NHTSA 2024' },
    trims: [
      { name: 'Model S', price: 74990, features: ['670hp dual motor', '405mi range', '17" touchscreen', 'Autopilot'] },
      { name: 'Model S Plaid', price: 89990, features: ['1020hp tri motor', '0-60 in 1.99s', '396mi range', 'Track mode'] },
    ],
    pros: ['Insane acceleration', 'Long range', 'Over-the-air updates', 'Luxurious interior'],
    cons: ['Build quality issues', 'No physical buttons', 'Charging wait times', 'Depreciation'],
    tags: ['electric', 'fast', 'tesla', 'luxury', 'ev', 'fastest'],
  },
  {
    id: 1202,
    make: 'Tesla', model: 'Model 3', year: 2024,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    price: { base: 38990, asFeatured: 55000 },
    category: 'Electric', rating: 4.4, reviewCount: 2156,
    specs: { engine: 'Dual Motor Electric', horsepower: 358, torque: 394, transmission: 'Single-Speed Fixed Gear', drivetrain: 'AWD', fuelType: 'Electric', mpgCity: 138, mpgHighway: 126, mpgCombined: 132, range: 358, seating: 5, cargo: 23, length: 184.8, width: 72.8, height: 56.8, wheelbase: 113.2, curbWeight: 4048 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 5, source: 'NHTSA 2024' },
    trims: [
      { name: 'RWD', price: 38990, features: ['272 mi range', '15" Touchscreen', 'Autopilot', 'Glass roof'] },
      { name: 'Long Range AWD', price: 45990, features: ['358 mi range', 'Dual motor AWD', '4.2s 0-60'] },
      { name: 'Performance', price: 50990, features: ['3.1s 0-60', 'Track Mode', 'Performance brakes'] },
    ],
    pros: ['Zero emissions', 'Incredible performance', 'Over-the-air updates', 'Low running costs'],
    cons: ['Charging infrastructure gaps', 'Build quality concerns', 'No physical controls'],
    tags: ['electric', 'fast', 'tech', 'eco', 'tesla'],
  },
  // ─── FORD ──────────────────────────────────────────────────────
  {
    id: 1301,
    make: 'Ford', model: 'Mustang', year: 2024,
    image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800',
    price: { base: 30920, asFeatured: 58000 },
    category: 'Sports Car', rating: 4.3, reviewCount: 876,
    specs: { engine: '5.0L V8', horsepower: 480, torque: 418, transmission: '6-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 15, mpgHighway: 24, mpgCombined: 18, seating: 4, cargo: 13.5, length: 188.5, width: 75.4, height: 54.8, wheelbase: 107.1, curbWeight: 3862 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'NHTSA 2024' },
    trims: [
      { name: 'EcoBoost', price: 30920, features: ['2.3L Turbo', '315hp', '10-Speed Auto', 'SYNC 4'] },
      { name: 'GT', price: 36920, features: ['5.0L V8', '480hp', 'Brembo brakes available', 'Sport seats'] },
      { name: 'Dark Horse', price: 57920, features: ['500hp', 'Track-ready', 'Unique styling', 'Enhanced cooling'] },
    ],
    pros: ['Iconic styling', 'Thrilling V8 sound', 'Strong performance', 'Affordable sports car'],
    cons: ['Poor fuel economy', 'Small rear seat', 'Stiff ride', 'Dated interior'],
    tags: ['sporty', 'powerful', 'iconic', 'v8', 'american', 'mustang'],
  },
  {
    id: 1302,
    make: 'Ford', model: 'GT', year: 2022,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    price: { base: 500000, asFeatured: 700000 },
    category: 'Supercar', rating: 4.9, reviewCount: 45,
    specs: { engine: '3.5L Twin-Turbo EcoBoost V6', horsepower: 660, torque: 550, transmission: '7-Speed DCT', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 11, mpgHighway: 18, mpgCombined: 14, seating: 2, cargo: 3.0, length: 187.5, width: 78.9, height: 43.8, wheelbase: 106.7, curbWeight: 3054 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'GT', price: 500000, features: ['660hp V6', '0-60 in 3.0s', 'Carbon fiber body', 'Le Mans racing heritage'] },
    ],
    pros: ['American supercar', 'Le Mans winner', 'Exclusive', 'Carbon fiber construction'],
    cons: ['Limited to 500 cars/year', 'Must apply to buy', 'Very impractical', 'Massive price'],
    tags: ['supercar', 'american', 'exotic', 'collector', 'ford'],
  },
  // ─── CLASSIC CARS ──────────────────────────────────────────────
  {
    id: 2001,
    make: 'Ford', model: 'Mustang GT', year: 1969,
    image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800',
    price: { base: 85000, asFeatured: 150000 },
    category: 'Classic', rating: 4.8, reviewCount: 234,
    specs: { engine: '428ci Cobra Jet V8', horsepower: 335, torque: 440, transmission: '4-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 10, mpgHighway: 14, mpgCombined: 12, seating: 4, cargo: 9.0, length: 187.4, width: 71.8, height: 51.2, wheelbase: 108.0, curbWeight: 3207 },
    safety: { overallRating: 2, frontCrash: 2, sideCrash: 2, rollover: 2, source: 'Classic Era' },
    trims: [
      { name: 'Fastback', price: 85000, features: ['428 Cobra Jet', 'Fastback roofline', 'Bullitt movie car style', 'Iconic design'] },
      { name: 'Boss 429', price: 150000, features: ['429ci V8', 'Rare edition', 'Racing homologation', 'Collector item'] },
    ],
    pros: ['American muscle icon', 'Timeless design', 'Investment value', 'Visceral driving'],
    cons: ['No modern safety features', 'Needs restoration work', 'Expensive to maintain', 'Hard to find'],
    tags: ['classic', 'muscle', 'vintage', 'collector', 'american', '1960s'],
  },
  {
    id: 2002,
    make: 'Chevrolet', model: 'Camaro SS', year: 1969,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    price: { base: 75000, asFeatured: 130000 },
    category: 'Classic', rating: 4.7, reviewCount: 189,
    specs: { engine: '396ci Big Block V8', horsepower: 375, torque: 415, transmission: '4-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 9, mpgHighway: 14, mpgCombined: 11, seating: 4, cargo: 8.5, length: 186.0, width: 74.4, height: 51.0, wheelbase: 108.0, curbWeight: 3675 },
    safety: { overallRating: 2, frontCrash: 2, sideCrash: 2, rollover: 2, source: 'Classic Era' },
    trims: [
      { name: 'SS 396', price: 75000, features: ['375hp big block', 'Sport suspension', 'Rally wheels', 'SS badging'] },
      { name: 'COPO', price: 130000, features: ['427ci V8', 'Drag strip focused', 'Ultra rare', 'Collector holy grail'] },
    ],
    pros: ['Muscle car legend', 'Pontiac rival', 'Collector value appreciating', 'Iconic looks'],
    cons: ['No safety features', 'Thirsty engine', 'Requires expertise to maintain', 'Parts hard to find'],
    tags: ['classic', 'muscle', 'vintage', 'collector', 'american', '1960s'],
  },
  {
    id: 2003,
    make: 'Chevrolet', model: 'Corvette Stingray', year: 1963,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    price: { base: 120000, asFeatured: 250000 },
    category: 'Classic', rating: 4.9, reviewCount: 156,
    specs: { engine: '327ci V8', horsepower: 360, torque: 352, transmission: '4-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 11, mpgHighway: 16, mpgCombined: 13, seating: 2, cargo: 6.0, length: 175.3, width: 69.6, height: 49.8, wheelbase: 98.0, curbWeight: 2859 },
    safety: { overallRating: 2, frontCrash: 2, sideCrash: 1, rollover: 2, source: 'Classic Era' },
    trims: [
      { name: 'Split Window Coupe', price: 120000, features: ['Only year split window', 'Ultra collectible', '327 V8', 'Iconic styling'] },
    ],
    pros: ['Most desirable Corvette', 'Split window ultra-rare', 'Investment grade', 'American icon'],
    cons: ['Extremely expensive', 'Requires specialist maintenance', 'No modern features', 'Fragile'],
    tags: ['classic', 'corvette', 'vintage', 'collector', '1960s', 'american'],
  },
  {
    id: 2004,
    make: 'Porsche', model: '911', year: 1973,
    image: 'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800',
    price: { base: 95000, asFeatured: 180000 },
    category: 'Classic', rating: 4.8, reviewCount: 123,
    specs: { engine: '2.4L Flat-6', horsepower: 190, torque: 159, transmission: '5-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 14, mpgHighway: 20, mpgCombined: 16, seating: 4, cargo: 3.5, length: 163.9, width: 65.0, height: 52.0, wheelbase: 89.4, curbWeight: 2271 },
    safety: { overallRating: 2, frontCrash: 2, sideCrash: 2, rollover: 2, source: 'Classic Era' },
    trims: [
      { name: 'Carrera RS', price: 180000, features: ['Lightweight', 'Ducktail spoiler', 'Homologation special', 'Most desirable air-cooled'] },
    ],
    pros: ['Air-cooled perfection', 'Appreciating asset', 'Timeless design', 'Driving purity'],
    cons: ['Expensive', 'Needs specialist care', 'No safety tech', 'Parts scarcity'],
    tags: ['classic', 'porsche', 'vintage', 'collector', '1970s', 'sports'],
  },
  {
    id: 2005,
    make: 'Ferrari', model: '308 GTB', year: 1978,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    price: { base: 70000, asFeatured: 120000 },
    category: 'Classic', rating: 4.6, reviewCount: 98,
    specs: { engine: '3.0L Naturally Aspirated V8', horsepower: 237, torque: 210, transmission: '5-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 12, mpgHighway: 17, mpgCombined: 14, seating: 2, cargo: 4.0, length: 168.9, width: 68.9, height: 44.1, wheelbase: 92.1, curbWeight: 2756 },
    safety: { overallRating: 2, frontCrash: 2, sideCrash: 2, rollover: 2, source: 'Classic Era' },
    trims: [
      { name: '308 GTB', price: 70000, features: ['V8 screamer', 'Magnum P.I. fame', 'Pininfarina design', 'Manual gearbox'] },
    ],
    pros: ['Iconic Magnum PI car', 'Beautiful Pininfarina design', 'V8 soundtrack', 'Accessible Ferrari entry'],
    cons: ['Slow by modern standards', 'Reliability issues', 'Parts expensive', 'Needs restoration'],
    tags: ['classic', 'ferrari', 'vintage', '1970s', 'collector', 'v8'],
  },
  {
    id: 2006,
    make: 'BMW', model: '2002 Turbo', year: 1974,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    price: { base: 65000, asFeatured: 100000 },
    category: 'Classic', rating: 4.5, reviewCount: 67,
    specs: { engine: '2.0L Turbocharged 4-Cylinder', horsepower: 170, torque: 177, transmission: '4-Speed Manual', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 15, mpgHighway: 22, mpgCombined: 18, seating: 4, cargo: 12.0, length: 164.7, width: 62.6, height: 56.1, wheelbase: 98.4, curbWeight: 2293 },
    safety: { overallRating: 2, frontCrash: 2, sideCrash: 2, rollover: 2, source: 'Classic Era' },
    trims: [
      { name: '2002 Turbo', price: 65000, features: ['First turbocharged BMW', 'Racing heritage', 'Iconic flared arches', 'Collector car'] },
    ],
    pros: ['Pioneer turbocharged car', 'BMW heritage', 'Fun to drive', 'Appreciating value'],
    cons: ['Lag-heavy turbo', 'Outdated safety', 'Parts availability', 'Needs maintenance'],
    tags: ['classic', 'bmw', 'vintage', '1970s', 'collector', 'turbo'],
  },
  // ─── ELECTRIC & HYBRID ─────────────────────────────────────────
  {
    id: 1401,
    make: 'Hyundai', model: 'Ioniq 6', year: 2024,
    image: 'https://images.unsplash.com/photo-1677056979079-8ea9594ecf05?w=800',
    price: { base: 38615, asFeatured: 52000 },
    category: 'Electric', rating: 4.6, reviewCount: 423,
    specs: { engine: 'Dual Motor Electric', horsepower: 320, torque: 446, transmission: 'Single-Speed Fixed Gear', drivetrain: 'AWD', fuelType: 'Electric', mpgCity: 140, mpgHighway: 121, mpgCombined: 131, range: 266, seating: 5, cargo: 11.1, length: 191.1, width: 74, height: 59.1, wheelbase: 116.1, curbWeight: 4575 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'Standard RWD', price: 38615, features: ['149mi range', 'Single motor', 'Vehicle-to-load', '18" wheels'] },
      { name: 'Long Range RWD', price: 41450, features: ['361mi range', 'Ultra-fast charging', '800V architecture'] },
      { name: 'Long Range AWD', price: 45450, features: ['266mi range', 'Dual motor', 'E-GMP platform'] },
    ],
    pros: ['Ultra-fast 800V charging', 'Sleek aerodynamic design', 'Spacious interior', 'Great range'],
    cons: ['Limited cargo space', 'Less brand prestige', 'No frunk'],
    tags: ['electric', 'eco', 'efficient', 'sleek', 'ev'],
  },
  {
    id: 1402,
    make: 'Rivian', model: 'R1T', year: 2024,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    price: { base: 69900, asFeatured: 98000 },
    category: 'Electric Truck', rating: 4.5, reviewCount: 312,
    specs: { engine: 'Quad Motor Electric', horsepower: 835, torque: 908, transmission: 'Single-Speed', drivetrain: 'AWD', fuelType: 'Electric', mpgCity: 74, mpgHighway: 66, mpgCombined: 70, range: 314, seating: 5, cargo: 54, towingCapacity: 11000, length: 217.1, width: 79.9, height: 71.7, wheelbase: 135.8, curbWeight: 7148 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'Dual-Motor', price: 69900, features: ['600hp', '410mi range', 'Air suspension', 'Gear tunnel storage'] },
      { name: 'Quad-Motor', price: 86000, features: ['835hp', '0-60 in 3.0s', 'Max performance', 'Tank turn'] },
    ],
    pros: ['Electric truck pioneer', 'Off-road capable', 'Unique storage solutions', 'Quick charging'],
    cons: ['Expensive', 'Service centers limited', 'Heavy', 'Range drops off-road'],
    tags: ['electric', 'truck', 'ev', 'offroad', 'rivian'],
  },
  // ─── ADDITIONAL POPULAR CARS ───────────────────────────────────
  {
    id: 1501,
    make: 'Jeep', model: 'Wrangler', year: 2024,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    price: { base: 33495, asFeatured: 60000 },
    category: 'SUV', rating: 4.2, reviewCount: 1102,
    specs: { engine: '3.6L Pentastar V6', horsepower: 285, torque: 260, transmission: '8-Speed Automatic', drivetrain: '4WD', fuelType: 'Gasoline', mpgCity: 17, mpgHighway: 25, mpgCombined: 20, seating: 5, cargo: 31.7, length: 166.8, width: 73.8, height: 73.6, wheelbase: 96.8, curbWeight: 4449 },
    safety: { overallRating: 3, frontCrash: 3, sideCrash: 4, rollover: 3, source: 'NHTSA 2024' },
    trims: [
      { name: 'Sport', price: 33495, features: ['Removable doors', 'Fold-down windshield', 'Trail Rated badge'] },
      { name: 'Rubicon', price: 48595, features: ['Locking diffs', 'Disconnecting sway bar', 'Rock rails'] },
      { name: '392', price: 78995, features: ['470hp V8', '0-60 in 4.5s', 'Performance exhaust'] },
    ],
    pros: ['Legendary off-road', 'Open-air experience', 'Customizable', 'Strong resale'],
    cons: ['Poor on-road dynamics', 'Noisy highway', 'Average fuel economy'],
    tags: ['offroad', '4wd', 'outdoor', 'iconic', 'jeep'],
  },
  {
    id: 1502,
    make: 'BMW', model: '3 Series', year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    price: { base: 43800, asFeatured: 62000 },
    category: 'Luxury Sedan', rating: 4.5, reviewCount: 654,
    specs: { engine: '2.0L TwinPower Turbo', horsepower: 255, torque: 295, transmission: '8-Speed Automatic', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 26, mpgHighway: 36, mpgCombined: 30, seating: 5, cargo: 17, length: 185.7, width: 71.9, height: 56.8, wheelbase: 112.2, curbWeight: 3582 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: '330i', price: 43800, features: ['255hp turbo', 'iDrive 8', 'LED headlights'] },
      { name: 'M340i', price: 57800, features: ['382hp inline-6', 'M Sport brakes', 'Sport exhaust'] },
      { name: 'M3', price: 74900, features: ['503hp', 'Track ready', 'Carbon fiber options'] },
    ],
    pros: ['Excellent driving dynamics', 'Premium interior', 'Powerful engines', 'Advanced tech'],
    cons: ['Expensive options', 'Firm ride', 'High maintenance'],
    tags: ['luxury', 'sporty', 'premium', 'german', 'bmw'],
  },
  {
    id: 1503,
    make: 'Chevrolet', model: 'Silverado 1500', year: 2024,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    price: { base: 35600, asFeatured: 65000 },
    category: 'Truck', rating: 4.3, reviewCount: 1456,
    specs: { engine: '5.3L EcoTec3 V8', horsepower: 355, torque: 383, transmission: '8-Speed Automatic', drivetrain: '4WD', fuelType: 'Gasoline', mpgCity: 16, mpgHighway: 20, mpgCombined: 18, seating: 6, cargo: 62.9, towingCapacity: 13300, length: 231.7, width: 81.2, height: 75.6, wheelbase: 147.4, curbWeight: 4850 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 4, source: 'NHTSA 2024' },
    trims: [
      { name: 'WT', price: 35600, features: ['Work truck basics', '17" steel wheels'] },
      { name: 'LTZ', price: 52600, features: ['Leather seats', 'Bose audio', 'Heated/cooled seats'] },
      { name: 'High Country', price: 62600, features: ['Premium leather', 'Head-up display', 'Max Trailering'] },
    ],
    pros: ['High towing capacity', 'V8 power', 'Comfortable cab'],
    cons: ['Poor fuel economy', 'Large size', 'Expensive trims'],
    tags: ['truck', 'towing', 'work', 'powerful', 'american'],
  },
  {
    id: 1504,
    make: 'Range Rover', model: 'Sport', year: 2024,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    price: { base: 84900, asFeatured: 140000 },
    category: 'Luxury SUV', rating: 4.5, reviewCount: 432,
    specs: { engine: '3.0L Turbocharged Inline-6 Mild Hybrid', horsepower: 355, torque: 369, transmission: '8-Speed Automatic', drivetrain: 'AWD', fuelType: 'Mild Hybrid', mpgCity: 20, mpgHighway: 26, mpgCombined: 22, seating: 5, cargo: 30.7, length: 191.7, width: 78.1, height: 68.9, wheelbase: 115.1, curbWeight: 4948 },
    safety: { overallRating: 5, frontCrash: 5, sideCrash: 5, rollover: 4, source: 'Euro NCAP' },
    trims: [
      { name: 'S', price: 84900, features: ['355hp mild hybrid', 'Terrain response 2', 'Air suspension', 'Meridian audio'] },
      { name: 'SVR', price: 135900, features: ['575hp supercharged V8', '0-60 in 4.3s', 'Performance exhaust', 'Carbon ceramic brakes'] },
    ],
    pros: ['Premium British luxury', 'Capable off-road', 'Stunning interior', 'Powerful options'],
    cons: ['Reliability concerns', 'Very expensive', 'High maintenance', 'Complex electronics'],
    tags: ['luxury', 'suv', 'british', 'offroad', 'premium'],
  },
  {
    id: 1505,
    make: 'McLaren', model: '720S', year: 2023,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: { base: 299000, asFeatured: 380000 },
    category: 'Supercar', rating: 4.9, reviewCount: 156,
    specs: { engine: '4.0L Twin-Turbo V8', horsepower: 710, torque: 568, transmission: '7-Speed DCT', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 15, mpgHighway: 22, mpgCombined: 18, seating: 2, cargo: 5.3, length: 178.9, width: 76.0, height: 47.1, wheelbase: 105.1, curbWeight: 2828 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: '720S', price: 299000, features: ['710hp V8', '0-60 in 2.8s', 'Proactive Chassis Control II', 'Dihedral doors'] },
      { name: '720S Spider', price: 331500, features: ['Retractable hardtop', 'Same performance', 'Open air supercar'] },
    ],
    pros: ['Dihedral doors', 'Incredible performance', 'Surprisingly practical', 'Superb chassis'],
    cons: ['Very expensive', 'McLaren reliability', 'Firm ride', 'Limited dealer network'],
    tags: ['supercar', 'mclaren', 'british', 'v8', 'exotic', 'fast'],
  },
  {
    id: 1506,
    make: 'Bugatti', model: 'Chiron', year: 2023,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    price: { base: 3300000, asFeatured: 4000000 },
    category: 'Hypercar', rating: 5.0, reviewCount: 23,
    specs: { engine: '8.0L Quad-Turbo W16', horsepower: 1479, torque: 1180, transmission: '7-Speed DCT', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 9, mpgHighway: 14, mpgCombined: 11, seating: 2, cargo: 3.5, length: 178.9, width: 80.2, height: 47.7, wheelbase: 106.7, curbWeight: 4398 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'Chiron', price: 3300000, features: ['1479hp W16', '261mph top speed', 'Quad turbos', 'Bespoke interior'] },
      { name: 'Super Sport 300+', price: 3900000, features: ['1577hp', '304mph record', 'Ultra limited', 'Longtail body'] },
    ],
    pros: ['Fastest production car', 'Ultimate engineering', 'Hand-built perfection', 'Prestige beyond measure'],
    cons: ['$3.3M+', 'Not street practical', 'Impossible to get', 'Special license needed at full speed'],
    tags: ['hypercar', 'bugatti', 'fastest', 'w16', 'exotic', 'ultimate'],
  },
  {
    id: 1507,
    make: 'Rolls-Royce', model: 'Phantom', year: 2024,
    image: 'https://images.unsplash.com/photo-1619362280286-f1f8fd5032ed?w=800',
    price: { base: 460000, asFeatured: 700000 },
    category: 'Ultra Luxury', rating: 4.9, reviewCount: 87,
    specs: { engine: '6.75L Twin-Turbo V12', horsepower: 563, torque: 664, transmission: '8-Speed Automatic', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 11, mpgHighway: 19, mpgCombined: 14, seating: 5, cargo: 16.8, length: 229.7, width: 80.4, height: 64.4, wheelbase: 140.6, curbWeight: 5644 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'Phantom', price: 460000, features: ['V12 engine', 'Starlight headliner', 'Gallery dashboard', 'Magic carpet ride'] },
      { name: 'Phantom Extended', price: 530000, features: ['10" longer wheelbase', 'Executive lounge seating', 'Champagne fridge', 'Privacy curtains'] },
    ],
    pros: ['Ultimate luxury', 'Whisper quiet', 'Handcrafted perfection', 'Unmatched prestige'],
    cons: ['Extremely expensive', 'Massive size', 'Poor fuel economy', 'Ostentatious'],
    tags: ['ultra-luxury', 'rolls-royce', 'v12', 'flagship', 'prestige'],
  },
  {
    id: 1508,
    make: 'Bentley', model: 'Continental GT', year: 2024,
    image: 'https://images.unsplash.com/photo-1619362280286-f1f8fd5032ed?w=800',
    price: { base: 227800, asFeatured: 310000 },
    category: 'Luxury GT', rating: 4.8, reviewCount: 234,
    specs: { engine: '6.0L Twin-Turbo W12', horsepower: 626, torque: 664, transmission: '8-Speed DCT', drivetrain: 'AWD', fuelType: 'Gasoline', mpgCity: 12, mpgHighway: 20, mpgCombined: 15, seating: 4, cargo: 12.7, length: 190.9, width: 76.7, height: 54.8, wheelbase: 108.1, curbWeight: 5050 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'V8', price: 202500, features: ['542hp V8', '0-60 in 3.9s', 'Luxury GT', 'Diamond quilted seats'] },
      { name: 'W12', price: 227800, features: ['626hp W12', '0-60 in 3.6s', 'Rotating dashboard', 'Naim audio'] },
      { name: 'Speed', price: 274900, features: ['659hp', 'Sport tuning', 'Dark chrome', 'Speed body styling'] },
    ],
    pros: ['Effortless performance', 'Handcrafted luxury', 'Grand touring perfection', 'Unique W12 engine'],
    cons: ['Very expensive', 'Poor fuel economy', 'Heavy', 'Complex electronics'],
    tags: ['luxury', 'gt', 'bentley', 'british', 'w12', 'grand-tourer'],
  },
  {
    id: 1509,
    make: 'Aston Martin', model: 'DB12', year: 2024,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    price: { base: 245000, asFeatured: 320000 },
    category: 'Luxury GT', rating: 4.7, reviewCount: 134,
    specs: { engine: '4.0L Twin-Turbo V8', horsepower: 671, torque: 590, transmission: '8-Speed Automatic', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 16, mpgHighway: 23, mpgCombined: 19, seating: 4, cargo: 5.3, length: 185.0, width: 76.0, height: 51.8, wheelbase: 103.0, curbWeight: 3769 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Euro NCAP' },
    trims: [
      { name: 'DB12', price: 245000, features: ['671hp V8', '0-60 in 3.5s', 'Updated interior', 'AMG-sourced engine'] },
      { name: 'Volante', price: 275000, features: ['Convertible', 'Same performance', 'Open air GT', 'Soft top'] },
    ],
    pros: ['Bond car heritage', 'Beautiful design', 'Involving to drive', 'Prestigious badge'],
    cons: ['Expensive', 'AMG engine divisive for purists', 'Firm ride', 'High running costs'],
    tags: ['luxury', 'gt', 'british', 'aston-martin', 'v8', 'exotic'],
  },
  {
    id: 1510,
    make: 'Lexus', model: 'LFA', year: 2012,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    price: { base: 750000, asFeatured: 1000000 },
    category: 'Supercar', rating: 5.0, reviewCount: 45,
    specs: { engine: '4.8L Naturally Aspirated V10', horsepower: 552, torque: 354, transmission: '6-Speed Sequential', drivetrain: 'RWD', fuelType: 'Gasoline', mpgCity: 11, mpgHighway: 17, mpgCombined: 13, seating: 2, cargo: 3.5, length: 177.0, width: 74.6, height: 46.3, wheelbase: 102.7, curbWeight: 3263 },
    safety: { overallRating: 4, frontCrash: 4, sideCrash: 4, rollover: 3, source: 'Japanese Standards' },
    trims: [
      { name: 'LFA', price: 750000, features: ['V10 screams to 9000rpm', 'Carbon fiber body', '500 made', 'Yamaha-tuned engine'] },
      { name: 'Nurburgring Package', price: 850000, features: ['Extra 10hp', 'Track-tuned', 'Stiffer setup', '50 produced'] },
    ],
    pros: ['Greatest naturally aspirated V10', 'Carbon fiber masterpiece', 'Appreciating collector', 'Japanese engineering peak'],
    cons: ['Incredibly expensive now', 'Only 500 made', 'Near impossible to find', 'High running costs'],
    tags: ['supercar', 'lexus', 'japanese', 'v10', 'collector', 'exotic'],
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
