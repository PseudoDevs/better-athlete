# AthletePH — Design System

> **Designing a transparent, accessible, and athlete-first digital platform for Philippine sports.**

---

# 1. Design Philosophy

AthletePH is a civic-tech platform inspired by the principles behind BetterGovPH:

- Simplicity
- Accessibility
- Transparency
- Discoverability
- Trust
- Filipino identity
- Data clarity
- Mobile-first design
- Consistent UI patterns

BetterGovPH's design philosophy focuses on making complex government information easier for ordinary Filipinos to discover and understand. AthletePH applies the same philosophy to **athletes, sports opportunities, government assistance, sponsorship, and funding transparency**.

The interface should answer:

> **"What do I need to know, and what can I do next?"**

without requiring users to understand the underlying government or sports system.

---

# 2. Design Goal

AthletePH should feel like:

```text
BetterGov
    +
Modern Sports Platform
    +
Public Transparency Dashboard
    +
Athlete Directory
```

The visual identity should communicate:

```text
TRUST
  +
ENERGY
  +
TRANSPARENCY
  +
FILIPINO IDENTITY
```

---

# 3. Design Personality

The product should be:

- Modern
- Professional
- Human
- Optimistic
- Trustworthy
- Data-driven
- Accessible
- Calm
- Slightly energetic

Avoid making the platform feel like:

- A government bureaucracy portal
- A cryptocurrency dashboard
- A social-media clone
- A sports betting platform
- A flashy fitness app
- A political website

The product should feel like **public infrastructure built with modern technology**.

---

# 4. Visual Direction

## Primary Inspiration

Use BetterGovPH as inspiration for:

- Layout simplicity
- Large search areas
- Card-based information
- Strong typography
- Generous whitespace
- Clear hierarchy
- Accessibility
- Data visualization
- Directory patterns
- Public-information presentation

BetterGov's current platform emphasizes searchable directories, responsive design, accessibility, multilingual support, and organized government information.

## AthletePH Difference

AthletePH should introduce:

- Athlete photography
- Sport-specific visual language
- Achievement badges
- Funding progress
- Athlete stories
- Competition cards
- Performance metrics
- Sponsorship cards
- Geographic sports data
- Funding visualizations

---

# 5. Brand Direction

## Suggested Brand

**AthletePH**

### Tagline

Primary:

> **Every Filipino Athlete Deserves a Chance.**

Alternative:

> **Discover. Support. Represent.**

Alternative:

> **Connecting Filipino Athletes to Opportunity.**

---

# 6. Color Philosophy

The color system should be inspired by the Philippines without becoming overly patriotic.

Avoid using red, blue, and yellow everywhere.

Instead:

```text
Neutral UI
     +
Deep Philippine Blue
     +
Warm Gold
     +
Controlled Red
```

The majority of the interface should remain neutral.

---

# 7. Color Tokens

## Primary

```css
--color-primary: #0032a0;
```

Royal Philippine blue — matched to the Better Athlete.ph logo wordmark and the BetterGovPH family of portals (bettersolano.org uses the same primary).

Use for:

- Primary buttons
- Links
- Icons and small accents
- The hero gradient (with primary-dark)

Blue is an accent, not a background. The body stays white; only the hero uses a blue gradient band, and the footer uses near-black (#1a1a1a).

---

## Primary Dark

```css
--color-primary-dark: #002170;
```

Use for:

- Hover states
- The hero gradient end
- High-contrast areas

---

## Accent Gold

```css
--color-gold: #d9a441;
```

Use sparingly for:

- Achievements
- Gold medals
- Highlights
- Featured statistics
- Premium sponsorship indicators

Do not use gold as the primary button color.

---

## Accent Red

```css
--color-red: #b83232;
```

Use for:

- Alerts
- Important warnings
- Filipino identity accents
- Critical status

Avoid excessive red.

---

# 8. Neutral Palette

```text
Background:
#F8FAFC

Surface:
#FFFFFF

Surface Secondary:
#F1F5F9

Border:
#E2E8F0

Text:
#0F172A

Text Secondary:
#475569

Text Muted:
#64748B

Disabled:
#94A3B8
```

The interface should primarily use neutral colors.

---

# 9. Semantic Colors

```text
Success:
#16803C

Warning:
#B7791F

Error:
#C53030

Info:
#2563EB
```

Semantic colors must not rely on color alone.

Always pair them with:

- Icon
- Text
- Status label

Example:

```text
✓ Verified

⚠ Needs Review

✕ Rejected
```

---

# 10. Typography

Use a modern sans-serif typeface.

Recommended:

```text
Inter
```

or:

```text
Geist
```

or another highly readable sans-serif.

Typography should prioritize:

- Legibility
- Accessibility
- Numeric clarity
- Mobile readability

---

# 11. Typography Scale

```text
Display:
48–64px

H1:
36–48px

H2:
28–36px

H3:
22–28px

H4:
18–22px

Body Large:
18px

Body:
16px

Body Small:
14px

Caption:
12px
```

Mobile:

```text
Display:
36px

H1:
30px

H2:
24px

H3:
20px
```

---

# 12. Typography Rules

Use strong typography for:

- Athlete names
- Funding amounts
- Statistics
- Program titles

Example:

```text
₱8.4M
Funds Tracked
```

The number should visually dominate the label.

---

# 13. Layout System

Use a consistent maximum content width.

```text
max-width:
1280px
```

Desktop:

```text
┌──────────────────────────────────────────────┐
│                    NAV                       │
├──────────────────────────────────────────────┤
│                                              │
│                  CONTENT                     │
│                                              │
└──────────────────────────────────────────────┘
```

Primary content:

```css
max-width: 1280px;
margin-inline: auto;
padding-inline: 24px;
```

---

# 14. Responsive Breakpoints

Use Tailwind's responsive system.

Recommended:

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Design mobile first.

---

# 15. Mobile First

A large portion of the target audience may access AthletePH through mobile devices.

Therefore:

```text
Mobile
   ↓
Tablet
   ↓
Desktop
```

not:

```text
Desktop
   ↓
Shrink everything
   ↓
Mobile
```

---

# 16. Navigation

## Utility Bar

BetterGov.ph places a thin utility bar above the main navigation. AthletePH should follow this pattern:

```text
┌─────────────────────────────────────────────────────────────┐
│ About · How It Works · Contact · Data Disclaimer   [English ▾]│
└─────────────────────────────────────────────────────────────┘
```

Contents:

```text
Secondary informational links (About, How It Works, Contact)
Language selector (English / Filipino, more later)
```

## Main Navigation

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ AthletePH   Athletes   Sports   Opportunities   Transparency │
│                                         [Search] [Sign In]   │
└─────────────────────────────────────────────────────────────┘
```

Primary navigation:

```text
Athletes
Sports
Opportunities
Organizations
Transparency
```

Secondary:

```text
About
How It Works
```

User actions:

```text
[ I'm an Athlete ]
[ Sign In ]
```

Like BetterGov.ph, each primary item may open a dropdown of sub-sections (for example, Transparency → Programs, Funding, Organizations, Regions).

---

# 17. Mobile Navigation

Mobile navigation should use:

```text
┌─────────────────────────────┐
│ AthletePH              ☰   │
└─────────────────────────────┘
```

Menu:

```text
Athletes

Sports

Opportunities

Organizations

Transparency

────────────────

I'm an Athlete

Sign In
```

Do not overcrowd the mobile navigation.

---

# 18. Homepage

The homepage should be highly focused and follow the structural anatomy observed on BetterGov.ph (see section 140 for the full observed reference).

Recommended structure:

```text
UTILITY BAR
(secondary links + language selector)

NAVIGATION
(logo, primary items with dropdowns, search)

LIVE DATA TICKER
(dark strip: total funding tracked, athletes supported,
programs open — the AthletePH equivalent of BetterGov's
forex/weather ticker)

ANNOUNCEMENT BANNER
(optional: application deadline alerts, program launches)

HERO — SPLIT LAYOUT
Left:
    Headline
    Supporting text
    Large search bar
    Popular quick links (Swimming, Boxing, Athletics)
Right:
    "Popular Programs" panel
    (icon tiles: Travel Grants, Equipment, Scholarships,
    Training Camps + View All Programs)

DIRECTORY GRID
(category cards: Athletes by Sport, by Region,
Organizations, Competitions — each with bullet links
and a "View All →" pattern, ending in a centered
"Browse All" button)

TRANSPARENCY BAND
(large headline metrics + funding stage pipeline +
data cards with source attribution, mirroring
BetterGov's Real-Time Data Services band)

COMMUNITY / CTA BAND
(dark band: "Support Filipino athletes" with two
actions — join as athlete / partner as organization)

CAMPAIGN BAND
(single accent-colored band for one focused program
or deadline, like BetterGov's PhilSys band)

FOOTER
(multi-column links + transparency statement pill +
data disclaimer + version line)
```

---

# 19. Hero Section

Hero message:

```text
Every Filipino Athlete
Deserves a Chance.
```

Supporting text:

```text
Discover athletes, find opportunities,
and see how Filipino sports are being supported.
```

Actions:

```text
[ Explore Athletes ]

[ Find Opportunities ]
```

---

# 20. Hero Search

The search should be one of the strongest elements on the homepage.

```text
┌────────────────────────────────────────────────────┐
│ 🔍 Search athletes, sports, organizations...       │
└────────────────────────────────────────────────────┘
```

Below:

```text
Popular:

Swimming
Basketball
Athletics
Boxing
Volleyball
Gymnastics
```

---

# 21. Homepage Search Experience

Search results should support:

```text
Athletes

Sports

Organizations

Opportunities

Competitions
```

Example:

```text
Search "Swimming"

Athletes
24 results

Organizations
8 results

Opportunities
5 results

Competitions
13 results
```

---

# 22. Athlete Cards

Athlete cards should be highly visual.

```text
┌─────────────────────────────────┐
│                                 │
│            PHOTO                │
│                                 │
├─────────────────────────────────┤
│ ✓ Verified                      │
│                                 │
│ Maria Santos                    │
│ Swimming                        │
│ Quezon City                     │
│                                 │
│ 🥇 National Champion             │
│                                 │
│ [ View Profile ]                │
└─────────────────────────────────┘
```

---

# 23. Athlete Card Rules

Display:

- Photo
- Verification status
- Name
- Sport
- Location
- Primary achievement

Avoid displaying too much.

The card's purpose is:

> **"Should I click this athlete?"**

---

# 24. Athlete Profile Design

The athlete profile should feel like a combination of:

```text
Professional Profile
+
Sports Resume
+
Support Page
```

Structure:

```text
Cover

Profile Header

About

Sports

Achievements

Competitions

Current Goals

Needs

Government Support

Private Support

Sponsors

Updates
```

---

# 25. Athlete Profile Header

```text
┌──────────────────────────────────────────────┐
│                                              │
│  [PROFILE]                                   │
│                                              │
│  ✓ Verified Athlete                          │
│                                              │
│  Maria Santos                                │
│  Swimming · Quezon City                      │
│                                              │
│  [ Follow ] [ Support Athlete ]              │
│                                              │
└──────────────────────────────────────────────┘
```

---

# 26. Verification Badge

Use:

```text
✓ Verified Athlete
```

instead of a complicated badge.

Tooltip:

> Verified by AthletePH based on submitted documentation and review.

Never imply government certification unless the relevant government organization has actually provided it.

---

# 27. Athlete Stats

Use a compact metric row:

```text
┌────────────┬────────────┬────────────┬────────────┐
│ 12         │ 8          │ 4          │ 2          │
│ Competitions│ Podiums   │ Gold       │ Countries  │
└────────────┴────────────┴────────────┴────────────┘
```

On mobile:

```text
12
Competitions

8
Podiums

4
Gold
```

---

# 28. Achievements

Achievement cards:

```text
🥇
National Championship

Gold Medal

2026
Manila, Philippines
```

Use medal colors only when appropriate.

```text
Gold
Silver
Bronze
```

Do not use colorful gradients for every achievement.

---

# 29. Funding Progress

Funding should be extremely easy to understand.

```text
International Training Camp

₱180,000 goal

₱129,600 raised

72%

████████████████░░░░

[ Support Athlete ]
```

---

# 30. Funding Transparency Card

Government support:

```text
┌────────────────────────────────────┐
│ Government Support                 │
│                                    │
│ 2026 Athlete Assistance Program    │
│ Philippine Sports Commission       │
│                                    │
│ Awarded                           │
│ ₱50,000                            │
│                                    │
│ Status                             │
│ Disbursed                          │
│                                    │
│ [ View Program ]                   │
└────────────────────────────────────┘
```

---

# 31. Transparency Dashboard

This is one of the most important pages.

BetterGov's current transparency portal emphasizes searchable datasets, large headline metrics, filtering, source attribution, and clear disclaimers. AthletePH should use the same information architecture for sports funding.

Hero:

```text
Sports Funding Transparency

See where Philippine sports funding
comes from and where it goes.
```

---

# 32. Transparency Metrics

```text
┌────────────────┐
│ ₱420M          │
│ Funding Tracked│
└────────────────┘

┌────────────────┐
│ 184            │
│ Programs       │
└────────────────┘

┌────────────────┐
│ 42,481         │
│ Athletes       │
└────────────────┘

┌────────────────┐
│ 84             │
│ Organizations  │
└────────────────┘
```

---

# 33. Transparency Search

```text
┌────────────────────────────────────────────┐
│ 🔍 Search funding, programs, athletes...   │
└────────────────────────────────────────────┘
```

Filters:

```text
Year
Agency
LGU
Region
Sport
Program
Funding Type
Status
```

---

# 34. Funding Visualization

Use simple visualizations.

Recommended:

```text
Bar Chart
Line Chart
Donut Chart
Map
```

Avoid unnecessary 3D charts.

Example:

```text
2026 SPORTS FUNDING

Training       ██████████████ ₱42M
Competition    ███████████    ₱35M
Equipment      ████████       ₱22M
Travel         ██████         ₱18M
Medical        ███            ₱8M
```

---

# 35. Funding Status

Use a clear four-stage visualization:

```text
Allocated
   ↓
Committed
   ↓
Disbursed
   ↓
Confirmed Received
```

Example:

```text
₱50M
Allocated

₱42M
Committed

₱38M
Disbursed

₱37M
Confirmed
```

---

# 36. Funding Detail Page

```text
2026 Athlete Development Program

Philippine Sports Commission
✓ Verified Government Organization

--------------------------------

₱50M
Allocated

₱42M
Committed

₱38M
Disbursed

--------------------------------

Beneficiaries

2,481 Athletes

--------------------------------

Funding Breakdown

Training       ₱15M
Competition    ₱12M
Equipment      ₱8M
Travel         ₱7M
Medical        ₱4M
Other          ₱4M

--------------------------------

Timeline

Created
Published
Applications
Approved
Disbursed
Completed
```

---

# 37. Data Provenance

Every transparency record should display its source.

Example:

```text
Source

Official Government Submission

Last Updated

August 25, 2026
```

Possible source badges:

```text
Official Government Data

Organization Reported

Athlete Reported

AthletePH Verified

Community Submitted
```

---

# 38. Data Disclaimer

Use a small but visible disclaimer:

> Data shown on AthletePH may be sourced from official government records, participating organizations, athletes, or public datasets. Verify official documents and current program rules with the responsible organization.

BetterGov's current transparency portal similarly explains that its data comes from official government agencies while noting that the platform is an unofficial community resource and that datasets may contain errors or duplicates.

---

# 39. Opportunities Page

Primary purpose:

> **Help athletes find support.**

Layout:

```text
Opportunities

[ Search opportunities... ]

Filters
────────────────

Sport
Region
Organization
Funding Type
Deadline
Eligibility

────────────────

Results
```

---

# 40. Opportunity Card

```text
┌───────────────────────────────────────┐
│ Athlete Travel Grant                  │
│                                       │
│ Philippine Sports Organization        │
│ ✓ Verified                            │
│                                       │
│ Up to ₱100,000                        │
│                                       │
│ Deadline                              │
│ September 30, 2026                    │
│                                       │
│ [ View Opportunity ]                  │
└───────────────────────────────────────┘
```

---

# 41. Opportunity Matching

On athlete dashboard:

```text
Opportunities For You

95% Match
International Competition Grant

88% Match
Equipment Assistance

81% Match
Sports Scholarship
```

Use matching percentages carefully.

They should represent actual eligibility matching, not an arbitrary AI-generated score.

---

# 42. Government Dashboard Design

Government interfaces should be more information-dense than public pages.

```text
Government Dashboard

┌──────────┐ ┌──────────┐ ┌──────────┐
│ Programs │ │Applications│ │Disbursed│
│ 24       │ │ 3,482     │ │ ₱61M    │
└──────────┘ └──────────┘ └──────────┘

Applications
──────────────────────────────

Pending       842
Review        412
Approved      1,284
Rejected      420
```

---

# 43. Government Table Design

Use tables for administrative data.

Columns:

```text
Applicant
Program
Sport
Location
Status
Amount
Submitted
Actions
```

Desktop:

```text
┌────────────┬────────────┬─────────┬────────┬──────────┐
│ Applicant  │ Program    │ Sport   │ Status │ Amount   │
├────────────┼────────────┼─────────┼────────┼──────────┤
│ Maria      │ Travel     │ Swim    │ Review │ ₱50,000  │
│ Juan       │ Equipment  │ Boxing  │ Approved│ ₱30,000 │
└────────────┴────────────┴─────────┴────────┴──────────┘
```

Mobile should convert rows into cards.

---

# 44. Tables

Tables must support:

- Sorting
- Filtering
- Pagination
- Search
- Column visibility where appropriate
- Export where appropriate

Avoid huge tables on public pages.

---

# 45. Status Badges

Use consistent status components.

```text
● Open

● Active

● Under Review

● Approved

● Disbursed

● Completed

● Closed

● Rejected
```

Example:

```text
[ Approved ]
```

Use semantic colors consistently.

---

# 46. Buttons

Primary:

```text
[ Explore Athletes ]
```

Secondary:

```text
[ Learn More ]
```

Outline:

```text
[ View Details ]
```

Destructive:

```text
[ Reject Application ]
```

Buttons should use action-oriented language.

Avoid:

```text
[ Click Here ]
```

---

# 47. Button Hierarchy

Each section should generally have:

```text
1 Primary Action
1 Secondary Action
```

Do not have:

```text
[Click]
[Click]
[Click]
[Click]
[Click]
```

competing for attention.

---

# 48. Cards

Cards should be used for:

- Athletes
- Opportunities
- Programs
- Organizations
- Campaigns
- Statistics

Cards should not be used for every piece of content.

---

# 49. Card Design

Use:

```text
Background:
White

Border:
1px solid #E2E8F0

Radius:
12px

Shadow:
Minimal

Padding:
20–24px
```

Avoid excessive shadows.

---

# 50. Border Radius

Recommended:

```text
sm: 6px
md: 8px
lg: 12px
xl: 16px
```

Use consistent radius values.

---

# 51. Shadows

Use subtle shadows.

```text
shadow-sm
```

for most cards.

Use stronger shadows only for:

- Dialogs
- Dropdowns
- Floating elements

The platform should feel flat and trustworthy.

---

# 52. Icons

Use:

**Lucide React**

or another consistent icon library.

Icons should:

- Support meaning
- Never replace critical text
- Use consistent stroke width
- Have accessible labels where needed

BetterGov's documented stack also uses Lucide React alongside accessible UI primitives.

---

# 53. Icons

Recommended:

```text
Search
Users
Trophy
Medal
MapPin
Building
Wallet
Landmark
Heart
Calendar
FileText
ShieldCheck
TrendingUp
BarChart
```

---

# 54. Athlete Photography

Photography is a major difference from government portals.

Use real athlete photography wherever possible.

Prioritize:

- Action photos
- Competition photos
- Training photos
- Portraits

Avoid generic stock photography when actual athlete imagery is available.

---

# 55. Image Treatment

Athlete cards:

```text
aspect-ratio: 4 / 5
object-fit: cover
```

Hero:

```text
aspect-ratio:
16 / 7
```

Profile:

```text
cover:
16 / 5
```

Do not stretch images.

---

# 56. Sport Identity

Each sport may have an icon.

Example:

```text
🏊 Swimming
🏃 Athletics
🥊 Boxing
🏀 Basketball
🏐 Volleyball
🏋️ Weightlifting
🤸 Gymnastics
🚴 Cycling
🏹 Archery
```

For production UI, use proper vector icons rather than emoji where possible.

---

# 57. Sport Directory

```text
Sports

[ Search sports... ]

Popular Sports

Swimming
Athletics
Basketball
Boxing
Volleyball
Football

All Sports
...
```

---

# 58. Sport Page

```text
Swimming

Athletes
2,482

Competitions
128

Programs
18

Funding
₱32M

--------------------------------

Featured Athletes

--------------------------------

Opportunities

--------------------------------

Recent Competitions
```

---

# 59. Organization Page

```text
Philippine Sports Organization
✓ Verified

About

Programs

Opportunities

Athletes Supported

Funding

Reports

Contact
```

---

# 60. Government Organization Page

Government pages should visually distinguish official organizations.

```text
✓ Verified Government Organization

Organization Name

Official Government Entity

Programs
Funding
Beneficiaries
Reports
Transparency
```

Avoid using seals/logos without proper permission.

---

# 61. Government Branding

Never make AthletePH appear to be an official government website unless it actually becomes one.

Use:

```text
AthletePH
```

branding.

Then:

```text
Official Government Organization
```

inside the organization profile.

This distinction is critical.

---

# 62. Transparency Visual Language

Transparency pages should feel:

```text
Analytical
Calm
Neutral
Trustworthy
```

Not:

```text
Flashy
Gamified
Marketing-heavy
```

---

# 63. Data Visualization Rules

Every chart needs:

- Title
- Units
- Time period
- Source
- Legend where necessary

Example:

```text
Sports Funding by Region

2026

Amount in Philippine Pesos

Source:
Official Government Submission

[Chart]
```

---

# 64. Maps

Use maps primarily for:

- Athlete distribution
- Program distribution
- Funding by region
- Sports participation

Do not use maps when a simple table is clearer.

---

# 65. Empty States

Example:

```text
No athletes found.

Try changing your filters or search terms.

[ Clear Filters ]
```

Avoid:

```text
404
```

when the actual problem is simply an empty search.

---

# 66. Loading States

Use skeletons.

Example:

```text
┌──────────────────────────────┐
│ ████████████████             │
│ ██████████                   │
│ █████████████████████        │
└──────────────────────────────┘
```

Avoid blocking the entire interface for small requests.

---

# 67. Error States

Example:

```text
Something went wrong.

We couldn't load the athlete information.

[ Try Again ]
```

For financial operations:

```text
We couldn't complete this action.

No funds were changed.

Reference:
TXN-2026-001482
```

Financial actions should explicitly communicate whether the operation succeeded.

---

# 68. Accessibility

Accessibility is a first-class requirement.

Target:

```text
WCAG 2.2 AA
```

Requirements:

- Keyboard navigation
- Visible focus states
- Screen-reader labels
- Semantic HTML
- Sufficient color contrast
- Reduced-motion support
- Accessible forms
- Accessible tables
- Accessible charts
- Captions for video
- Alternative text

BetterGov explicitly identifies accessibility as one of its major design goals.

---

# 69. Focus State

Never remove focus outlines.

Use a visible focus ring:

```text
focus-visible:ring-2
```

Keyboard users must always know where they are.

---

# 70. Motion

Use subtle animation.

Recommended:

```text
150–250ms
ease-out
```

Use animation for:

- Page transitions
- Hover states
- Dropdowns
- Progress
- Loading

Avoid:

- Excessive parallax
- Constant motion
- Bouncing cards
- Distracting animations

Respect:

```text
prefers-reduced-motion
```

---

# 71. Forms

Forms should be simple and grouped.

Example:

```text
Athlete Information

First Name
[________________]

Last Name
[________________]

Sport
[ Select Sport ]

Province
[ Select Province ]

City
[ Select City ]

[ Save Profile ]
```

Never present 30 fields in one giant form.

Use sections.

---

# 72. Application Form

Structure:

```text
1. Personal Information

2. Athlete Information

3. Program Eligibility

4. Funding Request

5. Supporting Documents

6. Review

7. Submit
```

Use a progress indicator.

---

# 73. Government Application Review

Reviewer UI:

```text
APPLICATION #APP-2026-004812

Maria Santos
Swimming

--------------------------------

Eligibility
✓ Resident
✓ Verified Athlete
✓ Eligible Sport

--------------------------------

Requested Amount

₱50,000

--------------------------------

Documents

✓ Athlete ID
✓ Competition Invitation
✓ Budget
✓ Recommendation

--------------------------------

DECISION

[ Approve ]

[ Request Information ]

[ Reject ]
```

---

# 74. Confirmation Dialogs

Sensitive actions must require confirmation.

Example:

```text
Approve Funding

You are about to approve:

Athlete:
Maria Santos

Amount:
₱50,000

Program:
2026 Athlete Assistance

This action will be recorded in the audit log.

[ Cancel ]

[ Approve Funding ]
```

---

# 75. Financial Actions

For financial operations, show:

```text
Amount
Recipient
Program
Reference
Date
Actor
Status
```

before confirmation.

---

# 76. Audit Log UI

```text
Audit Log

August 26, 2026

14:32
Government Reviewer #42

Approved

Maria Santos
₱50,000

APP-2026-004812

────────────────

14:20
Admin #12

Verified athlete

Juan Dela Cruz
```

---

# 77. Public Transparency Timeline

Use:

```text
● Program Published
│
● Applications Opened
│
● Applications Closed
│
● Awards Approved
│
● Funds Disbursed
│
● Outcome Published
```

This makes complex processes understandable.

---

# 78. Dashboard Design

Dashboards should prioritize:

```text
1. What requires action?
2. What changed?
3. What is the current status?
4. What needs attention?
```

Do not fill dashboards with meaningless graphs.

---

# 79. Athlete Dashboard

```text
Good morning, Maria

Profile Completion
82%

--------------------------------

Upcoming Competition

Asian Championship
September 12

--------------------------------

Funding

₱129,600 raised

--------------------------------

Applications

3 Pending
2 Approved

--------------------------------

Recommended Opportunities

3 Matches
```

---

# 80. Government Dashboard

```text
Good morning.

Active Programs
8

Applications
3,482

Pending Review
842

Disbursed
₱61M

--------------------------------

Needs Attention

842 applications pending

12 documents requiring review

3 programs nearing deadline
```

---

# 81. Organization Dashboard

```text
Programs
12

Athletes Supported
84

Sponsorship
₱2.4M

Applications
482

--------------------------------

Active Programs
...
```

---

# 82. Transparency Dashboard

This dashboard should prioritize numbers.

```text
₱420M
Tracked Funding

184
Programs

42,481
Athletes

84
Organizations
```

Then:

```text
Funding by Region

Funding by Sport

Funding by Program

Funding Timeline
```

---

# 83. Public vs Private UI

## Public

Optimize for:

```text
Discoverability
Clarity
Trust
Storytelling
Transparency
```

## Authenticated

Optimize for:

```text
Efficiency
Actions
Notifications
Workflow
Data management
```

## Admin

Optimize for:

```text
Density
Filtering
Review
Auditing
Bulk operations
```

---

# 84. Design System Components

Build reusable components:

```text
Button

Input

Select

Textarea

Checkbox

Radio

Switch

Dialog

Drawer

Dropdown

Tooltip

Popover

Tabs

Card

Badge

Avatar

Table

Pagination

Breadcrumb

Alert

Toast

Progress

Skeleton

EmptyState

SearchBar

FilterBar

StatCard

Timeline

ChartCard

FundingCard

AthleteCard

OpportunityCard

OrganizationCard

VerificationBadge
```

---

# 85. Component Architecture

Use shadcn/ui primitives where appropriate.

Then create AthletePH-specific components.

Example:

```text
components/ui/
    button.tsx
    card.tsx
    dialog.tsx

components/athletes/
    athlete-card.tsx
    athlete-header.tsx
    athlete-stats.tsx
    athlete-achievements.tsx

components/funding/
    funding-card.tsx
    funding-progress.tsx
    funding-breakdown.tsx
    funding-timeline.tsx

components/transparency/
    transparency-stat.tsx
    transparency-chart.tsx
    transparency-table.tsx
```

---

# 86. Tailwind Rules

Use Tailwind for layout and styling.

Avoid excessive arbitrary values.

Prefer:

```text
p-4
p-6
p-8
gap-4
gap-6
rounded-lg
max-w-7xl
```

over:

```text
p-[17px]
gap-[13px]
rounded-[11px]
```

unless there is a specific design reason.

---

# 87. Dark Mode

Dark mode may be supported eventually.

However:

**Public transparency pages should prioritize light mode initially.**

Why?

Charts, tables, documents, and government data generally have stronger readability in light mode.

If dark mode is implemented:

```text
Dark mode:
Optional

System preference:
Supported
```

---

# 88. Philippine Identity

Use Filipino identity subtly.

Possible elements:

- Philippine blue
- Gold accents
- Red accents
- Filipino geographic references
- Local photography
- Filipino language support

Avoid:

```text
Flag everywhere
Eagles everywhere
Sun symbols everywhere
Patriotic gradients everywhere
```

The product should feel Filipino without looking like a tourism website.

---

# 89. Language

Primary:

```text
English
```

Secondary:

```text
Filipino
```

Future:

```text
Cebuano
Ilocano
Hiligaynon
Waray
```

BetterGov also identifies multilingual support as part of its platform goals.

---

# 90. Content Tone

Use plain language.

Instead of:

```text
Utilize the aforementioned mechanism
```

use:

```text
Use this program
```

Instead of:

```text
Application submission shall be facilitated
```

use:

```text
Submit your application
```

---

# 91. Filipino-Friendly Language

Use:

```text
Funding
```

instead of:

```text
Fiscal Assistance Allocation Mechanism
```

Use:

```text
Who received support?
```

instead of:

```text
Beneficiary disbursement distribution matrix
```

---

# 92. Transparency Language

Never use misleading terminology.

Use:

```text
Allocated

Committed

Disbursed

Received

Reported

Verified
```

Avoid simply saying:

```text
Spent
```

unless the underlying data actually represents spending.

---

# 93. Source Labels

Every public dataset should have:

```text
Source
Last Updated
Coverage Period
Data Status
```

Example:

```text
Source:
Official Government Submission

Last Updated:
August 25, 2026

Coverage:
January–August 2026

Status:
Verified
```

---

# 94. Trust Indicators

Use subtle indicators:

```text
✓ Verified
Official Source
Last Updated
Data Coverage
Audit Trail Available
```

Trust should come from information quality, not excessive badges.

---

# 95. Transparency Without Overwhelming Users

The default view should be simple.

Example:

```text
₱38M Disbursed
```

Then:

```text
[ View Breakdown ]
```

Clicking reveals:

```text
By Sport
By Region
By Program
By Beneficiary Type
By Date
```

Progressive disclosure is preferred.

---

# 96. Search-First Design

BetterGov's platform emphasizes search and discoverability because users often do not know exactly where information lives.

AthletePH should follow the same approach.

The user should be able to search:

```text
"swimming"

"athletes in Cebu"

"government funding"

"boxing scholarship"

"athletes needing equipment"

"PSC programs"
```

from one search interface.

---

# 97. Global Search

Desktop:

```text
┌──────────────────────────────────────┐
│ 🔍 Search AthletePH                  │
└──────────────────────────────────────┘
```

Results:

```text
Athletes
Organizations
Programs
Opportunities
Sports
Competitions
Transparency Records
```

---

# 98. Breadcrumbs

Use breadcrumbs on deep pages.

Example:

```text
Athletes
/
Swimming
/
Maria Santos
```

Government:

```text
Transparency
/
Programs
/
2026 Athlete Assistance
```

---

# 99. Footer

BetterGov.ph's footer includes multi-column links, a transparency statement, version info, and a public-domain note. AthletePH should mirror this honesty-first pattern.

Footer:

```text
ATHLETEPH

Every Filipino Athlete Deserves a Chance.

--------------------------------

Explore
Athletes
Sports
Opportunities
Organizations
Transparency

--------------------------------

For Organizations
Government
Sponsors
Foundations
Sports Organizations

--------------------------------

About
About AthletePH
Contact
Privacy
Terms
Accessibility

--------------------------------

Data
Sources
Methodology
Data Disclaimer

--------------------------------

Transparency statement pill:

"Cost to run AthletePH: ₱XXX. Cost to Filipino athletes: ₱0."
(or equivalent platform-cost transparency)

--------------------------------

© 2026 AthletePH
All public funding data is republished from official
sources unless otherwise specified.
Version / Build identifier · Contribute on GitHub
```

The transparency pill is a signature BetterGov.ph pattern — a small, memorable honesty statement placed at the very bottom of the page. AthletePH should have its own equivalent (for example, platform operating costs, or total verified funding tracked to date).

---

# 100. Accessibility Statement

Create:

```text
/accessibility
```

Include:

- Accessibility commitment
- Keyboard support
- Screen reader support
- Contact mechanism
- Known limitations
- Feedback process

---

# 101. Performance

Target:

```text
LCP < 2.5s

INP < 200ms

CLS < 0.1
```

Optimize:

- Images
- Fonts
- JavaScript
- Public pages
- Search
- Charts

Athlete images should use responsive formats such as WebP/AVIF.

---

# 102. Image Optimization

Upload:

```text
Original
   ↓
Image Processing
   ↓
WebP / AVIF
   ↓
Responsive Sizes
```

Example:

```text
320w
640w
960w
1280w
```

---

# 103. SEO Design

Public pages should be:

```text
Server Rendered
Semantic
Indexable
Fast
Shareable
```

Use:

```text
<title>
<meta description>
OpenGraph
Canonical
JSON-LD
Sitemap
```

---

# 104. Public Data SEO

Transparency pages should have readable URLs.

Example:

```text
/transparency/programs/2026-athlete-assistance-program
```

rather than:

```text
/transparency?id=182738
```

---

# 105. Responsive Tables

Desktop:

```text
Full table
```

Tablet:

```text
Reduced columns
```

Mobile:

```text
Card/list representation
```

Never force users to horizontally scroll a giant government table unless the table genuinely requires it.

---

# 106. Mobile Bottom Navigation

For authenticated mobile users:

```text
┌────────────────────────────────────┐
│ Home | Athletes | Opportunities | Me │
└────────────────────────────────────┘
```

Government users:

```text
┌────────────────────────────────────┐
│ Home | Applications | Programs | Me │
└────────────────────────────────────┘
```

---

# 107. Public Mobile Navigation

Keep public navigation simple:

```text
Home

Athletes

Opportunities

Transparency

Menu
```

---

# 108. Notifications

Notification design:

```text
┌────────────────────────────────────┐
│ ✓ Application Approved             │
│                                    │
│ Your application for the Athlete   │
│ Assistance Program was approved.   │
│                                    │
│ 10 minutes ago                     │
└────────────────────────────────────┘
```

---

# 109. Toasts

Use toasts for:

```text
Saved
Updated
Submitted
Copied
```

Do not use toasts for important financial confirmations.

Those should remain visible in the page.

---

# 110. Financial Confirmation

After a disbursement:

```text
✓ Disbursement Recorded

Amount:
₱50,000

Beneficiary:
Maria Santos

Program:
2026 Athlete Assistance

Reference:
DIS-2026-001482

[ View Transaction ]
```

---

# 111. Error Prevention

Before destructive actions:

```text
Confirm

You are about to reject this application.

Reason:
[________________]

This action will be recorded.

[ Cancel ]
[ Reject Application ]
```

---

# 112. Design Principle: Explain Data

Do not expect users to understand government financial terminology.

Provide tooltips:

```text
Committed

Funds formally set aside for approved
program obligations.
```

```text
Disbursed

Funds reported as released through
the authorized payment process.
```

---

# 113. Design Principle: Progressive Disclosure

Default:

```text
Simple
```

Advanced:

```text
Detailed
```

Example:

```text
₱38M Disbursed

[ View Details ]
```

Then:

```text
Transactions
Documents
References
Timeline
Source
Audit
```

---

# 114. Design Principle: Never Hide Important Information

Do not hide:

- Funding source
- Data source
- Last updated date
- Program status
- Eligibility requirements
- Important deadlines
- Financial status

These should be visible.

---

# 115. Design Principle: No Dark Patterns

Never:

- Hide cancellation
- Hide fees
- Preselect donations
- Mislead funding progress
- Manipulate users into donating
- Use fake urgency
- Use deceptive countdowns

AthletePH must maintain public trust.

---

# 116. Design Principle: Financial Honesty

If:

```text
Goal:
₱250,000

Raised:
₱100,000
```

display:

```text
40%
```

Do not display:

```text
80%
```

because another government award is "pending."

Pending funds should remain:

```text
Pending
```

---

# 117. Design Principle: Separate Facts From Claims

Example:

```text
Official Achievement
✓ Verified
```

versus:

```text
Athlete-reported achievement
```

This distinction should be visible.

---

# 118. Design Principle: Source Everything

For transparency data:

```text
Source
Date
Method
Coverage
```

should be available.

Example:

```text
Source:
DBM GAA 2026

Imported:
August 20, 2026

Coverage:
2026

Method:
Official Dataset
```

---

# 119. Design Principle: Don't Overuse AI

AI can assist with:

- Search
- Opportunity matching
- Data categorization
- Summaries
- Natural-language queries

But AI should not make final decisions about:

- Athlete eligibility
- Government funding
- Verification
- Rejection
- Financial approval

Human review must remain in control.

---

# 120. Future AI Search

Eventually:

```text
"Show me swimming scholarships
for athletes in Cebu."
```

could produce:

```text
8 Opportunities Found

3 Government
2 Private
3 Foundation
```

But the underlying records should remain inspectable.

---

# 121. Design System Philosophy

The design system should follow:

```text
Simple
↓
Consistent
↓
Accessible
↓
Reusable
↓
Scalable
```

Build components once.

Reuse everywhere.

---

# 122. Component Naming

Use semantic names:

```text
AthleteCard
FundingCard
OpportunityCard
GovernmentProgramCard
TransparencyStat
FundingBreakdown
VerificationBadge
```

Avoid:

```text
BlueBox
BigCard
CoolCard
RedThing
```

---

# 123. File Organization

```text
resources/js/

components/
├── ui/
├── athletes/
├── funding/
├── opportunities/
├── organizations/
├── transparency/
├── government/
└── layout/

pages/
├── public/
├── athlete/
├── government/
├── organization/
└── admin/

layouts/
├── public/
├── authenticated/
├── government/
├── organization/
└── admin/
```

---

# 124. Design Tokens

Create a centralized token system.

```text
colors
spacing
radius
shadows
typography
breakpoints
motion
```

Do not hard-code design decisions throughout the application.

---

# 125. Tailwind Configuration

Define:

```text
Primary
Primary Dark
Gold
Red
Success
Warning
Error
Info
Surface
Background
Border
Text
Muted
```

Use semantic classes rather than random colors.

---

# 126. Example Token Structure

```ts
const colors = {
    primary: '...',
    primaryDark: '...',
    gold: '...',
    red: '...',

    background: '...',
    surface: '...',
    border: '...',

    text: '...',
    muted: '...',

    success: '...',
    warning: '...',
    error: '...',
    info: '...',
};
```

---

# 127. Design Review Checklist

Every page should be checked for:

```text
[ ] Clear page purpose
[ ] Strong heading
[ ] Primary action
[ ] Mobile responsive
[ ] Keyboard accessible
[ ] Screen-reader accessible
[ ] Loading state
[ ] Empty state
[ ] Error state
[ ] Success state
[ ] Appropriate contrast
[ ] Consistent spacing
[ ] Consistent typography
[ ] No unnecessary animation
```

---

# 128. Public Page Checklist

```text
[ ] Can a first-time visitor understand this page in 5 seconds?
[ ] Is the primary action obvious?
[ ] Is the source of important data visible?
[ ] Is the last updated date visible?
[ ] Is the page mobile friendly?
[ ] Can users search/filter?
[ ] Is important information above the fold?
```

---

# 129. Government Page Checklist

```text
[ ] Program status
[ ] Budget
[ ] Allocation
[ ] Commitment
[ ] Disbursement
[ ] Beneficiary count
[ ] Source
[ ] Documents
[ ] Timeline
[ ] Last updated
[ ] Audit/reference information
```

---

# 130. Athlete Page Checklist

```text
[ ] Name
[ ] Sport
[ ] Location
[ ] Verification
[ ] Achievements
[ ] Competitions
[ ] Current goals
[ ] Needs
[ ] Opportunities
[ ] Support
[ ] Privacy controls
```

---

# 131. Overall Visual Hierarchy

The visual hierarchy should generally be:

```text
1. What is this?
        ↓
2. Why does it matter?
        ↓
3. What is the important number?
        ↓
4. What can I do?
        ↓
5. Where did this information come from?
        ↓
6. Detailed information
```

---

# 132. The AthletePH Design Rule

When designing a page, ask:

> **Can a Filipino user understand this without knowing how the government or sports system works?**

If the answer is no:

**simplify the interface.**

---

# 133. Final Design Direction

AthletePH should visually feel like:

```text
                    ATHLETEPH

        ┌──────────────────────────────┐
        │                              │
        │   Modern Civic Technology    │
        │                              │
        └──────────────────────────────┘

                  +

        ┌──────────────────────────────┐
        │                              │
        │      Filipino Athletes       │
        │                              │
        └──────────────────────────────┘

                  +

        ┌──────────────────────────────┐
        │                              │
        │       Public Transparency    │
        │                              │
        └──────────────────────────────┘
```

The result should be:

> **A modern Philippine civic-tech platform that feels trustworthy enough for government data, human enough for athletes, and simple enough for ordinary citizens.**

---

# 134. Design North Star

## Don't design a government website.

## Don't design a social network.

## Design a public platform that makes Philippine sports easier to understand, support, and participate in.

**AthletePH should make transparency feel simple.**

**AthletePH should make athletes feel visible.**

**AthletePH should make support actionable.**

**AthletePH should make public funding understandable.**

**AthletePH should make trust visible.**

---

# 135. Inspiration & Reference

AthletePH takes inspiration from BetterGovPH's:

- Citizen-centered design
- Search-first information architecture
- Accessibility focus
- Responsive layouts
- Public data presentation
- Transparency dashboards
- Open-source design philosophy

BetterGov's current ecosystem also includes a dedicated design system initiative and transparency-focused projects, making it a useful reference for building AthletePH's own reusable design language.

However, AthletePH should maintain its own:

- Brand
- Color system
- Components
- Content
- Athlete-focused UX
- Funding workflows
- Sports information architecture

rather than copying BetterGov's visual identity directly.

---

# 136. Implementation Target

Frontend:

```text
Laravel
+
React
+
Inertia
+
TypeScript
+
Tailwind CSS
+
shadcn/ui
+
Lucide React
```

Backend:

```text
Laravel
+
PostgreSQL
+
Redis
+
Laravel Horizon
```

Storage:

```text
S3-compatible Object Storage
```

Charts:

```text
Recharts
```

Maps:

```text
MapLibre / Mapbox
```

Testing:

```text
Pest
Playwright
React Testing Library
```

---

# 137. Final UX Principle

Every major screen should answer one of these questions:

```text
WHO?

WHAT?

WHERE?

HOW MUCH?

WHEN?

WHY?

WHO VERIFIED IT?

WHERE DID THE DATA COME FROM?

WHAT CAN I DO NEXT?
```

If AthletePH consistently answers those questions, the platform will remain understandable even as the amount of data grows from hundreds of athletes to hundreds of thousands.

---

# 138. Final Product Experience

The ideal user journey is:

```text
Discover
   ↓
Understand
   ↓
Verify
   ↓
Apply / Support
   ↓
Track
   ↓
See Outcome
```

For government:

```text
Publish
   ↓
Receive Applications
   ↓
Evaluate
   ↓
Fund
   ↓
Report
   ↓
Show Outcome
```

For athletes:

```text
Create Profile
   ↓
Get Verified
   ↓
Discover Opportunities
   ↓
Apply
   ↓
Receive Support
   ↓
Compete
   ↓
Report Outcome
```

For citizens:

```text
Discover Athlete
   ↓
Understand Their Story
   ↓
See Available Support
   ↓
See Government / Private Funding
   ↓
See Outcomes
   ↓
Support
```

---

# 139. Final Design Statement

> **AthletePH is designed as a civic-tech platform, not merely an athlete directory.**
>
> Its interface combines the clarity and transparency principles of BetterGovPH with an athlete-first experience built around discovery, opportunities, funding, sponsorship, verification, and measurable outcomes.
>
> Every interface decision should reduce complexity, increase trust, and make Philippine sports more accessible to athletes, government organizations, sponsors, and citizens.

---

# 140. BetterGov.ph Observed Structure (Reference)

> Observed directly from https://bettergov.ph/ on August 26, 2026.
> BetterGov.ph is a client-side rendered React SPA using the Figtree typeface,
> with a Cloudflare-served static build. This section documents its actual
> homepage anatomy so AthletePH can follow the same structural patterns.

## 140.1 Page Anatomy (Top to Bottom)

```text
1. UTILITY BAR
   Join Us · About · Official Gov.ph · Contact Us · Hotlines
   Language selector: English, Filipino/Tagalog, Bikol Central,
   Bisaya/Sinugboanon, Ilonggo, Ilokano, Kinaray-a, Maguindanaon,
   Pangasinan, Kapampangan, Bahsa Sūg, Waray-Waray

2. MAIN NAVIGATION
   Logo + name + tagline
     "BetterGov.ph — A community-run portal for the Philippines"
   Dropdown items:
     Philippines ▾ (About, History, Culture, Regions, Map,
                    Hotlines, Holidays, Forex, Weather)
     Services ▾   (12 category links)
     Travel ▾     (Visa Information, Visa Types, Communicating)
     Government ▾ (Executive, Departments, Constitutional,
                   Legislative, Judicial, Local Government,
                   Diplomatic, Salary Grades)
     Flood Control Projects ▾ (Charts, Table, Map, Contractors)
     Our Projects ▾ (16 external project links)
   Right: [🔍 Search]

3. LIVE DATA TICKER
   Dark strip: USD ₱61.73 | MANILA 29°C | CEBU 30°C |
   DAVAO 26°C | BAGUIO 18°C

4. ANNOUNCEMENT BANNER
   Gradient campaign strip:
   "🚀 Join the #CivicTech Revolution" + [Join Now →] [Discord]

5. HERO — SPLIT LAYOUT
   Left column:
     H1: "Welcome to BetterGov.ph"
     Description paragraph
     Large search input
       placeholder: "Search for services, directory items..."
     Popular quick links: National ID · Birth Certificate ·
     Business Registration
   Right column:
     "Popular Services" panel (translucent card on blue)
     Icon tiles: Citizenship & ID, Business, Education, Health
     [ View All Services ]

6. GOVERNMENT SERVICES — CATEGORY GRID
   Centered H2 + description
   12 cards in a 4-column grid, each card:
     icon + category title + 2–3 bullet links +
     "View All {Category} →"
   Categories: Business and Trade, Certificates and IDs,
   Contributions, Disaster and Weather, Education, Employment,
   Health, Housing, Passport and Travel, Social Services, Tax,
   Transport and Driving
   Centered [ View All Services ] button below the grid

7. REAL-TIME DATA SERVICES BAND
   Light gray band, centered H2 + description
   Three data cards side by side:
     Weather Updates — city temp tiles +
       "Weather data provided by OpenWeather" attribution +
       "Detailed Forecast" link
     Foreign Exchange Rates — table (CURRENCY | ₱ RATE) +
       "More Currencies" link
     Critical Emergency Hotlines — red header card with
       hotline numbers + "See all emergency hotlines →"

8. COMMUNITY BAND (dark)
   Centered icon + H2 "Join the #CivicTech Revolution"
   "Volunteer-led. Open source. Community-driven."
   [ Join Our Movement → ] or [ Find a Way to Contribute ]
   Feature chips: Infrastructure · Mentorship · Community ·
   Office Space

9. CAMPAIGN BAND (orange accent)
   Single focused CTA: "PhilSys National ID Registration"
   description + [ Register Now ]

10. GOVERNMENT DIRECTORY BAND
    Centered H2 "Government of the Philippines"
    3 cards: Executive / Legislative / Judicial Branch
      icon + one-line description + "Learn More →"
    "Official Directory" banner + [ View Directory ]

11. FOOTER (dark, multi-column)
    Brand column: logo, description, social icons
    Link columns: About · Services · Our Projects · Government
    Transparency pill:
      "Cost to build this site to date: ₱3,000.
       Cost to the People of the Philippines: ₱0."
    Bottom bar:
      Version identifier · copyright ·
      "All content is public domain unless otherwise specified" ·
      Contribute at GitHub · Sitemap
```

## 140.2 Structural Patterns to Adopt

```text
PATTERN                          → ATHLETEPH EQUIVALENT
-----------------------------------------------------------
Utility bar + language selector  → About · How It Works ·
                                   Contact · [English/Filipino]
Live data ticker                 → Funding tracked ₱XXX ·
                                   Athletes supported ·
                                   Programs open
Announcement banner              → Application deadlines,
                                   new program launches
Split hero + popular panel       → Headline + search +
                                   "Popular Programs" tiles
Category grid with View All →    → Athletes by sport/region,
                                   Organizations, Competitions
Data cards with attribution      → Funding stats with
                                   "Source: Official Government
                                   Submission" labels
Dark community band              → "Support Filipino athletes"
                                   join / partner CTAs
Accent campaign band             → One featured program or
                                   deadline per month
Directory band                   → Verified government and
                                   sports organization branches
Transparency pill in footer      → Platform cost honesty
                                   statement
Version + public data note       → Build version + data
                                   provenance statement
```

## 140.3 What NOT to Copy

```text
✗ 14 languages at launch — AthletePH starts with
  English + Filipino only
✗ Dozens of nav dropdown items — AthletePH keeps 5
  primary sections
✗ External microsite sprawl (16+ project subdomains) —
  AthletePH keeps everything under one app
✗ Crypto/blockchain references — excluded per the
  project plan (section 90)
```

## 140.4 Typography Note

BetterGov.ph uses **Figtree** (400–700) served via Google Fonts.
AthletePH uses Instrument Sans (400–700 via Bunny Fonts) — a comparable
geometric-humanist sans. No change required; both prioritize legibility
and numeric clarity.
