import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertOctagon, 
  Scale, 
  DollarSign, 
  Clock, 
  Compass, 
  Sparkles 
} from 'lucide-react';
import { UserScenario } from '../types';
import { DEMO_SCENARIOS } from '../services/demoScenarios';
import { ActiveTab } from './Header';

interface GuidedDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenario: UserScenario) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const GuidedDemoModal: React.FC<GuidedDemoModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
  onNavigateTab,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: '01',
      title: 'The MBA Problem',
      headline: 'Why Ordinary Airbnb Calculators Give Dangerous Advice',
      body: `Most consumer Airbnb tools simply multiply an estimated nightly rate by 365 days and 65% occupancy, presenting a homeowner with an enticing six-figure revenue illusion.

In reality:
1. They ignore Washington, DC municipal statutes (e.g. strict primary residence rules and the 90-night statutory cap on vacation rentals).
2. They omit HOA/condo covenant prohibitions, which legally supersede municipal permits.
3. They ignore 40%+ operational expense leakage (turnover cleaning, 15.95% transient tax, platform fees, STR insurance).
4. They treat homeowner labor as completely free.`,
      actionLabel: 'Explore The Solution',
      onApply: () => onNavigateTab('dashboard')
    },
    {
      stepNumber: '02',
      title: 'The StayWise DC Architecture',
      headline: 'A 5-Dimensional Decision Engine (Not Just a Calculator)',
      body: `StayWise DC integrates five interrelated pillars into an explainable decision framework:

1. CAN I? (DC Legal Gate): Primary residence verification, Clean Hands, safety egress, and $99 DLCP licensing.
2. HOW MUCH? (Deterministic Cash Flow): Deducting true variable and fixed costs, platform splits, and taxes.
3. WHAT COULD GO WRONG? (Risk Radar & Stress Tests): Quantified shocks (demand -25%, repair expenses).
4. IS IT BETTER THAN ALTERNATIVES? (The Decision Frontier): Comparing Airbnb vs 30+ day mid-term and 12-month leases.
5. SHOULD I? (Readiness Scorecard): Weighting personal time, privacy comfort, and economic profit.`,
      actionLabel: 'See Legal Gate In Action',
      onApply: () => {
        onNavigateTab('legal_eligibility');
      }
    },
    {
      stepNumber: '03',
      title: 'The Wow Moment',
      headline: 'Two Homeowners, Two Opposing Recommendations',
      body: `Consider two DC homeowners with similar $250+/night property values:

• Homeowner A (Capitol Hill Townhouse): Primary residence; host travels in summer. Modeled gross revenue is high, but DC vacation rental law strictly caps bookings at 90 nights. Verdict: Promising, but revenue ceiling is capped.

• Homeowner C (Georgetown Luxury Condo): Proposed $310/night ADR generates $25,000+ hypothetical revenue. HOWEVER, condo association bylaws forbid short-term rentals. In StayWise DC, Legal Eligibility is a HARD GATE: financial attractiveness CANNOT override a legal prohibition! Verdict: Hard Stop.`,
      actionLabel: 'Load Georgetown Condo (Demo C)',
      onApply: () => {
        onSelectScenario(DEMO_SCENARIOS.georgetown_condo);
        onNavigateTab('legal_eligibility');
      }
    },
    {
      stepNumber: '04',
      title: 'The Key Economic Insight',
      headline: 'High Revenue ≠ High Profit ≠ A Good Personal Decision',
      body: `Look at the "Where Does My $100 Go?" interactive waterfall chart:

For every $100 a guest pays:
• $13.75 goes directly to the DC Office of Tax & Revenue (15.95% transient lodging tax).
• $12.00 is retained by Airbnb in host & guest platform service fees.
• $34.50 is consumed by turnover cleaning, guest supplies, laundry, and wear & tear.
• $14.25 covers fixed annual overhead (commercial STR insurance rider, maintenance reserve, licensing).

Only $25.50 remains as net operating cash flow. Furthermore, if you value your free time at $50/hour, your economic profit may be negative!`,
      actionLabel: 'Inspect $100 Waterfall & Labor Cost',
      onApply: () => {
        onNavigateTab('financial_analysis');
      }
    },
    {
      stepNumber: '05',
      title: 'Actionable Final Outcome',
      headline: 'Personalized Decision Scorecard, AI Adviser & Launch Roadmap',
      body: `StayWise DC never leaves the user with an ambiguous spreadsheet.

The homeowner receives:
1. Clear Categorical Verdict (Promising / Potentially Worthwhile / Financially Unattractive / Blocked).
2. What Would Change My Decision? prioritized sensitivity levers.
3. 5-Phase Interactive Launch Checklist with persistent task tracking.
4. StayWise AI Adviser powered by Google Gemini to challenge assumptions.
5. Downloadable Executive Decision Report with full methodology citations.`,
      actionLabel: 'View Final Decision & Roadmap',
      onApply: () => {
        onNavigateTab('decision_engine');
      }
    }
  ];

  const activeStep = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transition-colors">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              MBA
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                StayWise DC Executive Walkthrough
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Decision engine evaluation & methodology guide for professors
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Step Pill & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 tracking-wider uppercase mb-1">
              <span>Step {activeStep.stepNumber} of 05</span>
              <span>·</span>
              <span>{activeStep.title}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeStep.headline}
            </h3>
          </div>

          {/* Body Content */}
          <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            {activeStep.body}
          </div>

          {/* Step Action Shortcut Button */}
          <div className="pt-1">
            <button
              onClick={() => {
                activeStep.onApply();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 rounded-xl transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{activeStep.actionLabel} & Exit Tour</span>
            </button>
          </div>
        </div>

        {/* Modal Footer with Stepper Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentStep === idx
                    ? 'w-6 bg-teal-600 dark:bg-teal-400'
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish Tour</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
