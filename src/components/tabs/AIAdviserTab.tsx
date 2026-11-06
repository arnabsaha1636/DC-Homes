import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle,
  Zap,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../../types';

interface AIAdviserTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  onNavigateNext: () => void;
}

export const AIAdviserTab: React.FC<AIAdviserTabProps> = ({
  scenario,
  financials,
  legalEval,
  onNavigateNext,
}) => {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChallenging, setIsChallenging] = useState<boolean>(false);
  const [responseSource, setResponseSource] = useState<'gemini' | 'fallback' | null>(null);

  const sampleQuestions = [
    'Is my specific hosting plan legally permissible under current DC rules?',
    'What happens to my cash flow if tourist demand drops 30%?',
    'Does hiring a property manager make financial sense for my property?',
    'What is my true break-even occupancy and nightly price?',
    'Should I pivot to a 30+ day medium-term rental instead?'
  ];

  const handleAsk = async (queryText: string) => {
    const q = queryText || question;
    if (!q.trim()) return;

    setIsLoading(true);
    setResponse(null);

    const scenarioPayload = {
      property: {
        neighborhood: scenario.property.neighborhood,
        propertyType: scenario.property.propertyType,
        rentalType: scenario.property.rentalType,
        bedrooms: scenario.property.bedrooms,
      },
      owner: {
        isPrimaryResidence: scenario.owner.isPrimaryResidence,
        hoaAllowsSTR: scenario.owner.hoaAllowsSTR,
        hasDCLicense: scenario.owner.hasDCLicense,
        liabilityInsurance: scenario.owner.liabilityInsuranceCoverage,
      },
      pricing: {
        nightlyRate: scenario.pricing.nightlyRate,
        expectedOccupancy: scenario.pricing.expectedOccupancy,
        cleaningFee: scenario.pricing.cleaningFee,
      },
      costs: {
        cleaningPerStay: scenario.operatingCosts.cleaningCostPerTurnover,
        initialSetupTotal: financials.firstYearCashFlowAfterStartup < 0 
          ? financials.netAnnualOperatingCashFlow - financials.firstYearCashFlowAfterStartup 
          : 3000,
      },
      financials: {
        modeledBookedNights: financials.modeledBookedNights,
        grossRevenue: financials.grossBookingRevenue,
        netCashFlow: financials.netAnnualOperatingCashFlow,
        annualHours: financials.totalAnnualHostingHours,
        breakEvenNights: financials.breakEvenBookedNights,
      }
    };

    try {
      const res = await fetch('/api/gemini/adviser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, scenarioData: scenarioPayload }),
      });
      const data = await res.json();
      setResponse(data.answer || 'No response generated.');
      setResponseSource(data.source || 'gemini');
    } catch (err) {
      console.error('Adviser query error:', err);
      setResponse('Failed to reach advisory engine. Please verify connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChallengePlan = async () => {
    setIsChallenging(true);
    setResponse(null);

    const scenarioPayload = {
      property: {
        neighborhood: scenario.property.neighborhood,
        rentalType: scenario.property.rentalType,
      },
      owner: {
        isPrimaryResidence: scenario.owner.isPrimaryResidence,
        hoaAllowsSTR: scenario.owner.hoaAllowsSTR,
      },
      pricing: {
        nightlyRate: scenario.pricing.nightlyRate,
        cleaningFee: scenario.pricing.cleaningFee,
      },
      costs: {
        cleaningPerStay: scenario.operatingCosts.cleaningCostPerTurnover,
        initialSetupTotal: 3500,
      },
      financials: {
        modeledBookedNights: financials.modeledBookedNights,
        netCashFlow: financials.netAnnualOperatingCashFlow,
      }
    };

    try {
      const res = await fetch('/api/gemini/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioData: scenarioPayload }),
      });
      const data = await res.json();
      setResponse(data.challenges || 'No challenge report generated.');
      setResponseSource(data.source || 'gemini');
    } catch (err) {
      console.error('Challenge query error:', err);
      setResponse('Failed to reach stress audit engine.');
    } finally {
      setIsChallenging(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          <span>Part L · Intelligent Decision Support</span>
          <span>·</span>
          <span>Powered by Google Gemini 3.8 Flash</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          StayWise AI Decision Adviser
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          An AI real estate economist that interprets your specific DC property inputs, verifies statutory rules, and stress-tests your assumptions.
        </p>
      </div>

      {/* Hero Action Card: "Challenge My Airbnb Plan" */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-[11px] font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Critical Thinking Audit</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Challenge My Airbnb Plan
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Don't just hear what you want to hear. Have the AI actively identify the top 3 to 5 consequential vulnerabilities, blindspots, or statutory risks in your numbers.
            </p>
          </div>

          <button
            onClick={handleChallengePlan}
            disabled={isChallenging || isLoading}
            className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer shrink-0"
          >
            {isChallenging ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Auditing Plan...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Challenge My Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Query Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Ask the AI Decision Adviser</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            The AI reads your real property details, DC legal status, cash flow, and labor calculations.
          </p>
        </div>

        {/* Quick Sample Questions */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Suggested Decision Dilemmas:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((sq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuestion(sq);
                  handleAsk(sq);
                }}
                className="text-left px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Field */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk(question)}
            placeholder="e.g. Is my cleaning cost too high relative to my nightly rate?"
            className="flex-1 p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            onClick={() => handleAsk(question)}
            disabled={isLoading || isChallenging || !question.trim()}
            className="flex items-center gap-1.5 px-5 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 disabled:opacity-50 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* AI Output Card (Formatted in 6 Rigorous Sections) */}
        {response && (
          <div className="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 text-xs animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="font-bold text-slate-900 dark:text-white">
                  StayWise Advisory Analysis
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
                Source: {responseSource === 'gemini' ? 'Google Gemini 3.8 Flash' : 'Deterministic Advisory Engine'}
              </span>
            </div>

            <div className="prose prose-xs dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
              {response}
            </div>
          </div>
        )}

      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back to Time & Effort
        </button>

        <button
          onClick={onNavigateNext}
          className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>View Final Decision Scorecard & Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
