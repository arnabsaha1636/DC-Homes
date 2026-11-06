import React from 'react';
import { 
  Clock, 
  DollarSign, 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { UserScenario, FinancialOutputs } from '../../types';

interface TimeEffortTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  onUpdateScenario: (updated: UserScenario) => void;
  onNavigateNext: () => void;
}

export const TimeEffortTab: React.FC<TimeEffortTabProps> = ({
  scenario,
  financials,
  onUpdateScenario,
  onNavigateNext,
}) => {
  const { timeEffort } = scenario;

  const handleTimeFieldChange = (field: keyof typeof timeEffort, val: number) => {
    onUpdateScenario({
      ...scenario,
      timeEffort: {
        ...timeEffort,
        [field]: val,
      }
    });
  };

  const isPositiveEconomicProfit = financials.economicProfit > 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part K · Labor Economics</span>
          <span>·</span>
          <span>Quantifying the Homeowner's Unpaid Sweat Equity</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The Real Cost of Hosting Time
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Most online calculators assume homeowner labor is free. StayWise DC calculates your true economic profit after valuing your personal time.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Annual Hours */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Annual Hosting Hours</span>
          <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1 block">
            {financials.totalAnnualHostingHours} hrs
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
            ~{(financials.totalAnnualHostingHours / 12).toFixed(1)} hours/month commitment
          </span>
        </div>

        {/* Effective Hourly Compensation */}
        <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300 tracking-wider block">Effective Hourly Wage</span>
          <span className="text-2xl font-extrabold font-mono text-teal-700 dark:text-teal-300 mt-1 block">
            ${financials.effectiveCompensationPerHour.toFixed(2)}/hr
          </span>
          <span className="text-[11px] text-teal-800 dark:text-teal-200 mt-0.5 block">
            Net cash flow ÷ annual hours
          </span>
        </div>

        {/* Imputed Labor Cost */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Imputed Labor Cost</span>
          <span className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-300 mt-1 block">
            ${financials.imputedLaborCost.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
            At ${timeEffort.valuePerHourOfFreeTime}/hr free-time value
          </span>
        </div>

        {/* Economic Profit */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Economic Profit</span>
          <span className={`text-2xl font-extrabold font-mono mt-1 block ${
            isPositiveEconomicProfit ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600 dark:text-rose-400'
          }`}>
            {isPositiveEconomicProfit ? '+' : ''}${financials.economicProfit.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
            Cash Flow minus Labor Cost
          </span>
        </div>

      </div>

      {/* Creative Feature: "Is Your Time Worth It?" */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-colors ${
        isPositiveEconomicProfit
          ? 'bg-teal-50/60 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900'
          : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/80'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Scale className={`w-5 h-5 ${isPositiveEconomicProfit ? 'text-teal-600 dark:text-teal-400' : 'text-amber-600 dark:text-amber-400'}`} />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Is Your Personal Time Worth It?
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              {isPositiveEconomicProfit
                ? `YES: Your effective compensation of $${financials.effectiveCompensationPerHour.toFixed(2)}/hour exceeds your personal free-time benchmark ($${timeEffort.valuePerHourOfFreeTime}/hr). Hosting generates positive economic surplus.`
                : `WARNING: Your effective compensation ($${financials.effectiveCompensationPerHour.toFixed(2)}/hr) is BELOW your personal free-time valuation ($${timeEffort.valuePerHourOfFreeTime}/hr). You are effectively buying net cash flow by sacrificing higher-value free time.`}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Value of 1 Hour of Free Time</span>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">$</span>
              <input
                type="number"
                min={10}
                max={300}
                value={timeEffort.valuePerHourOfFreeTime}
                onChange={(e) => handleTimeFieldChange('valuePerHourOfFreeTime', parseInt(e.target.value) || 20)}
                className="w-16 p-1 text-right font-mono font-bold text-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
              <span className="text-xs text-slate-400">/hr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hours Inputs Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Hosting Time Commitment Breakdown
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Estimate the hours you dedicate per guest stay and monthly administrative upkeep:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Per Stay Tasks */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
              1. Tasks Per Reservation ({financials.expectedReservations} Stays/Yr)
            </span>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 font-semibold block">Guest Pre-Arrival & Inquiry Messaging</span>
                <span className="text-[10px] text-slate-400">Questions, house rules, parking details</span>
              </div>
              <input
                type="number"
                step={0.1}
                min={0}
                max={5}
                value={timeEffort.messagingHoursPerStay}
                onChange={(e) => handleTimeFieldChange('messagingHoursPerStay', parseFloat(e.target.value) || 0)}
                className="w-20 p-1.5 text-right font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 font-semibold block">Check-in Coordination & Access Code</span>
                <span className="text-[10px] text-slate-400">Keypad codes, arrival troubleshooting</span>
              </div>
              <input
                type="number"
                step={0.1}
                min={0}
                max={5}
                value={timeEffort.checkInCoordinationHoursPerStay}
                onChange={(e) => handleTimeFieldChange('checkInCoordinationHoursPerStay', parseFloat(e.target.value) || 0)}
                className="w-20 p-1.5 text-right font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 font-semibold block">Self-Cleaning & Laundry per Turn</span>
                <span className="text-[10px] text-slate-400">Set to 0 if hiring a professional cleaner</span>
              </div>
              <input
                type="number"
                step={0.5}
                min={0}
                max={8}
                value={timeEffort.cleaningLaundryHoursPerStay}
                onChange={(e) => handleTimeFieldChange('cleaningLaundryHoursPerStay', parseFloat(e.target.value) || 0)}
                className="w-20 p-1.5 text-right font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
              />
            </div>
          </div>

          {/* Monthly Ongoing Tasks */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
              2. Monthly Ongoing Administration (12 Months/Yr)
            </span>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 font-semibold block">Restocking & Maintenance Supplies</span>
                <span className="text-[10px] text-slate-400">Coffee, soaps, touch-up paint, lightbulbs</span>
              </div>
              <input
                type="number"
                step={0.5}
                min={0}
                max={15}
                value={timeEffort.restockingMaintenanceHoursMonthly}
                onChange={(e) => handleTimeFieldChange('restockingMaintenanceHoursMonthly', parseFloat(e.target.value) || 0)}
                className="w-20 p-1.5 text-right font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 font-semibold block">Pricing Adjustments & Calendar Sync</span>
                <span className="text-[10px] text-slate-400">Seasonal rates, event surge pricing, reviews</span>
              </div>
              <input
                type="number"
                step={0.5}
                min={0}
                max={15}
                value={timeEffort.pricingListingManagementHoursMonthly}
                onChange={(e) => handleTimeFieldChange('pricingListingManagementHoursMonthly', parseFloat(e.target.value) || 0)}
                className="w-20 p-1.5 text-right font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
              />
            </div>

            <div className="pt-2 text-[11px] text-slate-500 italic">
              *Hiring a professional co-host or property manager (typically 15-20% fee) eliminates 80%+ of these owner labor hours.
            </div>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to Risk Assessment
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Consult StayWise AI Adviser</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
