import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Info,
  Scale,
  FileText,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserScenario, LegalEvaluation, LegalStatus } from '../../types';
import { OFFICIAL_SOURCES } from '../../services/sources';

interface LegalEligibilityTabProps {
  scenario: UserScenario;
  legalEval: LegalEvaluation;
  onUpdateScenario: (updated: UserScenario) => void;
  onNavigateNext: () => void;
}

export const LegalEligibilityTab: React.FC<LegalEligibilityTabProps> = ({
  scenario,
  legalEval,
  onUpdateScenario,
  onNavigateNext,
}) => {
  // Pending Legislation Simulator State (Bill B26-0647)
  const [simulatedNightCap, setSimulatedNightCap] = useState<number>(120);
  const [simulateNonPrimaryPermit, setSimulateNonPrimaryPermit] = useState<boolean>(false);
  const [showSimModal, setShowSimModal] = useState<boolean>(false);

  const isBlocked = legalEval.status === 'blocked';
  const isVerification = legalEval.status === 'verification_needed';
  const isEligible = legalEval.status === 'eligible';

  const getStatusBanner = () => {
    switch (legalEval.status) {
      case 'eligible':
        return {
          icon: <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />,
          title: 'Appears Eligible to Proceed with DLCP Licensing',
          badge: 'Status: Eligible to Apply',
          badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          desc: 'Based on your entered circumstances, your property complies with Washington, DC primary residence rules, safety prerequisites, and association bylaws. You may proceed with filing your Basic Business License application.'
        };
      case 'verification_needed':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />,
          title: 'Potentially Eligible — Official Verification Needed',
          badge: 'Status: Verification Required',
          badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          desc: 'Your property may qualify, but key statutory items (such as the DC insurance minimum discrepancy or condo bylaw approval) require written confirmation prior to license submission.'
        };
      case 'blocked':
        return {
          icon: <ShieldAlert className="w-8 h-8 text-rose-600 dark:text-rose-400 shrink-0" />,
          title: 'Currently Blocked by Identified Statutory or Association Rule',
          badge: 'Status: Legally Blocked',
          badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800',
          desc: 'Under current DC law or private covenants, listing this property for short-term stays is prohibited. Operating without required authorization exposes hosts to civil penalties of $1,000 to $5,000.'
        };
      default:
        return {
          icon: <HelpCircle className="w-8 h-8 text-slate-500 shrink-0" />,
          title: 'Insufficient Information for Legal Determination',
          badge: 'Status: Incomplete Info',
          badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
          desc: 'Please complete the ownership and property questions to evaluate DC regulatory compatibility.'
        };
    }
  };

  const banner = getStatusBanner();

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part B · Regulatory Engine</span>
          <span>·</span>
          <span>DC Municipal Code Evaluation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The DC Legal Gate
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Washington, DC enforces some of the nation's strictest short-term rental rules. We evaluate statutory compliance before recommending hosting.
        </p>
      </div>

      {/* Main Status Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {banner.icon}
            <div>
              <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-md border ${banner.badgeColor} mb-1`}>
                {banner.badge}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {banner.title}
              </h2>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-200 sm:dark:border-slate-800 sm:pl-5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Annual Night Limit
            </span>
            <span className="text-base font-extrabold font-mono text-teal-600 dark:text-teal-400">
              {legalEval.annualPermittedNights === 'Unlimited' ? 'Unlimited Hosted Nights' : `${legalEval.annualPermittedNights} Nights Max`}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
          {banner.desc}
        </p>

        {/* License Classification & Fee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Required DC License</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
              {legalEval.applicableLicenseCategory}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">DLCP 2-Year Application Fee</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                ${scenario.setupCosts.licensingPermits} (Standard 2-Year Endorsement)
              </span>
            </div>
            <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">Editable Input</span>
          </div>
        </div>
      </div>

      {/* SPECIAL DISCREPANCY CALLOUT: $250k vs $500k Liability Insurance */}
      <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 space-y-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                Official Sources Require Verification: Liability Insurance Minimum Discrepancy
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                Statutory Conflict
              </span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              There is a documented discrepancy between published District guidance and codified statute:
            </p>
            <ul className="text-xs text-amber-800 dark:text-amber-300 list-disc list-inside space-y-1 pl-1">
              <li>
                <strong>DC DLCP Guidelines</strong> reference <strong>$250,000</strong> in liability coverage.
              </li>
              <li>
                <strong>DC Official Code § 30-201.02</strong> statutorily mandates at least <strong>$500,000</strong> in liability insurance (subject to rulemaking).
              </li>
            </ul>
            <p className="text-xs text-amber-800 dark:text-amber-300 pt-1">
              StayWise DC does not silently mark insurance as satisfied based on the lower $250,000 figure. We strongly recommend securing at least $500,000 to $1,000,000 under a verified commercial short-term rental rider.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <a
                href="https://code.dccouncil.gov/us/dc/council/code/sections/30-201.02"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-amber-900 dark:text-amber-200 hover:underline"
              >
                <span>Read DC Code § 30-201.02</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-amber-400">·</span>
              <a
                href="https://dlcp.dc.gov/page/operating-short-term-rental-district-columbia"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-amber-900 dark:text-amber-200 hover:underline"
              >
                <span>Read DLCP STR Guidelines</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Visual DC Legal Gate: Decision Tree */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>The DC Legal Gate: Rule-by-Rule Decision Flow</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            How your specific property circumstances flow through District of Columbia legal prerequisites:
          </p>
        </div>

        <div className="space-y-3">
          
          {/* Gate 1: Primary Residence */}
          <div className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-colors ${
            legalEval.isPrimaryResidenceSatisfied
              ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
              : 'border-rose-200 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20'
          }`}>
            <div className="flex items-start gap-3">
              {legalEval.isPrimaryResidenceSatisfied ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Gate 1: Primary Residence Qualification (DC Code § 30-201.02)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {legalEval.isPrimaryResidenceSatisfied
                    ? 'PASSED: Host personally occupies the home as primary domicile.'
                    : 'BLOCKED: Investment property or secondary home. Prohibited from short-term rentals under DC law.'}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold shrink-0 font-mono">
              {legalEval.isPrimaryResidenceSatisfied ? 'PASS' : 'BLOCK'}
            </span>
          </div>

          {/* Gate 2: Rental Category & Night Limits */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Gate 2: Classification & Statutory Night Ceiling (DC Code § 30-201.06)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {legalEval.annualPermittedNights === 'Unlimited'
                    ? 'Hosted Rental: No annual night limitation applies because host is on-site during stays.'
                    : `Vacation Rental: Host absent during stays. Capped at ${legalEval.annualPermittedNights} cumulative calendar nights annually.`}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold shrink-0 font-mono text-teal-600 dark:text-teal-400">
              {legalEval.annualPermittedNights === 'Unlimited' ? 'UNLIMITED' : `${legalEval.annualPermittedNights} NIGHTS`}
            </span>
          </div>

          {/* Gate 3: Private Bylaws & HOA */}
          <div className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-colors ${
            legalEval.isHOAPermitted
              ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
              : 'border-rose-200 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20'
          }`}>
            <div className="flex items-start gap-3">
              {legalEval.isHOAPermitted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Gate 3: Private Association Bylaws (HOA / Condo / Co-op)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {legalEval.isHOAPermitted
                    ? 'PASSED: Permitted or detached property with no restrictive bylaws.'
                    : 'BLOCKED: Association covenants forbid transient leasing. Private covenants supersede city permits.'}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold shrink-0 font-mono">
              {legalEval.isHOAPermitted ? 'PASS' : 'BLOCK'}
            </span>
          </div>

          {/* Gate 4: Safety & Inspection */}
          <div className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-colors ${
            legalEval.isSafetySatisfied
              ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
              : 'border-amber-200 bg-amber-50/40 dark:border-amber-900 dark:bg-amber-950/20'
          }`}>
            <div className="flex items-start gap-3">
              {legalEval.isSafetySatisfied ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Gate 4: Life Safety Prerequisites (DLCP Building & Fire Code)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {legalEval.isSafetySatisfied
                    ? 'PASSED: Working smoke detectors, CO alarms, fire extinguisher, and egress installed.'
                    : 'ACTION NEEDED: Missing required life safety equipment. Must be installed before DLCP inspection.'}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold shrink-0 font-mono">
              {legalEval.isSafetySatisfied ? 'PASS' : 'ACTION'}
            </span>
          </div>

          {/* Gate 5: Clean Hands Certificate */}
          <div className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-colors ${
            legalEval.isCleanHandsSatisfied
              ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
              : 'border-amber-200 bg-amber-50/40 dark:border-amber-900 dark:bg-amber-950/20'
          }`}>
            <div className="flex items-start gap-3">
              {legalEval.isCleanHandsSatisfied ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Gate 5: DC Certificate of Clean Hands (MyTax.DC.gov)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {legalEval.isCleanHandsSatisfied
                    ? 'PASSED: Verified zero delinquent tax liabilities >$100.'
                    : 'ACTION NEEDED: Generate free certificate from MyTax.DC.gov before filing DLCP license application.'}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold shrink-0 font-mono">
              {legalEval.isCleanHandsSatisfied ? 'PASS' : 'ACTION'}
            </span>
          </div>

        </div>
      </div>

      {/* "What Would Need to Change?" Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>What Would Need to Change to Proceed?</span>
        </h2>

        {legalEval.whatNeedsToChange.length > 0 ? (
          <div className="space-y-3">
            {legalEval.whatNeedsToChange.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-600 dark:text-slate-300">
            No blocking changes required! All core eligibility criteria appear satisfied based on your inputs.
          </p>
        )}
      </div>

      {/* Regulatory Change Simulator: Bill B26-0647 (Hypothetical Pending Legislation) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  Regulatory Change Simulator: DC Bill B26-0647
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-500/30 text-amber-300 border border-amber-500/40">
                  Pending Legislation · Not Enacted Law
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Test the hypothetical financial impact if proposed DC Council legislation expands permitted nights.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSimModal(!showSimModal)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/30 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {showSimModal ? 'Hide Simulator' : 'Launch Policy Simulator'}
          </button>
        </div>

        {showSimModal && (
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-4 text-xs animate-in fade-in duration-200">
            <p className="text-slate-300 leading-relaxed">
              The <em>Short-Term Rental Regulation Amendment Act of 2026 (Bill B26-0647)</em> has been proposed in the DC Council to adjust night caps and licensing flexibility. <strong>CRITICAL NOTE:</strong> This is pending legislation and does NOT apply to your main eligibility decision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Simulated Annual Vacation Night Cap: {simulatedNightCap} Nights
                </label>
                <input
                  type="range"
                  min={90}
                  max={180}
                  step={10}
                  value={simulatedNightCap}
                  onChange={(e) => setSimulatedNightCap(parseInt(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Current baseline: 90 nights.</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-teal-400 block">Simulated Revenue Effect</span>
                <span className="text-sm font-bold font-mono text-white block mt-0.5">
                  +${Math.max(0, (simulatedNightCap - 90) * scenario.pricing.nightlyRate).toLocaleString()} Gross Potential
                </span>
                <span className="text-[10px] text-slate-400">
                  If the 90-night limit were increased to {simulatedNightCap} nights.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Authoritative Sources Drawer / Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Official DC Regulatory References & Statutes</span>
        </h2>

        <div className="space-y-3">
          {OFFICIAL_SOURCES.map((src) => (
            <div key={src.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{src.title}</span>
                  <span className="text-[10px] font-medium text-slate-400">({src.governingBody})</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {src.keyRuleSummary}
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Last verified: {src.lastReviewedDate} · Applies to: {src.appliesTo}
                </span>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to Property Profile
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>Explore DC Neighborhoods & Comps</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
