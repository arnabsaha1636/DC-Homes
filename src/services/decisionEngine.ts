// Decision Scoring, Readiness Dimensions, and Alternatives Strategy Engine
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../types';

export interface ReadinessScorecard {
  overallScore: number; // 0-100
  recommendationCategory: 
    | 'Promising option — proceed with required checks'
    | 'Potentially worthwhile — improve the plan'
    | 'Financially unattractive under current assumptions'
    | 'Do not list until compliance issues are resolved'
    | 'More information needed';
  recommendationHeadline: string;
  recommendationSummary: string;
  dimensions: {
    legalReadiness: number;
    financialAttractiveness: number;
    marketConfidence: number;
    operationalReadiness: number;
    riskCompatibility: number;
    lifestyleMatch: number;
  };
  dimensionExplanations: {
    legal: string;
    financial: string;
    market: string;
    operational: string;
    risk: string;
    lifestyle: string;
  };
  keyUncertainty: string;
  highestFinancialRisk: string;
  strongestAlternative: string;
  priorityActions: string[];
}

export function evaluateDecisionReadiness(
  scenario: UserScenario,
  financials: FinancialOutputs,
  legalEval: LegalEvaluation
): ReadinessScorecard {
  const { owner, property, riskPreferences } = scenario;

  // 1. Legal Readiness (0 - 100) -> HARD GATE
  let legalReadiness = 0;
  let legalExplanation = '';
  if (legalEval.status === 'blocked') {
    legalReadiness = 0;
    legalExplanation = `HARD BLOCKER: ${legalEval.blockers[0] || 'Ineligible under DC short-term rental regulations.'}`;
  } else if (legalEval.status === 'verification_needed') {
    legalReadiness = 50;
    legalExplanation = `Requires statutory verification: ${legalEval.missingInfo[0] || 'Unresolved licensing or insurance details.'}`;
  } else {
    legalReadiness = 95;
    legalExplanation = 'Meets DC primary residence requirements, safety checklist, and appropriate license endorsement tier.';
  }

  // 2. Financial Attractiveness (0 - 100)
  let financialAttractiveness = 50;
  let financialExplanation = '';
  if (financials.netAnnualOperatingCashFlow <= 0) {
    financialAttractiveness = 15;
    financialExplanation = `Operating at a net cash-flow loss of -$${Math.abs(financials.netAnnualOperatingCashFlow).toLocaleString()}/year.`;
  } else if (financials.netAnnualOperatingCashFlow < 3000) {
    financialAttractiveness = 45;
    financialExplanation = `Modest net cash flow ($${financials.netAnnualOperatingCashFlow.toLocaleString()}/yr), representing thin safety margin against unexpected repairs.`;
  } else if (financials.netAnnualOperatingCashFlow < 10000) {
    financialAttractiveness = 75;
    financialExplanation = `Solid net operating cash flow ($${financials.netAnnualOperatingCashFlow.toLocaleString()}/yr) with a payback period of ~${financials.startupPaybackMonths} months.`;
  } else {
    financialAttractiveness = 92;
    financialExplanation = `Strong net cash flow ($${financials.netAnnualOperatingCashFlow.toLocaleString()}/yr) with attractive return on setup capital (${financials.returnOnStartupInvestment}%).`;
  }

  // 3. Market Confidence (0 - 100)
  const isIllustrative = true; // Unless real comps verified
  const marketConfidence = isIllustrative ? 60 : 85;
  const marketExplanation = isIllustrative 
    ? 'Market estimates are based on benchmark DC neighborhood medians (Illustrative Assumptions). Validate with verified nearby listings.'
    : 'Benchmark figures backed by verified local comparable listing observations.';

  // 4. Operational Readiness (0 - 100)
  let operationalReadiness = 65;
  if (scenario.operatingCosts.managementCommissionPercent > 0) {
    operationalReadiness = 85;
  } else {
    const isSelfCleaning = scenario.timeEffort.cleaningLaundryHoursPerStay > 0.5;
    if (isSelfCleaning && riskPreferences.freeTimeAvailability < 3) {
      operationalReadiness = 40;
    } else {
      operationalReadiness = 75;
    }
  }
  const operationalExplanation = operationalReadiness >= 75
    ? 'Hosting operations and turnover procedures are well-budgeted and manageable.'
    : 'Turnover cleaning and guest communications create a substantial time commitment relative to your available hours.';

  // 5. Risk Compatibility (0 - 100)
  const riskCompatibility = Math.round(
    ((riskPreferences.financialRiskTolerance * 20) +
     (riskPreferences.emergencyAvailability * 20) +
     (riskPreferences.complaintManagementTolerance * 20)) / 3
  );
  const riskExplanation = riskCompatibility >= 70
    ? 'Your risk profile aligns well with the variable demand and occasional emergency calls of short-term hosting.'
    : 'You have low tolerance for financial volatility or late-night guest maintenance emergencies.';

  // 6. Lifestyle Match (0 - 100)
  let lifestyleMatch = 70;
  if (property.rentalType === 'hosted_room') {
    lifestyleMatch = Math.round(
      ((riskPreferences.comfortWithStrangers * 25) + ((6 - riskPreferences.privacyPreference) * 20))
    );
  } else {
    lifestyleMatch = Math.round(
      ((riskPreferences.privacyPreference * 20) + (riskPreferences.financialRiskTolerance * 15))
    );
  }
  lifestyleMatch = Math.min(100, Math.max(10, lifestyleMatch));
  const lifestyleExplanation = lifestyleMatch >= 70
    ? 'Your household privacy preferences and comfort with guests are compatible with this rental format.'
    : 'Potential friction: hosting guests in this format may intrude on your desired household privacy or routine.';

  // Overall Score Calculation (with HARD GATE: if legal is blocked, score cannot exceed 35)
  let overallScore = Math.round(
    (legalReadiness * 0.35) +
    (financialAttractiveness * 0.25) +
    (operationalReadiness * 0.15) +
    (riskCompatibility * 0.15) +
    (lifestyleMatch * 0.10)
  );

  let recommendationCategory: ReadinessScorecard['recommendationCategory'] = 'Promising option — proceed with required checks';
  let recommendationHeadline = '';
  let recommendationSummary = '';

  if (legalEval.status === 'blocked') {
    overallScore = Math.min(30, overallScore);
    recommendationCategory = 'Do not list until compliance issues are resolved';
    recommendationHeadline = 'Legal Ineligibility Precludes Listing at This Time';
    recommendationSummary = `While your property or numbers may show hypothetical cash flow, DC regulatory restrictions or association bylaws currently prohibit short-term hosting. Do not list until these barriers are formally resolved.`;
  } else if (legalEval.status === 'verification_needed') {
    recommendationCategory = 'More information needed';
    recommendationHeadline = 'Potential Opportunity — Complete Required Verifications';
    recommendationSummary = `Your hosting plan looks viable, but critical items (such as insurance endorsements, Clean Hands certificate, or HOA rules) require formal confirmation before applying for a DLCP license.`;
  } else if (financials.netAnnualOperatingCashFlow <= 0 || financials.economicProfit < -2000) {
    recommendationCategory = 'Financially unattractive under current assumptions';
    recommendationHeadline = 'Negative or Marginal Economic Returns After Costs & Labor';
    recommendationSummary = `After deducting platform fees, turnover cleaning, utilities, and the opportunity cost of your personal time, hosting does not generate sufficient compensation for the effort and risk involved.`;
  } else if (financials.netAnnualOperatingCashFlow < 4000 || riskCompatibility < 50 || lifestyleMatch < 50) {
    recommendationCategory = 'Potentially worthwhile — improve the plan';
    recommendationHeadline = 'Viable Option with Important Optimization Levers';
    recommendationSummary = `The plan generates positive net cash flow ($${financials.netAnnualOperatingCashFlow.toLocaleString()}/yr), but lifestyle compromises or high turnover costs suggest optimizing your pricing or considering a mid-term rental alternative.`;
  } else {
    recommendationCategory = 'Promising option — proceed with required checks';
    recommendationHeadline = 'Compelling Opportunity Aligned with Legal, Financial, and Lifestyle Goals';
    recommendationSummary = `Your property appears eligible under current DC guidelines and generates attractive net cash flow ($${financials.netAnnualOperatingCashFlow.toLocaleString()}/yr; ~$${financials.effectiveCompensationPerHour}/hr) within a manageable operational workload.`;
  }

  // Key Uncertainties & Risks
  const keyUncertainty = legalEval.status !== 'eligible' 
    ? legalEval.missingInfo[0] || legalEval.blockers[0] || 'Confirmation of DLCP licensing endorsement'
    : 'Sustained seasonal booking demand during winter trough months (Jan/Feb)';

  const highestFinancialRisk = financials.breakEvenBookedNights > 45
    ? `High break-even threshold (${financials.breakEvenBookedNights} booked nights needed to cover fixed overhead)`
    : `Turnover cleaning margin leakage ($${scenario.operatingCosts.cleaningCostPerTurnover}/turnover)`;

  const strongestAlternative = property.rentalType === 'entire_home_away'
    ? 'Mid-Term Furnished Rental (30+ days for traveling healthcare professionals or consultants)'
    : 'Traditional Long-Term Lease (guaranteed monthly cash flow with zero turnover labor)';

  // Priority next steps
  const priorityActions: string[] = [];
  if (legalEval.status === 'blocked') {
    priorityActions.push(legalEval.whatNeedsToChange[0] || 'Resolve property compliance blocker.');
    priorityActions.push('Explore 30+ day medium-term furnished leasing, which is exempt from DC STR limitations.');
    priorityActions.push('Consult an attorney or tenant-landlord advisor regarding residential leasing rights in DC.');
  } else if (legalEval.status === 'verification_needed') {
    priorityActions.push('Contact your homeowner insurance provider to obtain a $500,000+ commercial STR rider.');
    priorityActions.push('Generate a free Certificate of Clean Hands from MyTax.DC.gov.');
    priorityActions.push('Confirm with your HOA / Condo board in writing that short-term rentals are allowed.');
  } else {
    priorityActions.push('Submit your Basic Business License application with DLCP ($99 two-year fee).');
    priorityActions.push('Install interconnected smoke alarms, CO detectors, and a certified fire extinguisher.');
    priorityActions.push('Stage guest areas, hire a professional photographer, and draft house rules.');
  }

  return {
    overallScore,
    recommendationCategory,
    recommendationHeadline,
    recommendationSummary,
    dimensions: {
      legalReadiness,
      financialAttractiveness,
      marketConfidence,
      operationalReadiness,
      riskCompatibility,
      lifestyleMatch
    },
    dimensionExplanations: {
      legal: legalExplanation,
      financial: financialExplanation,
      market: marketExplanation,
      operational: operationalExplanation,
      risk: riskExplanation,
      lifestyle: lifestyleExplanation
    },
    keyUncertainty,
    highestFinancialRisk,
    strongestAlternative,
    priorityActions
  };
}

// 5-Way Strategy Comparison Model (Airbnb vs Alternatives)
export interface StrategyComparisonItem {
  name: string;
  strategyId: 'airbnb_current' | 'midterm_furnished' | 'longterm_lease' | 'personal_exclusive';
  headline: string;
  annualGrossRevenue: number;
  annualNetCashFlow: number;
  initialInvestment: number;
  annualWorkloadHours: number;
  hourlyCompensation: number;
  vacancyRisk: 'High' | 'Medium' | 'Low';
  incomeConsistency: 'Volatile' | 'Moderate' | 'Guaranteed';
  cleaningTurnoversPerYear: number;
  privacyImpact: 'High' | 'Moderate' | 'None';
  flexibilityToUseHome: 'High' | 'Moderate' | 'None' | 'Complete';
  dcLegalStatus: 'Permitted with DLCP STR License' | 'Exempt from STR Rules (30+ Days)' | 'Requires Residential Housing License' | 'No Restrictions';
  isPermittedForUser: boolean;
}

export function generateAlternativeStrategies(
  scenario: UserScenario,
  financials: FinancialOutputs,
  legalEval: LegalEvaluation
): StrategyComparisonItem[] {
  const isHosted = scenario.property.rentalType === 'hosted_room';
  const beds = scenario.property.bedrooms;

  // Strategy 1: Current Airbnb
  const airbnbHourly = financials.totalAnnualHostingHours > 0 
    ? financials.netAnnualOperatingCashFlow / financials.totalAnnualHostingHours 
    : 0;

  const currentAirbnb: StrategyComparisonItem = {
    name: isHosted ? 'Hosted Airbnb Room' : 'Vacation Rental Airbnb',
    strategyId: 'airbnb_current',
    headline: 'Short-Term Dynamic Pricing via Airbnb',
    annualGrossRevenue: financials.grossBookingRevenue,
    annualNetCashFlow: financials.netAnnualOperatingCashFlow,
    initialInvestment: financials.firstYearCashFlowAfterStartup < 0 ? (financials.netAnnualOperatingCashFlow - financials.firstYearCashFlowAfterStartup) : 2500,
    annualWorkloadHours: financials.totalAnnualHostingHours,
    hourlyCompensation: Math.round(airbnbHourly),
    vacancyRisk: 'High',
    incomeConsistency: 'Volatile',
    cleaningTurnoversPerYear: Math.round(financials.expectedReservations),
    privacyImpact: isHosted ? 'High' : 'Moderate',
    flexibilityToUseHome: isHosted ? 'Moderate' : 'High',
    dcLegalStatus: 'Permitted with DLCP STR License',
    isPermittedForUser: legalEval.status === 'eligible' || legalEval.status === 'verification_needed'
  };

  // Strategy 2: Mid-Term Furnished Rental (30+ days: corporate, medical, travel nurses)
  // Benchmark DC mid-term rate: $2,200-$4,200/mo depending on bedrooms, 90% occupancy
  const midTermMonthly = isHosted ? 1400 : Math.round(1800 + beds * 700);
  const midTermGross = midTermMonthly * 11; // 11 months booked (1 month vacancy)
  const midTermOperatingCosts = isHosted ? 1200 : 2800; // minimal turnover, utilities included
  const midTermNet = midTermGross - midTermOperatingCosts;
  const midTermHours = 35; // ~4 turnovers/year

  const midTerm: StrategyComparisonItem = {
    name: 'Mid-Term Furnished (30+ Days)',
    strategyId: 'midterm_furnished',
    headline: 'Monthly Executive / Travel Nurse Rentals',
    annualGrossRevenue: midTermGross,
    annualNetCashFlow: midTermNet,
    initialInvestment: 2000,
    annualWorkloadHours: midTermHours,
    hourlyCompensation: Math.round(midTermNet / midTermHours),
    vacancyRisk: 'Medium',
    incomeConsistency: 'Moderate',
    cleaningTurnoversPerYear: 4,
    privacyImpact: isHosted ? 'High' : 'Moderate',
    flexibilityToUseHome: 'Moderate',
    dcLegalStatus: 'Exempt from STR Rules (30+ Days)',
    isPermittedForUser: true // 30+ day rentals are EXEMPT from primary residence and 90-night caps!
  };

  // Strategy 3: Long-Term Unfurnished Lease (12-month tenant)
  const longTermMonthly = isHosted ? 1000 : Math.round(1500 + beds * 600);
  const longTermGross = isHosted ? 0 : longTermMonthly * 12; // Hosted spare room rarely leased 12mo unfurnished
  const longTermOperatingCosts = isHosted ? 0 : 1500; // maintenance, tenant pays utilities
  const longTermNet = isHosted ? 0 : longTermGross - longTermOperatingCosts;
  const longTermHours = isHosted ? 0 : 15;

  const longTerm: StrategyComparisonItem = {
    name: 'Long-Term Unfurnished Lease',
    strategyId: 'longterm_lease',
    headline: 'Traditional 12-Month Tenant',
    annualGrossRevenue: longTermGross,
    annualNetCashFlow: longTermNet,
    initialInvestment: 500, // painting/repairs only
    annualWorkloadHours: longTermHours,
    hourlyCompensation: longTermHours > 0 ? Math.round(longTermNet / longTermHours) : 0,
    vacancyRisk: 'Low',
    incomeConsistency: 'Guaranteed',
    cleaningTurnoversPerYear: isHosted ? 0 : 1,
    privacyImpact: isHosted ? 'High' : 'None',
    flexibilityToUseHome: 'None',
    dcLegalStatus: 'Requires Residential Housing License',
    isPermittedForUser: !isHosted // only relevant for entire home / basement
  };

  // Strategy 4: Exclusive Personal Use
  const personalUse: StrategyComparisonItem = {
    name: 'Exclusive Personal Use',
    strategyId: 'personal_exclusive',
    headline: 'Keep Space Strictly Private (No Renting)',
    annualGrossRevenue: 0,
    annualNetCashFlow: 0,
    initialInvestment: 0,
    annualWorkloadHours: 0,
    hourlyCompensation: 0,
    vacancyRisk: 'Low',
    incomeConsistency: 'Guaranteed',
    cleaningTurnoversPerYear: 0,
    privacyImpact: 'None',
    flexibilityToUseHome: 'Complete',
    dcLegalStatus: 'No Restrictions',
    isPermittedForUser: true
  };

  return [currentAirbnb, midTerm, longTerm, personalUse];
}
