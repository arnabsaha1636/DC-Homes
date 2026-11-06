import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { PersistentSummaryBar } from './components/PersistentSummaryBar';
import { GuidedDemoModal } from './components/GuidedDemoModal';

// Tabs
import { DashboardTab } from './components/tabs/DashboardTab';
import { PropertyProfileTab } from './components/tabs/PropertyProfileTab';
import { LegalEligibilityTab } from './components/tabs/LegalEligibilityTab';
import { MarketInsightsTab } from './components/tabs/MarketInsightsTab';
import { RevenueEstimatorTab } from './components/tabs/RevenueEstimatorTab';
import { FinancialAnalysisTab } from './components/tabs/FinancialAnalysisTab';
import { ScenarioSimulatorTab } from './components/tabs/ScenarioSimulatorTab';
import { AlternativesTab } from './components/tabs/AlternativesTab';
import { RiskAssessmentTab } from './components/tabs/RiskAssessmentTab';
import { TimeEffortTab } from './components/tabs/TimeEffortTab';
import { AIAdviserTab } from './components/tabs/AIAdviserTab';
import { DecisionEngineTab } from './components/tabs/DecisionEngineTab';
import { DecisionReportTab } from './components/tabs/DecisionReportTab';

// Engines & Data
import { DEMO_SCENARIOS } from './services/demoScenarios';
import { evaluateDCLegalEligibility } from './services/legalEngine';
import { calculateScenarioFinancials } from './services/calculations';
import { evaluateDecisionReadiness } from './services/decisionEngine';
import { UserScenario } from './types';

export function App() {
  // Scenario state initialized from Demo A (Capitol Hill) with local persistence
  const [scenario, setScenario] = useState<UserScenario>(() => {
    try {
      const saved = localStorage.getItem('staywise_scenario');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved scenario from localStorage');
    }
    return DEMO_SCENARIOS.capitol_hill;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isGuidedDemoOpen, setIsGuidedDemoOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync dark mode class on documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Persist scenario changes
  useEffect(() => {
    try {
      localStorage.setItem('staywise_scenario', JSON.stringify(scenario));
    } catch (e) {
      console.warn('Failed to save scenario to localStorage');
    }
  }, [scenario]);

  // Central Calculation Engines
  const legalEval = evaluateDCLegalEligibility(scenario.property, scenario.owner);
  const financials = calculateScenarioFinancials(scenario, legalEval);
  const scorecard = evaluateDecisionReadiness(scenario, financials, legalEval);

  const handleReset = () => {
    setScenario(DEMO_SCENARIOS.capitol_hill);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentScenario={scenario}
        onSelectScenario={setScenario}
        onReset={handleReset}
        onOpenGuidedDemo={() => setIsGuidedDemoOpen(true)}
        legalStatus={legalEval.status}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'dashboard' && (
          <DashboardTab
            scenario={scenario}
            financials={financials}
            legalEval={legalEval}
            scorecard={scorecard}
            onNavigateTab={setActiveTab}
            onOpenGuidedDemo={() => setIsGuidedDemoOpen(true)}
          />
        )}

        {activeTab === 'property_profile' && (
          <PropertyProfileTab
            scenario={scenario}
            onUpdateScenario={setScenario}
            onNavigateNext={() => setActiveTab('legal_eligibility')}
          />
        )}

        {activeTab === 'legal_eligibility' && (
          <LegalEligibilityTab
            scenario={scenario}
            legalEval={legalEval}
            onUpdateScenario={setScenario}
            onNavigateNext={() => setActiveTab('neighborhoods')}
          />
        )}

        {activeTab === 'neighborhoods' && (
          <MarketInsightsTab
            scenario={scenario}
            onUpdateScenario={setScenario}
            onNavigateNext={() => setActiveTab('revenue_estimator')}
          />
        )}

        {activeTab === 'revenue_estimator' && (
          <RevenueEstimatorTab
            scenario={scenario}
            financials={financials}
            legalEval={legalEval}
            onUpdateScenario={setScenario}
            onNavigateNext={() => setActiveTab('financial_analysis')}
          />
        )}

        {activeTab === 'financial_analysis' && (
          <FinancialAnalysisTab
            scenario={scenario}
            financials={financials}
            legalEval={legalEval}
            onUpdateScenario={setScenario}
            onNavigateNext={() => setActiveTab('scenario_simulator')}
          />
        )}

        {activeTab === 'scenario_simulator' && (
          <ScenarioSimulatorTab
            scenario={scenario}
            financials={financials}
            legalEval={legalEval}
            onUpdateScenario={setScenario}
            onNavigateNext={() => setActiveTab('alternatives')}
          />
        )}

        {activeTab === 'alternatives' && (
          <AlternativesTab
            scenario={scenario}
            financials={financials}
            legalEval={legalEval}
            onNavigateNext={() => setActiveTab('risk_assessment')}
          />
        )}

        {activeTab === 'risk_assessment' && (
          <RiskAssessmentTab
            scenario={scenario}
            scorecard={scorecard}
            onUpdateScenario={setScenario}
            onNavigateNext={() => setActiveTab('time_effort')}
          />
        )}

        {activeTab === 'time_effort' && (
          <TimeEffortTab
            scenario={scenario}
            financials={financials}
            onUpdateScenario={setScenario}
            onNavigateNext={() => setActiveTab('ai_adviser')}
          />
        )}

        {activeTab === 'ai_adviser' && (
          <AIAdviserTab
            scenario={scenario}
            financials={financials}
            legalEval={legalEval}
            onNavigateNext={() => setActiveTab('decision_engine')}
          />
        )}

        {activeTab === 'decision_engine' && (
          <DecisionEngineTab
            scenario={scenario}
            financials={financials}
            legalEval={legalEval}
            scorecard={scorecard}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'decision_report' && (
          <DecisionReportTab
            scenario={scenario}
            financials={financials}
            legalEval={legalEval}
            scorecard={scorecard}
          />
        )}
      </main>

      {/* Persistent Bottom Summary Bar */}
      <PersistentSummaryBar
        financials={financials}
        legalEval={legalEval}
        onNavigate={setActiveTab}
      />

      {/* Guided Walkthrough Modal for MBA Professors */}
      <GuidedDemoModal
        isOpen={isGuidedDemoOpen}
        onClose={() => setIsGuidedDemoOpen(false)}
        onSelectScenario={setScenario}
        onNavigateTab={setActiveTab}
      />

    </div>
  );
}

export default App;
