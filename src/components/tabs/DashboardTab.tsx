import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  Layers, 
  Sparkles,
  PieChart as PieIcon,
  Scale
} from 'lucide-react';
import { DCRowhouseGraphic } from '../DCRowhouseGraphic';
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../../types';
import { ReadinessScorecard } from '../../services/decisionEngine';
import { ActiveTab } from '../Header';

interface DashboardTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  scorecard: ReadinessScorecard;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenGuidedDemo: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  scenario,
  financials,
  legalEval,
  scorecard,
  onNavigateTab,
  onOpenGuidedDemo,
}) => {
  const isBlocked = legalEval.status === 'blocked';
  const isVerification = legalEval.status === 'verification_needed';
  const isVacation = legalEval.annualPermittedNights !== 'Unlimited';

  // "Where Does My $100 Go?" Calculation on a $100 Gross Guest Base
  const guestTotal = Math.max(1, financials.totalGuestPaidAmount);
  const taxPct = ((financials.guestPaidTaxes / guestTotal) * 100);
  const platformFeePct = (((financials.guestPlatformFees + financials.hostPlatformFeeExpense) / guestTotal) * 100);
  const cleaningPct = ((financials.expectedReservations * scenario.operatingCosts.cleaningCostPerTurnover) / guestTotal) * 100;
  const utilitiesPct = ((financials.modeledBookedNights * scenario.operatingCosts.utilitiesGuestUsagePerNight) / guestTotal) * 100;
  const overheadPct = ((financials.fixedOperatingCosts + (financials.modeledBookedNights * scenario.operatingCosts.maintenanceReservePerNight)) / guestTotal) * 100;
  const netProfitPct = Math.max(0, 100 - (taxPct + platformFeePct + cleaningPct + utilitiesPct + overheadPct));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Section with Historic DC Rowhouse Graphic */}
      <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 px-6 py-8 md:px-12 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/50 text-teal-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Washington, DC Short-Term Rental Decision Engine</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Your Home. Your Numbers.{' '}
              <span className="text-teal-400">Your Decision.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Should you list your {scenario.property.neighborhood} {scenario.property.propertyType} on Airbnb? StayWise DC integrates District of Columbia municipal regulations, deterministic cash-flow economics, lifestyle tradeoffs, and operational risks into one clear recommendation.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('decision_engine')}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>View Final Decision Scorecard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenGuidedDemo}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800/90 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 cursor-pointer"
              >
                <span>MBA Evaluation Tour</span>
              </button>

              <button
                onClick={() => onNavigateTab('legal_eligibility')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <span>Check DC Legal Gate</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 shadow-lg backdrop-blur-xs">
              <DCRowhouseGraphic className="w-full rounded-xl shadow-xs" />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Neighborhood: {scenario.property.neighborhood}</span>
                <span>Ward {scenario.property.ward} · {scenario.property.bedrooms} Bed · {scenario.property.bathrooms} Bath</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Persistent Legal Warning / Blocker Banner if applicable */}
      {isBlocked ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold tracking-tight">
              Action Required: Short-Term Rental Ineligible Under Current Setup
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
              {legalEval.blockers[0] || 'The property does not meet DC primary residence rules or is barred by condo association covenants.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('legal_eligibility')}
                className="text-xs font-bold text-rose-800 dark:text-rose-300 underline hover:no-underline cursor-pointer"
              >
                Review "What Would Need to Change?" in the DC Legal Gate →
              </button>
            </div>
          </div>
        </div>
      ) : isVerification ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold tracking-tight">
              Verification Needed: Official DC Statutory Minimums Require Checking
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              {legalEval.missingInfo[0] || 'Verify required $500,000 liability insurance coverage and confirm absence of HOA private restrictions.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('legal_eligibility')}
                className="text-xs font-bold text-amber-800 dark:text-amber-300 underline hover:no-underline cursor-pointer"
              >
                Inspect official source discrepancy & checklist →
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* The 5 Fundamental Homeowner Questions Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              The 5 Core Homeowner Questions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete, evidence-based answers for your specific Washington, DC property
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: CAN I? */}
          <div 
            onClick={() => onNavigateTab('legal_eligibility')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                01 · Legal Screening
              </span>
              <span className={`text-xs px-2 py-0.5 font-bold rounded-md ${
                isBlocked ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300' :
                isVerification ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300' :
                'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
              }`}>
                {isBlocked ? 'Blocked' : isVerification ? 'Check Req' : 'Eligible'}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Can I legally host in DC?
            </h3>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {legalEval.reasons[0] || 'Evaluating primary residence qualification, 90-night statutory cap, and Clean Hands.'}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>{isVacation ? '90-Night Vacation Cap' : 'Unlimited Hosted Nights'}</span>
              <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Inspect Gate <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: HOW MUCH? */}
          <div 
            onClick={() => onNavigateTab('financial_analysis')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                02 · Financial Economics
              </span>
              <span className="text-xs px-2 py-0.5 font-bold rounded-md bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 font-mono">
                ${financials.netMonthlyCashFlow.toLocaleString()}/mo
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              How much will I really make?
            </h3>

            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Gross Booking Revenue:</span>
                <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">${financials.grossBookingRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Operating Costs & Fees:</span>
                <span className="font-semibold font-mono text-rose-600 dark:text-rose-400">-${(financials.totalOperatingCosts + financials.hostPlatformFeeExpense).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white">Net Annual Cash Flow:</span>
                <span className="font-bold font-mono text-teal-600 dark:text-teal-400">${financials.netAnnualOperatingCashFlow.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-3 pt-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Payback: {financials.startupPaybackMonths} mo</span>
              <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Cash Flow Breakdown <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: WHAT COULD GO WRONG? */}
          <div 
            onClick={() => onNavigateTab('scenario_simulator')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                03 · Risk & Stress Lab
              </span>
              <span className="text-xs px-2 py-0.5 font-bold rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 font-mono">
                {financials.breakEvenBookedNights} Nights BE
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              What could go wrong?
            </h3>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              You need {financials.breakEvenBookedNights} booked nights just to cover fixed operating overhead before earning profit. A 25% drop in bookings reduces net income by ~${Math.round(financials.grossAccommodationRevenue * 0.25).toLocaleString()}.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Downside Exposure: Med</span>
              <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Run Stress Tests <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 4: IS IT BETTER THAN ALTERNATIVES? */}
          <div 
            onClick={() => onNavigateTab('alternatives')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                04 · Strategic Alternatives
              </span>
              <span className="text-xs px-2 py-0.5 font-bold rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                5 Options
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Is Airbnb my best strategy?
            </h3>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Compare Airbnb returns with 30+ day medium-term furnished leasing (travel nurses/consultants) which is 100% exempt from DC STR 90-night and primary residence caps.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Decision Frontier Chart</span>
              <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Compare Strategies <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 5: SHOULD I? (The Verdict) */}
          <div 
            onClick={() => onNavigateTab('decision_engine')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-xs cursor-pointer group lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                05 · Decision Synthesis
              </span>
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-slate-900 dark:text-white">
                <span>Readiness Score:</span>
                <span className="text-teal-600 dark:text-teal-400">{scorecard.overallScore}/100</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Should I actually proceed?
            </h3>

            <p className="mt-1 text-sm font-semibold text-teal-700 dark:text-teal-300">
              {scorecard.recommendationCategory}
            </p>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {scorecard.recommendationSummary}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="text-slate-700 dark:text-slate-300">Next: {scorecard.priorityActions[0]}</span>
              <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Readiness Scorecard & Roadmap <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Feature 3: Airbnb Reality Check & Feature: Where Does My $100 Go? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Reality Check Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              MBA Creative Feature
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Airbnb Reality Check
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              What guests pay vs. what Airbnb pays you vs. what you actually keep after costs
            </p>
          </div>

          <div className="space-y-4">
            
            {/* 1. What Guests Pay */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>1. What Guests Pay (Total Charge)</span>
                <span className="text-[10px] text-slate-400">Includes 15.95% DC Tax</span>
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                ${financials.totalGuestPaidAmount.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-1">/year</span>
              </div>
            </div>

            {/* 2. What Host Receives */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>2. What Host Receives (Net Payout)</span>
                <span className="text-[10px] text-slate-400">After Airbnb 3% commission</span>
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                ${financials.netHostPayout.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-1">/year</span>
              </div>
            </div>

            {/* 3. What Host Actually Keeps */}
            <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900">
              <div className="flex items-center justify-between text-xs text-teal-800 dark:text-teal-300 mb-1 font-semibold">
                <span>3. What Host Actually Keeps (Cash Flow)</span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400">After ALL expenses</span>
              </div>
              <div className="text-2xl font-extrabold font-mono tabular-nums text-teal-700 dark:text-teal-300">
                ${financials.netAnnualOperatingCashFlow.toLocaleString()}
                <span className="text-xs font-normal text-teal-600 dark:text-teal-400 ml-1">/year</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                Retaining {((financials.netAnnualOperatingCashFlow / Math.max(1, financials.totalGuestPaidAmount)) * 100).toFixed(1)}% of total guest spend as take-home cash flow.
              </div>
            </div>

          </div>

          <button
            onClick={() => onNavigateTab('revenue_estimator')}
            className="w-full text-center py-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
          >
            Examine Guest Booking Receipt breakdown →
          </button>
        </div>

        {/* Where Does My $100 Go? Waterfall Component */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Financial Transparency
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Where Does Every $100 Go?
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Normalized $100 Basis
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Visualizing the exact breakdown of $100 paid by an Airbnb guest for your property:
          </p>

          {/* Segmented Bar Visualization */}
          <div className="space-y-2">
            <div className="h-6 w-full rounded-lg overflow-hidden flex shadow-inner">
              <div style={{ width: `${taxPct}%` }} className="bg-rose-500" title={`DC Lodging Tax: $${taxPct.toFixed(2)}`} />
              <div style={{ width: `${platformFeePct}%` }} className="bg-indigo-500" title={`Platform Fees: $${platformFeePct.toFixed(2)}`} />
              <div style={{ width: `${cleaningPct}%` }} className="bg-amber-500" title={`Turnover Cleaning: $${cleaningPct.toFixed(2)}`} />
              <div style={{ width: `${utilitiesPct}%` }} className="bg-sky-500" title={`Guest Utilities: $${utilitiesPct.toFixed(2)}`} />
              <div style={{ width: `${overheadPct}%` }} className="bg-purple-500" title={`Overhead & Insurance: $${overheadPct.toFixed(2)}`} />
              <div style={{ width: `${netProfitPct}%` }} className="bg-teal-500" title={`Your Cash Flow: $${netProfitPct.toFixed(2)}`} />
            </div>

            {/* Legend & Breakdown Table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="w-3 h-3 rounded-xs bg-rose-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">15.95% DC Tax</div>
                  <div className="font-bold font-mono">${taxPct.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="w-3 h-3 rounded-xs bg-indigo-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">Platform Fees</div>
                  <div className="font-bold font-mono">${platformFeePct.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="w-3 h-3 rounded-xs bg-amber-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">Cleaning & Turnover</div>
                  <div className="font-bold font-mono">${cleaningPct.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="w-3 h-3 rounded-xs bg-sky-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">Guest Utilities</div>
                  <div className="font-bold font-mono">${utilitiesPct.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="w-3 h-3 rounded-xs bg-purple-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400">Fixed Overhead</div>
                  <div className="font-bold font-mono">${overheadPct.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900">
                <div className="w-3 h-3 rounded-xs bg-teal-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold">Your Net Cash Flow</div>
                  <div className="font-bold font-mono text-teal-700 dark:text-teal-300">${netProfitPct.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 italic">
              *Lodging tax is paid by the guest and remitted directly to the DC Office of Tax and Revenue. It never enters your bank account.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
