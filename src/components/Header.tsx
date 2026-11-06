import React from 'react';
import { 
  Building2, 
  Sparkles, 
  FileText, 
  PlayCircle, 
  RotateCcw, 
  Moon, 
  Sun,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../services/demoScenarios';
import { UserScenario, LegalStatus } from '../types';

export type ActiveTab = 
  | 'dashboard'
  | 'property_profile'
  | 'legal_eligibility'
  | 'neighborhoods'
  | 'revenue_estimator'
  | 'financial_analysis'
  | 'scenario_simulator'
  | 'alternatives'
  | 'risk_assessment'
  | 'time_effort'
  | 'ai_adviser'
  | 'decision_engine'
  | 'decision_report';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentScenario: UserScenario;
  onSelectScenario: (scenario: UserScenario) => void;
  onReset: () => void;
  onOpenGuidedDemo: () => void;
  legalStatus: LegalStatus;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentScenario,
  onSelectScenario,
  onReset,
  onOpenGuidedDemo,
  legalStatus,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'property_profile', label: 'Property Profile' },
    { id: 'legal_eligibility', label: 'DC Legal Gate' },
    { id: 'neighborhoods', label: 'Neighborhoods' },
    { id: 'revenue_estimator', label: 'Revenue' },
    { id: 'financial_analysis', label: 'Cash Flow' },
    { id: 'scenario_simulator', label: 'Sensitivity Lab' },
    { id: 'alternatives', label: 'Alternatives' },
    { id: 'risk_assessment', label: 'Risk Radar' },
    { id: 'time_effort', label: 'Time & Effort' },
    { id: 'ai_adviser', label: 'AI Adviser' },
    { id: 'decision_engine', label: 'Final Decision' },
    { id: 'decision_report', label: 'Executive Report' },
  ];

  const handleDemoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val in DEMO_SCENARIOS) {
      onSelectScenario(DEMO_SCENARIOS[val]);
    }
  };

  const getLegalBadge = () => {
    switch (legalStatus) {
      case 'eligible':
        return { text: 'DC License Eligible', color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
      case 'verification_needed':
        return { text: 'Verification Needed', color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' };
      case 'blocked':
        return { text: 'Legally Blocked', color: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800' };
      default:
        return { text: 'Pending Screening', color: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' };
    }
  };

  const badge = getLegalBadge();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Bar Zone Contract: Brand Zone - Nav Zone - Primary Action Zone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-teal-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <Building2 className="w-5 h-5 text-teal-300 dark:text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white block leading-none">
                  StayWise <span className="text-teal-600 dark:text-teal-400">DC</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide block mt-0.5">
                  The Airbnb Decision Engine
                </span>
              </div>
            </button>

            {/* Quiet Legal Status Indicator */}
            <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border ${badge.color}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{badge.text}</span>
            </div>
          </div>

          {/* Zone 2: Profile Persona Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="scenario-select" className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden md:inline">
              Demo Persona:
            </label>
            <div className="relative">
              <select
                id="scenario-select"
                onChange={handleDemoChange}
                value={
                  Object.keys(DEMO_SCENARIOS).find(k => DEMO_SCENARIOS[k].id === currentScenario.id) || 'custom'
                }
                className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium py-1.5 pl-3 pr-8 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors cursor-pointer"
              >
                <option value="capitol_hill">Demo A: Capitol Hill (Entire Home / 90-Night Cap)</option>
                <option value="petworth">Demo B: Petworth (Hosted Room / Unlimited Nights)</option>
                <option value="georgetown_condo">Demo C: Georgetown (Condo Bylaw Blocked)</option>
                <option value="investor_navy_yard">Demo D: Navy Yard (Non-Primary / Blocked)</option>
                <option value="custom" disabled>Custom Homeowner Plan</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            <button
              onClick={onReset}
              title="Reset to default scenario"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Zone 3: Primary Actions (Guided Demo, Theme Toggle, Report) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenGuidedDemo}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Guided Demo</span>
            </button>

            <button
              onClick={() => setActiveTab('decision_report')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Decision Report</span>
            </button>

            <button
              onClick={onToggleDarkMode}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar: Single-Line Segmented Tab Strip */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-100 dark:border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
