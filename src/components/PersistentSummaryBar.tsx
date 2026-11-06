import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Clock, ArrowRight, DollarSign, Calendar } from 'lucide-react';
import { FinancialOutputs, LegalEvaluation } from '../types';
import { ActiveTab } from './Header';

interface PersistentSummaryBarProps {
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  onNavigate: (tab: ActiveTab) => void;
}

export const PersistentSummaryBar: React.FC<PersistentSummaryBarProps> = ({
  financials,
  legalEval,
  onNavigate,
}) => {
  const isBlocked = legalEval.status === 'blocked';
  const isVerification = legalEval.status === 'verification_needed';
  const isNetPositive = financials.netAnnualOperatingCashFlow > 0;
  const isVacation = legalEval.annualPermittedNights !== 'Unlimited';

  return (
    <div className="bg-slate-900 text-white border-t border-slate-800 shadow-xl px-4 py-3 sticky bottom-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Metric 1: Legal Gate Summary */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            {isBlocked ? (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            ) : isVerification ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
            )}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                DC Legal Gate
              </div>
              <div className="text-xs font-semibold truncate max-w-[190px]">
                {isBlocked ? 'Legally Blocked' : isVerification ? 'Needs Verification' : 'Eligible for License'}
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          {/* Metric 2: Modeled Booked Nights with 90-night meter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-400 hidden sm:block" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                <span>Booked Nights</span>
                {isVacation && (
                  <span className="text-[9px] text-amber-300 font-semibold">(90 Cap)</span>
                )}
              </div>
              <div className="text-xs font-bold font-mono tabular-nums flex items-center gap-1.5">
                <span>{financials.modeledBookedNights} nights/yr</span>
                {isVacation && (
                  <span className="text-[10px] text-slate-400">
                    ({Math.round((financials.modeledBookedNights / 90) * 100)}% used)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Metrics Strip */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end text-right">
          
          {/* Gross Revenue */}
          <div className="hidden lg:block">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Gross Revenue
            </div>
            <div className="text-sm font-bold font-mono tabular-nums text-slate-200">
              ${financials.grossBookingRevenue.toLocaleString()}
            </div>
          </div>

          {/* Net Cash Flow (Centerpiece) */}
          <div className="border-l border-slate-800 pl-4">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Net Annual Cash Flow
            </div>
            <div className={`text-base font-extrabold font-mono tabular-nums ${
              isNetPositive ? 'text-teal-400' : 'text-rose-400'
            }`}>
              {isNetPositive ? '+' : ''}${financials.netAnnualOperatingCashFlow.toLocaleString()}
              <span className="text-xs text-slate-400 font-normal ml-1">
                (${financials.netMonthlyCashFlow.toLocaleString()}/mo)
              </span>
            </div>
          </div>

          {/* Hourly Labor Compensation */}
          <div className="hidden sm:block border-l border-slate-800 pl-4 text-left">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Effective Wage</span>
            </div>
            <div className="text-sm font-bold font-mono tabular-nums text-amber-300">
              ${financials.effectiveCompensationPerHour.toFixed(2)}/hr
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onNavigate('decision_engine')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>View Decision</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
