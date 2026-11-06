// Demo Profiles and Default Scenarios for StayWise DC
import { UserScenario } from '../types';

export const DEMO_SCENARIOS: Record<string, UserScenario> = {
  capitol_hill: {
    id: 'demo-capitol-hill',
    name: 'Demo A: Capitol Hill (Entire Home While Away)',
    property: {
      rentalType: 'entire_home_away',
      propertyType: 'townhouse',
      neighborhood: 'Capitol Hill',
      ward: 6,
      zipCode: '20003',
      bedrooms: 3,
      bathrooms: 2,
      guestBedrooms: 3,
      maxGuests: 6,
      hasSeparateEntrance: true,
      privateBathroom: true,
      kitchenAccess: true,
      hasParking: true,
      hasOutdoorSpace: true,
      hasACHeating: true,
      hasWorkspaceWifi: true,
      hasLaundry: true,
      isFurnished: true,
      petsAllowed: false,
      hasSmokeAlarms: true,
      hasCODetectors: true,
      hasFireExtinguisher: true,
      hasEmergencyEgress: true
    },
    owner: {
      ownsProperty: true,
      isPrimaryResidence: true,
      isInvestmentProperty: false,
      ownershipEntity: 'individual',
      livesOnSiteDuringStays: false, // Vacation rental
      hasHomesteadDeduction: true,
      hoaAllowsSTR: 'yes',
      mortgageAllowsSTR: true,
      hasDCLicense: false,
      liabilityInsuranceCoverage: 500000,
      insuranceVerifiedWithBroker: true,
      hasCleanHandsCertificate: true,
      hasApproved90NightExemption: false,
      approvedExemptionNights: 0,
      goals: ['earn_while_traveling', 'help_mortgage']
    },
    pricing: {
      nightlyRate: 275,
      weekdayRate: 250,
      weekendRate: 310,
      availableNightsAnnual: 180, // User wants 180 nights, but DC caps vacation rentals at 90!
      expectedOccupancy: 70, // 180 * 0.7 = 126 nights desired -> MUST be capped at 90!
      averageStayLength: 3.5,
      expectedCancellationsPercent: 5,
      cleaningFee: 120,
      extraGuestFee: 0,
      platformFeeModel: 'split',
      hostPlatformFeeRate: 3,
      guestPlatformFeeRate: 14,
      dcLodgingTaxRate: 15.95
    },
    setupCosts: {
      furniture: 1500,
      beddingLinens: 600,
      smartLocks: 250,
      safetyEquipment: 150,
      photographyStaging: 450,
      deepCleaningRepairs: 350,
      licensingPermits: 99,
      insuranceInspection: 200,
      otherStartup: 200
    },
    operatingCosts: {
      cleaningCostPerTurnover: 125,
      laundrySuppliesPerStay: 20,
      guestToiletriesConsumablesPerStay: 15,
      utilitiesGuestUsagePerNight: 12,
      maintenanceReservePerNight: 15,
      incrementalInsuranceAnnual: 750,
      softwareSubscriptionsAnnual: 180,
      managementCommissionPercent: 0,
      accountingLegalAnnual: 300,
      contingencyRepairFundAnnual: 800
    },
    ownershipCosts: {
      includeInCashFlow: false,
      monthlyMortgagePayment: 3200,
      annualPropertyTax: 6800,
      annualHomeownerInsurance: 1800,
      monthlyHOADues: 0
    },
    timeEffort: {
      messagingHoursPerStay: 0.8,
      checkInCoordinationHoursPerStay: 0.4,
      cleaningLaundryHoursPerStay: 0.5, // uses professional cleaner
      restockingMaintenanceHoursMonthly: 2.5,
      pricingListingManagementHoursMonthly: 2.0,
      valuePerHourOfFreeTime: 65
    },
    riskPreferences: {
      financialRiskTolerance: 3,
      comfortWithStrangers: 3,
      freeTimeAvailability: 3,
      emergencyAvailability: 2,
      privacyPreference: 4,
      complaintManagementTolerance: 3
    },
    incomeTaxRateEstimate: 28,
    monthlyIncomeTarget: 1200
  },

  petworth: {
    id: 'demo-petworth',
    name: 'Demo B: Petworth (Hosted Spare Room)',
    property: {
      rentalType: 'hosted_room',
      propertyType: 'rowhouse',
      neighborhood: 'Petworth',
      ward: 4,
      zipCode: '20011',
      bedrooms: 4,
      bathrooms: 2.5,
      guestBedrooms: 1,
      maxGuests: 2,
      hasSeparateEntrance: false,
      privateBathroom: true,
      kitchenAccess: true,
      hasParking: true,
      hasOutdoorSpace: true,
      hasACHeating: true,
      hasWorkspaceWifi: true,
      hasLaundry: true,
      isFurnished: true,
      petsAllowed: false,
      hasSmokeAlarms: true,
      hasCODetectors: true,
      hasFireExtinguisher: true,
      hasEmergencyEgress: true
    },
    owner: {
      ownsProperty: true,
      isPrimaryResidence: true,
      isInvestmentProperty: false,
      ownershipEntity: 'individual',
      livesOnSiteDuringStays: true, // Hosted rental -> NO 90 NIGHT CAP!
      hasHomesteadDeduction: true,
      hoaAllowsSTR: 'yes',
      mortgageAllowsSTR: true,
      hasDCLicense: false,
      liabilityInsuranceCoverage: 500000,
      insuranceVerifiedWithBroker: true,
      hasCleanHandsCertificate: true,
      hasApproved90NightExemption: false,
      approvedExemptionNights: 0,
      goals: ['extra_income', 'monetize_space']
    },
    pricing: {
      nightlyRate: 110,
      weekdayRate: 95,
      weekendRate: 130,
      availableNightsAnnual: 240,
      expectedOccupancy: 65, // ~156 booked nights legally permitted!
      averageStayLength: 3.0,
      expectedCancellationsPercent: 4,
      cleaningFee: 40,
      extraGuestFee: 0,
      platformFeeModel: 'split',
      hostPlatformFeeRate: 3,
      guestPlatformFeeRate: 14,
      dcLodgingTaxRate: 15.95
    },
    setupCosts: {
      furniture: 800,
      beddingLinens: 300,
      smartLocks: 180,
      safetyEquipment: 100,
      photographyStaging: 250,
      deepCleaningRepairs: 150,
      licensingPermits: 99,
      insuranceInspection: 100,
      otherStartup: 100
    },
    operatingCosts: {
      cleaningCostPerTurnover: 20, // Owner cleans themselves
      laundrySuppliesPerStay: 10,
      guestToiletriesConsumablesPerStay: 8,
      utilitiesGuestUsagePerNight: 6,
      maintenanceReservePerNight: 5,
      incrementalInsuranceAnnual: 400,
      softwareSubscriptionsAnnual: 0,
      managementCommissionPercent: 0,
      accountingLegalAnnual: 150,
      contingencyRepairFundAnnual: 400
    },
    ownershipCosts: {
      includeInCashFlow: false,
      monthlyMortgagePayment: 2600,
      annualPropertyTax: 5200,
      annualHomeownerInsurance: 1400,
      monthlyHOADues: 0
    },
    timeEffort: {
      messagingHoursPerStay: 0.6,
      checkInCoordinationHoursPerStay: 0.3,
      cleaningLaundryHoursPerStay: 1.5, // self cleans
      restockingMaintenanceHoursMonthly: 2.0,
      pricingListingManagementHoursMonthly: 1.5,
      valuePerHourOfFreeTime: 40
    },
    riskPreferences: {
      financialRiskTolerance: 4,
      comfortWithStrangers: 4,
      freeTimeAvailability: 2,
      emergencyAvailability: 4,
      privacyPreference: 2,
      complaintManagementTolerance: 4
    },
    incomeTaxRateEstimate: 24,
    monthlyIncomeTarget: 800
  },

  georgetown_condo: {
    id: 'demo-georgetown-condo',
    name: 'Demo C: Georgetown (Blocked by Condo Bylaws)',
    property: {
      rentalType: 'entire_home_away',
      propertyType: 'condominium',
      neighborhood: 'Georgetown',
      ward: 2,
      zipCode: '20007',
      bedrooms: 2,
      bathrooms: 2,
      guestBedrooms: 2,
      maxGuests: 4,
      hasSeparateEntrance: false,
      privateBathroom: true,
      kitchenAccess: true,
      hasParking: false,
      hasOutdoorSpace: false,
      hasACHeating: true,
      hasWorkspaceWifi: true,
      hasLaundry: true,
      isFurnished: true,
      petsAllowed: false,
      hasSmokeAlarms: true,
      hasCODetectors: true,
      hasFireExtinguisher: true,
      hasEmergencyEgress: true
    },
    owner: {
      ownsProperty: true,
      isPrimaryResidence: true,
      isInvestmentProperty: false,
      ownershipEntity: 'individual',
      livesOnSiteDuringStays: false,
      hasHomesteadDeduction: true,
      hoaAllowsSTR: 'no', // HARD BLOCKER! Condo bylaws forbid STR
      mortgageAllowsSTR: true,
      hasDCLicense: false,
      liabilityInsuranceCoverage: 300000,
      insuranceVerifiedWithBroker: false,
      hasCleanHandsCertificate: true,
      hasApproved90NightExemption: false,
      approvedExemptionNights: 0,
      goals: ['earn_while_traveling']
    },
    pricing: {
      nightlyRate: 310,
      weekdayRate: 280,
      weekendRate: 350,
      availableNightsAnnual: 90,
      expectedOccupancy: 80,
      averageStayLength: 4.0,
      expectedCancellationsPercent: 5,
      cleaningFee: 130,
      extraGuestFee: 0,
      platformFeeModel: 'split',
      hostPlatformFeeRate: 3,
      guestPlatformFeeRate: 14,
      dcLodgingTaxRate: 15.95
    },
    setupCosts: {
      furniture: 2000,
      beddingLinens: 700,
      smartLocks: 250,
      safetyEquipment: 150,
      photographyStaging: 400,
      deepCleaningRepairs: 200,
      licensingPermits: 99,
      insuranceInspection: 200,
      otherStartup: 200
    },
    operatingCosts: {
      cleaningCostPerTurnover: 140,
      laundrySuppliesPerStay: 25,
      guestToiletriesConsumablesPerStay: 20,
      utilitiesGuestUsagePerNight: 15,
      maintenanceReservePerNight: 18,
      incrementalInsuranceAnnual: 850,
      softwareSubscriptionsAnnual: 120,
      managementCommissionPercent: 0,
      accountingLegalAnnual: 250,
      contingencyRepairFundAnnual: 600
    },
    ownershipCosts: {
      includeInCashFlow: false,
      monthlyMortgagePayment: 3800,
      annualPropertyTax: 8100,
      annualHomeownerInsurance: 2200,
      monthlyHOADues: 650
    },
    timeEffort: {
      messagingHoursPerStay: 0.8,
      checkInCoordinationHoursPerStay: 0.5,
      cleaningLaundryHoursPerStay: 0,
      restockingMaintenanceHoursMonthly: 2.0,
      pricingListingManagementHoursMonthly: 1.5,
      valuePerHourOfFreeTime: 75
    },
    riskPreferences: {
      financialRiskTolerance: 2,
      comfortWithStrangers: 2,
      freeTimeAvailability: 2,
      emergencyAvailability: 1,
      privacyPreference: 5,
      complaintManagementTolerance: 2
    },
    incomeTaxRateEstimate: 32,
    monthlyIncomeTarget: 1500
  },

  investor_navy_yard: {
    id: 'demo-investor-navy-yard',
    name: 'Demo D: Navy Yard (Non-Primary Investment Property)',
    property: {
      rentalType: 'investment_property',
      propertyType: 'apartment',
      neighborhood: 'Navy Yard / Capitol Riverfront',
      ward: 6,
      zipCode: '20003',
      bedrooms: 1,
      bathrooms: 1,
      guestBedrooms: 1,
      maxGuests: 2,
      hasSeparateEntrance: true,
      privateBathroom: true,
      kitchenAccess: true,
      hasParking: true,
      hasOutdoorSpace: false,
      hasACHeating: true,
      hasWorkspaceWifi: true,
      hasLaundry: true,
      isFurnished: false,
      petsAllowed: false,
      hasSmokeAlarms: true,
      hasCODetectors: true,
      hasFireExtinguisher: false,
      hasEmergencyEgress: true
    },
    owner: {
      ownsProperty: true,
      isPrimaryResidence: false, // HARD LEGAL BLOCKER! Investment property not allowed under DC STR rules
      isInvestmentProperty: true,
      ownershipEntity: 'llc',
      livesOnSiteDuringStays: false,
      hasHomesteadDeduction: false,
      hoaAllowsSTR: 'yes',
      mortgageAllowsSTR: true,
      hasDCLicense: false,
      liabilityInsuranceCoverage: 1000000,
      insuranceVerifiedWithBroker: true,
      hasCleanHandsCertificate: true,
      hasApproved90NightExemption: false,
      approvedExemptionNights: 0,
      goals: ['build_business']
    },
    pricing: {
      nightlyRate: 210,
      weekdayRate: 190,
      weekendRate: 250,
      availableNightsAnnual: 300,
      expectedOccupancy: 75,
      averageStayLength: 3.0,
      expectedCancellationsPercent: 5,
      cleaningFee: 90,
      extraGuestFee: 0,
      platformFeeModel: 'split',
      hostPlatformFeeRate: 3,
      guestPlatformFeeRate: 14,
      dcLodgingTaxRate: 15.95
    },
    setupCosts: {
      furniture: 6000,
      beddingLinens: 1200,
      smartLocks: 300,
      safetyEquipment: 150,
      photographyStaging: 600,
      deepCleaningRepairs: 500,
      licensingPermits: 99,
      insuranceInspection: 300,
      otherStartup: 500
    },
    operatingCosts: {
      cleaningCostPerTurnover: 95,
      laundrySuppliesPerStay: 15,
      guestToiletriesConsumablesPerStay: 12,
      utilitiesGuestUsagePerNight: 10,
      maintenanceReservePerNight: 12,
      incrementalInsuranceAnnual: 1200,
      softwareSubscriptionsAnnual: 360,
      managementCommissionPercent: 18, // 18% co-host fee
      accountingLegalAnnual: 500,
      contingencyRepairFundAnnual: 1000
    },
    ownershipCosts: {
      includeInCashFlow: true,
      monthlyMortgagePayment: 2200,
      annualPropertyTax: 4500,
      annualHomeownerInsurance: 1600,
      monthlyHOADues: 450
    },
    timeEffort: {
      messagingHoursPerStay: 0.2, // delegated to co-host
      checkInCoordinationHoursPerStay: 0.1,
      cleaningLaundryHoursPerStay: 0,
      restockingMaintenanceHoursMonthly: 1.0,
      pricingListingManagementHoursMonthly: 1.0,
      valuePerHourOfFreeTime: 100
    },
    riskPreferences: {
      financialRiskTolerance: 4,
      comfortWithStrangers: 4,
      freeTimeAvailability: 1,
      emergencyAvailability: 1,
      privacyPreference: 1,
      complaintManagementTolerance: 3
    },
    incomeTaxRateEstimate: 30,
    monthlyIncomeTarget: 2000
  }
};
