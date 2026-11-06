import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldAlert, 
  AlertTriangle, 
  HelpCircle, 
  Scale, 
  ArrowRight, 
  FileText, 
  Compass, 
  Calendar, 
  ListChecks, 
  Sparkles,
  Zap,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../../types';
import { ReadinessScorecard } from '../../services/decisionEngine';

interface DecisionEngineTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  scorecard: ReadinessScorecard;
  onNavigateTab: (tab: any) => void;
}

export const DecisionEngineTab: React.FC<DecisionEngineTabProps> = ({
  scenario,
  financials,
  legalEval,
  scorecard,
  onNavigateTab,
}) => {
  // Local storage persisted checklist items
  const storageKey = `staywise_checklist_${scenario.id}`;
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    } catch (e) {
      console.warn('Failed to persist checklist items in localStorage');
    }
  }, [checkedItems, storageKey]);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isBlocked = legalEval.status === 'blocked';
  const isVerification = legalEval.status === 'verification_needed';
  const isNetPositive = financials.netAnnualOperatingCashFlow > 0;

  // 5 Launch Roadmap Phases
  const roadmapPhases = [
    {
      phaseNumber: 'Phase 1',
      title: 'Confirm Legal Eligibility',
      tasks: [
        { id: 'p1_primary', label: 'Verify DC Homestead Deduction or primary domicile status with Office of Tax and Revenue', done: scenario.owner.isPrimaryResidence && scenario.owner.hasHomesteadDeduction },
        { id: 'p1_bylaws', label: 'Review condominium or HOA governing documents for transient rental bans', done: scenario.owner.hoaAllowsSTR === 'yes' },
        { id: 'p1_insurance', label: 'Contact homeowner insurance carrier to verify $500,000+ commercial short-term rental rider', done: scenario.owner.liabilityInsuranceCoverage >= 500000 && scenario.owner.insuranceVerifiedWithBroker },
        { id: 'p1_cleanhands', label: 'Generate official Certificate of Clean Hands from MyTax.DC.gov', done: scenario.owner.hasCleanHandsCertificate }
      ]
    },
    {
      phaseNumber: 'Phase 2',
      title: 'Financial Preparation & Reserves',
      tasks: [
        { id: 'p2_budget', label: 'Establish upfront startup capital budget ($' + (scenario.setupCosts.furniture + scenario.setupCosts.beddingLinens + 1000) + ' target)', done: true },
        { id: 'p2_reserve', label: 'Create an emergency maintenance reserve of at least $2,000 in escrow', done: scenario.operatingCosts.contingencyRepairFundAnnual >= 1000 },
        { id: 'p2_pricing', label: 'Confirm realistic low/peak seasonal nightly rates based on DC neighborhood comparables', done: true },
        { id: 'p2_tax_acct', label: 'Consult tax professional regarding IRS Publication 527 expense deductions', done: false }
      ]
    },
    {
      phaseNumber: 'Phase 3',
      title: 'DLCP Licensing & Safety Compliance',
      tasks: [
        { id: 'p3_bbl', label: 'File Basic Business License (BBL) with Short-Term Rental Endorsement via DLCP ($99 fee)', done: scenario.owner.hasDCLicense },
        { id: 'p3_alarms', label: 'Install interconnected smoke detectors and carbon monoxide alarms on every floor', done: scenario.property.hasSmokeAlarms && scenario.property.hasCODetectors },
        { id: 'p3_extinguisher', label: 'Mount a certified 2A:10B:C fire extinguisher in an accessible location', done: scenario.property.hasFireExtinguisher },
        { id: 'p3_egress', label: 'Verify unobstructed emergency escape routes and create emergency contact poster', done: scenario.property.hasEmergencyEgress }
      ]
    },
    {
      phaseNumber: 'Phase 4',
      title: 'Property Staging & Operations',
      tasks: [
        { id: 'p4_smartlock', label: 'Install and program a keyless smart deadbolt with unique automated guest pin codes', done: scenario.property.hasSeparateEntrance },
        { id: 'p4_cleaner', label: 'Contract a reliable turnover cleaning team with guaranteed 11 AM - 3 PM turnaround', done: scenario.operatingCosts.cleaningCostPerTurnover > 0 },
        { id: 'p4_photos', label: 'Hire a professional real estate photographer for listing imagery', done: scenario.setupCosts.photographyStaging > 0 },
        { id: 'p4_houserules', label: 'Draft comprehensive house rules prohibiting unauthorized parties and noise after 10 PM', done: true }
      ]
    },
    {
      phaseNumber: 'Phase 5',
      title: 'Launch, Monitor & Reconcile',
      tasks: [
        { id: 'p5_listing', label: 'Publish listing and input official DLCP License Number in listing description', done: false },
        { id: 'p5_night_tracking', label: 'Maintain calendar log to verify unhosted stays never exceed 90 annual nights', done: true },
        { id: 'p5_record_keeping', label: 'Retain booking records and guest manifests for at least 3 years as mandated by DC law', done: false },
        { id: 'p5_review_audit', label: 'Conduct 90-day post-launch audit of true cleaning leakage and owner labor hours', done: false }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part M & N · Executive Synthesis</span>
          <span>·</span>
          <span>Personalized Decision Scorecard & 5-Phase Roadmap</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The Final Decision Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Given your property, District of Columbia law, realistic net cash flow, operational workload, and lifestyle preferences — should you list on Airbnb?
        </p>
      </div>

      {/* THE MASTER DECISION CARD */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
        isBlocked
          ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-100'
          : isVerification
          ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900 text-amber-950 dark:text-amber-100'
          : 'bg-white dark:bg-slate-900 border-teal-500 dark:border-teal-500 ring-2 ring-teal-500/20'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              YOUR AIRBNB DECISION SUMMARY
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {scorecard.recommendationHeadline}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Readiness Score</span>
              <span className="text-2xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
                {scorecard.overallScore}/100
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
          {scorecard.recommendationSummary}
        </p>

        {/* 4-Metric Decision Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Legal Compliance</span>
            <span className={`font-bold mt-0.5 block ${
              isBlocked ? 'text-rose-600 dark:text-rose-400' : isVerification ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {legalEval.statusTitle}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Net Annual Cash Flow</span>
            <span className={`font-bold font-mono mt-0.5 block text-sm ${
              isNetPositive ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600 dark:text-rose-400'
            }`}>
              {isNetPositive ? '+' : ''}${financials.netAnnualOperatingCashFlow.toLocaleString()}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Hosting Workload</span>
            <span className="font-bold font-mono text-slate-900 dark:text-white mt-0.5 block text-sm">
              {financials.totalAnnualHostingHours} hrs/yr
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Strongest Alternative</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 block truncate">
              {scorecard.strongestAlternative}
            </span>
          </div>
        </div>

        {/* Top 3 Prioritized Next Steps */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
          <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
            Three Recommended Action Steps:
          </span>
          <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {scorecard.priorityActions.map((action, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-900 dark:bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creative Feature: "What Would Change My Decision?" */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            Sensitivity Levers
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>What Would Change My Decision?</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Key operational adjustments that would materially shift your recommendation tier:
          </p>
        </div>

        <div className="space-y-3 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Reduce Cleaning Turnover Leakage:</strong>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                Negotiating cleaning down by $25/turnover or requiring a 3-night minimum stay adds ~${Math.round(financials.expectedReservations * 25).toLocaleString()}/year straight to your net cash flow.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Pivot to 30+ Day Mid-Term Rental:</strong>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                If the 90-night vacation cap or HOA restrictions block you, offering furnished 30-day corporate/medical stays is 100% exempt from DC STR limitations while generating reliable monthly income.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Resolve Commercial Insurance Rider:</strong>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                Upgrading liability to $500,000+ with written insurer confirmation moves your status from "Verification Needed" to "Eligible to Apply."
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Part N: Actionable 5-Phase Launch Roadmap with Persistent Checkboxes */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            Part N · Execution Plan
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Personalized 5-Phase Launch Roadmap</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your step-by-step checklist to launch legally and safely in Washington, DC. Checkbox status persists locally.
          </p>
        </div>

        <div className="space-y-6">
          {roadmapPhases.map((phase, pIdx) => (
            <div key={pIdx} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {phase.phaseNumber}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {phase.title}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {phase.tasks.map((task) => {
                  const isChecked = checkedItems[task.id] !== undefined ? checkedItems[task.id] : task.done;
                  return (
                    <label
                      key={task.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                        isChecked
                          ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(task.id)}
                        className="rounded-xs text-teal-600 focus:ring-teal-500 mt-0.5 shrink-0"
                      />
                      <span className={isChecked ? 'line-through opacity-75' : ''}>
                        {task.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to AI Adviser
        </button>

        <button
          onClick={() => onNavigateTab('decision_report')}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Download Executive Decision Report</span>
          <FileText className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
