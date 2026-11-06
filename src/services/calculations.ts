// Deterministic Financial Calculation Engine for StayWise DC
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../types';

export function calculateScenarioFinancials(
  scenario: UserScenario,
  legalEval: LegalEvaluation
): FinancialOutputs {
  const { pricing, setupCosts, operatingCosts, timeEffort, incomeTaxRateEstimate } = scenario;

  // 1. Available Nights & Booking Volume Calculations
  const availableNights = Math.max(1, pricing.availableNightsAnnual);
  const occupancyFraction = Math.min(100, Math.max(0, pricing.expectedOccupancy)) / 100;
  const cancellationRetention = 1 - Math.min(100, Math.max(0, pricing.expectedCancellationsPercent)) / 100;

  // Potential booked nights before statutory limits
  const potentialBookedNightsBeforeCap = Math.round(availableNights * occupancyFraction * cancellationRetention);

  // Applicable Legal Cap Determination
  let applicableLegalCap: number | null = null;
  if (legalEval.annualPermittedNights !== 'Unlimited') {
    applicableLegalCap = legalEval.annualPermittedNights;
  }

  // Enforce statutory night limit
  let modeledBookedNights = potentialBookedNightsBeforeCap;
  let legalNightCapRestricted = false;
  let lostNightsToCap = 0;

  if (applicableLegalCap !== null && potentialBookedNightsBeforeCap > applicableLegalCap) {
    modeledBookedNights = applicableLegalCap;
    legalNightCapRestricted = true;
    lostNightsToCap = potentialBookedNightsBeforeCap - applicableLegalCap;
  }

  // 2. Reservation Metrics
  const stayLength = Math.max(1, pricing.averageStayLength);
  const expectedReservations = modeledBookedNights > 0 
    ? parseFloat((modeledBookedNights / stayLength).toFixed(1)) 
    : 0;

  // 3. Gross Accommodation & Booking Revenue
  const nightlyRate = Math.max(0, pricing.nightlyRate);
  const grossAccommodationRevenue = Math.round(modeledBookedNights * nightlyRate);
  const cleaningFeeRevenue = Math.round(expectedReservations * Math.max(0, pricing.cleaningFee));
  const extraFeesRevenue = Math.round(expectedReservations * Math.max(0, pricing.extraGuestFee));
  const grossBookingRevenue = grossAccommodationRevenue + cleaningFeeRevenue + extraFeesRevenue;

  const lostRevenueToCap = Math.round(lostNightsToCap * nightlyRate);

  // 4. Platform Fee & Guest Breakdown
  const isSplitFee = pricing.platformFeeModel === 'split';
  const hostPlatformFeeRate = isSplitFee ? 0.03 : 0.15; // 3% for split, 15% for host-only
  const guestPlatformFeeRate = isSplitFee ? (pricing.guestPlatformFeeRate / 100) : 0; // typically ~14%
  const dcTaxRate = (pricing.dcLodgingTaxRate || 15.95) / 100;

  // Platform fees
  const hostPlatformFeeExpense = Math.round(grossBookingRevenue * hostPlatformFeeRate);
  const guestPlatformFees = Math.round(grossBookingRevenue * guestPlatformFeeRate);
  
  // Lodging Taxes (15.95% applied to accommodation + cleaning fee + guest platform fee)
  const taxableBase = grossBookingRevenue + guestPlatformFees;
  const guestPaidTaxes = Math.round(taxableBase * dcTaxRate);
  const totalGuestPaidAmount = grossBookingRevenue + guestPlatformFees + guestPaidTaxes;

  // Net host payout before operating expenses
  const netHostPayout = Math.max(0, grossBookingRevenue - hostPlatformFeeExpense);

  // 5. Operating Costs
  // Variable Costs (per stay and per night)
  const turnoverCleaningCost = expectedReservations * operatingCosts.cleaningCostPerTurnover;
  const laundryCost = expectedReservations * operatingCosts.laundrySuppliesPerStay;
  const consumablesCost = expectedReservations * operatingCosts.guestToiletriesConsumablesPerStay;
  const guestUtilitiesCost = modeledBookedNights * operatingCosts.utilitiesGuestUsagePerNight;
  const maintenanceReserveCost = modeledBookedNights * operatingCosts.maintenanceReservePerNight;
  
  // Management commission (if property manager or co-host is used)
  const managementExpense = Math.round(netHostPayout * (operatingCosts.managementCommissionPercent / 100));

  const variableOperatingCosts = Math.round(
    turnoverCleaningCost + laundryCost + consumablesCost + guestUtilitiesCost + maintenanceReserveCost + managementExpense
  );

  // Fixed Costs (annual commitments)
  const dlcpLicenseAmortizedAnnual = Math.round((setupCosts.licensingPermits || 99) / 2);
  const fixedOperatingCosts = Math.round(
    operatingCosts.incrementalInsuranceAnnual +
    operatingCosts.softwareSubscriptionsAnnual +
    operatingCosts.accountingLegalAnnual +
    operatingCosts.contingencyRepairFundAnnual +
    dlcpLicenseAmortizedAnnual
  );

  const totalOperatingCosts = variableOperatingCosts + fixedOperatingCosts;

  // 6. Net Operating Cash Flow
  const netAnnualOperatingCashFlow = netHostPayout - totalOperatingCosts;
  const netMonthlyCashFlow = Math.round(netAnnualOperatingCashFlow / 12);

  // 7. Initial Startup Costs & Payback
  const totalStartupCosts = 
    setupCosts.furniture +
    setupCosts.beddingLinens +
    setupCosts.smartLocks +
    setupCosts.safetyEquipment +
    setupCosts.photographyStaging +
    setupCosts.deepCleaningRepairs +
    setupCosts.licensingPermits +
    setupCosts.insuranceInspection +
    setupCosts.otherStartup;

  const firstYearCashFlowAfterStartup = netAnnualOperatingCashFlow - totalStartupCosts;

  const startupPaybackMonths = netMonthlyCashFlow > 0 && totalStartupCosts > 0
    ? parseFloat((totalStartupCosts / netMonthlyCashFlow).toFixed(1))
    : netMonthlyCashFlow <= 0 ? 999 : 0;

  const returnOnStartupInvestment = totalStartupCosts > 0
    ? parseFloat(((netAnnualOperatingCashFlow / totalStartupCosts) * 100).toFixed(1))
    : 0;

  // 8. Break-Even Analysis
  // Contribution margin per booked night
  const variableCostPerNight = modeledBookedNights > 0 ? (variableOperatingCosts / modeledBookedNights) : 0;
  const netRevenuePerNight = modeledBookedNights > 0 ? (netHostPayout / modeledBookedNights) : nightlyRate * (1 - hostPlatformFeeRate);
  const contributionMarginPerNight = Math.max(1, netRevenuePerNight - variableCostPerNight);

  const breakEvenBookedNights = contributionMarginPerNight > 0
    ? Math.min(365, Math.ceil(fixedOperatingCosts / contributionMarginPerNight))
    : 365;

  // Break-even nightly rate at current booked nights
  const breakEvenNightlyRate = modeledBookedNights > 0
    ? Math.ceil((totalOperatingCosts / (1 - hostPlatformFeeRate)) / modeledBookedNights)
    : 0;

  // 9. Time & Labor Valuation
  const turnoverHours = expectedReservations * (
    timeEffort.messagingHoursPerStay +
    timeEffort.checkInCoordinationHoursPerStay +
    timeEffort.cleaningLaundryHoursPerStay
  );
  const monthlyAdminHours = 12 * (
    timeEffort.restockingMaintenanceHoursMonthly +
    timeEffort.pricingListingManagementHoursMonthly
  );
  const totalAnnualHostingHours = Math.round(turnoverHours + monthlyAdminHours);

  const effectiveCompensationPerHour = totalAnnualHostingHours > 0
    ? parseFloat((netAnnualOperatingCashFlow / totalAnnualHostingHours).toFixed(2))
    : 0;

  const imputedLaborCost = Math.round(totalAnnualHostingHours * timeEffort.valuePerHourOfFreeTime);
  const economicProfit = netAnnualOperatingCashFlow - imputedLaborCost;

  // 10. Illustrative Income Tax
  const taxRate = Math.min(100, Math.max(0, incomeTaxRateEstimate)) / 100;
  const estimatedIncomeTax = netAnnualOperatingCashFlow > 0 ? Math.round(netAnnualOperatingCashFlow * taxRate) : 0;
  const illustrativeAfterTaxCashFlow = netAnnualOperatingCashFlow - estimatedIncomeTax;

  return {
    potentialBookedNightsBeforeCap,
    applicableLegalCap,
    modeledBookedNights,
    legalNightCapRestricted,
    lostNightsToCap,
    lostRevenueToCap,
    
    expectedReservations,
    grossAccommodationRevenue,
    cleaningFeeRevenue,
    grossBookingRevenue,
    
    guestPaidTaxes,
    guestPlatformFees,
    totalGuestPaidAmount,
    
    hostPlatformFeeExpense,
    netHostPayout,
    
    variableOperatingCosts,
    fixedOperatingCosts,
    totalOperatingCosts,
    
    netAnnualOperatingCashFlow,
    netMonthlyCashFlow,
    firstYearCashFlowAfterStartup,
    
    breakEvenBookedNights,
    breakEvenNightlyRate,
    startupPaybackMonths,
    returnOnStartupInvestment,
    
    totalAnnualHostingHours,
    effectiveCompensationPerHour,
    imputedLaborCost,
    economicProfit,
    
    estimatedIncomeTax,
    illustrativeAfterTaxCashFlow
  };
}

// Reverse Profit Solver: Calculates the required booked nights or rate to meet monthly target
export interface TargetFeasibility {
  isFeasible: boolean;
  requiredAnnualNet: number;
  requiredBookedNights: number;
  requiredNightlyRate: number;
  legalCapExceeded: boolean;
  explanation: string;
}

export function solveTargetProfitFeasibility(
  targetMonthlyNet: number,
  scenario: UserScenario,
  legalEval: LegalEvaluation
): TargetFeasibility {
  const targetAnnualNet = targetMonthlyNet * 12;
  const isSplitFee = scenario.pricing.platformFeeModel === 'split';
  const hostFeeRate = isSplitFee ? 0.03 : 0.15;
  const currentRate = scenario.pricing.nightlyRate;
  
  // Fixed costs
  const fixedCosts = 
    scenario.operatingCosts.incrementalInsuranceAnnual +
    scenario.operatingCosts.softwareSubscriptionsAnnual +
    scenario.operatingCosts.accountingLegalAnnual +
    scenario.operatingCosts.contingencyRepairFundAnnual +
    50; // license

  const varCostPerNight = 
    scenario.operatingCosts.utilitiesGuestUsagePerNight +
    scenario.operatingCosts.maintenanceReservePerNight +
    (scenario.operatingCosts.cleaningCostPerTurnover / Math.max(1, scenario.pricing.averageStayLength));

  const netRatePerNight = currentRate * (1 - hostFeeRate);
  const marginPerNight = Math.max(10, netRatePerNight - varCostPerNight);

  const requiredBookedNights = Math.ceil((targetAnnualNet + fixedCosts) / marginPerNight);

  const maxPermitted = legalEval.annualPermittedNights === 'Unlimited' 
    ? scenario.pricing.availableNightsAnnual 
    : legalEval.annualPermittedNights;

  const legalCapExceeded = requiredBookedNights > maxPermitted;
  const isFeasible = !legalCapExceeded && requiredBookedNights <= 365;

  let explanation = '';
  if (legalCapExceeded) {
    explanation = `This income target of $${targetMonthlyNet.toLocaleString()}/mo ($${targetAnnualNet.toLocaleString()}/yr) requires ~${requiredBookedNights} booked nights, which exceeds your legal operating limit of ${maxPermitted} nights under DC short-term rental law.`;
  } else {
    explanation = `Achievable: To clear $${targetMonthlyNet.toLocaleString()}/mo, you need approximately ${requiredBookedNights} booked nights annually at your current $${currentRate}/night pricing (utilizing ${Math.round((requiredBookedNights / maxPermitted) * 100)}% of your permitted capacity).`;
  }

  // Required rate if staying at currently modeled nights
  const currentModeledNights = Math.max(1, Math.min(maxPermitted, Math.round(scenario.pricing.availableNightsAnnual * (scenario.pricing.expectedOccupancy / 100))));
  const requiredNightlyRate = Math.ceil(((targetAnnualNet + fixedCosts) / currentModeledNights + varCostPerNight) / (1 - hostFeeRate));

  return {
    isFeasible,
    requiredAnnualNet: targetAnnualNet,
    requiredBookedNights,
    requiredNightlyRate,
    legalCapExceeded,
    explanation
  };
}
