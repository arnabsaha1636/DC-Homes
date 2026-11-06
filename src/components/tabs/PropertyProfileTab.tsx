import React, { useState } from 'react';
import { 
  Home, 
  Bed, 
  MapPin, 
  Shield, 
  FileCheck, 
  Sparkles, 
  HelpCircle, 
  Check, 
  AlertCircle,
  Key,
  Users,
  Flame,
  ShieldAlert,
  Info
} from 'lucide-react';
import { UserScenario, RentalType, PropertyType, HOARestriction } from '../../types';
import { DC_NEIGHBORHOODS } from '../../services/marketData';

interface PropertyProfileTabProps {
  scenario: UserScenario;
  onUpdateScenario: (updated: UserScenario) => void;
  onNavigateNext: () => void;
}

export const PropertyProfileTab: React.FC<PropertyProfileTabProps> = ({
  scenario,
  onUpdateScenario,
  onNavigateNext,
}) => {
  const [isDetailedMode, setIsDetailedMode] = useState(false);

  const { property, owner } = scenario;

  const handleRentalTypeChange = (type: RentalType) => {
    const isHosted = type === 'hosted_room';
    const isInvest = type === 'investment_property';
    
    onUpdateScenario({
      ...scenario,
      property: {
        ...property,
        rentalType: type,
      },
      owner: {
        ...owner,
        livesOnSiteDuringStays: isHosted,
        isPrimaryResidence: !isInvest,
        isInvestmentProperty: isInvest,
      }
    });
  };

  const handlePropertyFieldChange = (field: keyof typeof property, val: any) => {
    onUpdateScenario({
      ...scenario,
      property: {
        ...property,
        [field]: val,
      }
    });
  };

  const handleOwnerFieldChange = (field: keyof typeof owner, val: any) => {
    onUpdateScenario({
      ...scenario,
      owner: {
        ...owner,
        [field]: val,
      }
    });
  };

  const rentalOptions: { id: RentalType; title: string; desc: string; legalNote: string }[] = [
    {
      id: 'hosted_room',
      title: 'Spare Bedroom (Hosted)',
      desc: 'I live on-site in my home while hosting guests in a private room.',
      legalNote: 'No 90-night annual statutory cap under DC law when host is present.'
    },
    {
      id: 'entire_home_away',
      title: 'Entire Home While Away (Vacation)',
      desc: 'I rent my primary residence to guests while traveling or on vacation.',
      legalNote: 'Strictly limited to 90 cumulative nights per year under DC Code § 30-201.06.'
    },
    {
      id: 'basement_adu',
      title: 'Basement or Accessory Unit (ADU)',
      desc: 'English basement or carriage house on my primary residential parcel.',
      legalNote: 'Classified as hosted if host occupies main dwelling and zoning permits.'
    },
    {
      id: 'investment_property',
      title: 'Second / Investment Property',
      desc: 'A dedicated rental unit that is NOT my personal primary residence.',
      legalNote: 'LEGALLY PROHIBITED from short-term rentals under current DC law.'
    },
    {
      id: 'undecided',
      title: 'I am not sure yet',
      desc: 'Exploring potential configurations for my DC residential property.',
      legalNote: 'We will evaluate feasibility across all permitted DC categories.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Property & Ownership Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Provide details about your home and legal ownership to determine DC regulatory compliance.
          </p>
        </div>

        {/* 60-Sec Quick Assessment vs Detailed Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setIsDetailedMode(false)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              !isDetailedMode
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            60-Sec Assessment
          </button>
          <button
            onClick={() => setIsDetailedMode(true)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              isDetailedMode
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Detailed Audit
          </button>
        </div>
      </div>

      {/* Question 1: What are you thinking of renting out? */}
      <div className="space-y-4">
        <div>
          <label className="text-base font-bold text-slate-900 dark:text-white block">
            1. What space are you thinking of renting out?
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            DC short-term rental law distinguishes strictly between hosted stays and vacant homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {rentalOptions.map((opt) => {
            const isSelected = property.rentalType === opt.id;
            const isInvest = opt.id === 'investment_property';
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleRentalTypeChange(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/30 ring-2 ring-teal-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {opt.title}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>

                <div className={`mt-3 pt-2 text-[11px] font-medium border-t border-slate-100 dark:border-slate-800/80 ${
                  isInvest ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-slate-400'
                }`}>
                  {opt.legalNote}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 2: Location in Washington, DC */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>2. Property Location & Structure</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            No street address required; neighborhood determines baseline ADR benchmarks and transit accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Neighborhood Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              DC Neighborhood
            </label>
            <select
              value={property.neighborhood}
              onChange={(e) => {
                const found = DC_NEIGHBORHOODS.find(n => n.name === e.target.value);
                if (found) {
                  onUpdateScenario({
                    ...scenario,
                    property: {
                      ...property,
                      neighborhood: found.name,
                      ward: found.ward,
                      zipCode: found.zipCodes[0] || property.zipCode,
                    },
                    pricing: {
                      ...scenario.pricing,
                      nightlyRate: found.medianNightlyRate,
                    }
                  });
                }
              }}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {DC_NEIGHBORHOODS.map((n) => (
                <option key={n.name} value={n.name}>
                  {n.name} (Ward {n.ward})
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Property Architecture
            </label>
            <select
              value={property.propertyType}
              onChange={(e) => handlePropertyFieldChange('propertyType', e.target.value as PropertyType)}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="rowhouse">Historic Rowhouse</option>
              <option value="townhouse">Townhouse</option>
              <option value="condominium">Condominium</option>
              <option value="apartment">Apartment</option>
              <option value="detached">Detached Single Family</option>
              <option value="other">Other Residential</option>
            </select>
          </div>

          {/* ZIP Code */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              ZIP Code (Ward {property.ward})
            </label>
            <input
              type="text"
              value={property.zipCode}
              onChange={(e) => handlePropertyFieldChange('zipCode', e.target.value)}
              placeholder="20003"
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Total Bedrooms in Property
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={property.bedrooms}
              onChange={(e) => handlePropertyFieldChange('bedrooms', parseInt(e.target.value) || 1)}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Total Bathrooms
            </label>
            <input
              type="number"
              min={1}
              max={8}
              step={0.5}
              value={property.bathrooms}
              onChange={(e) => handlePropertyFieldChange('bathrooms', parseFloat(e.target.value) || 1)}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Max Guests */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Max Expected Guests
            </label>
            <input
              type="number"
              min={1}
              max={16}
              value={property.maxGuests}
              onChange={(e) => handlePropertyFieldChange('maxGuests', parseInt(e.target.value) || 2)}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

        </div>
      </div>

      {/* Question 3: Ownership & Regulatory Circumstances */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>3. Owner Legal Status & Private Covenants</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            These questions feed directly into the DC Legal Gate screening engine.
          </p>
        </div>

        <div className="space-y-4">
          
          {/* Primary Residence Check */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Is this property your Primary Residence?
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                DC Code § 30-201.02 mandates that short-term rentals operate exclusively in the owner's primary residence.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleOwnerFieldChange('isPrimaryResidence', true)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  owner.isPrimaryResidence
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleOwnerFieldChange('isPrimaryResidence', false)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  !owner.isPrimaryResidence
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* HOA / Condo Association Check */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Do your Condo / HOA Bylaws permit Short-Term Rentals?
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Private association covenants supersede DC licensing. If your condo forbids STRs, you cannot legally list.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleOwnerFieldChange('hoaAllowsSTR', 'yes')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  owner.hoaAllowsSTR === 'yes'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Permitted
              </button>
              <button
                type="button"
                onClick={() => handleOwnerFieldChange('hoaAllowsSTR', 'no')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  owner.hoaAllowsSTR === 'no'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Forbidden
              </button>
              <button
                type="button"
                onClick={() => handleOwnerFieldChange('hoaAllowsSTR', 'unsure')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  owner.hoaAllowsSTR === 'unsure'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Unsure
              </button>
            </div>
          </div>

          {/* Liability Insurance & Discrepancy Alert */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Liability Insurance Coverage Limit
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  DLCP guidelines mention $250,000, while DC Code § 30-201.02 statutorily mandates at least $500,000.
                </span>
              </div>
              <select
                value={owner.liabilityInsuranceCoverage}
                onChange={(e) => handleOwnerFieldChange('liabilityInsuranceCoverage', parseInt(e.target.value))}
                className="text-xs font-medium bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-2 text-slate-900 dark:text-white"
              >
                <option value={250000}>$250,000 (DLCP Guidance Level)</option>
                <option value={500000}>$500,000 (DC Statutory Level)</option>
                <option value={1000000}>$1,000,000 (Recommended Commercial Rider)</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={owner.insuranceVerifiedWithBroker}
                onChange={(e) => handleOwnerFieldChange('insuranceVerifiedWithBroker', e.target.checked)}
                className="rounded-xs text-teal-600 focus:ring-teal-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">
                I have verified with my insurance agent that commercial short-term rentals are covered (not excluded).
              </span>
            </label>
          </div>

          {/* Safety Equipment Checklist */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              Required DLCP Safety Hardware
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={property.hasSmokeAlarms}
                  onChange={(e) => handlePropertyFieldChange('hasSmokeAlarms', e.target.checked)}
                  className="rounded-xs text-teal-600 focus:ring-teal-500"
                />
                <span>Interconnected Smoke Alarms</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={property.hasCODetectors}
                  onChange={(e) => handlePropertyFieldChange('hasCODetectors', e.target.checked)}
                  className="rounded-xs text-teal-600 focus:ring-teal-500"
                />
                <span>Carbon Monoxide Detectors on each floor</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={property.hasFireExtinguisher}
                  onChange={(e) => handlePropertyFieldChange('hasFireExtinguisher', e.target.checked)}
                  className="rounded-xs text-teal-600 focus:ring-teal-500"
                />
                <span>Working 2A:10B:C Fire Extinguisher</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={property.hasEmergencyEgress}
                  onChange={(e) => handlePropertyFieldChange('hasEmergencyEgress', e.target.checked)}
                  className="rounded-xs text-teal-600 focus:ring-teal-500"
                />
                <span>Unobstructed Emergency Exit / Window</span>
              </label>
            </div>
          </div>

          {/* Clean Hands Certificate */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Certificate of Clean Hands (MyTax.DC.gov)
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Proves zero outstanding DC tax liabilities &gt;$100; mandatory for DLCP business license issuance.
              </span>
            </div>
            <label className="flex items-center gap-2 shrink-0 cursor-pointer">
              <input
                type="checkbox"
                checked={owner.hasCleanHandsCertificate}
                onChange={(e) => handleOwnerFieldChange('hasCleanHandsCertificate', e.target.checked)}
                className="rounded-xs text-teal-600 focus:ring-teal-500"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {owner.hasCleanHandsCertificate ? 'Obtained' : 'Not Yet'}
              </span>
            </label>
          </div>

        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          All changes immediately update your DC Legal Gate and financial projections.
        </span>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Continue to DC Legal Gate</span>
          <Check className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
