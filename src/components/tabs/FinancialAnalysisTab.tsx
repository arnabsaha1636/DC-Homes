import React, { useState } from 'react';
import { 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  Info,
  Scale,
  Calculator,
  Sliders
} from 'lucide-react';
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../../types';

interface FinancialAnalysisTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  onUpdateScenario: (updated: UserScenario) => void;
  onNavigateNext: () => void;
}

export const FinancialAnalysisTab: React.FC<FinancialAnalysisTabProps> = ({
  scenario,
  financials,
  legalEval,
  onUpdateScenario,
  onNavigateNext,
}) => {
  const { setupCosts, operatingCosts, ownershipCosts, incomeTaxRateEstimate } = scenario;
  const [includeOwnershipCosts, setIncludeOwnershipCosts] = useState<boolean>(ownershipCosts.includeInCashFlow);

  const handleSetupCostChange = (field: keyof typeof setupCosts, val: number) => {
    onUpdateScenario({
      ...scenario,
      setupCosts: {
        ...setupCosts,
        [field]: val,
      }
    });
  };

  const handleOperatingCostChange = (field: keyof typeof operatingCosts, val: number) => {
    onUpdateScenario({
      ...scenario,
      operatingCosts: {
        ...operatingCosts,
        [field]: val,
      }
    });
  };

  const totalSetupBudget = 
    setupCosts.furniture +
    setupCosts.beddingLinens +
    setupCosts.smartLocks +
    setupCosts.safetyEquipment +
    setupCosts.photographyStaging +
    setupCosts.deepCleaningRepairs +
    setupCosts.licensingPermits +
    setupCosts.insuranceInspection +
    setupCosts.otherStartup;

  const isNetPositive = financials.netAnnualOperatingCashFlow > 0;

  // Breakdown of top expenses
  const expenseBreakdown = [
    { label: 'Turnover Cleaning', amount: Math.round(financials.expectedReservations * operatingCosts.cleaningCostPerTurnover), color: 'bg-amber-500' },
    { label: 'Platform Commission (Airbnb)', amount: financials.hostPlatformFeeExpense, color: 'bg-indigo-500' },
    { label: 'Guest Utilities', amount: Math.round(financials.modeledBookedNights * operatingCosts.utilitiesGuestUsagePerNight), color: 'bg-sky-500' },
    { label: 'Maintenance Reserve', amount: Math.round(financials.modeledBookedNights * operatingCosts.maintenanceReservePerNight), color: 'bg-purple-500' },
    { label: 'Incremental Insurance', amount: operatingCosts.incrementalInsuranceAnnual, color: 'bg-rose-500' },
    { label: 'Supplies & Toiletries', amount: Math.round(financials.expectedReservations * (operatingCosts.laundrySuppliesPerStay + operatingCosts.guestToiletriesConsumablesPerStay)), color: 'bg-teal-500' },
    { label: 'Admin, Software & DLCP License', amount: Math.round(operatingCosts.softwareSubscriptionsAnnual + operatingCosts.accountingLegalAnnual + 50), color: 'bg-slate-500' },
  ].sort((a, b) => b.amount - a.amount);

  const cleaningNetDifference = Math.round(financials.cleaningFeeRevenue - (financials.expectedReservations * operatingCosts.cleaningCostPerTurnover));

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part E · Comprehensive Financial Model</span>
          <span>·</span>
          <span>Capital Setup, Variable Costs & True Net Profit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Financial Analysis & Cash Flow
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Deducting all startup capital, turnover cleaning leakage, and fixed overhead to reveal your true bottom line.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Gross Revenue */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Gross Booking Revenue</span>
          <span className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1 block">
            ${financials.grossBookingRevenue.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
            {financials.modeledBookedNights} nights · {financials.expectedReservations} stays
          </span>
        </div>

        {/* Total Operating Costs */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Total Operating Costs</span>
          <span className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
            -${financials.totalOperatingCosts.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
            Variable: ${financials.variableOperatingCosts.toLocaleString()} · Fixed: ${financials.fixedOperatingCosts.toLocaleString()}
          </span>
        </div>

        {/* Net Annual Cash Flow */}
        <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300 tracking-wider block">Net Operating Cash Flow</span>
          <span className={`text-xl font-extrabold font-mono mt-1 block ${
            isNetPositive ? 'text-teal-700 dark:text-teal-300' : 'text-rose-600'
          }`}>
            {isNetPositive ? '+' : ''}${financials.netAnnualOperatingCashFlow.toLocaleString()}
          </span>
          <span className="text-[11px] text-teal-800 dark:text-teal-200 mt-0.5 block">
            ${financials.netMonthlyCashFlow.toLocaleString()}/month average
          </span>
        </div>

        {/* Break-Even Booked Nights */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Break-Even Point</span>
          <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
            {financials.breakEvenBookedNights} Nights
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
            Covers fixed overhead ($${financials.breakEvenNightlyRate}/nt min)
          </span>
        </div>

      </div>

      {/* Cleaning Margin Leakage Callout */}
      <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
        cleaningNetDifference < 0
          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200'
          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
      }`}>
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">
            Turnover Cleaning Economics Check: {cleaningNetDifference < 0 ? 'Out-of-Pocket Subsidy' : 'Self-Sustaining Fee'}
          </span>
          <p className="mt-0.5 leading-relaxed">
            You charge guests <strong>${scenario.pricing.cleaningFee}</strong> per reservation, while your actual turnover cleaning cost is <strong>${operatingCosts.cleaningCostPerTurnover}</strong>. Across {financials.expectedReservations} projected stays, you will {cleaningNetDifference < 0 ? `absorb $${Math.abs(cleaningNetDifference).toLocaleString()} out-of-pocket` : `net +$${cleaningNetDifference.toLocaleString()} in cleaning margin`}.
          </p>
        </div>
      </div>

      {/* 2-Column Inputs: Initial Startup vs Variable & Fixed Operating Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Initial Setup Budget */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Initial Startup Investment
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Capital required before welcoming guest #1
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Setup</span>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                ${totalSetupBudget.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            
            <div className="flex items-center justify-between">
              <label className="text-slate-600 dark:text-slate-400">Furniture & Bedding</label>
              <input
                type="number"
                value={setupCosts.furniture}
                onChange={(e) => handleSetupCostChange('furniture', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-slate-600 dark:text-slate-400">Linens, Towels & Kitchen Essentials</label>
              <input
                type="number"
                value={setupCosts.beddingLinens}
                onChange={(e) => handleSetupCostChange('beddingLinens', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-slate-600 dark:text-slate-400">Keyless Smart Lock & Access</label>
              <input
                type="number"
                value={setupCosts.smartLocks}
                onChange={(e) => handleSetupCostChange('smartLocks', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-slate-600 dark:text-slate-400">Smoke / CO Detectors & Extinguisher</label>
              <input
                type="number"
                value={setupCosts.safetyEquipment}
                onChange={(e) => handleSetupCostChange('safetyEquipment', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-slate-600 dark:text-slate-400">Professional Photography & Staging</label>
              <input
                type="number"
                value={setupCosts.photographyStaging}
                onChange={(e) => handleSetupCostChange('photographyStaging', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-slate-600 dark:text-slate-400">DC DLCP 2-Year STR License Fee</label>
              <input
                type="number"
                value={setupCosts.licensingPermits}
                onChange={(e) => handleSetupCostChange('licensingPermits', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                First-Year Net (After Startup):
              </span>
              <span className={`font-bold font-mono text-sm ${
                financials.firstYearCashFlowAfterStartup > 0 ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                ${financials.firstYearCashFlowAfterStartup.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Payback Period:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {financials.startupPaybackMonths} months
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Recurring & Variable Operating Costs */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Operating Cost Structure
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Variable stay expenses and fixed annual overhead
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Annual Total</span>
              <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400">
                -${financials.totalOperatingCosts.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 block">Cleaning Cost per Turnover</span>
                <span className="text-[10px] text-slate-400">Pro cleaner or self-cleaning supplies</span>
              </div>
              <input
                type="number"
                value={operatingCosts.cleaningCostPerTurnover}
                onChange={(e) => handleOperatingCostChange('cleaningCostPerTurnover', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 block">Guest Utilities Usage ($/night)</span>
                <span className="text-[10px] text-slate-400">Water, electricity, heating/AC</span>
              </div>
              <input
                type="number"
                value={operatingCosts.utilitiesGuestUsagePerNight}
                onChange={(e) => handleOperatingCostChange('utilitiesGuestUsagePerNight', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 block">Maintenance & Wear Reserve ($/night)</span>
                <span className="text-[10px] text-slate-400">Touchup paint, plumbing, scuffs</span>
              </div>
              <input
                type="number"
                value={operatingCosts.maintenanceReservePerNight}
                onChange={(e) => handleOperatingCostChange('maintenanceReservePerNight', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 block">Commercial STR Insurance Rider ($/yr)</span>
                <span className="text-[10px] text-slate-400">Incremental rider above homeowner policy</span>
              </div>
              <input
                type="number"
                value={operatingCosts.incrementalInsuranceAnnual}
                onChange={(e) => handleOperatingCostChange('incrementalInsuranceAnnual', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 block">Management / Co-Host Commission (%)</span>
                <span className="text-[10px] text-slate-400">0% if self-managed; 15-25% if co-hosted</span>
              </div>
              <input
                type="number"
                min={0}
                max={30}
                value={operatingCosts.managementCommissionPercent}
                onChange={(e) => handleOperatingCostChange('managementCommissionPercent', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-700 dark:text-slate-300 block">Emergency Repair Reserve ($/yr)</span>
                <span className="text-[10px] text-slate-400">Dedicated contingency escrow</span>
              </div>
              <input
                type="number"
                value={operatingCosts.contingencyRepairFundAnnual}
                onChange={(e) => handleOperatingCostChange('contingencyRepairFundAnnual', parseInt(e.target.value) || 0)}
                className="w-24 p-1.5 text-right font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Part F: Dedicated Federal & DC Tax Education Module */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Part F · Tax Education
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              DC Lodging Taxes & Federal Income Tax Planning
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            IRS Pub 527 Guidance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* DC Transient Accommodations Sales Tax (15.95%) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">
              1. Washington, DC Transient Lodging Tax (15.95%)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              As of November 2026, the District imposes a temporary 15.95% sales tax on transient accommodations (extended through September 30, 2027).
            </p>
            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-medium">
              Airbnb collects and remits this tax directly to the DC Office of Tax and Revenue. It is paid by the guest and never counts as host taxable revenue.
            </div>
          </div>

          {/* Federal Income Tax & Deductions */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="font-bold text-slate-900 dark:text-white block">
              2. Federal Income Tax Planning Rate
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Net rental income is subject to federal income tax, but legitimate operating expenses (cleaning, insurance, utilities, depreciation) are deductible.
            </p>

            <div className="flex items-center justify-between pt-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">
                Estimated Marginal Tax Rate:
              </label>
              <div className="flex items-center gap-1 font-mono font-bold">
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={scenario.incomeTaxRateEstimate}
                  onChange={(e) => onUpdateScenario({
                    ...scenario,
                    incomeTaxRateEstimate: parseInt(e.target.value) || 0
                  })}
                  className="w-16 p-1 text-right bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md"
                />
                <span>%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs">
              <span className="text-slate-500">Illustrative After-Tax Cash Flow:</span>
              <span className="font-bold font-mono text-teal-600 dark:text-teal-400">
                ${financials.illustrativeAfterTaxCashFlow.toLocaleString()}
              </span>
            </div>
          </div>

        </div>

        <p className="text-[11px] text-slate-400 italic">
          Disclaimer: This application provides financial modeling for educational decision support. Tax treatment varies by individual situation; consult a qualified CPA regarding IRS Publication 527 and DC tax filings.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to Revenue Estimator
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Run Sensitivity Lab & Stress Scenarios</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
