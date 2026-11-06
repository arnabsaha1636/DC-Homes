import React from 'react';
import { 
  DollarSign, 
  Calendar, 
  Receipt, 
  Percent, 
  Sliders, 
  Info, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { UserScenario, FinancialOutputs, LegalEvaluation, FeeStructure } from '../../types';

interface RevenueEstimatorTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  onUpdateScenario: (updated: UserScenario) => void;
  onNavigateNext: () => void;
}

export const RevenueEstimatorTab: React.FC<RevenueEstimatorTabProps> = ({
  scenario,
  financials,
  legalEval,
  onUpdateScenario,
  onNavigateNext,
}) => {
  const { pricing } = scenario;
  const isVacation = legalEval.annualPermittedNights !== 'Unlimited';
  const permittedCap = legalEval.annualPermittedNights === 'Unlimited' ? 365 : legalEval.annualPermittedNights;

  const handlePricingChange = (field: keyof typeof pricing, val: any) => {
    onUpdateScenario({
      ...scenario,
      pricing: {
        ...pricing,
        [field]: val,
      }
    });
  };

  const capUtilization = isVacation 
    ? Math.min(100, Math.round((financials.modeledBookedNights / 90) * 100))
    : Math.round((financials.modeledBookedNights / Math.max(1, pricing.availableNightsAnnual)) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part D · Gross Revenue Modeling</span>
          <span>·</span>
          <span>Statutory Night Limits & Fee Structures</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Airbnb Revenue Estimator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Model booked nights, dynamic pricing, and platform fee deductions while enforcing District of Columbia statutory night caps.
        </p>
      </div>

      {/* Creative Feature: 90-Night Limit Meter (Crucial DC Feature) */}
      <div className={`p-6 rounded-3xl border shadow-sm transition-colors ${
        isVacation
          ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white border-slate-800'
          : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold">
                {isVacation ? 'DC Vacation Rental 90-Night Statutory Limit Meter' : 'Hosted Rental Capacity Meter (No 90-Night Cap)'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isVacation
                ? `DC Code § 30-201.06 restricts unhosted vacation rentals to 90 cumulative calendar nights per year.`
                : `Because you live on-site during stays, DC law does NOT impose the 90-night annual ceiling.`}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Modeled Booked Nights</span>
            <span className="text-2xl font-extrabold font-mono text-teal-400">
              {financials.modeledBookedNights}
              <span className="text-xs font-normal text-slate-400 ml-1">
                / {isVacation ? '90 legal max' : `${pricing.availableNightsAnnual} offered`}
              </span>
            </span>
          </div>
        </div>

        {/* Meter Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="h-4 w-full bg-slate-800 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              style={{ width: `${capUtilization}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                financials.legalNightCapRestricted 
                  ? 'bg-amber-400' 
                  : 'bg-teal-400'
              }`}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>0 nights</span>
            <span className="font-semibold text-teal-300">
              {capUtilization}% of permitted capacity used
            </span>
            <span>{isVacation ? '90 nights (Legal Cap)' : `${pricing.availableNightsAnnual} available`}</span>
          </div>

          {financials.legalNightCapRestricted && (
            <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Legal Cap Enforced in Model:</strong> You entered {financials.potentialBookedNightsBeforeCap} potential booked nights based on your occupancy rate. StayWise DC automatically capped modeled bookings at 90 nights. (Unrealizable gross revenue: ~${financials.lostRevenueToCap.toLocaleString()}).
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Volume Controls (Interactive Sliders) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Pricing & Booking Volume Inputs</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adjust your nightly rate and expected occupancy to test revenue elasticity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Nightly Price Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Base Nightly Rate ($/night)</label>
              <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
                ${pricing.nightlyRate}
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={650}
              step={5}
              value={pricing.nightlyRate}
              onChange={(e) => handlePricingChange('nightlyRate', parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$50/nt</span>
              <span>$350/nt</span>
              <span>$650/nt</span>
            </div>
          </div>

          {/* Expected Occupancy Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Expected Occupancy of Offered Nights</label>
              <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
                {pricing.expectedOccupancy}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={95}
              step={1}
              value={pricing.expectedOccupancy}
              onChange={(e) => handlePricingChange('expectedOccupancy', parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>10% (Low)</span>
              <span>65% (DC Average)</span>
              <span>95% (Peak)</span>
            </div>
          </div>

          {/* Available Nights Annual */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Offered / Available Nights Annually</label>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                {pricing.availableNightsAnnual} nights
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={365}
              step={5}
              value={pricing.availableNightsAnnual}
              onChange={(e) => handlePricingChange('availableNightsAnnual', parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>30 nights</span>
              <span>180 nights</span>
              <span>365 nights</span>
            </div>
          </div>

          {/* Average Stay Length */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Average Length of Stay (Nights)</label>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                {pricing.averageStayLength} nights
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={14}
              step={0.5}
              value={pricing.averageStayLength}
              onChange={(e) => handlePricingChange('averageStayLength', parseFloat(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 night (High turnover)</span>
              <span>3.5 nights</span>
              <span>14 nights (Low turnover)</span>
            </div>
          </div>

          {/* Cleaning Fee Charged to Guest */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Cleaning Fee Charged to Guest ($)</label>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                ${pricing.cleaningFee}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={250}
              step={5}
              value={pricing.cleaningFee}
              onChange={(e) => handlePricingChange('cleaningFee', parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$0</span>
              <span>$100</span>
              <span>$250</span>
            </div>
          </div>

          {/* Platform Fee Model Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Airbnb Platform Fee Commission Structure
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handlePricingChange('platformFeeModel', 'split')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                  pricing.platformFeeModel === 'split'
                    ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div>Split-Fee Model</div>
                <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                  Host pays 3% · Guest pays ~14%
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePricingChange('platformFeeModel', 'host_only')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                  pricing.platformFeeModel === 'host_only'
                    ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div>Host-Only Fee Model</div>
                <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                  Host pays 15% · Guest pays 0%
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Creative Feature: Guest Booking Receipt vs Host Payout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Transparency Breakdown
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Guest Price vs. Host Payout (Sample 3-Night Stay)</span>
            </h2>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Illustrative Booking Receipt
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing why guest price is NOT host revenue. The 15.95% DC lodging tax is paid by guests and remitted directly to the government.
        </p>

        {/* Receipt Styled Card */}
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-3 shadow-inner">
          <div className="text-center pb-3 border-b border-dashed border-slate-300 dark:border-slate-700">
            <span className="font-bold text-sm tracking-wider text-slate-900 dark:text-white">AIRBNB GUEST RECEIPT</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Washington, DC Property · 3 Nights</span>
          </div>

          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Accommodation ($ {pricing.nightlyRate} × 3 nights)</span>
              <span>${pricing.nightlyRate * 3}</span>
            </div>

            <div className="flex justify-between">
              <span>Cleaning Fee (Charged to Guest)</span>
              <span>${pricing.cleaningFee}</span>
            </div>

            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Airbnb Guest Service Fee (~14%)</span>
              <span>${Math.round((pricing.nightlyRate * 3 + pricing.cleaningFee) * 0.14)}</span>
            </div>

            <div className="flex justify-between text-rose-600 dark:text-rose-400 font-semibold">
              <span>DC Transient Lodging Tax (15.95%)</span>
              <span>${Math.round((pricing.nightlyRate * 3 + pricing.cleaningFee) * 1.14 * 0.1595)}</span>
            </div>

            <div className="pt-2 border-t border-slate-300 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
              <span>TOTAL GUEST PRICE PAID:</span>
              <span>
                ${Math.round(
                  (pricing.nightlyRate * 3 + pricing.cleaningFee) * 1.14 * 1.1595
                )}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="pt-3 border-t border-dashed border-slate-300 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">HOST PAYOUT SUMMARY:</span>

            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Gross Host Booking Subtotal</span>
              <span>${pricing.nightlyRate * 3 + pricing.cleaningFee}</span>
            </div>

            <div className="flex justify-between text-rose-600 dark:text-rose-400">
              <span>Airbnb Host Commission (3%)</span>
              <span>-${Math.round((pricing.nightlyRate * 3 + pricing.cleaningFee) * 0.03)}</span>
            </div>

            <div className="pt-2 border-t border-slate-300 dark:border-slate-700 flex justify-between font-bold text-teal-600 dark:text-teal-400 text-sm">
              <span>ESTIMATED HOST PAYOUT:</span>
              <span>${Math.round((pricing.nightlyRate * 3 + pricing.cleaningFee) * 0.97)}</span>
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
          ← Back to Neighborhood Insights
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Analyze Operating Costs & Cash Flow</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
