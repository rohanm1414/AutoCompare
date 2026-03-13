/**
 * expand-cars.js — appends year-specific entries for all popular models
 * Run: node scripts/expand-cars.js
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const CARS_FILE = path.join(__dirname, '../server/routes/cars.js');
const src = fs.readFileSync(CARS_FILE, 'utf8');

// ── Gather already-used IDs ──────────────────────────────────────────────
const usedIds = new Set([...(src.match(/\bid:\s*(\d+)/g) || [])].map(s => parseInt(s.replace(/\D/g,''))));
let nextId = 10000;
function uid() { while (usedIds.has(nextId)) nextId++; usedIds.add(nextId); return nextId++; }

// ── Gather already-used (make|model|year) combos ──────────────────────────
const makeModelYearRe = /make:\s*'([^']+)'[\s\S]{1,400}?model:\s*'([^']+)'[\s\S]{1,200}?year:\s*(\d{4})/g;
const existingSet = new Set();
let m;
while ((m = makeModelYearRe.exec(src)) !== null) {
  existingSet.add(`${m[1]}|${m[2]}|${m[3]}`);
}
console.log(`Found ${existingSet.size} existing (make|model|year) combos`);

// ── Price helper ──────────────────────────────────────────────────────────
function adj(base, carYear, targetYear) {
  const diff = targetYear - carYear;
  return Math.round(base * Math.max(0.78, Math.min(1.18, 1 + diff * 0.022)));
}

// ── Serialise a car object to JS object-literal string ───────────────────
function esc(s) { return String(s||'').replace(/'/g, "\\'"); }
function serializeCar(c) {
  const sp  = c.specs  || {};
  const mpg = sp.mpg   || {};
  const tags = (c.tags || []).map(t => `'${esc(t)}'`).join(', ');
  return `  {
    id: ${c.id}, make: '${esc(c.make)}', model: '${esc(c.model)}', year: ${c.year},
    category: '${esc(c.category)}',
    image: 'https://images.unsplash.com/photo-1492144533858528eb6c57?w=800',
    price: { base: ${c.price.base}, asFeatured: ${c.price.asFeatured} },
    rating: ${c.rating || 4.2},
    specs: {
      engine: '${esc(sp.engine)}', horsepower: ${sp.horsepower||0}, torque: ${sp.torque||0},
      transmission: '${esc(sp.transmission)}', drivetrain: '${esc(sp.drivetrain)||'FWD'}',
      fuelType: '${esc(sp.fuelType)||'Gasoline'}',
      mpg: { city: ${mpg.city||0}, highway: ${mpg.highway||0} },
      seating: ${sp.seating||5}, cargo: ${sp.cargo||0},
    },
    tags: [${tags}],
  }`;
}

// ── Master list of base models to expand ─────────────────────────────────
// Each entry represents ONE canonical version; the loop below creates
// copies for every year in YEARS.
const YEARS = [2019, 2020, 2021, 2022, 2023, 2025, 2026];

const BASE_MODELS = [
  // ── Toyota ──────────────────────────────────────────────────────────────
  { make:'Toyota', model:'Camry',      year:2024, category:'Sedan',    price:{base:27315,asFeatured:35000},rating:4.5, specs:{engine:'2.5L I4',horsepower:203,torque:184,transmission:'8-speed',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:28,highway:39},seating:5,cargo:15.1}, tags:['reliable','family','sedan','toyota'] },
  { make:'Toyota', model:'Corolla',    year:2024, category:'Sedan',    price:{base:22000,asFeatured:28000},rating:4.3, specs:{engine:'2.0L I4',horsepower:169,torque:151,transmission:'CVT',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:30,highway:38},seating:5,cargo:13.1}, tags:['reliable','affordable','sedan','toyota'] },
  { make:'Toyota', model:'RAV4',       year:2024, category:'SUV',      price:{base:28975,asFeatured:38000},rating:4.6, specs:{engine:'2.5L I4',horsepower:203,torque:184,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:27,highway:35},seating:5,cargo:37.6}, tags:['suv','family','reliable','toyota'] },
  { make:'Toyota', model:'RAV4 Hybrid',year:2024, category:'SUV',      price:{base:32750,asFeatured:40000},rating:4.7, specs:{engine:'2.5L Hybrid',horsepower:219,torque:163,transmission:'eCVT',drivetrain:'AWD',fuelType:'Hybrid',mpg:{city:41,highway:38},seating:5,cargo:37.6}, tags:['hybrid','suv','reliable','toyota'] },
  { make:'Toyota', model:'Highlander', year:2024, category:'SUV',      price:{base:36420,asFeatured:50000},rating:4.5, specs:{engine:'2.4L Turbo I4',horsepower:265,torque:309,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:29},seating:8,cargo:16.0}, tags:['3-row','family','suv','toyota'] },
  { make:'Toyota', model:'Tundra',     year:2024, category:'Truck',    price:{base:38765,asFeatured:58000},rating:4.4, specs:{engine:'3.4L Twin-Turbo V6',horsepower:389,torque:479,transmission:'10-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:17,highway:22},seating:5,cargo:0}, tags:['truck','toyota','powerful'] },
  { make:'Toyota', model:'Tacoma',     year:2024, category:'Truck',    price:{base:31500,asFeatured:46000},rating:4.5, specs:{engine:'2.4L Turbo I4',horsepower:278,torque:317,transmission:'8-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:20,highway:24},seating:5,cargo:0}, tags:['truck','midsize','toyota','off-road','reliable'] },
  { make:'Toyota', model:'Sienna',     year:2024, category:'Van',      price:{base:36085,asFeatured:48000},rating:4.4, specs:{engine:'2.5L Hybrid',horsepower:245,torque:175,transmission:'eCVT',drivetrain:'AWD',fuelType:'Hybrid',mpg:{city:36,highway:36},seating:8,cargo:39.0}, tags:['minivan','family','hybrid','toyota'] },
  { make:'Toyota', model:'GR Supra',   year:2024, category:'Sports Car',price:{base:43540,asFeatured:58000},rating:4.7, specs:{engine:'3.0L I6 TT',horsepower:382,torque:368,transmission:'8-speed',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:22,highway:30},seating:2,cargo:10.2}, tags:['sports','fast','coupe','toyota','jdm'] },
  { make:'Toyota', model:'GR86',       year:2024, category:'Sports Car',price:{base:29250,asFeatured:35000},rating:4.6, specs:{engine:'2.4L H4',horsepower:228,torque:184,transmission:'6-speed Manual',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:21,highway:31},seating:4,cargo:6.3}, tags:['sports','coupe','toyota','manual','rwd','jdm'] },
  { make:'Toyota', model:'Land Cruiser',year:2024,category:'SUV',      price:{base:57345,asFeatured:75000},rating:4.6, specs:{engine:'2.4L Twin-Turbo Hybrid',horsepower:326,torque:465,transmission:'8-speed',drivetrain:'4WD',fuelType:'Hybrid',mpg:{city:22,highway:25},seating:8,cargo:44.1}, tags:['suv','off-road','iconic','toyota','legendary'] },
  { make:'Toyota', model:'4Runner',    year:2024, category:'SUV',      price:{base:40045,asFeatured:53000},rating:4.5, specs:{engine:'2.4L Turbo I4',horsepower:278,torque:317,transmission:'8-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:20,highway:25},seating:5,cargo:47.2}, tags:['suv','off-road','toyota','4x4','trail'] },
  { make:'Toyota', model:'bZ4X',       year:2024, category:'SUV',      price:{base:44990,asFeatured:52000},rating:4.2, specs:{engine:'Electric',horsepower:201,torque:196,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:111,highway:94},seating:5,cargo:27.7}, tags:['electric','suv','ev','toyota'] },

  // ── Honda ────────────────────────────────────────────────────────────────
  { make:'Honda', model:'Civic',       year:2024, category:'Sedan',    price:{base:24200,asFeatured:31000},rating:4.5, specs:{engine:'2.0L I4',horsepower:158,torque:138,transmission:'CVT',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:31,highway:40},seating:5,cargo:14.8}, tags:['reliable','sedan','honda','compact'] },
  { make:'Honda', model:'Accord',      year:2024, category:'Sedan',    price:{base:30895,asFeatured:40000},rating:4.6, specs:{engine:'1.5L Turbo I4',horsepower:192,torque:192,transmission:'CVT',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:29,highway:37},seating:5,cargo:16.7}, tags:['reliable','sedan','honda','family'] },
  { make:'Honda', model:'Civic Type R',year:2024, category:'Sports Car',price:{base:44990,asFeatured:48000},rating:4.8, specs:{engine:'2.0L Turbo I4',horsepower:315,torque:310,transmission:'6-speed Manual',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:22,highway:28},seating:5,cargo:24.5}, tags:['sports','honda','manual','track','type-r'] },
  { make:'Honda', model:'CR-V',        year:2024, category:'SUV',      price:{base:30750,asFeatured:40000},rating:4.5, specs:{engine:'1.5L Turbo I4',horsepower:192,torque:192,transmission:'CVT',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:28,highway:34},seating:5,cargo:39.2}, tags:['suv','family','honda','compact'] },
  { make:'Honda', model:'CR-V Hybrid', year:2024, category:'SUV',      price:{base:34550,asFeatured:43000},rating:4.6, specs:{engine:'2.0L Hybrid',horsepower:204,torque:247,transmission:'eCVT',drivetrain:'AWD',fuelType:'Hybrid',mpg:{city:40,highway:35},seating:5,cargo:39.2}, tags:['hybrid','suv','honda'] },
  { make:'Honda', model:'Pilot',       year:2024, category:'SUV',      price:{base:40345,asFeatured:53000},rating:4.5, specs:{engine:'3.5L V6',horsepower:285,torque:262,transmission:'10-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:20,highway:27},seating:8,cargo:16.5}, tags:['suv','3-row','family','honda'] },
  { make:'Honda', model:'Odyssey',     year:2024, category:'Van',      price:{base:37720,asFeatured:48000},rating:4.5, specs:{engine:'3.5L V6',horsepower:280,torque:262,transmission:'10-speed',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:19,highway:28},seating:8,cargo:32.0}, tags:['minivan','family','honda'] },
  { make:'Honda', model:'Ridgeline',   year:2024, category:'Truck',    price:{base:40475,asFeatured:50000},rating:4.3, specs:{engine:'3.5L V6',horsepower:280,torque:262,transmission:'9-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:18,highway:24},seating:5,cargo:0}, tags:['truck','unibody','honda'] },
  { make:'Honda', model:'HR-V',        year:2024, category:'SUV',      price:{base:24895,asFeatured:31000},rating:4.2, specs:{engine:'2.0L I4',horsepower:158,torque:138,transmission:'CVT',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:28,highway:34},seating:5,cargo:24.4}, tags:['suv','subcompact','honda','affordable'] },
  { make:'Honda', model:'Prologue',    year:2024, category:'SUV',      price:{base:47400,asFeatured:57000},rating:4.3, specs:{engine:'Electric',horsepower:288,torque:333,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:119,highway:102},seating:5,cargo:0}, tags:['electric','suv','honda','ev'] },

  // ── Nissan ───────────────────────────────────────────────────────────────
  { make:'Nissan', model:'Altima',     year:2024, category:'Sedan',    price:{base:26140,asFeatured:33000},rating:4.3, specs:{engine:'2.5L I4',horsepower:182,torque:178,transmission:'CVT',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:28,highway:39},seating:5,cargo:15.4}, tags:['sedan','nissan','affordable','family'] },
  { make:'Nissan', model:'Sentra',     year:2024, category:'Sedan',    price:{base:20060,asFeatured:26000},rating:4.1, specs:{engine:'2.0L I4',horsepower:149,torque:146,transmission:'CVT',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:29,highway:39},seating:5,cargo:14.3}, tags:['sedan','nissan','affordable','compact'] },
  { make:'Nissan', model:'Rogue',      year:2024, category:'SUV',      price:{base:28040,asFeatured:36000},rating:4.4, specs:{engine:'1.5L Turbo I3',horsepower:201,torque:225,transmission:'CVT',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:30,highway:37},seating:5,cargo:36.5}, tags:['suv','nissan','family','compact'] },
  { make:'Nissan', model:'Pathfinder', year:2024, category:'SUV',      price:{base:35440,asFeatured:47000},rating:4.3, specs:{engine:'3.5L V6',horsepower:284,torque:259,transmission:'9-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:20,highway:27},seating:8,cargo:16.6}, tags:['suv','3-row','nissan','family'] },
  { make:'Nissan', model:'Murano',     year:2024, category:'SUV',      price:{base:38750,asFeatured:48000},rating:4.3, specs:{engine:'2.0L Turbo I4',horsepower:241,torque:260,transmission:'CVT',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:26,highway:30},seating:5,cargo:33.9}, tags:['suv','midsize','nissan','comfortable'] },
  { make:'Nissan', model:'Frontier',   year:2024, category:'Truck',    price:{base:30940,asFeatured:42000},rating:4.3, specs:{engine:'3.8L V6',horsepower:310,torque:281,transmission:'9-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:17,highway:23},seating:5,cargo:0}, tags:['truck','midsize','nissan'] },
  { make:'Nissan', model:'Leaf',       year:2024, category:'Sedan',    price:{base:28895,asFeatured:36000},rating:4.1, specs:{engine:'Electric',horsepower:147,torque:236,transmission:'Single-speed',drivetrain:'FWD',fuelType:'Electric',mpg:{city:123,highway:99},seating:5,cargo:23.6}, tags:['electric','nissan','ev','affordable'] },
  { make:'Nissan', model:'Ariya',      year:2024, category:'SUV',      price:{base:41680,asFeatured:52000},rating:4.3, specs:{engine:'Electric',horsepower:389,torque:442,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:92,highway:88},seating:5,cargo:24.8}, tags:['electric','suv','nissan','ev'] },

  // ── Ford ─────────────────────────────────────────────────────────────────
  { make:'Ford', model:'Bronco',       year:2024, category:'SUV',      price:{base:34495,asFeatured:55000},rating:4.7, specs:{engine:'2.3L Turbo I4',horsepower:300,torque:325,transmission:'7-speed Manual',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:20,highway:24},seating:4,cargo:23.0}, tags:['off-road','suv','ford','iconic','4x4'] },
  { make:'Ford', model:'Bronco Sport', year:2024, category:'SUV',      price:{base:30640,asFeatured:40000},rating:4.3, specs:{engine:'2.0L Turbo I4',horsepower:250,torque:280,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:24,highway:28},seating:5,cargo:32.5}, tags:['suv','compact','ford','off-road'] },
  { make:'Ford', model:'Explorer',     year:2024, category:'SUV',      price:{base:36760,asFeatured:52000},rating:4.3, specs:{engine:'2.3L Turbo I4',horsepower:300,torque:310,transmission:'10-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:28},seating:7,cargo:18.2}, tags:['suv','ford','3-row','family'] },
  { make:'Ford', model:'Edge',         year:2024, category:'SUV',      price:{base:37695,asFeatured:47000},rating:4.2, specs:{engine:'2.0L Turbo I4',horsepower:250,torque:280,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:29},seating:5,cargo:39.2}, tags:['suv','ford','midsize'] },
  { make:'Ford', model:'Maverick',     year:2024, category:'Truck',    price:{base:23315,asFeatured:32000},rating:4.4, specs:{engine:'2.5L Hybrid',horsepower:191,torque:155,transmission:'CVT',drivetrain:'FWD',fuelType:'Hybrid',mpg:{city:42,highway:33},seating:5,cargo:0}, tags:['truck','compact','hybrid','ford','affordable'] },
  { make:'Ford', model:'Ranger',       year:2024, category:'Truck',    price:{base:31870,asFeatured:44000},rating:4.3, specs:{engine:'2.3L Turbo I4',horsepower:270,torque:310,transmission:'10-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:21,highway:26},seating:5,cargo:0}, tags:['truck','midsize','ford'] },
  { make:'Ford', model:'Mach-E',       year:2024, category:'SUV',      price:{base:42995,asFeatured:52000},rating:4.4, specs:{engine:'Electric',horsepower:346,torque:428,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:96,highway:85},seating:5,cargo:29.7}, tags:['electric','suv','ford','ev'] },
  { make:'Ford', model:'F-250 Super Duty',year:2024,category:'Truck',  price:{base:46620,asFeatured:70000},rating:4.5, specs:{engine:'6.7L Diesel V8',horsepower:475,torque:1050,transmission:'10-speed',drivetrain:'4WD',fuelType:'Diesel',mpg:{city:15,highway:19},seating:6,cargo:0}, tags:['truck','heavy-duty','ford','diesel','work'] },

  // ── Chevrolet ────────────────────────────────────────────────────────────
  { make:'Chevrolet', model:'Trax',    year:2024, category:'SUV',      price:{base:20400,asFeatured:28000},rating:4.2, specs:{engine:'1.2L Turbo I3',horsepower:137,torque:162,transmission:'CVT',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:28,highway:32},seating:5,cargo:25.3}, tags:['suv','subcompact','chevrolet','affordable'] },
  { make:'Chevrolet', model:'Equinox', year:2024, category:'SUV',      price:{base:27995,asFeatured:37000},rating:4.3, specs:{engine:'1.5L Turbo I4',horsepower:175,torque:203,transmission:'6-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:26,highway:31},seating:5,cargo:29.9}, tags:['suv','chevrolet','family','compact'] },
  { make:'Chevrolet', model:'Equinox EV',year:2024,category:'SUV',    price:{base:34995,asFeatured:45000},rating:4.4, specs:{engine:'Electric',horsepower:210,torque:242,transmission:'Single-speed',drivetrain:'FWD',fuelType:'Electric',mpg:{city:121,highway:96},seating:5,cargo:29.9}, tags:['electric','suv','chevrolet','ev','affordable'] },
  { make:'Chevrolet', model:'Traverse', year:2024,category:'SUV',     price:{base:37895,asFeatured:52000},rating:4.3, specs:{engine:'2.5L Turbo I4',horsepower:328,torque:326,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:27},seating:8,cargo:23.0}, tags:['suv','3-row','chevrolet','family'] },
  { make:'Chevrolet', model:'Colorado', year:2024,category:'Truck',   price:{base:30395,asFeatured:42000},rating:4.4, specs:{engine:'2.7L Turbo I4',horsepower:310,torque:390,transmission:'8-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:18,highway:24},seating:5,cargo:0}, tags:['truck','midsize','chevrolet','off-road'] },
  { make:'Chevrolet', model:'Bolt EV',  year:2024,category:'Sedan',   price:{base:26500,asFeatured:32000},rating:4.2, specs:{engine:'Electric',horsepower:200,torque:266,transmission:'Single-speed',drivetrain:'FWD',fuelType:'Electric',mpg:{city:131,highway:109},seating:5,cargo:16.6}, tags:['electric','chevrolet','ev','affordable'] },
  { make:'Chevrolet', model:'Blazer EV',year:2024,category:'SUV',     price:{base:44995,asFeatured:56000},rating:4.3, specs:{engine:'Electric',horsepower:288,torque:333,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:111,highway:92},seating:5,cargo:17.2}, tags:['electric','suv','chevrolet','ev'] },

  // ── BMW ──────────────────────────────────────────────────────────────────
  { make:'BMW', model:'5 Series',      year:2024, category:'Sedan',    price:{base:57900,asFeatured:75000},rating:4.6, specs:{engine:'2.0L Turbo I4',horsepower:255,torque:295,transmission:'8-speed',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:24,highway:34},seating:5,cargo:14.8}, tags:['sedan','luxury','bmw','german','executive'] },
  { make:'BMW', model:'7 Series',      year:2024, category:'Luxury Sedan',price:{base:97500,asFeatured:130000},rating:4.7, specs:{engine:'3.0L Turbo I6',horsepower:375,torque:398,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:22,highway:31},seating:5,cargo:12.1}, tags:['luxury','bmw','flagship','sedan','german'] },
  { make:'BMW', model:'X3',            year:2024, category:'SUV',      price:{base:47100,asFeatured:60000},rating:4.5, specs:{engine:'2.0L Turbo I4',horsepower:248,torque:258,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:23,highway:29},seating:5,cargo:28.7}, tags:['suv','luxury','bmw','compact','german'] },
  { make:'BMW', model:'X5',            year:2024, category:'SUV',      price:{base:66800,asFeatured:88000},rating:4.7, specs:{engine:'3.0L Turbo I6',horsepower:375,torque:398,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:26},seating:7,cargo:33.9}, tags:['suv','luxury','bmw','german','family'] },
  { make:'BMW', model:'X7',            year:2024, category:'SUV',      price:{base:77900,asFeatured:110000},rating:4.6, specs:{engine:'3.0L Turbo I6',horsepower:375,torque:398,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:26},seating:7,cargo:21.8}, tags:['suv','luxury','bmw','3-row','flagship'] },
  { make:'BMW', model:'iX',            year:2024, category:'SUV',      price:{base:88100,asFeatured:110000},rating:4.5, specs:{engine:'Electric',horsepower:516,torque:564,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:86,highway:74},seating:5,cargo:35.5}, tags:['electric','suv','bmw','ev','luxury'] },
  { make:'BMW', model:'i4',            year:2024, category:'Sedan',    price:{base:56695,asFeatured:70000},rating:4.5, specs:{engine:'Electric',horsepower:335,torque:317,transmission:'Single-speed',drivetrain:'RWD',fuelType:'Electric',mpg:{city:110,highway:96},seating:5,cargo:10.0}, tags:['electric','sedan','bmw','ev','luxury'] },
  { make:'BMW', model:'i5',            year:2024, category:'Sedan',    price:{base:67800,asFeatured:85000},rating:4.6, specs:{engine:'Electric',horsepower:335,torque:317,transmission:'Single-speed',drivetrain:'RWD',fuelType:'Electric',mpg:{city:107,highway:94},seating:5,cargo:14.3}, tags:['electric','sedan','bmw','ev','luxury'] },
  { make:'BMW', model:'M3',            year:2024, category:'Sports Car',price:{base:75900,asFeatured:98000},rating:4.8, specs:{engine:'3.0L Twin-Turbo I6',horsepower:503,torque:479,transmission:'6-speed Manual',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:17,highway:26},seating:5,cargo:13.0}, tags:['performance','bmw','sedan','track','manual','m-division'] },
  { make:'BMW', model:'M5',            year:2024, category:'Sports Car',price:{base:110900,asFeatured:140000},rating:4.9, specs:{engine:'4.4L Twin-Turbo V8',horsepower:617,torque:553,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:15,highway:21},seating:5,cargo:14.8}, tags:['performance','bmw','sedan','v8','fast','m-division'] },

  // ── Mercedes-Benz ────────────────────────────────────────────────────────
  { make:'Mercedes-Benz', model:'C-Class',year:2024,category:'Sedan', price:{base:47200,asFeatured:62000},rating:4.5, specs:{engine:'2.0L Turbo I4',horsepower:255,torque:295,transmission:'9-speed',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:23,highway:34},seating:5,cargo:12.6}, tags:['sedan','luxury','mercedes','german','compact'] },
  { make:'Mercedes-Benz', model:'E-Class',year:2024,category:'Sedan', price:{base:56750,asFeatured:80000},rating:4.7, specs:{engine:'2.0L Turbo I4',horsepower:255,torque:295,transmission:'9-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:24,highway:33},seating:5,cargo:13.1}, tags:['sedan','luxury','mercedes','german','executive'] },
  { make:'Mercedes-Benz', model:'S-Class',year:2024,category:'Luxury Sedan',price:{base:115900,asFeatured:155000},rating:4.9, specs:{engine:'3.0L Turbo I6',horsepower:429,torque:384,transmission:'9-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:19,highway:27},seating:5,cargo:12.8}, tags:['luxury','flagship','mercedes','sedan','german'] },
  { make:'Mercedes-Benz', model:'GLC',    year:2024,category:'SUV',   price:{base:48400,asFeatured:64000},rating:4.6, specs:{engine:'2.0L Turbo I4',horsepower:258,torque:295,transmission:'9-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:24,highway:32},seating:5,cargo:22.9}, tags:['suv','luxury','mercedes','compact','german'] },
  { make:'Mercedes-Benz', model:'GLE',    year:2024,category:'SUV',   price:{base:59000,asFeatured:80000},rating:4.6, specs:{engine:'3.0L Turbo I6',horsepower:362,torque:369,transmission:'9-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:20,highway:26},seating:7,cargo:27.2}, tags:['suv','luxury','mercedes','midsize','german'] },
  { make:'Mercedes-Benz', model:'EQS',    year:2024,category:'Luxury Sedan',price:{base:105550,asFeatured:130000},rating:4.6, specs:{engine:'Electric',horsepower:516,torque:611,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:95,highway:82},seating:5,cargo:22.0}, tags:['electric','luxury','mercedes','flagship','ev'] },
  { make:'Mercedes-Benz', model:'EQE',    year:2024,category:'Sedan', price:{base:74900,asFeatured:92000},rating:4.5, specs:{engine:'Electric',horsepower:288,torque:391,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:99,highway:92},seating:5,cargo:22.0}, tags:['electric','sedan','mercedes','ev','luxury'] },
  { make:'Mercedes-Benz', model:'GLA',    year:2024,category:'SUV',   price:{base:38350,asFeatured:48000},rating:4.3, specs:{engine:'2.0L Turbo I4',horsepower:221,torque:258,transmission:'7-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:25,highway:35},seating:5,cargo:15.4}, tags:['suv','subcompact','mercedes','german','luxury'] },
  { make:'Mercedes-Benz', model:'AMG GT', year:2024,category:'Sports Car',price:{base:146000,asFeatured:190000},rating:4.8, specs:{engine:'4.0L Biturbo V8',horsepower:577,torque:590,transmission:'7-speed',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:16,highway:22},seating:2,cargo:5.3}, tags:['sports','exotic','mercedes','amg','v8','german','fast'] },

  // ── Audi ─────────────────────────────────────────────────────────────────
  { make:'Audi', model:'A3',           year:2024, category:'Sedan',    price:{base:35900,asFeatured:46000},rating:4.3, specs:{engine:'2.0L Turbo I4',horsepower:201,torque:221,transmission:'7-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:28,highway:35},seating:5,cargo:8.7}, tags:['sedan','luxury','audi','compact','german'] },
  { make:'Audi', model:'A4',           year:2024, category:'Sedan',    price:{base:42800,asFeatured:58000},rating:4.5, specs:{engine:'2.0L Turbo I4',horsepower:201,torque:221,transmission:'7-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:27,highway:34},seating:5,cargo:13.0}, tags:['sedan','luxury','audi','german','sporty'] },
  { make:'Audi', model:'A6',           year:2024, category:'Sedan',    price:{base:57900,asFeatured:75000},rating:4.6, specs:{engine:'3.0L Turbo V6',horsepower:335,torque:369,transmission:'7-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:29},seating:5,cargo:13.7}, tags:['sedan','luxury','audi','executive','german'] },
  { make:'Audi', model:'Q5',           year:2024, category:'SUV',      price:{base:45900,asFeatured:60000},rating:4.5, specs:{engine:'2.0L Turbo I4',horsepower:261,torque:273,transmission:'7-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:23,highway:28},seating:5,cargo:25.8}, tags:['suv','luxury','audi','compact','german'] },
  { make:'Audi', model:'Q7',           year:2024, category:'SUV',      price:{base:58400,asFeatured:80000},rating:4.6, specs:{engine:'3.0L Turbo V6',horsepower:335,torque:369,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:19,highway:26},seating:7,cargo:14.8}, tags:['suv','luxury','audi','3-row','german'] },
  { make:'Audi', model:'e-tron GT',    year:2024, category:'Sports Car',price:{base:106995,asFeatured:130000},rating:4.8, specs:{engine:'Electric',horsepower:522,torque:472,transmission:'2-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:78,highway:76},seating:4,cargo:4.0}, tags:['electric','sports','audi','ev','luxury','fast'] },
  { make:'Audi', model:'Q8',           year:2024, category:'SUV',      price:{base:72900,asFeatured:95000},rating:4.6, specs:{engine:'3.0L Turbo V6',horsepower:335,torque:369,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:17,highway:22},seating:5,cargo:30.5}, tags:['suv','luxury','audi','coupe-suv','german'] },
  { make:'Audi', model:'RS6 Avant',    year:2024, category:'Sports Car',price:{base:115600,asFeatured:145000},rating:4.9, specs:{engine:'4.0L Twin-Turbo V8',horsepower:591,torque:590,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:15,highway:22},seating:5,cargo:61.0}, tags:['sports','luxury','audi','wagon','fast','v8','german'] },

  // ── Hyundai ──────────────────────────────────────────────────────────────
  { make:'Hyundai', model:'Elantra',   year:2024, category:'Sedan',    price:{base:22000,asFeatured:30000},rating:4.4, specs:{engine:'2.0L I4',horsepower:147,torque:132,transmission:'CVT',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:33,highway:42},seating:5,cargo:14.2}, tags:['sedan','hyundai','korean','affordable'] },
  { make:'Hyundai', model:'Tucson',    year:2024, category:'SUV',      price:{base:29095,asFeatured:40000},rating:4.5, specs:{engine:'2.5L I4',horsepower:187,torque:178,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:26,highway:33},seating:5,cargo:38.7}, tags:['suv','hyundai','compact','korean'] },
  { make:'Hyundai', model:'Santa Fe',  year:2024, category:'SUV',      price:{base:34850,asFeatured:46000},rating:4.4, specs:{engine:'2.5L Turbo I4',horsepower:281,torque:311,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:22,highway:28},seating:7,cargo:36.4}, tags:['suv','hyundai','midsize','korean','family'] },
  { make:'Hyundai', model:'Palisade',  year:2024, category:'SUV',      price:{base:38575,asFeatured:51000},rating:4.6, specs:{engine:'3.8L V6',horsepower:291,torque:262,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:19,highway:26},seating:8,cargo:18.0}, tags:['suv','3-row','hyundai','korean','family'] },
  { make:'Hyundai', model:'Ioniq 5',   year:2024, category:'SUV',      price:{base:41450,asFeatured:55000},rating:4.7, specs:{engine:'Electric',horsepower:320,torque:446,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:110,highway:87},seating:5,cargo:27.2}, tags:['electric','suv','hyundai','ev','korean','800v'] },
  { make:'Hyundai', model:'Ioniq 6',   year:2024, category:'Sedan',    price:{base:38615,asFeatured:50000},rating:4.7, specs:{engine:'Electric',horsepower:320,torque:446,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:113,highway:96},seating:5,cargo:11.1}, tags:['electric','sedan','hyundai','ev','korean','award'] },
  { make:'Hyundai', model:'Kona Electric',year:2024,category:'SUV',   price:{base:33550,asFeatured:42000},rating:4.4, specs:{engine:'Electric',horsepower:201,torque:188,transmission:'Single-speed',drivetrain:'FWD',fuelType:'Electric',mpg:{city:133,highway:106},seating:5,cargo:19.2}, tags:['electric','suv','hyundai','ev','korean'] },

  // ── Kia ──────────────────────────────────────────────────────────────────
  { make:'Kia', model:'K5',            year:2024, category:'Sedan',    price:{base:25590,asFeatured:35000},rating:4.4, specs:{engine:'1.6L Turbo I4',horsepower:180,torque:195,transmission:'8-speed',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:29,highway:38},seating:5,cargo:16.0}, tags:['sedan','kia','korean','sporty','affordable'] },
  { make:'Kia', model:'Forte',         year:2024, category:'Sedan',    price:{base:20615,asFeatured:27000},rating:4.2, specs:{engine:'2.0L I4',horsepower:147,torque:132,transmission:'CVT',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:31,highway:41},seating:5,cargo:14.9}, tags:['sedan','kia','korean','affordable'] },
  { make:'Kia', model:'Sportage',      year:2024, category:'SUV',      price:{base:27790,asFeatured:38000},rating:4.4, specs:{engine:'2.5L I4',horsepower:187,torque:178,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:26,highway:33},seating:5,cargo:39.6}, tags:['suv','kia','compact','korean'] },
  { make:'Kia', model:'Sorento',       year:2024, category:'SUV',      price:{base:32195,asFeatured:46000},rating:4.5, specs:{engine:'2.5L Turbo I4',horsepower:281,torque:311,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:22,highway:29},seating:7,cargo:38.7}, tags:['suv','kia','midsize','3-row','korean'] },
  { make:'Kia', model:'Telluride',     year:2024, category:'SUV',      price:{base:35990,asFeatured:52000},rating:4.8, specs:{engine:'3.8L V6',horsepower:291,torque:262,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:20,highway:26},seating:8,cargo:21.0}, tags:['suv','kia','3-row','korean','best-in-class'] },
  { make:'Kia', model:'EV6',           year:2024, category:'SUV',      price:{base:42600,asFeatured:56000},rating:4.8, specs:{engine:'Electric',horsepower:320,torque:446,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:117,highway:92},seating:5,cargo:24.4}, tags:['electric','suv','kia','ev','korean','800v','award'] },
  { make:'Kia', model:'EV9',           year:2024, category:'SUV',      price:{base:54900,asFeatured:70000},rating:4.7, specs:{engine:'Electric',horsepower:379,torque:443,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:95,highway:80},seating:7,cargo:20.0}, tags:['electric','suv','kia','ev','korean','3-row','800v'] },
  { make:'Kia', model:'Stinger',       year:2024, category:'Sports Car',price:{base:43475,asFeatured:56000},rating:4.5, specs:{engine:'3.3L Twin-Turbo V6',horsepower:368,torque:376,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:18,highway:25},seating:5,cargo:23.1}, tags:['sports','kia','korean','fastback','v6'] },

  // ── Genesis ──────────────────────────────────────────────────────────────
  { make:'Genesis', model:'G70',       year:2024, category:'Sedan',    price:{base:38450,asFeatured:55000},rating:4.7, specs:{engine:'2.0T Turbo I4',horsepower:252,torque:260,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:22,highway:30},seating:5,cargo:10.2}, tags:['luxury','sedan','genesis','korean','sport','award'] },
  { make:'Genesis', model:'G80',       year:2024, category:'Luxury Sedan',price:{base:56000,asFeatured:75000},rating:4.7, specs:{engine:'2.5L Turbo I4',horsepower:300,torque:311,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:29},seating:5,cargo:13.7}, tags:['luxury','sedan','genesis','korean','executive'] },
  { make:'Genesis', model:'G90',       year:2024, category:'Luxury Sedan',price:{base:91750,asFeatured:115000},rating:4.8, specs:{engine:'3.5L Twin-Turbo V6',horsepower:409,torque:406,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:17,highway:24},seating:5,cargo:16.0}, tags:['luxury','flagship','genesis','korean','sedan'] },
  { make:'Genesis', model:'GV70',      year:2024, category:'SUV',      price:{base:44000,asFeatured:59000},rating:4.7, specs:{engine:'2.5L Turbo I4',horsepower:300,torque:311,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:22,highway:28},seating:5,cargo:28.9}, tags:['suv','luxury','genesis','korean','compact'] },
  { make:'Genesis', model:'GV80',      year:2024, category:'SUV',      price:{base:58645,asFeatured:80000},rating:4.7, specs:{engine:'2.5L Turbo I4',horsepower:300,torque:311,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:20,highway:26},seating:7,cargo:27.3}, tags:['suv','luxury','genesis','korean','midsize'] },
  { make:'Genesis', model:'Electrified GV70',year:2024,category:'SUV',price:{base:66450,asFeatured:82000},rating:4.7, specs:{engine:'Electric',horsepower:429,torque:516,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:117,highway:93},seating:5,cargo:28.9}, tags:['electric','suv','genesis','ev','korean','luxury','800v'] },
  { make:'Genesis', model:'GV60',      year:2024, category:'SUV',      price:{base:46000,asFeatured:60000},rating:4.6, specs:{engine:'Electric',horsepower:429,torque:516,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:117,highway:93},seating:5,cargo:24.2}, tags:['electric','suv','genesis','ev','korean','800v'] },

  // ── Tesla ────────────────────────────────────────────────────────────────
  { make:'Tesla', model:'Model Y',     year:2024, category:'SUV',      price:{base:43990,asFeatured:55000},rating:4.7, specs:{engine:'Electric',horsepower:456,torque:497,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:134,highway:120},seating:7,cargo:68.0}, tags:['electric','suv','tesla','ev','best-seller'] },
  { make:'Tesla', model:'Model X',     year:2024, category:'SUV',      price:{base:79990,asFeatured:110000},rating:4.6, specs:{engine:'Electric',horsepower:670,torque:713,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:102,highway:100},seating:7,cargo:88.0}, tags:['electric','suv','tesla','ev','falcon-wing'] },
  { make:'Tesla', model:'Cybertruck',  year:2024, category:'Truck',    price:{base:60990,asFeatured:100000},rating:4.3, specs:{engine:'Electric',horsepower:845,torque:1040,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:83,highway:77},seating:5,cargo:0}, tags:['electric','truck','tesla','ev','futuristic'] },
  { make:'Tesla', model:'Model S Plaid',year:2024,category:'Sedan',   price:{base:89990,asFeatured:110000},rating:4.8, specs:{engine:'Electric',horsepower:1020,torque:1050,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:96,highway:96},seating:5,cargo:28.0}, tags:['electric','sedan','tesla','ev','fastest','plaid'] },

  // ── Porsche ──────────────────────────────────────────────────────────────
  { make:'Porsche', model:'Macan',     year:2024, category:'SUV',      price:{base:57500,asFeatured:75000},rating:4.6, specs:{engine:'2.0L Turbo I4',horsepower:261,torque:295,transmission:'7-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:20,highway:25},seating:5,cargo:53.0}, tags:['suv','luxury','porsche','compact','german','sporty'] },
  { make:'Porsche', model:'Cayenne',   year:2024, category:'SUV',      price:{base:75800,asFeatured:100000},rating:4.7, specs:{engine:'3.0L Turbo V6',horsepower:348,torque:368,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:19,highway:23},seating:5,cargo:27.1}, tags:['suv','luxury','porsche','midsize','german','powerful'] },
  { make:'Porsche', model:'Taycan',    year:2024, category:'Sports Car',price:{base:93300,asFeatured:130000},rating:4.8, specs:{engine:'Electric',horsepower:530,torque:479,transmission:'2-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:82,highway:68},seating:4,cargo:14.3}, tags:['electric','sports','porsche','ev','800v','german','fast'] },
  { make:'Porsche', model:'Panamera',  year:2024, category:'Luxury Sedan',price:{base:97900,asFeatured:130000},rating:4.7, specs:{engine:'2.9L Twin-Turbo V6',horsepower:348,torque:368,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:19,highway:26},seating:4,cargo:17.5}, tags:['luxury','sports','porsche','sedan','german'] },

  // ── Lexus ────────────────────────────────────────────────────────────────
  { make:'Lexus', model:'IS',          year:2024, category:'Sedan',    price:{base:40575,asFeatured:54000},rating:4.4, specs:{engine:'2.0L Turbo I4',horsepower:241,torque:258,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:22,highway:32},seating:5,cargo:10.8}, tags:['sedan','luxury','lexus','japanese','sporty'] },
  { make:'Lexus', model:'ES',          year:2024, category:'Luxury Sedan',price:{base:42950,asFeatured:58000},rating:4.6, specs:{engine:'2.5L I4',horsepower:203,torque:184,transmission:'8-speed',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:25,highway:34},seating:5,cargo:16.7}, tags:['luxury','sedan','lexus','japanese','comfortable'] },
  { make:'Lexus', model:'RX',          year:2024, category:'SUV',      price:{base:48150,asFeatured:65000},rating:4.6, specs:{engine:'2.4L Turbo I4',horsepower:275,torque:317,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:28},seating:5,cargo:29.6}, tags:['suv','luxury','lexus','japanese','reliable'] },
  { make:'Lexus', model:'GX',          year:2024, category:'SUV',      price:{base:65250,asFeatured:82000},rating:4.5, specs:{engine:'3.4L Twin-Turbo V6',horsepower:349,torque:479,transmission:'10-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:18,highway:24},seating:7,cargo:11.6}, tags:['suv','luxury','lexus','japanese','off-road'] },
  { make:'Lexus', model:'LX',          year:2024, category:'SUV',      price:{base:91150,asFeatured:115000},rating:4.5, specs:{engine:'3.4L Twin-Turbo V6',horsepower:409,torque:479,transmission:'10-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:15,highway:19},seating:7,cargo:10.1}, tags:['suv','luxury','lexus','japanese','off-road','flagship'] },

  // ── Subaru / Mazda ───────────────────────────────────────────────────────
  { make:'Subaru', model:'Outback',    year:2024, category:'SUV',      price:{base:29195,asFeatured:38000},rating:4.5, specs:{engine:'2.5L H4',horsepower:182,torque:176,transmission:'CVT',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:26,highway:33},seating:5,cargo:75.7}, tags:['suv','subaru','all-weather','awd','reliable'] },
  { make:'Subaru', model:'Crosstrek',  year:2024, category:'SUV',      price:{base:26995,asFeatured:34000},rating:4.4, specs:{engine:'2.5L H4',horsepower:182,torque:176,transmission:'CVT',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:28,highway:35},seating:5,cargo:55.3}, tags:['suv','subaru','compact','awd','outdoor'] },
  { make:'Subaru', model:'Impreza',    year:2024, category:'Sedan',    price:{base:23045,asFeatured:30000},rating:4.2, specs:{engine:'2.0L H4',horsepower:152,torque:145,transmission:'CVT',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:28,highway:36},seating:5,cargo:12.3}, tags:['sedan','subaru','awd','compact','sporty'] },
  { make:'Subaru', model:'WRX',        year:2024, category:'Sports Car',price:{base:31195,asFeatured:42000},rating:4.5, specs:{engine:'2.4L Turbo H4',horsepower:271,torque:258,transmission:'6-speed Manual',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:19,highway:26},seating:5,cargo:12.5}, tags:['sports','subaru','awd','turbo','rally','manual'] },
  { make:'Subaru', model:'Forester',   year:2024, category:'SUV',      price:{base:28495,asFeatured:37000},rating:4.4, specs:{engine:'2.5L H4',horsepower:182,torque:176,transmission:'CVT',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:26,highway:33},seating:5,cargo:76.1}, tags:['suv','subaru','family','awd','practical'] },
  { make:'Mazda', model:'CX-5',        year:2024, category:'SUV',      price:{base:29000,asFeatured:38000},rating:4.5, specs:{engine:'2.5L I4',horsepower:187,torque:186,transmission:'6-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:24,highway:30},seating:5,cargo:30.9}, tags:['suv','mazda','compact','premium','japanese'] },
  { make:'Mazda', model:'CX-50',       year:2024, category:'SUV',      price:{base:30840,asFeatured:40000},rating:4.5, specs:{engine:'2.5L I4',horsepower:187,torque:186,transmission:'6-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:25,highway:31},seating:5,cargo:31.4}, tags:['suv','mazda','compact','sporty','japanese'] },
  { make:'Mazda', model:'CX-90',       year:2024, category:'SUV',      price:{base:40470,asFeatured:56000},rating:4.6, specs:{engine:'3.3L Turbo I6',horsepower:340,torque:369,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:23,highway:29},seating:7,cargo:14.4}, tags:['suv','mazda','3-row','luxury','japanese'] },
  { make:'Mazda', model:'MX-5 Miata',  year:2024, category:'Convertible',price:{base:29050,asFeatured:34000},rating:4.8, specs:{engine:'2.0L I4',horsepower:181,torque:151,transmission:'6-speed Manual',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:26,highway:35},seating:2,cargo:4.6}, tags:['sports','convertible','mazda','roadster','manual','fun'] },

  // ── Cadillac / Lincoln extra ─────────────────────────────────────────────
  { make:'Cadillac', model:'Escalade', year:2024, category:'SUV',      price:{base:81390,asFeatured:120000},rating:4.7, specs:{engine:'6.2L V8',horsepower:420,torque:460,transmission:'10-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:14,highway:20},seating:7,cargo:25.5}, tags:['suv','luxury','cadillac','american','v8','flagship'] },
  { make:'Cadillac', model:'Lyriq',    year:2024, category:'SUV',      price:{base:58590,asFeatured:72000},rating:4.5, specs:{engine:'Electric',horsepower:340,torque:325,transmission:'Single-speed',drivetrain:'RWD',fuelType:'Electric',mpg:{city:105,highway:88},seating:5,cargo:28.9}, tags:['electric','suv','cadillac','ev','american','luxury'] },
  { make:'Cadillac', model:'CT5-V Blackwing',year:2024,category:'Sports Car',price:{base:92990,asFeatured:115000},rating:4.9, specs:{engine:'6.2L Supercharged V8',horsepower:668,torque:659,transmission:'6-speed Manual',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:14,highway:21},seating:5,cargo:12.0}, tags:['sports','performance','cadillac','v8','supercharged','manual','american'] },
  { make:'Lincoln', model:'Corsair',   year:2024, category:'SUV',      price:{base:42190,asFeatured:55000},rating:4.4, specs:{engine:'2.0L Turbo I4',horsepower:250,torque:280,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:22,highway:30},seating:5,cargo:27.3}, tags:['suv','luxury','lincoln','american','compact'] },
  { make:'Lincoln', model:'Aviator',   year:2024, category:'SUV',      price:{base:55645,asFeatured:80000},rating:4.6, specs:{engine:'3.0L Twin-Turbo V6',horsepower:400,torque:415,transmission:'10-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:17,highway:24},seating:7,cargo:18.3}, tags:['suv','luxury','lincoln','american','3-row','powerful'] },

  // ── Volkswagen / MINI ────────────────────────────────────────────────────
  { make:'Volkswagen', model:'Jetta',  year:2024, category:'Sedan',    price:{base:22645,asFeatured:30000},rating:4.2, specs:{engine:'1.5L Turbo I4',horsepower:158,torque:184,transmission:'8-speed',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:29,highway:40},seating:5,cargo:14.1}, tags:['sedan','volkswagen','german','affordable'] },
  { make:'Volkswagen', model:'Tiguan', year:2024, category:'SUV',      price:{base:30265,asFeatured:42000},rating:4.3, specs:{engine:'2.0L Turbo I4',horsepower:184,torque:221,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:23,highway:30},seating:7,cargo:37.6}, tags:['suv','volkswagen','german','compact','family'] },
  { make:'Volkswagen', model:'Atlas',  year:2024, category:'SUV',      price:{base:37965,asFeatured:51000},rating:4.2, specs:{engine:'2.0L Turbo I4',horsepower:269,torque:273,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:27},seating:8,cargo:20.6}, tags:['suv','volkswagen','german','3-row','family'] },
  { make:'Volkswagen', model:'ID.4',   year:2024, category:'SUV',      price:{base:38995,asFeatured:50000},rating:4.4, specs:{engine:'Electric',horsepower:295,torque:339,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:107,highway:91},seating:5,cargo:30.3}, tags:['electric','suv','volkswagen','ev','german'] },

  // ── Acura / Infiniti ─────────────────────────────────────────────────────
  { make:'Acura', model:'Integra',     year:2024, category:'Sports Car',price:{base:32895,asFeatured:42000},rating:4.5, specs:{engine:'1.5L Turbo I4',horsepower:200,torque:192,transmission:'6-speed Manual',drivetrain:'FWD',fuelType:'Gasoline',mpg:{city:26,highway:35},seating:5,cargo:24.3}, tags:['sports','acura','japanese','manual','sporty'] },
  { make:'Acura', model:'TLX',         year:2024, category:'Sedan',    price:{base:46900,asFeatured:63000},rating:4.6, specs:{engine:'2.0L Turbo I4',horsepower:272,torque:280,transmission:'10-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:22,highway:31},seating:5,cargo:13.5}, tags:['luxury','sedan','acura','japanese','sporty'] },
  { make:'Acura', model:'MDX',         year:2024, category:'SUV',      price:{base:49200,asFeatured:66000},rating:4.6, specs:{engine:'3.5L V6',horsepower:290,torque:267,transmission:'10-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:19,highway:26},seating:7,cargo:16.3}, tags:['suv','luxury','acura','japanese','3-row','flagship'] },
  { make:'Infiniti', model:'Q50',      year:2024, category:'Sedan',    price:{base:41800,asFeatured:58000},rating:4.3, specs:{engine:'3.0L Twin-Turbo V6',horsepower:300,torque:295,transmission:'7-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:20,highway:27},seating:5,cargo:13.5}, tags:['luxury','sedan','infiniti','japanese','v6'] },
  { make:'Infiniti', model:'QX60',     year:2024, category:'SUV',      price:{base:50045,asFeatured:67000},rating:4.4, specs:{engine:'3.5L V6',horsepower:295,torque:270,transmission:'9-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:20,highway:27},seating:7,cargo:14.5}, tags:['suv','luxury','infiniti','japanese','3-row'] },

  // ── Alfa Romeo / Maserati ────────────────────────────────────────────────
  { make:'Alfa Romeo', model:'Giulia', year:2024, category:'Sedan',    price:{base:46650,asFeatured:62000},rating:4.4, specs:{engine:'2.0L Turbo I4',horsepower:280,torque:306,transmission:'8-speed',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:21,highway:32},seating:5,cargo:11.6}, tags:['sedan','sports','alfa-romeo','italian','rwd'] },
  { make:'Alfa Romeo', model:'Stelvio',year:2024, category:'SUV',      price:{base:47300,asFeatured:62000},rating:4.3, specs:{engine:'2.0L Turbo I4',horsepower:280,torque:306,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:21,highway:29},seating:5,cargo:18.5}, tags:['suv','sports','alfa-romeo','italian','sporty'] },
  { make:'Maserati', model:'Ghibli',   year:2024, category:'Sedan',    price:{base:75990,asFeatured:98000},rating:4.2, specs:{engine:'3.0L Twin-Turbo V6',horsepower:345,torque:369,transmission:'8-speed',drivetrain:'RWD',fuelType:'Gasoline',mpg:{city:17,highway:24},seating:5,cargo:18.0}, tags:['luxury','sports','maserati','italian','sedan','exotic'] },

  // ── Dodge / Jeep / Ram extra ─────────────────────────────────────────────
  { make:'Dodge', model:'Durango',     year:2024, category:'SUV',      price:{base:39495,asFeatured:58000},rating:4.3, specs:{engine:'3.6L V6',horsepower:293,torque:260,transmission:'8-speed',drivetrain:'AWD',fuelType:'Gasoline',mpg:{city:17,highway:25},seating:7,cargo:17.2}, tags:['suv','dodge','american','3-row','muscle'] },
  { make:'Jeep', model:'Gladiator',    year:2024, category:'Truck',    price:{base:40195,asFeatured:55000},rating:4.4, specs:{engine:'3.6L V6',horsepower:285,torque:260,transmission:'8-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:17,highway:22},seating:5,cargo:0}, tags:['truck','jeep','off-road','wrangler','open-air'] },
  { make:'Jeep', model:'Grand Wagoneer',year:2024,category:'SUV',     price:{base:60970,asFeatured:90000},rating:4.5, specs:{engine:'6.4L HEMI V8',horsepower:471,torque:455,transmission:'8-speed',drivetrain:'4WD',fuelType:'Gasoline',mpg:{city:13,highway:18},seating:8,cargo:27.4}, tags:['suv','luxury','jeep','3-row','american','v8'] },
  { make:'Ram', model:'2500 Heavy Duty',year:2024,category:'Truck',   price:{base:46110,asFeatured:70000},rating:4.5, specs:{engine:'6.7L Cummins Diesel',horsepower:370,torque:850,transmission:'6-speed',drivetrain:'4WD',fuelType:'Diesel',mpg:{city:15,highway:19},seating:6,cargo:0}, tags:['truck','heavy-duty','ram','diesel','work','cummins'] },

  // ── Rivian / Lucid / BYD ────────────────────────────────────────────────
  { make:'Rivian', model:'R1S',        year:2024, category:'SUV',      price:{base:77900,asFeatured:102000},rating:4.7, specs:{engine:'Electric',horsepower:835,torque:908,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:72,highway:65},seating:7,cargo:104.7}, tags:['electric','suv','rivian','ev','off-road','american','adventure'] },
  { make:'Lucid', model:'Air Grand Touring',year:2024,category:'Luxury Sedan',price:{base:138000,asFeatured:165000},rating:4.8, specs:{engine:'Electric',horsepower:819,torque:885,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:131,highway:112},seating:5,cargo:21.0}, tags:['electric','luxury','lucid','ev','american','range','flagship'] },
  { make:'BYD', model:'Atto 3',        year:2024, category:'SUV',      price:{base:38500,asFeatured:46000},rating:4.2, specs:{engine:'Electric',horsepower:201,torque:310,transmission:'Single-speed',drivetrain:'FWD',fuelType:'Electric',mpg:{city:116,highway:100},seating:5,cargo:19.7}, tags:['electric','suv','byd','chinese','ev'] },
  { make:'BYD', model:'Seal',          year:2024, category:'Sedan',    price:{base:42500,asFeatured:52000},rating:4.4, specs:{engine:'Electric',horsepower:523,torque:670,transmission:'Single-speed',drivetrain:'AWD',fuelType:'Electric',mpg:{city:113,highway:98},seating:5,cargo:12.3}, tags:['electric','sedan','byd','chinese','ev','sporty'] },
];

// ── Generate all year variants for all base models ─────────────────────────
const newEntries = [];

for (const base of BASE_MODELS) {
  const baseKey = `${base.make}|${base.model}|${base.year}`;
  // If the 2024 version is NOT in existing set, include it
  if (!existingSet.has(baseKey)) {
    existingSet.add(baseKey);
    newEntries.push({ ...base, id: uid() });
  }
  // Year variants
  for (const yr of YEARS) {
    const key = `${base.make}|${base.model}|${yr}`;
    if (existingSet.has(key)) continue;
    existingSet.add(key);
    newEntries.push({
      ...base,
      id:    uid(),
      year:  yr,
      price: { base: adj(base.price.base, base.year, yr), asFeatured: adj(base.price.asFeatured, base.year, yr) },
    });
  }
}

console.log(`New entries to append: ${newEntries.length}`);

// ── Append to file ────────────────────────────────────────────────────────
const newJs = newEntries.map(serializeCar).join(',\n');
const insertPoint = src.lastIndexOf('];');
if (insertPoint === -1) { console.error('Could not find end of cars array'); process.exit(1); }

const newSrc = src.slice(0, insertPoint) + ',\n' + newJs + '\n' + src.slice(insertPoint);
fs.writeFileSync(CARS_FILE, newSrc, 'utf8');

console.log(`✅ Done! File is now ${(newSrc.length / 1024).toFixed(0)} KB`);
console.log(`   Syntax check running...`);
