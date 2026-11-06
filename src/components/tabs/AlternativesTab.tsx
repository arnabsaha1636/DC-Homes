import React from 'react';
import { 
  Scale, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Check, 
  X, 
  ArrowRight, 
  HelpCircle,
  Briefcase,
  Home,
  Sparkles
} from 'lucide-react';
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../../types';
import { generateAlternativeStrategies, StrategyComparisonItem } from '../../services/decisionEngine';

interface AlternativesTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  onNavigateNext: () => void;
}

export const AlternativesTab: React.FC<AlternativesTabProps> = ({
  scenario,
  financials,
  legalEval,
  onNavigateNext,
}) => {
  const strategies = generateAlternativeStrategies(scenario, financials, legalEval);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part I · Opportunity Cost & Tradeoffs</span>
          <span>·</span>
          <span>Airbnb vs. Mid-Term vs. Long-Term vs. Personal Use</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Airbnb vs. Alternative Rental Strategies
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Is Airbnb really the best use of your space? Evaluate whether 30+ day mid-term rentals or traditional leasing offer better risk-adjusted returns.
        </p>
      </div>

      {/* Critical Statutory Insight Banner: 30+ Day Exemption */}
      <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">
            Critical DC Legal Distinction: 30+ Day Leases Are Exempt from STR Limitations
          </span>
          <p className="leading-relaxed text-teal-800 dark:text-teal-300">
            If your property is an investment property or subject to the 90-night vacation limit, <strong>leases of 30 or more consecutive days</strong> (such as travel nurse housing or corporate consulting stays) are classified under standard residential tenancy rather than short-term transient lodging. They are 100% exempt from DC STR primary-residence restrictions and the 90-night annual ceiling!
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((strat) => {
          const isAirbnb = strat.strategyId === 'airbnb_current';
          return (
            <div
              key={strat.strategyId}
              className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
                isAirbnb
                  ? 'border-teal-500 dark:border-teal-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-teal-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isAirbnb 
                      ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {isAirbnb ? 'Current Plan' : 'Alternative'}
                  </span>
                  <span className={`text-[11px] font-bold ${
                    strat.isPermittedForUser ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {strat.isPermittedForUser ? 'Permitted' : 'Restricted'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {strat.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {strat.headline}
                </p>

                {/* Financial Take-Home */}
                <div className="my-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Annual Net Cash Flow
                  </span>
                  <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5 block">
                    ${strat.annualNetCashFlow.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ${Math.round(strat.annualNetCashFlow / 12).toLocaleString()}/mo
                  </span>
                </div>

                {/* Metrics Breakdown */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Annual Workload:</span>
                    <span className="font-bold font-mono">{strat.annualWorkloadHours} hrs</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Effective Hourly Wage:</span>
                    <span className="font-bold font-mono text-teal-600 dark:text-teal-400">
                      ${strat.hourlyCompensation}/hr
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Turnovers / Yr:</span>
                    <span className="font-bold font-mono">{strat.cleaningTurnoversPerYear} cleanings</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Income Consistency:</span>
                    <span className="font-semibold">{strat.incomeConsistency}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Household Privacy:</span>
                    <span className="font-semibold">{strat.privacyImpact}</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Personal Use:</span>
                    <span className="font-semibold">{strat.flexibilityToUseHome}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                DC Status: {strat.dcLegalStatus}
              </div>
            </div>
          );
        })}
      </div>

      {/* Creative Feature: The Decision Frontier Scatter Plot */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              MBA Creative Visualization
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              The Decision Frontier: Return vs. Effort Tradeoff
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Work Hours vs. Net Profit
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Visualizing where each rental strategy falls along the spectrum of annual homeowner workload (X-axis) versus annual take-home cash flow (Y-axis):
        </p>

        {/* Visual Frontier Plot */}
        <div className="relative h-64 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 overflow-hidden">
          {/* Axis labels */}
          <div className="absolute left-3 top-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            ↑ Higher Annual Cash Flow
          </div>
          <div className="absolute right-4 bottom-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            More Owner Hours →
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-20 pointer-events-none">
            <div className="border-r border-slate-300 dark:border-slate-600" />
            <div className="border-r border-slate-300 dark:border-slate-600" />
            <div className="border-r border-slate-300 dark:border-slate-600" />
            <div />
          </div>

          {/* Data Points on the Frontier */}
          {strategies.map((strat, idx) => {
            // Normalize X: 0 to 200 hours -> 10% to 85%
            const xPos = Math.min(88, Math.max(8, (strat.annualWorkloadHours / 180) * 80 + 10));
            // Normalize Y: $0 to $30,000 -> 80% to 15% (inverted CSS top)
            const yPos = Math.min(85, Math.max(15, 80 - (strat.annualNetCashFlow / 28000) * 65));
            const isAirbnb = strat.strategyId === 'airbnb_current';

            return (
              <div
                key={strat.strategyId}
                style={{ left: `${xPos}%`, top: `${yPos}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-lg transition-transform group-hover:scale-125 ${
                  isAirbnb ? 'bg-teal-600 ring-4 ring-teal-500/30' : 'bg-slate-700'
                }`}>
                  ${Math.round(strat.annualNetCashFlow / 1000)}k
                </div>

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-20 whitespace-nowrap bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-xl border border-slate-700">
                  <div className="font-bold">{strat.name}</div>
                  <div>Cash Flow: ${strat.annualNetCashFlow.toLocaleString()}</div>
                  <div>Hours: {strat.annualWorkloadHours} hrs/yr</div>
                  <div>Wage: ${strat.hourlyCompensation}/hr</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
          <span>Efficient Frontier Analysis: Evaluates whether extra gross revenue is worth the turnover friction.</span>
          <span className="font-semibold text-teal-600 dark:text-teal-400">
            Mid-Term Rentals often yield 80% of Airbnb profit for only 25% of the effort.
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to Sensitivity Lab
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Assess Risks & Lifestyle Compatibility</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
