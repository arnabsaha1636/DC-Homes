import { PropertyDetails, OwnerCircumstances, LegalEvaluation, LegalStatus } from '../types';

export function evaluateDCLegalEligibility(
  property: PropertyDetails,
  owner: OwnerCircumstances
): LegalEvaluation {
  const reasons: string[] = [];
  const missingInfo: string[] = [];
  const blockers: string[] = [];
  const recommendedActions: string[] = [];
  const whatNeedsToChange: string[] = [];
  const citations: string[] = [
    'DC Official Code § 30-201.02 (Primary Residence & General Requirements)',
    'DC Official Code § 30-201.06 (Vacation Rental 90-Night Annual Limit)',
    'DC DLCP Short-Term Rental Guidebook & BBL Regulations'
  ];

  // 1. Primary Residence Check (Hard statutory requirement)
  const isPrimaryResidenceSatisfied = owner.isPrimaryResidence && !owner.isInvestmentProperty;
  if (!owner.isPrimaryResidence || owner.isInvestmentProperty) {
    blockers.push('Non-Primary / Investment Property: DC Code § 30-201.02 strictly limits short-term rentals to the operator’s primary residence.');
    reasons.push('The property is designated as an investment or secondary property rather than the host’s primary residence.');
    whatNeedsToChange.push('To operate legally as an STR, the host must occupy the home as their primary domicile (or qualify for Homestead deduction). Alternatively, consider leasing via 30+ day mid-term or standard long-term agreements which are exempt from STR primary-residence restrictions.');
  } else {
    reasons.push('Primary Residence Requirement: Satisfied. Host occupies the property as primary domicile.');
  }

  // 2. Rental Category & Night Limits (Hosted vs Vacation)
  const isHosted = property.rentalType === 'hosted_room' || owner.livesOnSiteDuringStays;
  let annualPermittedNights: number | 'Unlimited' = 'Unlimited';
  let applicableLicenseCategory = '';

  if (isHosted) {
    applicableLicenseCategory = 'Basic Business License with Short-Term Rental (Hosted) Endorsement';
    annualPermittedNights = 'Unlimited';
    reasons.push('Hosted Rental Classification: Because the host is on-site during guest stays, DC law does NOT impose the 90-night annual limitation.');
  } else {
    applicableLicenseCategory = 'Basic Business License with Vacation Rental Endorsement';
    if (owner.hasApproved90NightExemption && owner.approvedExemptionNights > 90) {
      annualPermittedNights = owner.approvedExemptionNights;
      reasons.push(`Vacation Rental with Approved DLCP Exemption: Permitted for ${owner.approvedExemptionNights} nights based on verified petition.`);
    } else {
      annualPermittedNights = 90;
      reasons.push('Vacation Rental Classification: Host is absent during guest stays. Strictly capped at 90 cumulative calendar nights annually pursuant to DC Code § 30-201.06.');
    }
  }

  // 3. HOA / Condo / Co-op Covenants Check
  let isHOAPermitted = true;
  if (owner.hoaAllowsSTR === 'no') {
    isHOAPermitted = false;
    blockers.push('HOA / Condo Bylaw Prohibition: Governing association documents prohibit short-term rentals. In DC, private covenants take legal precedence.');
    reasons.push('Private association bylaws explicitly forbid transient leasing.');
    whatNeedsToChange.push('Obtain a formal variance from your Condo/HOA board or propose a bylaw amendment; otherwise, short-term hosting risks association fines and legal injunction.');
  } else if (owner.hoaAllowsSTR === 'unsure') {
    isHOAPermitted = false;
    missingInfo.push('HOA/Condo Bylaws: You indicated you are unsure whether your association bylaws permit short-term rentals.');
    recommendedActions.push('Request written clarification from your Condo or HOA Board regarding transient accommodation rules.');
  } else {
    reasons.push('Association Covenants: Permitted or detached property with no restrictive covenants.');
  }

  // 4. Insurance Discrepancy & Verification Check
  let isInsuranceSatisfied = false;
  if (owner.liabilityInsuranceCoverage >= 500000 && owner.insuranceVerifiedWithBroker) {
    isInsuranceSatisfied = true;
    reasons.push('Liability Insurance: Satisfies statutory $500,000 threshold under DC Code § 30-201.02 and verified with carrier.');
  } else if (owner.liabilityInsuranceCoverage >= 250000 && !owner.insuranceVerifiedWithBroker) {
    missingInfo.push('Liability Insurance Verification: You hold $250k–$500k coverage, but statutory text (DC Code § 30-201.02) specifies $500,000 while DLCP guidance mentions $250,000.');
    recommendedActions.push('Confirm coverage limits with your insurer and obtain a dedicated commercial short-term rental rider.');
    whatNeedsToChange.push('Increase liability coverage to at least $500,000 and obtain written confirmation that short-term rental activities are not excluded.');
  } else {
    missingInfo.push('Insurance Coverage: Homeowner has not confirmed adequate liability coverage with a verified STR commercial rider.');
    recommendedActions.push('Contact your homeowner insurance provider to add a $500,000+ short-term rental endorsement.');
  }

  // 5. Life Safety Equipment Check
  const isSafetySatisfied = 
    property.hasSmokeAlarms && 
    property.hasCODetectors && 
    property.hasFireExtinguisher && 
    property.hasEmergencyEgress;

  if (!isSafetySatisfied) {
    const missingSafety: string[] = [];
    if (!property.hasSmokeAlarms) missingSafety.push('interconnected smoke alarms');
    if (!property.hasCODetectors) missingSafety.push('carbon monoxide detectors on each level');
    if (!property.hasFireExtinguisher) missingSafety.push('accessible 2A:10B:C fire extinguisher');
    if (!property.hasEmergencyEgress) missingSafety.push('unobstructed emergency egress windows/doors');
    
    missingInfo.push(`Safety Equipment: Missing required DLCP safety items (${missingSafety.join(', ')}).`);
    recommendedActions.push(`Install required safety hardware: ${missingSafety.join(', ')}.`);
    whatNeedsToChange.push(`DLCP requires working smoke alarms, CO detectors, a certified fire extinguisher, and clear emergency exit paths before issuing a license.`);
  } else {
    reasons.push('Safety Equipment: All required smoke alarms, CO detectors, fire extinguishers, and emergency exits are in place.');
  }

  // 6. Clean Hands & Licensing Status
  let isCleanHandsSatisfied = owner.hasCleanHandsCertificate;
  if (!owner.hasCleanHandsCertificate) {
    missingInfo.push('DC Certificate of Clean Hands: Must be generated from MyTax.DC.gov to prove zero delinquent DC tax liabilities >$100.');
    recommendedActions.push('Generate a free Certificate of Clean Hands from MyTax.DC.gov prior to submitting your DLCP license application.');
  } else {
    reasons.push('Clean Hands: Certificate obtained and valid.');
  }

  // 7. Overall Eligibility Decision Synthesis
  let status: LegalStatus = 'eligible';
  let statusTitle = 'Appears Eligible to Proceed with Licensing';
  let statusBadgeColor = 'teal';

  if (blockers.length > 0) {
    status = 'blocked';
    statusTitle = 'Currently Blocked by an Identified Requirement';
    statusBadgeColor = 'red';
  } else if (missingInfo.length > 0) {
    status = 'verification_needed';
    statusTitle = 'Potentially Eligible — Verification Needed';
    statusBadgeColor = 'amber';
  } else if (!owner.hasDCLicense) {
    status = 'eligible';
    statusTitle = 'Appears Eligible — Ready to Apply for DLCP License';
    statusBadgeColor = 'teal';
    recommendedActions.push('Submit Basic Business License application with DLCP along with the $99 two-year fee.');
  }

  return {
    status,
    statusTitle,
    statusBadgeColor,
    isPrimaryResidenceSatisfied,
    isRentalTypePermitted: !blockers.some(b => b.includes('Non-Primary')),
    isHOAPermitted,
    isInsuranceSatisfied,
    isSafetySatisfied,
    isCleanHandsSatisfied,
    maxPermittedContinuousStayDays: 30, // DC statutory continuous stay ceiling
    annualPermittedNights,
    applicableLicenseCategory,
    officialSourceCitations: citations,
    reasons,
    missingInfo,
    blockers,
    recommendedActions,
    whatNeedsToChange
  };
}
