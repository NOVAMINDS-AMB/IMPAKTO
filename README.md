# IMPAKTO
### Bridging the Gap Between the Informal Economy and Formal Capital

> *"Value exists. Proof does not. Impakto exists to solve that asymmetry."*

---

## Overview

Impakto is a **portable, consent-driven financial visibility infrastructure** designed for informal, mobile, and offline economic actors — smallholder farmers, small-scale miners, value-chain producers, migratory workers, and micro-entrepreneurs across Africa.

These actors generate real economic value. They lack structured proof of it.

Traditional financial infrastructure assumes permanent addresses, continuous banking records, and fixed-location businesses. Those assumptions break down for 50–80% of the workforce across many African economies. The result is a structural information asymmetry that traps working capital, penalizes mobility, and forces reliance on collateral-based systems that informal actors cannot access.

**Impakto does not lend money. It does not hold funds. It structures trust.**

It enables informal economic actors to securely generate, control, and present their financial story in a format that capital providers — MFIs, impact investors, value-chain buyers — can verify, analyze, and act on.

---

## What Impakto Is (and Is Not)

| Impakto IS | Impakto IS NOT |
|---|---|
| A financial trust infrastructure layer | A bank |
| A reputation engine | A lender |
| A data structuring protocol | A mobile wallet |
| A visibility bridge to formal capital | A charity system |
| A consent-driven data sharing platform | A credit bureau (Phase 1–2) |
| A portable financial identity system | A payment processor |

---

## Ideological Foundation

Impakto is built on five non-negotiable pillars:

**1. Data Sovereignty**
The user owns their financial story. No third party extracts or locks their data without explicit authorization.

**2. Consent Before Capital**
Every data access event is explicitly authorized, time-bound, and purpose-bound. Users can revoke access at any moment.

**3. Mobility Is Normal**
Movement is economic behavior, not risk. The scoring system treats migration as a feature, never as a red flag.

**4. Proof Over Paper**
Structured activity signals reduce dependency on paper forms, manual audits, and redundant verification cycles that informal actors cannot produce.

**5. Infrastructure Over App**
Impakto is not a consumer app. It is a trust infrastructure layer designed to integrate across MFIs, donors, buyers, aggregators, and government programs.

---

## The Four Structural Gaps Impakto Addresses

### Gap 1 — Visibility Gap
Economic actors generate value but lack digitally structured records, activity traceability, and performance history continuity. Capital providers default to high-risk classifications.

### Gap 2 — Portability Gap
Traditional financial identity is location-tied, institution-tied, and account-tied. Mobile workers lose credit history continuity and institutional memory every time they move. Impakto identity is portable across geographies and institutions.

### Gap 3 — Verification Cost Gap
Capital providers face manual audits, paper-based documentation, field visits, and high onboarding friction. Impakto reduces cost-per-verification-event through structured, digitally confirmable activity objects.

### Gap 4 — Consent & Control Gap
Current systems extract, centralize, and monetize user data without user leverage. Impakto inverts this — users control structured data sharing at the field level.

---

## System Architecture

Impakto is a layered, modular architecture. Each layer is independent but composable.

```
[ User Interface Layer ]         Web (React / Next.js) + Mobile (React Native)
         ↓
[ Activity Capture Layer ]       Economic activity logging, evidence upload, counterparty confirmation
         ↓
[ Structured Data Engine ]       Raw logs → structured economic signals
         ↓
[ Scoring & Trust Engine ]       Event-driven, component-based, explainable
         ↓
[ Consent & Data Sharing Layer ] User-controlled, time-bound, purpose-bound access grants
         ↓
[ External API Layer ]           OAuth2-authenticated API for institutional integrations
```

---

## Actor Architecture

### Primary Economic Actors (PEAs)
The value generators. Small-scale miners, farmers, value-chain producers, migratory workers, informal traders, and micro-entrepreneurs. They need a structured financial story, faster capital access, and recognition of economic reliability.

### Capital Allocation Actors (CAAs)
MFIs, donors, impact investors, aggregators, and value-chain buyers. They need structured visibility, alternative scoring inputs, reduced audit cost, and continuous monitoring signals.

### Institutional Anchors *(Optional Integration)*
Government programs, NGOs, development agencies, and commodity boards. They can validate activities, provide ecosystem signals, and use Impakto for impact monitoring.

### Data Validators *(Future Layer)*
Buyers confirming transactions, aggregators confirming supply, cooperatives, and IoT devices. These actors strengthen the verification density of the trust signal.

---

## Tech Stack

### Frontend
| Technology | Role |
|---|---|
| React / Next.js | Web interface — progressive disclosure, lightweight, low-bandwidth optimized |
| React Native | Mobile application — shared logic with web layer |
| Redux Toolkit / Zustand | State management |
| Zod / Yup | Client-side form validation |

### Backend
| Technology | Role |
|---|---|
| Node.js (NestJS) | Primary API layer — modular, scalable, microservice-ready |
| PostgreSQL | Primary database — ACID-compliant, relational integrity for scoring models |
| Redis | Event queue (pub/sub) for real-time scoring recalculation; caching for rolling aggregates |
| AWS / GCP / Azure | Cloud hosting — region-matched to compliance requirements |
| S3-compatible Object Storage | Evidence file storage and retrieval |

### Security
| Standard | Implementation |
|---|---|
| Encryption at rest | AES-256 |
| Encryption in transit | TLS 1.3 |
| Access control | Role-based (RBAC) with tokenized API access |
| Audit logging | Full event traceability; score changes reconstructable historically |

---

## Core Modules

### MSME Module

**Onboarding & KYC Integration**
User registers → directed to KYC provider via API → identity verification completed → KYC token stored securely → profile activated. Identity layer and trust layer are architecturally separate by design.

**Economic Activity Logger**
MSMEs log structured activity objects across five MVP categories: Sales, Payments Received, Asset Ownership, Loan Repayments, and Production Output. Each entry is timestamped, supports evidence upload, allows optional counterparty tagging, and triggers a scoring recalculation event.

**Real-Time Trust Score Engine**
Event-driven recalculation via Redis pub/sub. No full database scan per update — delta-based incremental recalculation only. Rolling window calculations (90-day default).

```
Activity Logged → Event Emitted →
Scoring Service Recomputes →
Trust Score Updated →
Frontend Re-renders Score
```

**Score Transparency Dashboard**
Users see overall score (0–100), all five components broken down, and activity contribution insights in plain language. Example: *"Your score increased by 3.4 points due to 5 verified sales."* No black-box logic.

**Consent & Sharing Panel**
Users select an MFI, choose data scope, set a time duration, and generate a time-bound access token. MFIs receive structured summaries and score breakdowns — not raw unrestricted logs.

---

### MFI Module

**Institutional Onboarding**
Business verification, admin account creation, and role-based access for credit officers and analysts.

**MSME Discovery & Access Panel**
Two access modes: user-initiated sharing or MFI-requested access. Displays MSME profile summary, trust score, verification strength index, and economic trend graphs.

**Analytical Dashboard**
Revenue consistency trends, volatility indicators, repayment behavior graphs, and verification heatmaps. This is where MFIs observe measurable reduction in due diligence cost.

**Export & Reporting**
Structured PDF export, CSV/JSON data export, and portfolio-level overview across multiple MSME profiles.

---

## Trust Scoring Engine

### Scoring Philosophy
We do not score poverty. We score reliability patterns.

### Score Components

```
Trust Score =
  (0.25 × Activity Consistency Index)
+ (0.20 × Revenue Stability Index)
+ (0.20 × Verification Strength Score)
+ (0.20 × Repayment Behavior Index)
+ (0.15 × Growth Trend Indicator)
```

Weights are adjustable per deployment context. Every weight change is audit-logged.

### Verification Strength Model
Each logged activity carries one of four verification statuses, which feeds directly into scoring weight:

| Status | Description |
|---|---|
| Self-declared | User-logged only |
| Counterparty-confirmed | Confirmed by the other party in the transaction |
| Document-supported | Supporting evidence uploaded |
| Third-party validated | Confirmed by institutional anchor or validator |

### Non-Negotiable Scoring Principles
- **Explainable** — Every score decomposes into visible components
- **Reproducible** — Given the same inputs, the score is deterministic
- **Auditable** — Every score change is event-traceable and historically reconstructable
- **Non-discriminatory** — Mobility, geography, industry class, and socioeconomic identity do not reduce scores

---

## Data Architecture

### Activity Object Schema
```typescript
Activity {
  id:                   string
  user_id:              string
  activity_type:        SaleTransaction | DeliveryConfirmation | ProductionOutput |
                        PaymentReceived | AssetOwnership | MobilityEvent | LoanRepayment
  timestamp:            DateTime
  geo_metadata:         GeoPoint | null       // optional
  value_amount:         Decimal
  counterparty:         string | null          // optional
  verification_status:  SelfDeclared | CounterpartyConfirmed | DocumentSupported | ThirdPartyValidated
  supporting_evidence:  FileReference | null
}
```

### Consent Grant Schema
```typescript
ConsentGrant {
  id:                   string
  user_id:              string
  granted_to_entity:    string
  data_scope:           DataScope[]
  duration:             DateRange
  access_log:           AccessEvent[]
  revocation_status:    Active | Revoked
}
```

### Scoring Service Architecture
```
Scoring Service
├── Consistency Calculator
├── Stability Calculator
├── Verification Weight Engine
├── Repayment Analyzer
└── Aggregator (produces weighted final score 0–100)
```

Each component returns a normalized score (0–1). The aggregator produces the weighted composite.

---

## Governance & Regulatory Positioning

### What Impakto Is (Phase 1–2)
A fintech infrastructure company. A financial data structuring platform. A trust scoring engine.

### What Impakto Is Not (Phase 1–2)
A deposit-taking institution. A lender. A payment processor. A bank. A money transmitter. A custodian of funds.

This positioning reduces exposure to banking licenses, lending licenses, and capital adequacy requirements while keeping Impakto compliant with data protection law, digital identity compliance, consumer protection, and cybersecurity regulation.

### Data Protection Standards
- Data minimization: if not required for scoring or verification, it is not collected
- Explicit consent required before every data access event
- Purpose limitation enforced at the consent grant level
- Right to revoke access at any time
- Full auditability of every access event
- GDPR-compatible architecture for pan-African deployment

### Algorithmic Governance Policy
- Every score must be decomposable into components (Explainability Requirement)
- The model must not penalize mobility, geography, or industry class (Non-Discrimination Safeguard)
- Every score change must be event-traceable and historically reconstructable (Audit Trail Requirement)

---

## Risk Architecture

### Risk Categories

| Risk | Phase 1 Mitigation | Phase 2+ Mitigation |
|---|---|---|
| **Data manipulation** — fake logging, inflated amounts | Verification weighting, frequency detection, duplicate detection, value outlier thresholds | Behavioral pattern modeling, statistical anomaly detection, network-based collusion detection |
| **Score gaming** — micro-transaction optimization | Non-linear scoring curves, diminishing returns on repetitive patterns, hidden weight adjustments | AI detection of synthetic optimization patterns |
| **Institutional misinterpretation** — MFI over-reliance on score | Component breakdown always visible, decision-support disclaimers | Multi-factor underwriting guidance |
| **Regulatory reclassification** | Non-lending doctrine enforced, legal opinion per jurisdiction before scaling | Proactive regulator engagement |
| **Data breach** | AES-256 encryption, zero-trust architecture, token-based access, rotating API keys | Differential privacy, zero-knowledge proof exploration |
| **Ecosystem concentration** | Multi-partner strategy, modular API | Cross-sector and cross-geography expansion |

### Trust Engine Integrity Principles (Non-Negotiable)
1. Score must be explainable
2. Score must be reproducible
3. Score must be auditable historically — even when AI is integrated

---

## AI Evolution Roadmap

### Phase 1 — Deterministic Foundation (MVP)
Rule-based scoring. Transparent weighting. Component aggregation. Event-driven recalculation. Goal: explainability and predictability above all else.

### Phase 2 — AI-Assisted Risk Detection
- **Anomaly Detection Model** — outlier transactions, unusual activity spikes, synthetic logging behavior
- **Pattern Stability Modeling** — revenue volatility prediction, seasonality detection, behavioral drift monitoring
- **Repayment Risk Correlation** — compare trust score against repayment performance; adjust predictive components

AI operates as a risk augmentation layer — never a black-box override.

### Phase 3 — Adaptive Trust Intelligence
Dynamic scoring weights, context-aware scoring (industry-adjusted), network trust modeling, predictive default probability. Explainability is never compromised.

### Ethical AI Policy
Impakto AI scores **behavior**, not identity class. It must not embed demographic bias, geographic penalization, mobility penalization, or sector discrimination at any stage.

---

## Business Model

### Monetization Doctrine
*Those who extract value from structured trust signals pay for access.*

MSMEs generate data. MFIs consume structured intelligence. **MFIs pay first.**

### Phase 1 — Institutional SaaS (MFI-Focused)

| Tier | Access |
|---|---|
| **Starter** | Up to X MSME profiles · Basic analytics · Score breakdown |
| **Growth** | Unlimited profile views · Advanced analytics · Portfolio dashboard · Export |
| **Enterprise** | API integration · Custom scoring logic · Bulk portfolio ingestion · Dedicated support |

Secondary: per-access / per-query fee for early experimentation. Future: API integration fee for underwriting system and portfolio monitoring feed integrations.

### Why MFIs Pay
Impakto must demonstrate:
- Reduced field visit requirements
- Reduced paperwork verification overhead
- Faster underwriting decisions
- Lower fraud exposure
- Better portfolio performance tracking

A 10–20% reduction in due diligence cost makes pricing immediately justifiable.

### MSME Monetization (Phase 2–3 only)
Premium analytics dashboard, verified badge subscription, cross-border portability certification. Early monetization of MSMEs risks trust erosion and data sparsity — it does not happen at MVP.

### Network Effects
- **Data network effects** — more MSMEs → better behavioral pattern modeling
- **Institutional network effects** — more MFIs → more incentive for MSMEs to join
- **Verification network effects** *(future)* — more counterparties confirming activity → higher trust density

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- A KYC provider API key (Smile Identity, Onfido, or equivalent)
- AWS / GCP credentials for object storage

### Installation

```bash
git clone https://github.com/your-org/impakto.git
cd impakto
npm install
```

### Environment Configuration

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/impakto

# Cache & Event Queue
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d

# KYC Provider
KYC_PROVIDER_API_KEY=your_kyc_key
KYC_PROVIDER_WEBHOOK_SECRET=your_webhook_secret

# Storage
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name
AWS_REGION=af-south-1

# Encryption
ENCRYPTION_KEY=your_aes_256_key
```

### Running Locally

```bash
# Development
npm run start:dev

# Run database migrations
npm run migration:run

# Seed pilot data
npm run seed
```

### Building for Production

```bash
npm run build
npm run start:prod
```

---

## Project Structure

```
/impakto
├── src/
│   ├── modules/
│   │   ├── auth/                    # JWT auth, KYC webhook listener, role guards
│   │   ├── msme/                    # MSME onboarding, profile, activity logger
│   │   ├── mfi/                     # MFI institutional onboarding, dashboard, reporting
│   │   ├── scoring/                 # Trust score engine (event-driven, component-based)
│   │   │   ├── consistency/         # Activity Consistency Calculator
│   │   │   ├── stability/           # Revenue Stability Calculator
│   │   │   ├── verification/        # Verification Weight Engine
│   │   │   ├── repayment/           # Repayment Behavior Analyzer
│   │   │   └── aggregator/          # Weighted final score producer
│   │   ├── consent/                 # ConsentGrant management, access log, revocation
│   │   ├── api/                     # External API layer (OAuth2, role-based, audit-logged)
│   │   └── admin/                   # Internal risk monitoring, audit trails
│   ├── common/
│   │   ├── guards/                  # Role-based access control
│   │   ├── interceptors/            # Request/response audit logging
│   │   ├── decorators/              # Custom NestJS decorators
│   │   └── filters/                 # Exception handling
│   ├── database/
│   │   ├── entities/                # PostgreSQL entity definitions
│   │   ├── migrations/              # Database migration files
│   │   └── seeds/                   # Pilot cohort seed data
│   ├── events/                      # Redis pub/sub event definitions and handlers
│   └── config/                      # Environment configuration and validation
├── mobile/                          # React Native application (shared logic)
├── web/                             # React / Next.js web frontend
├── test/                            # E2E and unit tests
├── .env.example
├── nest-cli.json
├── tsconfig.json
└── package.json
```

---

## MVP Roadmap

### Stage 0 — Prototype Validation *(Current)*
Architecture logic validation · User flow refinement (click dummies) · Scoring transparency testing · Simulated data density scenarios

### Stage 1 — Hackathon Exposure
Credibility signaling · Narrative clarity · Institutional attention · Feedback loops

Demo must show the full trust cycle: MSME logs activity → score updates in real time → score breakdown visible → consent granted → MFI dashboard analyzes profile → underwriting time visibly reduced.

### Stage 2 — Institutional Pilot *(3–6 months)*
50–150 MSMEs · 1–2 partner MFIs · Controlled environment

Measure: underwriting time before vs. after, approval rates, repayment correlation, MFI qualitative feedback.

### MVP Success Metrics

| Actor | Metric | Target |
|---|---|---|
| MSMEs | % completing onboarding | — |
| MSMEs | Avg activities logged per week | — |
| MSMEs | % verified activities | — |
| MSMEs | Trust score progression rate | — |
| MFIs | Avg profile review time | — |
| MFIs | Reduction in due diligence time | — |
| MFIs | % trust score influencing decision | — |
| MFIs | Repeat usage rate | — |

### MVP Boundaries
The MVP does **not** include: blockchain, IoT integration, loan issuance, fund custody, payments processing, or AI fraud detection (Phase 2+).

---

## Expansion Model

**Vertical expansion** — Agriculture → Mining → Trade → Manufacturing MSMEs

**Geographic expansion** — Regulatory-light markets first · High informal economy density regions

**Institutional expansion** — MFIs → Impact investors → Value-chain buyers → Government programs

**Strategic partnerships to pursue** — KYC service providers · Microfinance networks · Development agencies · Accelerator programs · Financial inclusion initiatives

---

## Long-Term Vision

If successful, Impakto becomes:
- A portable financial reputation passport
- A programmable trust score engine
- An API-accessible impact data layer
- A cross-border informal credit bridge

The infrastructure that makes informal economies **legible to capital** — without forcing them to become formal in structure.

---

## Contributing

Contributions are welcome. Please read `CONTRIBUTING.md` before opening a pull request.

- Branch from `main` using the format `feature/your-feature-name` or `fix/issue-description`
- All commits must be atomic and descriptive
- TypeScript strict mode must be maintained — no `any` types
- All API routes require input validation via Zod or class-validator
- Every new entity must define indexes on all frequently queried fields
- Scoring logic changes require a corresponding audit log entry format update

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.

---

*Prepared by NOVAMINDS*
