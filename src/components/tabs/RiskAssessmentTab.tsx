import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Sliders, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  Home, 
  Lock, 
  Flame,
  Clock,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { UserScenario, RiskPreferences } from '../../types';
import { ReadinessScorecard } from '../../services/decisionEngine';

interface RiskAssessmentTabProps {
  scenario: UserScenario;
  scorecard: ReadinessScorecard;
  onUpdateScenario: (updated: UserScenario) => void;
  onNavigateNext: () => void;
}

export const RiskAssessmentTab: React.FC<RiskAssessmentTabProps> = ({
  scenario,
  scorecard,
  onUpdateScenario,
  onNavigateNext,
}) => {
  const { riskPreferences } = scenario;

  const handlePrefChange = (field: keyof RiskPreferences, val: number) => {
    onUpdateScenario({
      ...scenario,
      riskPreferences: {
        ...riskPreferences,
        [field]: val,
      }
    });
  };

  const radarDimensions = [
    { label: 'Financial Resilience', score: scorecard.dimensions.financialAttractiveness, desc: 'Cushion against zero bookings or sudden $2,000 repairs' },
    { label: 'Legal Readiness', score: scorecard.dimensions.legalReadiness, desc: 'Compliance with DC primary residence and DLCP licensing' },
    { label: 'Operational Capacity', score: scorecard.dimensions.operationalReadiness, desc: 'Ability to coordinate turns, restock, and communicate' },
    { label: 'Privacy Comfort', score: scorecard.dimensions.lifestyleMatch, desc: 'Comfort with guests near personal living spaces and noise' },
    { label: 'Time Availability', score: Math.round(riskPreferences.freeTimeAvailability * 20), desc: 'Dedicated hours per week for hospitality management' },
    { label: 'Risk Compatibility', score: scorecard.dimensions.riskCompatibility, desc: 'Tolerance for variable income and emergency maintenance calls' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part J · Holistic Risk Analysis</span>
          <span>·</span>
          <span>Financial, Operational, Regulatory & Lifestyle Readiness</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Comprehensive Risk & Lifestyle Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Never assume that a profitable Airbnb is automatically a good idea. Evaluate personal friction, neighbor impact, and operational resilience.
        </p>
      </div>

      {/* Creative Feature: Risk Radar / Dimension Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Diagnostic Health Check
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              The 6-Dimension Host Readiness Radar
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Overall Readiness: {scorecard.overallScore}/100
          </span>
        </div>

        {/* 6 Dimension Visual Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {radarDimensions.map((dim, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{dim.label}</span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{dim.score}/100</span>
              </div>

              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${dim.score}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    dim.score >= 70 ? 'bg-teal-500' : dim.score >= 45 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                />
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {dim.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Homeowner Personal Preferences (Interactive Calibration Sliders) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Calibrate Your Personal Hosting Tolerances</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Rate your individual comfort levels to adjust the decision scorecard to your personal circumstances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Comfort With Strangers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Comfort with Unfamiliar Guests in Home</label>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{riskPreferences.comfortWithStrangers}/5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={riskPreferences.comfortWithStrangers}
              onChange={(e) => handlePrefChange('comfortWithStrangers', parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 = Highly Uncomfortable</span>
              <span>5 = Completely At Ease</span>
            </div>
          </div>

          {/* Privacy Preference */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Importance of Household Privacy</label>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{riskPreferences.privacyPreference}/5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={riskPreferences.privacyPreference}
              onChange={(e) => handlePrefChange('privacyPreference', parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 = Low Privacy Need</span>
              <span>5 = Extreme Privacy Priority</span>
            </div>
          </div>

          {/* Free Time Availability */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Available Weekly Free Time</label>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{riskPreferences.freeTimeAvailability}/5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={riskPreferences.freeTimeAvailability}
              onChange={(e) => handlePrefChange('freeTimeAvailability', parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 = Very Busy (&lt;2 hrs/wk)</span>
              <span>5 = Ample Time (&gt;10 hrs/wk)</span>
            </div>
          </div>

          {/* Emergency Availability */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <label className="text-slate-700 dark:text-slate-300">Emergency & Midnight Response Ability</label>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{riskPreferences.emergencyAvailability}/5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={riskPreferences.emergencyAvailability}
              onChange={(e) => handlePrefChange('emergencyAvailability', parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 = Cannot Respond Quickly</span>
              <span>5 = Always Available Locally</span>
            </div>
          </div>

        </div>
      </div>

      {/* 5 Risk Categories Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          The 5 Major Operational Risk Domains
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          How StayWise DC accounts for real real estate liabilities beyond financial returns:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <DollarSign className="w-4 h-4 text-rose-500" />
              <span>1. Financial Risks</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Seasonality drops (Jan/Feb lull), price compression from competing listings, platform commission increases, and unrecoverable initial setup capital.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>2. Operational Risks</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Cleaner cancellations at 11 AM check-out, smart lock Wi-Fi disconnection, last-minute booking cancellations, and negative reviews damaging search rank.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Lock className="w-4 h-4 text-teal-500" />
              <span>3. Regulatory & Association Risks</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Exceeding the DC 90-night vacation ceiling, HOA neighbor complaints triggering fines, DLCP unannounced compliance inspections, and insurance claim denials.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Flame className="w-4 h-4 text-purple-500" />
              <span>4. Property & Physical Risks</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Water leaks, clogged plumbing, accidental furniture staining, carpet burns, and accelerated wear & tear on high-end appliances.
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to Alternatives
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Calculate Real Cost of Hosting Time</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
