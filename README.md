<div align="center">
  <img src="public/assets/better-athlete-banner.webp" alt="Better Athlete PH — Stronger Athletes. Better Philippines." width="100%" />
</div>

> **Every Filipino Athlete Deserves a Chance.**

Better Athlete is an open-source civic-tech platform that connects **Filipino athletes, government agencies, LGUs, sports organizations, sponsors, foundations, and supporters** through one transparent digital ecosystem — a trusted infrastructure for discovering athletes, verifying achievements, finding and applying for support programs, and tracking where Philippine sports funding actually goes.

---

## The Problem

Many Filipino athletes struggle with competition fees, travel, training, equipment, coaching, nutrition, and medical costs — while government agencies, LGUs, NGOs, and private companies already run sports-support programs. The issue is rarely the absence of support; it is **fragmentation and discoverability**:

- An athlete doesn't know _what programs am I eligible for?_
- A sponsor doesn't know _which athlete actually needs support?_
- A government office doesn't know _which athletes in our region need assistance?_
- The public doesn't know _where is sports funding going?_

AthletePH solves this through one platform.

## Core Concept

```text
BetterGov-style transparency
+ Athlete Directory
+ Sports Opportunity Platform
+ Government Assistance Portal
+ Sponsorship Platform
+ Athlete Verification
+ Public Accountability
```

## Key Features

### For Athletes

- Public profiles with verified identity, sport, achievements, and competitions
- Structured funding needs (travel, competition, training, equipment, medical, etc.)
- Applications to government and private programs, with status tracking
- Campaigns for community support with progress tracking
- Smart opportunity matching based on eligibility rules

### For Government Agencies & LGUs

- Verified official organization profiles
- Publish funding programs with structured eligibility rules
- Receive, review, approve, and record applications end-to-end
- Record awards and disbursements into a public transparency ledger
- Publish official documents and outcome reports

### For Sponsors, Foundations & Organizations

- Discover athletes by sport, region, level, and need
- Sponsor athletes or fund programs
- Track sponsorship impact and outcomes

### For the Public

- Full funding transparency dashboards: allocated vs. committed vs. disbursed vs. received
- Program timelines, beneficiary counts, and funding breakdowns by category
- Data provenance on every record (Official Government Submission, Organization Reported, Athlete Reported, AthletePH Verified)
- Search across athletes, sports, organizations, opportunities, and programs

## Transparency Model

The heart of AthletePH is a strict distinction between funding stages, backed by an **immutable financial event ledger** — never editable totals:

```text
Allocated → Committed → Disbursed → Confirmed Received
```

Every movement of funds is recorded as a `FundingTransaction` (allocation, commitment, obligation, disbursement, refund, adjustment) with actor, reference number, supporting document, and timestamp. Totals are always computed from transactions, making numbers auditable and manipulation-resistant.

Government assistance, private sponsorship, and public crowdfunding are modeled as **separate flows** — they are never mixed into one financial system.

## Platform Principles

| Principle         | Meaning                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Transparency**  | Every public peso is traceable: who funded it, who received it, and what happened      |
| **Verification**  | Identity, athlete status, achievements, and organizations go through review workflows  |
| **Privacy**       | No government IDs, bank accounts, addresses, or sensitive documents are ever published |
| **Athlete First** | Focus on eligibility and opportunity — never on athletes "proving poverty"             |

## Tech Stack

- **Backend:** Laravel 13 · PHP 8.3+ · Fortify (auth) · Wayfinder (typed routes)
- **Frontend:** React 19 · Inertia.js v3 · TypeScript · Tailwind CSS 4 · Radix UI · shadcn-style components
- **Database:** SQLite (dev) / PostgreSQL (production target)
- **Testing & QA:** Pest 4 · Pint · Larastan (PHPStan) · ESLint · Prettier
- **Build:** Vite

## Getting Started

### Requirements

- PHP 8.3+
- Composer
- Node.js 20+
- Yarn

### Installation

```bash
# Install dependencies, create .env, generate key, migrate, build assets
composer run setup
```

### Development

```bash
composer run dev
```

This starts the Laravel dev server, queue listener, log tail, and Vite dev server together.

## Available Scripts

### Composer

| Command                            | Description                                       |
| ---------------------------------- | ------------------------------------------------- |
| `composer run dev`                 | Start full development environment                |
| `composer run test`                | Lint check, static analysis, then Pest test suite |
| `composer run lint` / `lint:check` | Fix / check code style (Pint)                     |
| `composer run types:check`         | Static analysis (PHPStan/Larastan)                |
| `composer run ci:check`            | All frontend lint/format/type checks + tests      |

### Yarn / npm

| Command                         | Description                              |
| ------------------------------- | ---------------------------------------- |
| `yarn dev`                      | Vite dev server                          |
| `yarn build` / `yarn build:ssr` | Production build (client / client + SSR) |
| `yarn lint` / `lint:check`      | Fix / check ESLint                       |
| `yarn format` / `format:check`  | Fix / check Prettier formatting          |
| `yarn types:check`              | TypeScript type checking                 |

## Testing

```bash
php artisan test          # full suite
vendor/bin/pest           # direct Pest runner
```

Tests use factories and cover application workflows, funding ledger behavior, verification, and authorization policies.

## Project Structure

```text
app/
├── Actions/          # Fortify & domain actions
├── Enums/            # UserRole, TransactionType, ApplicationStatus, ...
├── Models/           # AthleteProfile, FundingProgram, FundingTransaction, ...
├── Policies/
└── Http/Controllers/

resources/js/
├── components/ui/    # shadcn-style primitives
├── layouts/
├── pages/            # athletes/, opportunities/, transparency/,
│                     # government/, organization/, admin/, settings/
├── types/
└── lib/

database/migrations/  # users, sports, athletes, organizations,
                      # opportunities, applications, verifications,
                      # government entities, audit logs
```

### Core Domain Models

`User`, `AthleteProfile`, `Sport`, `SportDiscipline`, `Achievement`, `Organization`, `GovernmentEntity`, `Opportunity`, `Application`, `ApplicationReview`, `FundingProgram`, `FundingTransaction`, `FundingBeneficiary`, `VerificationRequest`, `AuditLog`

Access control is role-based (`super_admin`, `government_admin`, `verification_officer`, `athlete`, `supporter`, …) and enforced through **Laravel Policies** for all sensitive operations.

## Roadmap

- [x] Core domain models, enums, and migrations
- [x] Athlete directory, sports directory, opportunities browsing
- [x] Application workflow with reviews
- [x] Verification request workflow
- [x] Funding program ledger and transparency pages
- [x] Government, organization, and admin dashboards
- [ ] Smart opportunity matching engine
- [ ] Sponsorships and public crowdfunding campaigns
- [ ] Philippines map view (athletes, programs, funding by region)
- [ ] Official data import (CSV/XLSX/PDF/API) with validation
- [ ] Notifications (in-app, email, push)
- [ ] Search upgrade to Meilisearch/Typesense
- [ ] Multilingual UI (English / Filipino)

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the development setup, code style requirements, and PR guidelines.

## Security

If you discover a security vulnerability, please do **not** open a public issue. See [SECURITY.md](SECURITY.md) for responsible disclosure instructions.

## License

This project is open-sourced under the [MIT license](LICENSE).
