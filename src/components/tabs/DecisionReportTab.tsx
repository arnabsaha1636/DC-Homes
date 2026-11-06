import React from 'react';
import { 
  Printer, 
  Download, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  Clock, 
  Scale, 
  ExternalLink,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { UserScenario, FinancialOutputs, LegalEvaluation } from '../../types';
import { ReadinessScorecard } from '../../services/decisionEngine';
import { OFFICIAL_SOURCES } from '../../services/sources';

interface DecisionReportTabProps {
  scenario: UserScenario;
  financials: FinancialOutputs;
  legalEval: LegalEvaluation;
  scorecard: ReadinessScorecard;
}

export const DecisionReportTab: React.FC<DecisionReportTabProps> = ({
  scenario,
  financials,
  legalEval,
  scorecard,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const rows = [
      ['StayWise DC — Executive Financial & Regulatory Model Export'],
      ['Date Exported', new Date().toLocaleDateString()],
      ['Property Address/Neighborhood', `${scenario.property.neighborhood}, Ward ${scenario.property.ward}, DC`],
      ['Property Type', scenario.property.propertyType],
      ['Rental Arrangement', scenario.property.rentalType],
      [''],
      ['1. LEGAL ELIGIBILITY EVALUATION'],
      ['DC Legal Gate Status', legalEval.statusTitle],
      ['Statutory Night Limit', legalEval.annualPermittedNights === 'Unlimited' ? 'Unlimited Hosted Nights' : `${legalEval.annualPermittedNights} Nights/Year`],
      ['Applicable License Category', legalEval.applicableLicenseCategory],
      ['DLCP 2-Year License Fee', `$${scenario.setupCosts.licensingPermits}`],
      [''],
      ['2. GROSS REVENUE MODELING'],
      ['Nightly Base Rate ($)', scenario.pricing.nightlyRate],
      ['Annual Available Nights Offered', scenario.pricing.availableNightsAnnual],
      ['Expected Occupancy Rate (%)', scenario.pricing.expectedOccupancy],
      ['Modeled Booked Nights (Statutory Cap Enforced)', financials.modeledBookedNights],
      ['Average Stay Length (Nights)', scenario.pricing.averageStayLength],
      ['Projected Annual Reservations Count', financials.expectedReservations],
      ['Gross Accommodation Revenue ($)', financials.grossAccommodationRevenue],
      ['Cleaning Fee Revenue Charged to Guests ($)', financials.cleaningFeeRevenue],
      ['Gross Host Booking Revenue ($)', financials.grossBookingRevenue],
      ['15.95% DC Lodging Tax (Remitted by Platform) ($)', financials.guestPaidTaxes],
      ['Total Amount Paid by Guests ($)', financials.totalGuestPaidAmount],
      ['Airbnb Host Commission Fee ($)', financials.hostPlatformFeeExpense],
      ['Net Host Payout Received ($)', financials.netHostPayout],
      [''],
      ['3. OPERATING EXPENSES & OVERHEAD'],
      ['Turnover Cleaning Expense ($)', Math.round(financials.expectedReservations * scenario.operatingCosts.cleaningCostPerTurnover)],
      ['Guest Utilities Usage ($)', Math.round(financials.modeledBookedNights * scenario.operatingCosts.utilitiesGuestUsagePerNight)],
      ['Wear and Tear / Maintenance Reserve ($)', Math.round(financials.modeledBookedNights * scenario.operatingCosts.maintenanceReservePerNight)],
      ['Commercial STR Insurance Rider ($)', scenario.operatingCosts.incrementalInsuranceAnnual],
      ['Software & Subscriptions ($)', scenario.operatingCosts.softwareSubscriptionsAnnual],
      ['Emergency Repair Reserve ($)', scenario.operatingCosts.contingencyRepairFundAnnual],
      ['Total Annual Operating Costs ($)', financials.totalOperatingCosts],
      [''],
      ['4. BOTTOM-LINE FINANCIAL OUTCOMES'],
      ['Net Annual Operating Cash Flow ($)', financials.netAnnualOperatingCashFlow],
      ['Net Monthly Cash Flow ($)', financials.netMonthlyCashFlow],
      ['First-Year Cash Flow After Startup Capital ($)', financials.firstYearCashFlowAfterStartup],
      ['Break-Even Booked Nights', financials.breakEvenBookedNights],
      ['Startup Payback Period (Months)', financials.startupPaybackMonths],
      ['Return on Incremental Setup Investment (%)', `${financials.returnOnStartupInvestment}%`],
      ['Total Annual Homeowner Labor Hours', financials.totalAnnualHostingHours],
      ['Effective Compensation per Work Hour ($/hr)', `$${financials.effectiveCompensationPerHour}`],
      ['Economic Profit (After Deducting Sweat Equity) ($)', financials.economicProfit],
      [''],
      ['5. FINAL STRATEGIC VERDICT'],
      ['Recommendation Category', scorecard.recommendationCategory],
      ['Overall Host Readiness Score', `${scorecard.overallScore}/100`],
      ['Highest Financial Risk', scorecard.highestFinancialRisk],
      ['Key Uncertainty', scorecard.keyUncertainty],
      ['Strongest Alternative Strategy', scorecard.strongestAlternative],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(cell => `"${cell}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StayWise_DC_Report_${scenario.property.neighborhood.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isNetPositive = financials.netAnnualOperatingCashFlow > 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Action Toolbar (Hidden in Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Executive Decision Report
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A comprehensive, publication-grade analysis ready for export or saving as PDF.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE EXECUTIVE REPORT DOCUMENT CONTAINER */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-8 font-sans">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                SW
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                StayWise <span className="text-teal-700">DC</span>
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase block mt-1">
              Short-Term Rental Decision Engine · Executive Feasibility Report
            </span>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-600 font-mono">
            <div>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div>Jurisdiction: District of Columbia (DLCP)</div>
            <div>Report ID: SWDC-{scenario.id.slice(-6).toUpperCase()}</div>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-1">
            01 · Executive Summary & Decision Verdict
          </h2>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-base text-slate-900">
                Verdict: {scorecard.recommendationCategory}
              </span>
              <span className="font-mono font-bold text-sm text-teal-800">
                Readiness Score: {scorecard.overallScore}/100
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {scorecard.recommendationSummary}
            </p>
          </div>
        </section>

        {/* 2. Property & Ownership Profile */}
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-1">
            02 · Property Profile & Ownership Context
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Neighborhood / Ward</span>
              <span className="font-bold text-slate-900">{scenario.property.neighborhood} (Ward {scenario.property.ward})</span>
            </div>
            <div>
              <span className="text-slate-500 block">Architecture</span>
              <span className="font-bold text-slate-900 capitalize">{scenario.property.propertyType}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Bedrooms / Baths</span>
              <span className="font-bold text-slate-900">{scenario.property.bedrooms} BR · {scenario.property.bathrooms} BA</span>
            </div>
            <div>
              <span className="text-slate-500 block">Rental Configuration</span>
              <span className="font-bold text-slate-900 capitalize">{scenario.property.rentalType.replace(/_/g, ' ')}</span>
            </div>
          </div>
        </section>

        {/* 3. DC Regulatory Assessment */}
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-1">
            03 · District of Columbia Regulatory Compliance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">DC Legal Gate Determination</span>
              <span className="font-semibold text-teal-800 block">{legalEval.statusTitle}</span>
              <span className="text-slate-500 block">{legalEval.applicableLicenseCategory}</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Statutory Rental Night Limit</span>
              <span className="font-semibold text-slate-900 block">
                {legalEval.annualPermittedNights === 'Unlimited' ? 'Unlimited Hosted Nights' : `${legalEval.annualPermittedNights} Cumulative Nights Annually`}
              </span>
              <span className="text-slate-500 block">Governed by DC Code § 30-201.06</span>
            </div>
          </div>

          <div className="text-xs text-slate-700 space-y-1 pt-1">
            {legalEval.reasons.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Complete Financial Summary Table */}
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-1">
            04 · Deterministic Financial Model
          </h2>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500 text-[10px] uppercase">
                <th className="py-2">Financial Metric</th>
                <th className="py-2 text-right">Annual Value ($)</th>
                <th className="py-2 text-right">Monthly / Unit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              <tr>
                <td className="py-2 font-sans text-slate-800">Gross Accommodation Revenue ({financials.modeledBookedNights} nights × ${scenario.pricing.nightlyRate})</td>
                <td className="py-2 text-right font-bold">${financials.grossAccommodationRevenue.toLocaleString()}</td>
                <td className="py-2 text-right text-slate-500">${Math.round(financials.grossAccommodationRevenue / 12).toLocaleString()}/mo</td>
              </tr>
              <tr>
                <td className="py-2 font-sans text-slate-800">Cleaning Fee Revenue Charged to Guests ({financials.expectedReservations} stays)</td>
                <td className="py-2 text-right">${financials.cleaningFeeRevenue.toLocaleString()}</td>
                <td className="py-2 text-right text-slate-500">${scenario.pricing.cleaningFee}/stay</td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td className="py-2 font-sans text-slate-900">Total Host Gross Booking Revenue</td>
                <td className="py-2 text-right">${financials.grossBookingRevenue.toLocaleString()}</td>
                <td className="py-2 text-right text-slate-500">${Math.round(financials.grossBookingRevenue / 12).toLocaleString()}/mo</td>
              </tr>
              <tr>
                <td className="py-2 font-sans text-slate-800">Airbnb Host Platform Service Commission ({scenario.pricing.platformFeeModel === 'split' ? '3%' : '15%'})</td>
                <td className="py-2 text-right text-rose-600">-${financials.hostPlatformFeeExpense.toLocaleString()}</td>
                <td className="py-2 text-right text-slate-500">Commission</td>
              </tr>
              <tr>
                <td className="py-2 font-sans text-slate-800">Variable Operating Expenses (Cleaning, Laundry, Guest Utilities)</td>
                <td className="py-2 text-right text-rose-600">-${financials.variableOperatingCosts.toLocaleString()}</td>
                <td className="py-2 text-right text-slate-500">Stay variable</td>
              </tr>
              <tr>
                <td className="py-2 font-sans text-slate-800">Fixed Operating Overhead (STR Insurance, Repairs, Software, DLCP Fee)</td>
                <td className="py-2 text-right text-rose-600">-${financials.fixedOperatingCosts.toLocaleString()}</td>
                <td className="py-2 text-right text-slate-500">Annual overhead</td>
              </tr>
              <tr className="bg-teal-50 text-teal-900 font-extrabold text-sm border-t-2 border-teal-800">
                <td className="py-2.5 font-sans">NET ANNUAL OPERATING CASH FLOW</td>
                <td className="py-2.5 text-right font-mono">${financials.netAnnualOperatingCashFlow.toLocaleString()}</td>
                <td className="py-2.5 text-right font-mono text-xs">${financials.netMonthlyCashFlow.toLocaleString()}/mo</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 5. Labor Opportunity Cost & Economic Profit */}
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-1">
            05 · Labor Economics & Imputed Opportunity Cost
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-sans block">Annual Labor Hours</span>
              <span className="text-lg font-bold text-slate-900 block">{financials.totalAnnualHostingHours} hours</span>
              <span className="text-[11px] text-slate-400 font-sans">~{(financials.totalAnnualHostingHours / 12).toFixed(1)} hrs/month</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-sans block">Effective Hourly Compensation</span>
              <span className="text-lg font-bold text-teal-700 block">${financials.effectiveCompensationPerHour.toFixed(2)}/hr</span>
              <span className="text-[11px] text-slate-400 font-sans">Cash flow ÷ total hours</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-sans block">Economic Profit (After Labor)</span>
              <span className="text-lg font-bold text-slate-900 block">${financials.economicProfit.toLocaleString()}</span>
              <span className="text-[11px] text-slate-400 font-sans">Deducting ${scenario.timeEffort.valuePerHourOfFreeTime}/hr opportunity cost</span>
            </div>
          </div>
        </section>

        {/* 6. Strategic Alternatives & Next Steps */}
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-1">
            06 · Strategic Alternatives & Priority Action Items
          </h2>

          <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
            <p>
              <strong>Strongest Viable Alternative:</strong> {scorecard.strongestAlternative}. If short-term hosting becomes overly demanding or legally restricted, 30+ day medium-term leasing provides steady occupancy with 75% fewer owner hours.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Three Recommended Next Steps:</span>
              {scorecard.priorityActions.map((action, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="font-bold text-teal-800">{idx + 1}.</span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Methodology Sources & Legal Limitations */}
        <section className="space-y-3 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
          <div className="font-bold uppercase tracking-wider text-slate-600">
            Authoritative References & Methodological Disclaimers
          </div>
          <p className="leading-relaxed">
            Statutory baseline references: DC Official Code § 30-201.02 & § 30-201.06 (Council of the District of Columbia); DC Department of Licensing and Consumer Protection (DLCP) Short-Term Rental Handbook; DC Office of Tax and Revenue (OTR) Transient Accommodations Tax Notice (15.95%); IRS Publication 527.
          </p>
          <p className="leading-relaxed">
            <strong>Limitation of Advisory Scope:</strong> StayWise DC is an educational decision-support modeling engine designed for MBA coursework. It does not constitute formal legal counsel, official licensing authorization, or certified tax accounting. Homeowners must independently verify governing association covenants, local zoning endorsements, and insurance riders with authorized District authorities.
          </p>
        </section>

      </div>

    </div>
  );
};
