// Comprehensive TypeScript types for StayWise DC

export type RentalType = 'hosted_room' | 'entire_home_away' | 'basement_adu' | 'investment_property' | 'undecided';

export type PropertyType = 'rowhouse' | 'townhouse' | 'condominium' | 'apartment' | 'detached' | 'other';

export type LegalStatus = 
  | 'eligible'          // Appears eligible to proceed with licensing
  | 'verification_needed' // Potentially eligible — verification needed
  | 'blocked'           // Currently blocked by an identified requirement
  | 'insufficient_info'; // Insufficient information

export type HOARestriction = 'yes' | 'no' | 'unsure';

export type PrimaryResidenceStatus = 'yes' | 'no' | 'undecided';

export type FeeStructure = 'split' | 'host_only';

export interface PropertyDetails {
  rentalType: RentalType;
  propertyType: PropertyType;
  neighborhood: string;
  ward: number;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  guestBedrooms: number;
  maxGuests: number;
  hasSeparateEntrance: boolean;
  privateBathroom: boolean;
  kitchenAccess: boolean;
  hasParking: boolean;
  hasOutdoorSpace: boolean;
  hasACHeating: boolean;
  hasWorkspaceWifi: boolean;
  hasLaundry: boolean;
  isFurnished: boolean;
  petsAllowed: boolean;
  hasSmokeAlarms: boolean;
  hasCODetectors: boolean;
  hasFireExtinguisher: boolean;
  hasEmergencyEgress: boolean;
}

export interface OwnerCircumstances {
  ownsProperty: boolean;
  isPrimaryResidence: boolean;
  isInvestmentProperty: boolean;
  ownershipEntity: 'individual' | 'llc' | 'trust' | 'other';
  livesOnSiteDuringStays: boolean;
  hasHomesteadDeduction: boolean;
  hoaAllowsSTR: HOARestriction;
  mortgageAllowsSTR: boolean;
  hasDCLicense: boolean;
  liabilityInsuranceCoverage: number; // e.g. 250000, 500000, 1000000
  insuranceVerifiedWithBroker: boolean;
  hasCleanHandsCertificate: boolean;
  hasApproved90NightExemption: boolean;
  approvedExemptionNights: number; // if granted
  goals: string[]; // e.g., 'extra_income', 'help_mortgage', 'monetize_space'
}

export interface PricingSettings {
  nightlyRate: number;
  weekdayRate: number;
  weekendRate: number;
  availableNightsAnnual: number;
  expectedOccupancy: number; // percentage 0-100
  averageStayLength: number; // in nights
  expectedCancellationsPercent: number; // percentage 0-100
  cleaningFee: number;
  extraGuestFee: number;
  platformFeeModel: FeeStructure; // split (host pays 3%, guest ~14%) vs host_only (host pays 15%)
  hostPlatformFeeRate: number; // percentage, e.g., 3 or 15
  guestPlatformFeeRate: number; // percentage, e.g. 14
  dcLodgingTaxRate: number; // percentage, default 15.95
}

export interface SetupCosts {
  furniture: number;
  beddingLinens: number;
  smartLocks: number;
  safetyEquipment: number;
  photographyStaging: number;
  deepCleaningRepairs: number;
  licensingPermits: number; // DLCP is $99
  insuranceInspection: number;
  otherStartup: number;
}

export interface OperatingCosts {
  cleaningCostPerTurnover: number;
  laundrySuppliesPerStay: number;
  guestToiletriesConsumablesPerStay: number;
  utilitiesGuestUsagePerNight: number;
  maintenanceReservePerNight: number;
  incrementalInsuranceAnnual: number;
  softwareSubscriptionsAnnual: number;
  managementCommissionPercent: number; // 0 if self-managed, 15-25% if co-host/pm
  accountingLegalAnnual: number;
  contingencyRepairFundAnnual: number;
}

export interface PropertyOwnershipCosts {
  includeInCashFlow: boolean;
  monthlyMortgagePayment: number;
  annualPropertyTax: number;
  annualHomeownerInsurance: number;
  monthlyHOADues: number;
}

export interface TimeEffortSettings {
  messagingHoursPerStay: number;
  checkInCoordinationHoursPerStay: number;
  cleaningLaundryHoursPerStay: number; // 0 if contracted
  restockingMaintenanceHoursMonthly: number;
  pricingListingManagementHoursMonthly: number;
  valuePerHourOfFreeTime: number; // homeowner's imputed opportunity cost
}

export interface RiskPreferences {
  financialRiskTolerance: number; // 1-5
  comfortWithStrangers: number; // 1-5
  freeTimeAvailability: number; // 1-5
  emergencyAvailability: number; // 1-5
  privacyPreference: number; // 1-5 (5 = maximum privacy desired)
  complaintManagementTolerance: number; // 1-5
}

export interface UserScenario {
  id: string;
  name: string;
  property: PropertyDetails;
  owner: OwnerCircumstances;
  pricing: PricingSettings;
  setupCosts: SetupCosts;
  operatingCosts: OperatingCosts;
  ownershipCosts: PropertyOwnershipCosts;
  timeEffort: TimeEffortSettings;
  riskPreferences: RiskPreferences;
  incomeTaxRateEstimate: number; // e.g., 28%
  monthlyIncomeTarget: number; // e.g. $1,000
}

export interface FinancialOutputs {
  potentialBookedNightsBeforeCap: number;
  applicableLegalCap: number | null; // null if hosted/unlimited
  modeledBookedNights: number;
  legalNightCapRestricted: boolean;
  lostNightsToCap: number;
  lostRevenueToCap: number;
  
  expectedReservations: number;
  grossAccommodationRevenue: number;
  cleaningFeeRevenue: number;
  grossBookingRevenue: number;
  
  guestPaidTaxes: number;
  guestPlatformFees: number;
  totalGuestPaidAmount: number;
  
  hostPlatformFeeExpense: number;
  netHostPayout: number;
  
  variableOperatingCosts: number;
  fixedOperatingCosts: number;
  totalOperatingCosts: number;
  
  netAnnualOperatingCashFlow: number;
  netMonthlyCashFlow: number;
  firstYearCashFlowAfterStartup: number;
  
  breakEvenBookedNights: number;
  breakEvenNightlyRate: number;
  startupPaybackMonths: number;
  returnOnStartupInvestment: number;
  
  totalAnnualHostingHours: number;
  effectiveCompensationPerHour: number;
  imputedLaborCost: number;
  economicProfit: number; // Cash Flow - Imputed Labor
  
  estimatedIncomeTax: number;
  illustrativeAfterTaxCashFlow: number;
}

export interface LegalEvaluation {
  status: LegalStatus;
  statusTitle: string;
  statusBadgeColor: string;
  isPrimaryResidenceSatisfied: boolean;
  isRentalTypePermitted: boolean;
  isHOAPermitted: boolean;
  isInsuranceSatisfied: boolean;
  isSafetySatisfied: boolean;
  isCleanHandsSatisfied: boolean;
  maxPermittedContinuousStayDays: number;
  annualPermittedNights: number | 'Unlimited';
  applicableLicenseCategory: string;
  officialSourceCitations: string[];
  reasons: string[];
  missingInfo: string[];
  blockers: string[];
  recommendedActions: string[];
  whatNeedsToChange: string[];
}

export interface MarketComp {
  id: string;
  neighborhood: string;
  listingType: string;
  bedrooms: number;
  bathrooms: number;
  capacity: number;
  nightlyRate: number;
  cleaningFee: number;
  amenities: string[];
  sourceUrl: string;
  dateObserved: string;
  isVerified: boolean;
}

export interface NeighborhoodData {
  name: string;
  ward: number;
  zipCodes: string[];
  description: string;
  medianNightlyRate: number;
  priceRange: [number, number];
  transitScore: number;
  touristDraw: 'High' | 'Medium' | 'Emerging';
  businessDraw: 'High' | 'Medium' | 'Low';
  seasonalityStrength: 'High' | 'Moderate' | 'Mild';
  topAttractions: string[];
  metroStations: string[];
}
