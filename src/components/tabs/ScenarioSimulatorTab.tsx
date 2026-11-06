import React, { useState } from 'react';
import { 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  HelpCircle, 
  DollarSign, 
  BarChart3, 
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Calculator,
  CheckCircle2
} from 'lucide-react';
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../../types';
import { calculateScenarioFinancials, solveTargetProfitFeasibility } from '../../services/calculations';

interface ScenarioSimulatorTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  onUpdateScenario: (updated: UserScenario) => void;
  onNavigateNext: () => void;
}

export const ScenarioSimulatorTab: React.FC<ScenarioSimulatorTabProps> = ({
  scenario,
  financials,
  legalEval,
  onUpdateScenario,
  onNavigateNext,
}) => {
  // Reverse Profit Solver State
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState<number>(scenario.monthlyIncomeTarget || 1000);

  // One-Click Stress Test State
  const [activeStressTest, setActiveStressTest] = useState<string | null>(null);

  // Generate 3 Baseline Scenarios: Conservative, Base, Optimistic
  const conservativeScenario: UserScenario = {
    ...scenario,
    pricing: {
      ...scenario.pricing,
      expectedOccupancy: Math.max(30, Math.round(scenario.pricing.expectedOccupancy * 0.75)),
      nightlyRate: Math.max(80, Math.round(scenario.pricing.nightlyRate * 0.85)),
      expectedCancellationsPercent: 10,
    },
    operatingCosts: {
      ...scenario.operatingCosts,
      cleaningCostPerTurnover: Math.round(scenario.operatingCosts.cleaningCostPerTurnover * 1.25),
      utilitiesGuestUsagePerNight: Math.round(scenario.operatingCosts.utilitiesGuestUsagePerNight * 1.2),
    }
  };

  const optimisticScenario: UserScenario = {
    ...scenario,
    pricing: {
      ...scenario.pricing,
      expectedOccupancy: Math.min(95, Math.round(scenario.pricing.expectedOccupancy * 1.20)),
      nightlyRate: Math.round(scenario.pricing.nightlyRate * 1.15),
      expectedCancellationsPercent: 2,
    },
    operatingCosts: {
      ...scenario.operatingCosts,
      cleaningCostPerTurnover: Math.max(40, Math.round(scenario.operatingCosts.cleaningCostPerTurnover * 0.9)),
    }
  };

  const conservativeFin = calculateScenarioFinancials(conservativeScenario, legalEval);
  const optimisticFin = calculateScenarioFinancials(optimisticScenario, legalEval);

  // Solve target feasibility
  const feasibility = solveTargetProfitFeasibility(targetMonthlyProfit, scenario, legalEval);

  // Apply one-click stress test
  const handleApplyStressTest = (testKey: string) => {
    setActiveStressTest(testKey);
    let updated = { ...scenario };

    if (testKey === 'demand_drop') {
      updated.pricing.expectedOccupancy = Math.max(20, Math.round(scenario.pricing.expectedOccupancy * 0.75));
    } else if (testKey === 'cleaning_spike') {
      updated.operatingCosts.cleaningCostPerTurnover = Math.round(scenario.operatingCosts.cleaningCostPerTurnover * 1.30);
    } else if (testKey === 'emergency_repair') {
      updated.operatingCosts.contingencyRepairFundAnnual = scenario.operatingCosts.contingencyRepairFundAnnual + 2000;
    } else if (testKey === 'zero_month') {
      updated.pricing.availableNightsAnnual = Math.max(30, scenario.pricing.availableNightsAnnual - 30);
    } else if (testKey === 'platform_fee_hike') {
      updated.pricing.platformFeeModel = 'host_only'; // 15% host fee
    } else if (testKey === 'furnishing_double') {
      updated.setupCosts.furniture = scenario.setupCosts.furniture * 2;
    }

    onUpdateScenario(updated);
  };

  // Price & Occupancy Heatmap Matrix
  const heatmapRates = [
    Math.round(scenario.pricing.nightlyRate * 0.75),
    scenario.pricing.nightlyRate,
    Math.round(scenario.pricing.nightlyRate * 1.25)
  ];
  const heatmapOccupancies = [45, 65, 80];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part G · Sensitivity Lab</span>
          <span>·</span>
          <span>Stress Testing & Goal Feasibility</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Scenario Simulator & Sensitivity Lab
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Test market volatility, one-click stress shocks, and solve for required occupancy under DC legal restrictions.
        </p>
      </div>

      {/* 3 Baseline Scenarios: Conservative vs Base vs Optimistic */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Three Macroeconomic Scenarios</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare risk-adjusted outcomes ranging from sluggish winter demand to peak tourist season efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Conservative Scenario */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Conservative Case
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  Sluggish
                </span>
              </div>

              <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                ${conservativeFin.netAnnualOperatingCashFlow.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 block font-sans">
                  ${conservativeFin.netMonthlyCashFlow.toLocaleString()}/month
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Occupancy:</span>
                  <span className="font-mono font-bold">{conservativeScenario.pricing.expectedOccupancy}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Nightly Rate:</span>
                  <span className="font-mono font-bold">${conservativeScenario.pricing.nightlyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booked Nights:</span>
                  <span className="font-mono font-bold">{conservativeFin.modeledBookedNights} nt</span>
                </div>
                <div className="flex justify-between">
                  <span>Payback Period:</span>
                  <span className="font-mono font-bold">{conservativeFin.startupPaybackMonths} mo</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 text-[11px] text-slate-400 italic">
              Accounts for higher cancellations and elevated turnover cleaning expenses.
            </div>
          </div>

          {/* Base Case (Homeowner Assumptions) */}
          <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border-2 border-teal-500 dark:border-teal-500 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-teal-700 dark:text-teal-300 tracking-wider">
                  Base Case (Your Plan)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-teal-600 text-white">
                  Current
                </span>
              </div>

              <div className="text-2xl font-extrabold font-mono text-teal-800 dark:text-teal-200 mt-1">
                ${financials.netAnnualOperatingCashFlow.toLocaleString()}
                <span className="text-xs font-normal text-teal-600 dark:text-teal-400 block font-sans">
                  ${financials.netMonthlyCashFlow.toLocaleString()}/month
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-teal-200 dark:border-teal-800 text-xs space-y-1.5 text-teal-950 dark:text-teal-100">
                <div className="flex justify-between">
                  <span>Occupancy:</span>
                  <span className="font-mono font-bold">{scenario.pricing.expectedOccupancy}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Nightly Rate:</span>
                  <span className="font-mono font-bold">${scenario.pricing.nightlyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booked Nights:</span>
                  <span className="font-mono font-bold">{financials.modeledBookedNights} nt</span>
                </div>
                <div className="flex justify-between">
                  <span>Payback Period:</span>
                  <span className="font-mono font-bold">{financials.startupPaybackMonths} mo</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 text-[11px] text-teal-700 dark:text-teal-300 font-semibold">
              Your central entered baseline and statutory compliance parameters.
            </div>
          </div>

          {/* Optimistic Scenario */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Optimistic Case
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  Peak Demand
                </span>
              </div>

              <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                ${optimisticFin.netAnnualOperatingCashFlow.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 block font-sans">
                  ${optimisticFin.netMonthlyCashFlow.toLocaleString()}/month
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Occupancy:</span>
                  <span className="font-mono font-bold">{optimisticScenario.pricing.expectedOccupancy}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Nightly Rate:</span>
                  <span className="font-mono font-bold">${optimisticScenario.pricing.nightlyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booked Nights:</span>
                  <span className="font-mono font-bold">{optimisticFin.modeledBookedNights} nt</span>
                </div>
                <div className="flex justify-between">
                  <span>Payback Period:</span>
                  <span className="font-mono font-bold">{optimisticFin.startupPaybackMonths} mo</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 text-[11px] text-slate-400 italic">
              Reflects strong spring cherry blossom and peak conference rate premiums.
            </div>
          </div>

        </div>
      </div>

      {/* Creative Feature: "What Could Go Wrong?" One-Click Stress Tests */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>MBA Stress-Test Engine</span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">
              "What Could Go Wrong?" One-Click Stress Scenarios
            </h2>
          </div>

          {activeStressTest && (
            <button
              onClick={() => {
                setActiveStressTest(null);
                // Reload clean scenario from ID
                window.location.reload();
              }}
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Stress Shocks</span>
            </button>
          )}
        </div>

        <p className="text-xs text-slate-400">
          Click any real-world shock below to instantly simulate its impact on your annual cash flow and liquidity requirements:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          
          <button
            type="button"
            onClick={() => handleApplyStressTest('demand_drop')}
            className={`p-3.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
              activeStressTest === 'demand_drop'
                ? 'border-amber-400 bg-amber-950/60 text-white ring-1 ring-amber-400'
                : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold">Tourist Demand Drops 25%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Simulates a regional travel slowdown or winter demand slump.
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyStressTest('cleaning_spike')}
            className={`p-3.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
              activeStressTest === 'cleaning_spike'
                ? 'border-amber-400 bg-amber-950/60 text-white ring-1 ring-amber-400'
                : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold">Cleaning Rates Rise 30%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Simulates labor wage inflation and reliable cleaner shortages in DC.
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyStressTest('emergency_repair')}
            className={`p-3.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
              activeStressTest === 'emergency_repair'
                ? 'border-amber-400 bg-amber-950/60 text-white ring-1 ring-amber-400'
                : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold">$2,000 Emergency Repair</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Simulates a plumbing leak or HVAC breakdown during guest stay.
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyStressTest('zero_month')}
            className={`p-3.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
              activeStressTest === 'zero_month'
                ? 'border-amber-400 bg-amber-950/60 text-white ring-1 ring-amber-400'
                : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold">1 Month Zero Bookings</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Simulates government shutdown or seasonal freeze in January.
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyStressTest('platform_fee_hike')}
            className={`p-3.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
              activeStressTest === 'platform_fee_hike'
                ? 'border-amber-400 bg-amber-950/60 text-white ring-1 ring-amber-400'
                : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold">Platform Fee Rises to 15%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Switches to Airbnb host-only simplified fee structure.
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleApplyStressTest('furnishing_double')}
            className={`p-3.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
              activeStressTest === 'furnishing_double'
                ? 'border-amber-400 bg-amber-950/60 text-white ring-1 ring-amber-400'
                : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="font-bold">Furnishing Budget Doubles</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Simulates scope creep on luxury furniture and professional decor.
            </div>
          </button>

        </div>
      </div>

      {/* Creative Feature: Reverse Profit Solver */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            Goal-Seek Optimization
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Reverse Profit Solver: What Will It Take to Hit Your Goal?</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Set your target monthly take-home income. The solver calculates required occupancy and checks whether it exceeds DC legal night caps.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Target Monthly Net Income: ${targetMonthlyProfit.toLocaleString()}/month
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Equivalent to ${feasibility.requiredAnnualNet.toLocaleString()}/year after operating expenses
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[500, 1000, 1500, 2500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTargetMonthlyProfit(preset)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    targetMonthlyProfit === preset
                      ? 'bg-slate-900 dark:bg-teal-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  ${preset}/mo
                </button>
              ))}
            </div>
          </div>

          {/* Feasibility Alert Result */}
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
            feasibility.legalCapExceeded
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200 font-medium'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
          }`}>
            <div className="flex items-start gap-3">
              {feasibility.legalCapExceeded ? (
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-bold block">
                  {feasibility.legalCapExceeded ? 'Statutory Limit Infeasibility Alert' : 'Feasibility Confirmed'}
                </span>
                <p>{feasibility.explanation}</p>
                {!feasibility.legalCapExceeded && (
                  <p className="text-[11px] opacity-80 pt-1">
                    Alternatively, keeping your currently modeled nights, you would need an average nightly rate of ~${feasibility.requiredNightlyRate}/night.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Price & Occupancy Sensitivity Heatmap Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Price vs. Occupancy Sensitivity Heatmap Matrix
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing estimated annual net cash flow across varying nightly rates and booking occupancies:
        </p>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                <th className="py-2 px-3 text-left">Occupancy Rate ↓ / Nightly Rate →</th>
                {heatmapRates.map((r) => (
                  <th key={r} className="py-2 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    ${r}/nt
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {heatmapOccupancies.map((occ) => (
                <tr key={occ}>
                  <td className="py-3 px-3 text-left font-sans font-bold text-slate-700 dark:text-slate-300">
                    {occ}% Occupancy
                  </td>
                  {heatmapRates.map((rate) => {
                    const testScenario: UserScenario = {
                      ...scenario,
                      pricing: {
                        ...scenario.pricing,
                        nightlyRate: rate,
                        expectedOccupancy: occ
                      }
                    };
                    const fin = calculateScenarioFinancials(testScenario, legalEval);
                    const isPositive = fin.netAnnualOperatingCashFlow > 0;
                    return (
                      <td key={rate} className="py-3 px-3">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${
                          fin.netAnnualOperatingCashFlow > 10000 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          isPositive ? 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300' :
                          'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {isPositive ? '+' : ''}${fin.netAnnualOperatingCashFlow.toLocaleString()}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to Financial Analysis
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Compare Airbnb vs. Strategic Alternatives</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
