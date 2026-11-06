// Washington, DC Neighborhoods, Market Benchmark Comps, and Seasonality Engine
import { NeighborhoodData, MarketComp } from '../types';

export const DC_NEIGHBORHOODS: NeighborhoodData[] = [
  {
    name: 'Capitol Hill',
    ward: 6,
    zipCodes: ['20002', '20003'],
    description: 'Iconic historic rowhouses, steps from the U.S. Capitol, Supreme Court, Eastern Market, and Library of Congress.',
    medianNightlyRate: 235,
    priceRange: [165, 340],
    transitScore: 92,
    touristDraw: 'High',
    businessDraw: 'High',
    seasonalityStrength: 'High',
    topAttractions: ['U.S. Capitol', 'Eastern Market', 'Library of Congress', 'Barracks Row Dining'],
    metroStations: ['Capitol South (Blue/Orange/Silver)', 'Eastern Market', 'Union Station (Red)']
  },
  {
    name: 'Georgetown',
    ward: 2,
    zipCodes: ['20007'],
    description: 'Cobblestone streets, upscale M Street shopping, waterfront dining, and Georgetown University.',
    medianNightlyRate: 265,
    priceRange: [180, 420],
    transitScore: 78,
    touristDraw: 'High',
    businessDraw: 'Medium',
    seasonalityStrength: 'High',
    topAttractions: ['M Street Shopping', 'Georgetown Waterfront Park', 'C&O Canal', 'Georgetown University'],
    metroStations: ['Foggy Bottom-GWU (15 min walk)', 'Rosslyn (via Key Bridge)']
  },
  {
    name: 'Dupont Circle',
    ward: 2,
    zipCodes: ['20036', '20009'],
    description: 'Cosmopolitan hub with historic embassies, vibrant bistro culture, museums, and bookstores.',
    medianNightlyRate: 215,
    priceRange: [145, 310],
    transitScore: 96,
    touristDraw: 'High',
    businessDraw: 'High',
    seasonalityStrength: 'Moderate',
    topAttractions: ['Dupont Circle Fountain', 'Embassy Row', 'The Phillips Collection', 'Connecticut Ave Dining'],
    metroStations: ['Dupont Circle (Red Line)']
  },
  {
    name: 'Logan Circle',
    ward: 2,
    zipCodes: ['20005', '20009'],
    description: 'Trendy 14th Street corridor with award-winning dining, craft cocktail lounges, and Victorian architecture.',
    medianNightlyRate: 240,
    priceRange: [160, 360],
    transitScore: 95,
    touristDraw: 'High',
    businessDraw: 'Medium',
    seasonalityStrength: 'Moderate',
    topAttractions: ['14th Street Corridor', 'Studio Theatre', 'Historic Victorian Mansions'],
    metroStations: ['Dupont Circle (Red)', 'U Street (Green/Yellow)']
  },
  {
    name: 'Adams Morgan',
    ward: 1,
    zipCodes: ['20009'],
    description: 'Eclectic nightlife, multicultural dining on 18th Street, indie boutiques, and historic apartment buildings.',
    medianNightlyRate: 185,
    priceRange: [125, 275],
    transitScore: 89,
    touristDraw: 'Medium',
    businessDraw: 'Low',
    seasonalityStrength: 'Moderate',
    topAttractions: ['18th Street Dining & Music', 'Kalorama Park', 'Madam’s Organ Blues Bar'],
    metroStations: ['Woodley Park-Zoo (Red)', 'Columbia Heights (Green)']
  },
  {
    name: 'Shaw',
    ward: 6,
    zipCodes: ['20001'],
    description: 'Historic African-American cultural center, burgeoning culinary destination, Howard Theatre, and U Street proximity.',
    medianNightlyRate: 195,
    priceRange: [135, 290],
    transitScore: 94,
    touristDraw: 'Medium',
    businessDraw: 'Medium',
    seasonalityStrength: 'Moderate',
    topAttractions: ['Howard Theatre', '9:30 Club', 'Blagden Alley Michelin Dining'],
    metroStations: ['Shaw-Howard U (Green/Yellow Line)']
  },
  {
    name: 'Navy Yard / Capitol Riverfront',
    ward: 6,
    zipCodes: ['20003'],
    description: 'Modern waterfront community, home to Nationals Park, Audi Field, brewery patios, and Department of Transportation.',
    medianNightlyRate: 220,
    priceRange: [150, 330],
    transitScore: 91,
    touristDraw: 'High',
    businessDraw: 'High',
    seasonalityStrength: 'High',
    topAttractions: ['Nationals Park (MLB)', 'Yards Park Boardwalk', 'Audi Field (MLS)', 'Anacostia River Trail'],
    metroStations: ['Navy Yard-Ballpark (Green Line)']
  },
  {
    name: 'Petworth',
    ward: 4,
    zipCodes: ['20011'],
    description: 'Family-friendly residential enclave featuring tree-lined rowhouses, Lincoln’s Cottage, and Upshur Street restaurants.',
    medianNightlyRate: 145,
    priceRange: [100, 220],
    transitScore: 84,
    touristDraw: 'Medium',
    businessDraw: 'Low',
    seasonalityStrength: 'Moderate',
    topAttractions: ['President Lincoln’s Cottage', 'Upshur Street Books & Cafes', 'Petworth Park'],
    metroStations: ['Georgia Ave-Petworth (Green Line)']
  },
  {
    name: 'NoMa (North of Massachusetts Ave)',
    ward: 6,
    zipCodes: ['20002'],
    description: 'Fast-growing hub beside Union Market, Gallaudet University, and major corporate/governmental headquarters.',
    medianNightlyRate: 190,
    priceRange: [130, 280],
    transitScore: 93,
    touristDraw: 'Medium',
    businessDraw: 'High',
    seasonalityStrength: 'Mild',
    topAttractions: ['Union Market District', 'Metropolitan Branch Trail', 'Alethia Tanner Park'],
    metroStations: ['NoMa-Gallaudet U (Red Line)']
  },
  {
    name: 'Columbia Heights',
    ward: 1,
    zipCodes: ['20009', '20010'],
    description: 'High-density urban neighborhood with diverse eateries, DC USA retail plaza, and direct metro accessibility.',
    medianNightlyRate: 160,
    priceRange: [110, 240],
    transitScore: 93,
    touristDraw: 'Medium',
    businessDraw: 'Low',
    seasonalityStrength: 'Moderate',
    topAttractions: ['Tivoli Theatre', 'Meridian Hill / Malcolm X Park', '11th Street Hip Strip'],
    metroStations: ['Columbia Heights (Green Line)']
  },
  {
    name: 'Bloomingdale',
    ward: 5,
    zipCodes: ['20001'],
    description: 'Picturesque Victorian rowhouse architecture, neighborhood wine bars, Crispus Attucks Park, and quiet residential feel.',
    medianNightlyRate: 175,
    priceRange: [120, 260],
    transitScore: 86,
    touristDraw: 'Medium',
    businessDraw: 'Low',
    seasonalityStrength: 'Moderate',
    topAttractions: ['Crispus Attucks Park', 'First Street Dining Strip', 'Victorian Turret Architecture'],
    metroStations: ['Shaw-Howard U (12 min walk)', 'NoMa-Gallaudet (14 min walk)']
  },
  {
    name: 'Foggy Bottom',
    ward: 2,
    zipCodes: ['20037'],
    description: 'Home to George Washington University, the World Bank, IMF, State Department, and the Kennedy Center for Performing Arts.',
    medianNightlyRate: 225,
    priceRange: [155, 340],
    transitScore: 94,
    touristDraw: 'High',
    businessDraw: 'High',
    seasonalityStrength: 'Mild',
    topAttractions: ['The John F. Kennedy Center', 'Watergate Complex', 'World Bank / IMF'],
    metroStations: ['Foggy Bottom-GWU (Blue/Orange/Silver)']
  },
  {
    name: 'Cleveland Park',
    ward: 3,
    zipCodes: ['20008'],
    description: 'Leafy Northwest neighborhood with grand Victorian homes, the National Zoo, and Art Deco Uptown historic district.',
    medianNightlyRate: 195,
    priceRange: [135, 290],
    transitScore: 82,
    touristDraw: 'High',
    businessDraw: 'Low',
    seasonalityStrength: 'High',
    topAttractions: ['Smithsonian National Zoological Park', 'Tregaron Conservancy', 'Connecticut Ave Cafes'],
    metroStations: ['Cleveland Park (Red Line)', 'Woodley Park-Zoo (Red Line)']
  },
  {
    name: 'Southwest Waterfront / The Wharf',
    ward: 6,
    zipCodes: ['20024'],
    description: 'Premier billion-dollar maritime development, historic Municipal Fish Market, yacht marina, and Anthem concert hall.',
    medianNightlyRate: 255,
    priceRange: [175, 410],
    transitScore: 88,
    touristDraw: 'High',
    businessDraw: 'High',
    seasonalityStrength: 'High',
    topAttractions: ['The Wharf Promenade', 'Historic DC Fish Market', 'The Anthem', 'Water Taxi to Georgetown/Alexandria'],
    metroStations: ['Waterfront (Green Line)', 'L’Enfant Plaza (5 lines)']
  },
  {
    name: 'Mount Pleasant',
    ward: 1,
    zipCodes: ['20010'],
    description: 'Small-town village atmosphere bordered by Rock Creek Park, with vintage porches and Spanish-language panaderias.',
    medianNightlyRate: 165,
    priceRange: [115, 250],
    transitScore: 87,
    touristDraw: 'Medium',
    businessDraw: 'Low',
    seasonalityStrength: 'Moderate',
    topAttractions: ['Mount Pleasant Street', 'Rock Creek Park Trailheads', 'Pierce Mill'],
    metroStations: ['Columbia Heights (10 min walk)']
  },
  {
    name: 'Brookland',
    ward: 5,
    zipCodes: ['20017'],
    description: 'Nicknamed "Little Rome," home to Catholic University, Basilica of the National Shrine, Monroe Street Arts Walk.',
    medianNightlyRate: 140,
    priceRange: [95, 210],
    transitScore: 79,
    touristDraw: 'Medium',
    businessDraw: 'Low',
    seasonalityStrength: 'Moderate',
    topAttractions: ['Basilica of the National Shrine', 'Monroe Street Market & Arts Walk', 'Franciscan Monastery Gardens'],
    metroStations: ['Brookland-CUA (Red Line)']
  },
  {
    name: 'Anacostia',
    ward: 8,
    zipCodes: ['20020'],
    description: 'Rich historic district featuring Frederick Douglass National Historic Site, Anacostia Arts Center, and panoramic skyline views.',
    medianNightlyRate: 115,
    priceRange: [80, 185],
    transitScore: 72,
    touristDraw: 'Emerging',
    businessDraw: 'Low',
    seasonalityStrength: 'Moderate',
    topAttractions: ['Frederick Douglass Historic Site', 'Anacostia Community Museum', 'Anacostia Riverfront Park'],
    metroStations: ['Anacostia (Green Line)']
  }
];

// Benchmark Comparable Listings Dataset (Clearly labeled illustrative assumption)
export const INITIAL_MARKET_COMPS: MarketComp[] = [
  {
    id: 'comp-1',
    neighborhood: 'Capitol Hill',
    listingType: 'Entire Townhouse (Vacation)',
    bedrooms: 2,
    bathrooms: 1.5,
    capacity: 4,
    nightlyRate: 245,
    cleaningFee: 95,
    amenities: ['Wifi', 'AC', 'Washer/Dryer', 'Patio', 'Workspace'],
    sourceUrl: 'Sample DC Benchmark (Illustrative)',
    dateObserved: '2026-10-15',
    isVerified: false
  },
  {
    id: 'comp-2',
    neighborhood: 'Capitol Hill',
    listingType: 'Private Room in Rowhouse (Hosted)',
    bedrooms: 1,
    bathrooms: 1.0,
    capacity: 2,
    nightlyRate: 115,
    cleaningFee: 45,
    amenities: ['Wifi', 'AC', 'Private Bath', 'Self Check-in'],
    sourceUrl: 'Sample DC Benchmark (Illustrative)',
    dateObserved: '2026-10-18',
    isVerified: false
  },
  {
    id: 'comp-3',
    neighborhood: 'Petworth',
    listingType: 'Basement Apartment with Separate Entrance',
    bedrooms: 1,
    bathrooms: 1.0,
    capacity: 3,
    nightlyRate: 135,
    cleaningFee: 65,
    amenities: ['Private Entrance', 'Full Kitchen', 'Wifi', 'Metro Access'],
    sourceUrl: 'Sample DC Benchmark (Illustrative)',
    dateObserved: '2026-10-22',
    isVerified: false
  },
  {
    id: 'comp-4',
    neighborhood: 'Georgetown',
    listingType: 'Historic Rowhouse (Vacation)',
    bedrooms: 3,
    bathrooms: 2.5,
    capacity: 6,
    nightlyRate: 380,
    cleaningFee: 140,
    amenities: ['Luxury Kitchen', 'Garden', 'Fireplace', 'Parking Spot'],
    sourceUrl: 'Sample DC Benchmark (Illustrative)',
    dateObserved: '2026-10-25',
    isVerified: false
  },
  {
    id: 'comp-5',
    neighborhood: 'Dupont Circle',
    listingType: 'Condo Suite (Vacation)',
    bedrooms: 1,
    bathrooms: 1.0,
    capacity: 2,
    nightlyRate: 195,
    cleaningFee: 75,
    amenities: ['Elevator', 'Gym', 'Workspace', 'Rooftop Deck'],
    sourceUrl: 'Sample DC Benchmark (Illustrative)',
    dateObserved: '2026-10-28',
    isVerified: false
  },
  {
    id: 'comp-6',
    neighborhood: 'Shaw',
    listingType: 'Private Suite in Rowhouse (Hosted)',
    bedrooms: 1,
    bathrooms: 1.0,
    capacity: 2,
    nightlyRate: 125,
    cleaningFee: 50,
    amenities: ['Wifi', 'Coffee Bar', 'Smart Lock'],
    sourceUrl: 'Sample DC Benchmark (Illustrative)',
    dateObserved: '2026-11-01',
    isVerified: false
  }
];

export interface MonthlyDemandData {
  month: string;
  shortMonth: string;
  seasonalMultiplier: number;
  expectedOccupancy: number; // percentage
  driverTitle: string;
  driverDescription: string;
}

export const DC_MONTHLY_SEASONALITY: MonthlyDemandData[] = [
  {
    month: 'January',
    shortMonth: 'Jan',
    seasonalMultiplier: 0.75,
    expectedOccupancy: 45,
    driverTitle: 'Winter Low Season',
    driverDescription: 'Post-holiday lull and cold weather; government/court reconvening provides baseline business travel.'
  },
  {
    month: 'February',
    shortMonth: 'Feb',
    seasonalMultiplier: 0.85,
    expectedOccupancy: 52,
    driverTitle: 'Mid-Winter Demand',
    driverDescription: 'Presidents Day weekend and winter school breaks bring modest regional family visits.'
  },
  {
    month: 'March',
    shortMonth: 'Mar',
    seasonalMultiplier: 1.25,
    expectedOccupancy: 78,
    driverTitle: 'Cherry Blossom Festival Opening',
    driverDescription: 'Surge of national & international visitors for the National Cherry Blossom Festival along the Tidal Basin.'
  },
  {
    month: 'April',
    shortMonth: 'Apr',
    seasonalMultiplier: 1.35,
    expectedOccupancy: 85,
    driverTitle: 'Peak Spring Tourism',
    driverDescription: 'Peak blossom bloom, school spring breaks, and prime weather for National Mall sightseeing.'
  },
  {
    month: 'May',
    shortMonth: 'May',
    seasonalMultiplier: 1.30,
    expectedOccupancy: 82,
    driverTitle: 'University Graduations & Memorial Day',
    driverDescription: 'Major university commencements (Georgetown, GW, Howard, American) create high room demand.'
  },
  {
    month: 'June',
    shortMonth: 'Jun',
    seasonalMultiplier: 1.20,
    expectedOccupancy: 76,
    driverTitle: 'Summer Travel & Capital Pride',
    driverDescription: 'Summer family vacations, Capitol Pride parade, Smithsonian Folk life Festival buildup.'
  },
  {
    month: 'July',
    shortMonth: 'Jul',
    seasonalMultiplier: 1.15,
    expectedOccupancy: 72,
    driverTitle: 'Independence Day on the Mall',
    driverDescription: 'Massive July 4th fireworks crowd followed by steady family summer tourism.'
  },
  {
    month: 'August',
    shortMonth: 'Aug',
    seasonalMultiplier: 0.90,
    expectedOccupancy: 58,
    driverTitle: 'Congressional Recess & Heat',
    driverDescription: 'Congress leaves session; DC heat and humidity reduce tourist and business travel.'
  },
  {
    month: 'September',
    shortMonth: 'Sep',
    seasonalMultiplier: 1.18,
    expectedOccupancy: 74,
    driverTitle: 'Fall Business & Association Conferences',
    driverDescription: 'Congress returns; Walter E. Washington Convention Center hosts major fall association events.'
  },
  {
    month: 'October',
    shortMonth: 'Oct',
    seasonalMultiplier: 1.25,
    expectedOccupancy: 79,
    driverTitle: 'Peak Autumn Tourism & IMF/World Bank',
    driverDescription: 'Ideal autumn foliage, Marine Corps Marathon, and Annual World Bank/IMF meetings.'
  },
  {
    month: 'November',
    shortMonth: 'Nov',
    seasonalMultiplier: 0.95,
    expectedOccupancy: 60,
    driverTitle: 'Thanksgiving & Pre-Holiday',
    driverDescription: 'Moderate corporate travel early month, shifting to family holiday visitors at Thanksgiving.'
  },
  {
    month: 'December',
    shortMonth: 'Dec',
    seasonalMultiplier: 0.88,
    expectedOccupancy: 54,
    driverTitle: 'Holiday Lights & New Year',
    driverDescription: 'National Christmas Tree visits and holiday sightseeing concentrated in late December.'
  }
];

export function calculateCompStatistics(comps: MarketComp[]) {
  if (comps.length === 0) {
    return {
      count: 0,
      median: 0,
      q1: 0,
      q3: 0,
      iqr: 0,
      min: 0,
      max: 0
    };
  }

  const sortedRates = [...comps].map(c => c.nightlyRate).sort((a, b) => a - b);
  const count = sortedRates.length;
  const min = sortedRates[0];
  const max = sortedRates[count - 1];

  const median = count % 2 === 0
    ? (sortedRates[count / 2 - 1] + sortedRates[count / 2]) / 2
    : sortedRates[Math.floor(count / 2)];

  const q1Index = Math.floor(count * 0.25);
  const q3Index = Math.floor(count * 0.75);
  const q1 = sortedRates[q1Index];
  const q3 = sortedRates[q3Index];
  const iqr = q3 - q1;

  return {
    count,
    median: Math.round(median),
    q1: Math.round(q1),
    q3: Math.round(q3),
    iqr: Math.round(iqr),
    min,
    max
  };
}
