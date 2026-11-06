// Official Washington, DC and Federal Regulatory Reference Metadata

export interface RegulatorySource {
  id: string;
  title: string;
  governingBody: string;
  url: string;
  lastReviewedDate: string;
  appliesTo: string;
  keyRuleSummary: string;
  verifiedNotes: string;
}

export const OFFICIAL_SOURCES: RegulatorySource[] = [
  {
    id: 'dc-dlcp-str',
    title: 'DC DLCP Short-Term Rental Licensing Guidelines',
    governingBody: 'Department of Licensing and Consumer Protection (DLCP)',
    url: 'https://dlcp.dc.gov/page/operating-short-term-rental-district-columbia',
    lastReviewedDate: 'November 2026',
    appliesTo: 'All DC residential hosts',
    keyRuleSummary: 'Basic Business License with Short-Term Rental or Vacation Rental Endorsement. $99 two-year licensing fee.',
    verifiedNotes: 'Requires Certificate of Clean Hands, verification of primary residency, and valid liability insurance.'
  },
  {
    id: 'dc-code-30-201-02',
    title: 'DC Official Code § 30-201.02: Short-Term Rental Requirements',
    governingBody: 'Council of the District of Columbia',
    url: 'https://code.dccouncil.gov/us/dc/council/code/sections/30-201.02',
    lastReviewedDate: 'November 2026',
    appliesTo: 'General licensing & insurance requirements',
    keyRuleSummary: 'Requires property to be primary residence; mandates at least $500,000 in liability insurance (subject to rulemaking).',
    verifiedNotes: 'NOTE ON DISCREPANCY: DLCP guidance documents reference $250,000 liability insurance, while statutory text in DC Code states $500,000. Hosts must verify with insurer and DLCP.'
  },
  {
    id: 'dc-code-30-201-06',
    title: 'DC Official Code § 30-201.06: Vacation Rental 90-Night Annual Limit',
    governingBody: 'Council of the District of Columbia',
    url: 'https://code.dccouncil.gov/us/dc/council/code/sections/30-201.06',
    lastReviewedDate: 'November 2026',
    appliesTo: 'Vacation Rentals (host absent from premises during stay)',
    keyRuleSummary: 'A host may operate a vacation rental for no more than 90 cumulative nights on a calendar year basis.',
    verifiedNotes: 'Hosted rentals where host remains on-premises do not have this 90-night annual ceiling. Hard exemption available only upon verified employer/medical petition to DLCP.'
  },
  {
    id: 'dc-str-handbook',
    title: 'DLCP Short-Term Rental Official Guidebook',
    governingBody: 'DC Department of Licensing and Consumer Protection',
    url: 'https://dlcp.dc.gov/sites/default/files/dc/sites/DLCP/publication/attachments/Short-Term-Rental-Guide_0.pdf',
    lastReviewedDate: 'November 2026',
    appliesTo: 'Operational safety, posting, records',
    keyRuleSummary: 'Working smoke/CO alarms, fire extinguisher, floor emergency map, 3-year record retention, and license number displayed in all online listings.',
    verifiedNotes: 'Fines for unlicensed hosting range from $1,000 for a first offense to $5,000 for repeated violations.'
  },
  {
    id: 'dc-tax-transient',
    title: 'DC Notice of Transient Accommodations Tax Rate (15.95%)',
    governingBody: 'DC Office of Tax and Revenue (OTR)',
    url: 'https://otr.cfo.dc.gov/release/notice-oct-1-2025-tax-changes',
    lastReviewedDate: 'November 2026',
    appliesTo: 'All guest bookings in the District of Columbia',
    keyRuleSummary: '15.95% total transient accommodations sales tax rate (extended through September 30, 2027).',
    verifiedNotes: 'Airbnb automatically collects and remits this tax on behalf of registered DC listings; this tax is paid by guests and is NOT host income.'
  },
  {
    id: 'airbnb-tax-remittance',
    title: 'Airbnb Tax Collection in Washington, DC',
    governingBody: 'Airbnb Help Center',
    url: 'https://www.airbnb.com/help/article/2300',
    lastReviewedDate: 'November 2026',
    appliesTo: 'Platform payment processing',
    keyRuleSummary: 'Airbnb collects the 15.95% DC Sales and Use Tax on transient accommodations directly from guests.',
    verifiedNotes: 'Hosts using co-listing or direct bookings must independently register and remit DC transient lodging taxes.'
  },
  {
    id: 'irs-pub-527',
    title: 'IRS Publication 527: Residential Rental Property',
    governingBody: 'Internal Revenue Service (IRS)',
    url: 'https://www.irs.gov/publications/p527',
    lastReviewedDate: 'Tax Year 2025/2026',
    appliesTo: 'Federal income tax treatment & expense deductions',
    keyRuleSummary: 'Deductions for operating costs, utilities, and depreciation allocated based on square footage and rental days.',
    verifiedNotes: 'The "14-day rule" (Augusta Rule - IRC § 280A(g)) allows tax-free rental income only if the property is rented for fewer than 15 days per year and used as a residence.'
  },
  {
    id: 'dc-bill-b26-0647',
    title: 'Short-Term Rental Regulation Amendment Act of 2026 (Bill B26-0647)',
    governingBody: 'Council of the District of Columbia (Pending)',
    url: 'https://lims.dccouncil.gov/Legislation/B26-0647',
    lastReviewedDate: 'November 2026',
    appliesTo: 'Proposed statutory reforms',
    keyRuleSummary: 'Proposed legislation to expand permitted nights or adjust primary residence definitions under specific conditions.',
    verifiedNotes: 'STATUS: PENDING LEGISLATION. Not enacted law. Must not be used in current legal determinations.'
  }
];
