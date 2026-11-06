import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Train, 
  Compass, 
  Calendar, 
  DollarSign, 
  Plus, 
  Upload, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Sparkles,
  BarChart3,
  Info
} from 'lucide-react';
import { UserScenario, MarketComp, NeighborhoodData } from '../../types';
import { DC_NEIGHBORHOODS, INITIAL_MARKET_COMPS, calculateCompStatistics } from '../../services/marketData';

interface MarketInsightsTabProps {
  scenario: UserScenario;
  onUpdateScenario: (updated: UserScenario) => void;
  onNavigateNext: () => void;
}

export const MarketInsightsTab: React.FC<MarketInsightsTabProps> = ({
  scenario,
  onUpdateScenario,
  onNavigateNext,
}) => {
  const [selectedWard, setSelectedWard] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [compsList, setCompsList] = useState<MarketComp[]>(INITIAL_MARKET_COMPS);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodData>(
    DC_NEIGHBORHOODS.find(n => n.name === scenario.property.neighborhood) || DC_NEIGHBORHOODS[0]
  );

  // New Comp Form State
  const [showAddComp, setShowAddComp] = useState<boolean>(false);
  const [newCompType, setNewCompType] = useState<string>('Entire Home');
  const [newCompRate, setNewCompRate] = useState<number>(220);
  const [newCompBeds, setNewCompBeds] = useState<number>(2);
  const [newCompCleaning, setNewCompCleaning] = useState<number>(90);
  const [newCompUrl, setNewCompUrl] = useState<string>('airbnb.com/rooms/example');

  // Filtered Neighborhoods
  const filteredNeighborhoods = DC_NEIGHBORHOODS.filter(n => {
    const matchWard = selectedWard === 'all' || n.ward === selectedWard;
    const matchSearch = n.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchWard && matchSearch;
  });

  // Calculate statistics for comps in current neighborhood
  const neighborhoodComps = compsList.filter(c => c.neighborhood === selectedNeighborhood.name);
  const effectiveComps = neighborhoodComps.length > 0 ? neighborhoodComps : compsList;
  const stats = calculateCompStatistics(effectiveComps);

  const handleSelectNeighborhood = (n: NeighborhoodData) => {
    setSelectedNeighborhood(n);
    onUpdateScenario({
      ...scenario,
      property: {
        ...scenario.property,
        neighborhood: n.name,
        ward: n.ward,
        zipCode: n.zipCodes[0] || scenario.property.zipCode,
      },
      pricing: {
        ...scenario.pricing,
        nightlyRate: n.medianNightlyRate,
      }
    });
  };

  const handleAddComp = (e: React.FormEvent) => {
    e.preventDefault();
    const newComp: MarketComp = {
      id: `comp-custom-${Date.now()}`,
      neighborhood: selectedNeighborhood.name,
      listingType: newCompType,
      bedrooms: newCompBeds,
      bathrooms: 1,
      capacity: newCompBeds * 2,
      nightlyRate: newCompRate,
      cleaningFee: newCompCleaning,
      amenities: ['Wifi', 'AC'],
      sourceUrl: newCompUrl,
      dateObserved: new Date().toISOString().split('T')[0],
      isVerified: true
    };
    setCompsList([newComp, ...compsList]);
    setShowAddComp(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part C · Market Intelligence</span>
          <span>·</span>
          <span>17 DC Neighborhoods & Comparable Comps</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          DC Neighborhood & Market Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore visitor drivers, Metro connectivity, and comparable listing distributions across Washington, DC.
        </p>
      </div>

      {/* Mandatory Data Quality Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-slate-900 dark:text-white">
            Data Quality Standard: Illustrative Demonstration Baseline
          </span>
          <p className="leading-relaxed text-[11px] text-slate-500 dark:text-slate-400">
            In compliance with our analytical standards, StayWise DC never fabricates live scraper streams or unauthorized Airbnb APIs. Benchmark medians are modeled reference assumptions for academic evaluation. You can enter or import your own real comparable listing observations below.
          </p>
        </div>
      </div>

      {/* Section 1: 17 DC Neighborhoods Explorer & Filter Strip */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Explore DC Neighborhood Profiles
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500 w-44"
              />
            </div>

            {/* Ward Filter */}
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
            >
              <option value="all">All Wards</option>
              <option value={1}>Ward 1 (Adams Morgan, Col Hts)</option>
              <option value={2}>Ward 2 (Georgetown, Dupont)</option>
              <option value={3}>Ward 3 (Cleveland Park)</option>
              <option value={4}>Ward 4 (Petworth)</option>
              <option value={5}>Ward 5 (Brookland, Bloomingdale)</option>
              <option value={6}>Ward 6 (Capitol Hill, Navy Yard)</option>
              <option value={8}>Ward 8 (Anacostia)</option>
            </select>
          </div>
        </div>

        {/* Neighborhood Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredNeighborhoods.map((n) => {
            const isCurrent = selectedNeighborhood.name === n.name;
            return (
              <button
                key={n.name}
                type="button"
                onClick={() => handleSelectNeighborhood(n)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 ring-2 ring-teal-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {n.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Ward {n.ward}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {n.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Median Benchmark ADR</span>
                    <span className="font-bold font-mono text-teal-600 dark:text-teal-400">
                      ${n.medianNightlyRate}/night
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Transit Score</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {n.transitScore}/100
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Neighborhood Deep Dive Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Active Selection
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {selectedNeighborhood.name} Deep Dive
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Tourist Draw: {selectedNeighborhood.touristDraw}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Business Draw: {selectedNeighborhood.businessDraw}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          
          {/* Column 1: Top Attractions */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
              Nearby Visitor Drivers
            </span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {selectedNeighborhood.topAttractions.map((att, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  <span>{att}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Transit & Metro */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
              <Train className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>WMATA Metro Stations</span>
            </span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {selectedNeighborhood.metroStations.map((station, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>{station}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Price Benchmark Distribution */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
              Nightly Rate Benchmark
            </span>
            <div className="text-2xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
              ${selectedNeighborhood.medianNightlyRate}
              <span className="text-xs text-slate-400 font-normal ml-1">/night median</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Typical Range: ${selectedNeighborhood.priceRange[0]} – ${selectedNeighborhood.priceRange[1]}
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300">
              Your scenario price: <strong>${scenario.pricing.nightlyRate}/night</strong> (
              {scenario.pricing.nightlyRate > selectedNeighborhood.medianNightlyRate ? 'Premium tier' : 'Value tier'}
              )
            </div>
          </div>

        </div>
      </div>

      {/* Section 2: Comparable Listings Benchmarking Tool */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Empirical Evidence Tool
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Comparable Listings & Pricing Distribution
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluate real or benchmarked competitor properties to position your pricing realistically.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddComp(!showAddComp)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Comp</span>
            </button>
          </div>
        </div>

        {/* Statistical Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Comps Sample Size</span>
            <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {stats.count} observations
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Median Rate</span>
            <span className="text-lg font-bold font-mono text-teal-600 dark:text-teal-400">
              ${stats.median}/night
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Interquartile Range (IQR)</span>
            <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              ${stats.q1} – ${stats.q3}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Your Proposed Rate</span>
            <span className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">
              ${scenario.pricing.nightlyRate}/night
            </span>
          </div>
        </div>

        {/* Add Comp Form Drawer */}
        {showAddComp && (
          <form onSubmit={handleAddComp} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4 text-xs animate-in fade-in duration-200">
            <h4 className="font-bold text-slate-900 dark:text-white">
              Add Verified Listing Observation for {selectedNeighborhood.name}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Listing Type</label>
                <input
                  type="text"
                  value={newCompType}
                  onChange={(e) => setNewCompType(e.target.value)}
                  placeholder="e.g. 2BR Rowhouse"
                  className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Nightly Rate ($)</label>
                <input
                  type="number"
                  value={newCompRate}
                  onChange={(e) => setNewCompRate(parseInt(e.target.value) || 0)}
                  className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Cleaning Fee ($)</label>
                <input
                  type="number"
                  value={newCompCleaning}
                  onChange={(e) => setNewCompCleaning(parseInt(e.target.value) || 0)}
                  className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Evidence Source URL</label>
                <input
                  type="text"
                  value={newCompUrl}
                  onChange={(e) => setNewCompUrl(e.target.value)}
                  placeholder="URL or listing ID"
                  className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddComp(false)}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-lg cursor-pointer"
              >
                Save Comparable Listing
              </button>
            </div>
          </form>
        )}

        {/* Comparable Listings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Neighborhood</th>
                <th className="py-2.5 px-3">Listing Arrangement</th>
                <th className="py-2.5 px-3">Beds / Baths</th>
                <th className="py-2.5 px-3 text-right">Nightly Rate</th>
                <th className="py-2.5 px-3 text-right">Cleaning Fee</th>
                <th className="py-2.5 px-3">Data Quality Status</th>
                <th className="py-2.5 px-3">Date Observed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {compsList.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {comp.neighborhood}
                  </td>
                  <td className="py-2.5 px-3">{comp.listingType}</td>
                  <td className="py-2.5 px-3">{comp.bedrooms} BR · {comp.bathrooms} BA</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-teal-600 dark:text-teal-400">
                    ${comp.nightlyRate}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono">${comp.cleaningFee}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-semibold ${
                      comp.isVerified
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {comp.isVerified ? 'User Verified' : 'Illustrative Assumption'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] font-mono">{comp.dateObserved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Continue Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to DC Legal Gate
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Calculate Revenue Forecast</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
