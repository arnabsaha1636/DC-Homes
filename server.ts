import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Gemini AI Decision Adviser Endpoint
app.post('/api/gemini/adviser', async (req: Request, res: Response) => {
  try {
    const { question, scenarioData } = req.body;

    const systemInstruction = `You are "StayWise AI Adviser", an elite Washington, DC short-term rental decision expert, real estate economist, and hospitality analyst.
You advise DC homeowners evaluating whether to list their home or space on Airbnb.
CRITICAL RULES:
1. Never invent DC laws or fake financial statistics.
2. DC primary residence rule: qualifying STRs must generally be the homeowner's primary residence.
3. Hosted rentals (host present): no 90-night limit under current DC rules.
4. Vacation rentals (host absent): strictly limited to 90 nights per year unless an approved exemption exists.
5. Standard DLCP license fee: $99 (2-year basic business license with STR endorsement).
6. DC Transient accommodations sales tax: 15.95% (temporary rate in effect).
7. Insurance discrepancy: DC DLCP guidance references $250k liability, while DC Code § 30-201.02 references $500k. Must advise verifying with DLCP and insurance provider.
8. Never override the deterministic calculations provided in the prompt.
9. Always structure your answer into these 6 clear sections:
   - **Short Answer**: Direct 1-2 sentence conclusion.
   - **Why This Matters**: The core economic, legal, or lifestyle principle.
   - **Evidence From Your Inputs**: Specific numbers and selections from the homeowner.
   - **Relevant Calculations**: Net cash flow, break-even, or night cap math.
   - **Risks & Uncertainties**: What could go wrong or what remains unverified.
   - **Recommended Next Action**: 1-2 concrete, actionable steps.
Keep tone objective, analytical, and supportive—never blindly encourage hosting if legal barriers or poor margins exist.`;

    const userPrompt = `Homeowner Scenario Context:
${JSON.stringify(scenarioData, null, 2)}

Homeowner Question:
"${question || 'Should I proceed with hosting based on my numbers?'}"

Provide an authoritative, insightful assessment formatted with the required 6 sections.`;

    if (aiClient) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
        );
        const apiPromise = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemInstruction,
          },
        });
        const response: any = await Promise.race([apiPromise, timeoutPromise]);
        const text = response?.text || '';
        if (text) {
          return res.json({ answer: text, source: 'gemini' });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call skipped or timed out, generating deterministic advisory response:', geminiError?.message);
      }
    }

    // Deterministic High-Quality Fallback if API key is unconfigured or rate-limited
    const fallbackAnswer = generateDeterministicAdvice(question, scenarioData);
    return res.json({ answer: fallbackAnswer, source: 'fallback' });
  } catch (err: any) {
    console.error('Adviser endpoint error:', err);
    return res.status(500).json({ error: 'Failed to process advisory query.' });
  }
});

// Gemini "Challenge My Airbnb Plan" Endpoint
app.post('/api/gemini/challenge', async (req: Request, res: Response) => {
  try {
    const { scenarioData } = req.body;

    const systemInstruction = `You are "StayWise Plan Challenger", a rigorous risk auditor for Washington, DC residential real estate.
Your goal is to stress-test the homeowner's Airbnb assumptions and identify the top 3 to 5 most consequential weaknesses, hidden liabilities, or critical unknowns.
For each weakness include:
1. **Weakness Title**
2. **Why It Matters**: The operational or financial mechanism.
3. **What Could Happen**: Worst-case or realistic negative outcome.
4. **Quantified Financial Impact**: In dollars, night loss, or margin compression.
5. **What to Verify & How to Improve**: Specific verification step or contingency plan.
Be direct, constructive, and uncompromising on DC legal compliance.`;

    const userPrompt = `Stress-test this DC Airbnb Proposal:
${JSON.stringify(scenarioData, null, 2)}

Identify the top 3-5 critical vulnerabilities or sensitivities in this specific homeowner's plan.`;

    if (aiClient) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
        );
        const apiPromise = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemInstruction,
          },
        });
        const response: any = await Promise.race([apiPromise, timeoutPromise]);
        const text = response?.text || '';
        if (text) {
          return res.json({ challenges: text, source: 'gemini' });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call skipped or timed out for plan challenge, using deterministic engine:', geminiError?.message);
      }
    }

    const fallbackChallenges = generateDeterministicChallenge(scenarioData);
    return res.json({ challenges: fallbackChallenges, source: 'fallback' });
  } catch (err: any) {
    console.error('Challenge endpoint error:', err);
    return res.status(500).json({ error: 'Failed to generate plan challenge.' });
  }
});

function generateDeterministicAdvice(question: string, data: any): string {
  const isPrimary = data?.owner?.isPrimaryResidence ?? true;
  const isHosted = data?.property?.rentalType === 'hosted_room';
  const hoaAllows = data?.owner?.hoaAllowsSTR ?? 'yes';
  const grossRev = data?.financials?.grossRevenue ?? 18000;
  const netCashFlow = data?.financials?.netCashFlow ?? 8500;
  const bookedNights = data?.financials?.modeledBookedNights ?? 70;
  const hours = data?.financials?.annualHours ?? 120;
  const effectiveHourly = hours > 0 ? (netCashFlow / hours).toFixed(2) : '0.00';

  let shortAnswer = '';
  if (!isPrimary) {
    shortAnswer = 'Under current DC law, short-term rentals are restricted to the owner’s primary residence. An investment property is legally blocked unless leased long-term (30+ days).';
  } else if (hoaAllows === 'no') {
    shortAnswer = 'Your property is currently blocked by your HOA/Condo association bylaws, which legally supersede municipal eligibility.';
  } else if (netCashFlow < 0) {
    shortAnswer = 'Your current pricing and cost structure yields negative annual cash flow. We recommend restructuring expenses or exploring mid-term furnished rentals.';
  } else {
    shortAnswer = `Your plan is financially viable with an estimated annual net cash flow of $${netCashFlow.toLocaleString()} across ${bookedNights} booked nights, generating ~$${effectiveHourly}/hour for your labor.`;
  }

  return `### **Short Answer**
${shortAnswer}

### **Why This Matters**
Washington, DC enforces strict short-term rental compliance through the Department of Licensing and Consumer Protection (DLCP). Profitability is not just gross booking revenue; it depends on the statutory night ceiling (${isHosted ? 'unlimited hosted nights' : '90-night annual vacation limit'}), platform fees (3–15%), local taxes (15.95% transient tax), and fixed compliance overhead.

### **Evidence From Your Inputs**
- **Property Type**: ${data?.property?.propertyType || 'Residential'} in ${data?.property?.neighborhood || 'Washington, DC'}.
- **Rental Arrangement**: ${isHosted ? 'Hosted Room (Host on-site)' : 'Entire Home / Vacation Rental (Host absent)'}.
- **Primary Residence**: ${isPrimary ? 'Yes (Meets statutory threshold)' : 'No (Non-primary / investment)'}.
- **Association Permission**: ${hoaAllows === 'yes' ? 'Permitted' : hoaAllows === 'no' ? 'Prohibited by HOA/Bylaws' : 'Requires verification'}.
- **Projected Nightly Rate**: $${data?.pricing?.nightlyRate || 185} with ${data?.pricing?.expectedOccupancy || 65}% modeled occupancy.

### **Relevant Calculations**
- **Gross Host Booking Revenue**: $${grossRev.toLocaleString()}
- **Net Operating Cash Flow**: $${netCashFlow.toLocaleString()}
- **Annual Hosting Commitment**: ${hours} hours (~${(hours / 12).toFixed(1)} hrs/mo)
- **Effective Compensation per Labor Hour**: $${effectiveHourly}/hr
- **Statutory Night Cap**: ${isHosted ? 'No annual night limit applies to hosted stays' : 'Capped at 90 nights maximum under DC vacation rental law'}.

### **Risks & Uncertainties**
1. **Insurance Minimum Discrepancy**: DLCP guidelines cite $250,000 liability, whereas DC Code § 30-201.02 references $500,000. Verify the required coverage with your insurer.
2. **Turnover & Cleaning Cost Escalation**: Cleaning overhead is your largest variable expense; higher vacancy turnovers can quickly erode margins.
3. **Clean Hands Certification**: You must obtain a DC Certificate of Clean Hands (confirming zero outstanding DC tax debts >$100).

### **Recommended Next Action**
${!isPrimary ? '1. Shift strategy to 30+ day medium-term executive/travel nurse leasing which is exempt from STR primary-residence restrictions.' : hoaAllows === 'no' ? '1. Review condo association bylaws with legal counsel or the board to evaluate variance procedures.' : '1. Secure your DC Certificate of Clean Hands and verify your STR rider with your homeowner insurance provider before listing.'}`;
}

function generateDeterministicChallenge(data: any): string {
  const isVacation = data?.property?.rentalType !== 'hosted_room';
  const cleaningFee = data?.pricing?.cleaningFee ?? 85;
  const cleaningCost = data?.costs?.cleaningPerStay ?? 110;
  const initialSetup = data?.costs?.initialSetupTotal ?? 4500;
  const netCashFlow = data?.financials?.netCashFlow ?? 8500;
  const paybackMonths = netCashFlow > 0 ? ((initialSetup / netCashFlow) * 12).toFixed(1) : 'Indefinite';

  return `### 1. The Statutory 90-Night Revenue Ceiling
- **Why It Matters**: ${isVacation ? 'As an unhosted vacation rental, DC law strictly caps your bookings at 90 nights annually. Revenue cannot scale past this threshold regardless of tourist demand.' : 'If you ever travel and leave guests unattended, those nights count against your 90-night vacation quota.'}
- **What Could Happen**: Operating beyond 90 unhosted nights exposes hosts to fines up to $1,000 to $5,000 and license revocation by DLCP.
- **Quantified Impact**: Locks maximum potential gross accommodation earnings at 90 × average rate.
- **How to Improve**: Concentrate bookings during peak cherry blossom (March/April), graduation (May), and fall conference seasons to maximize average daily rate (ADR).

### 2. Cleaning & Turnover Margin Leakage
- **Why It Matters**: You currently charge guests $${cleaningFee} but operational cleaning costs are modeled at $${cleaningCost} per turnover.
- **What Could Happen**: For frequent 2-3 night stays, absorbing $${Math.max(0, cleaningCost - cleaningFee)} out-of-pocket per turnover rapidly erodes monthly cash flow.
- **Quantified Impact**: At 30 turnovers per year, a $25 subsidy costs you $750 annually in direct cash leakage.
- **How to Improve**: Align guest cleaning fee with actual contracted turnaround rates or mandate a 3-night minimum stay to reduce turnover frequency.

### 3. Startup Capital Amortization & Cash Buffer
- **Why It Matters**: You have budgeted $${initialSetup.toLocaleString()} for furniture, smart locks, safety detectors, and professional photos.
- **What Could Happen**: At projected cash flow, your payback period is ~${paybackMonths} months. If an HVAC or plumbing emergency occurs in Month 2, you may experience negative first-year liquidity.
- **Quantified Impact**: Requires a dedicated emergency cash reserve of at least $2,000 to avoid dipping into personal savings.
- **How to Improve**: Establish an escrow maintenance reserve and phase non-essential décor upgrades after reaching break-even.

### 4. Insurance & Liability Exposure Gap
- **Why It Matters**: Standard homeowner policies explicitly exclude commercial short-term rental activity. AirCover does not replace primary liability coverage.
- **What Could Happen**: A slip-and-fall or water damage claim could be denied by your primary carrier, risking personal liability.
- **Quantified Impact**: A STR commercial rider typically costs $600–$1,200/year, which must be factored into your net cash flow.
- **How to Improve**: Request a written endorsement from your insurance broker referencing DC DLCP requirements before welcoming your first guest.`;
}

// Development or Production handler
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StayWise DC Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start StayWise DC server:', err);
});
