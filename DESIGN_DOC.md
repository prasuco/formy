# Formy — Product & Design Requirements

## Product Overview

**Formy** is a form-backend-as-a-service (form-BaaS). It lets users create forms, receive submissions via a public CORS-enabled API endpoint, and view/export collected data. Think of it as the backend for forms — users build a form in Formy, then embed the endpoint in their own HTML/React/Vue frontend, and Formy collects all submissions.

**Tagline:** "Just plug in your forms, we will do the magic."

**Target users:** Developers and product builders who need a quick form backend without managing infrastructure.

---

## Navigation Structure

```
Public Area
├── /                          Landing page (marketing)
├── /auth                      Login
├── /auth/register             Register
└── /success                   Post-submission confirmation

Dashboard (authenticated)
├── /dashboard                 Home — stats overview
├── /dashboard/forms           Forms list
├── /dashboard/forms/[id]      Form detail (tabs)
│   ├── Details tab
│   ├── Submissions tab
│   ├── Integration tab
│   └── Settings tab
└── /dashboard/settings        User settings (NOT YET BUILT)
```

---

## Page-by-Page Requirements

---

### 1. Landing Page `/`

**Purpose:** Marketing page to promote Formy and collect early-access waitlist signups.

**User flow:**

1. Visitor arrives at formy.com
2. Reads the value prop
3. Optionally enters name + email to join waitlist
4. Submitted to external API (web3forms)

**Content:**

- Logo
- Hero headline: "formy is launching soon"
- Sub-text about the product
- Waitlist form with Name + Email fields
- Submit button: "Join Now"

**States:**

- Default: Form is pristine
- Success: Redirects to web3forms success page (external)
- Error: No inline validation shown (external API handles it)

**Design notes:**

- Minimal, bold, playful typography
- Gold accent on CTA
- Red ("soon") badge for urgency
- Mobile-responsive

---

### 2. Login `/auth`

**Purpose:** Authenticate existing users.

**User flow:**

1. User enters email + password
2. Submits → server validates credentials
3. Success → redirects to `/dashboard`
4. Failure → shows error message on same page

**Content:**

- "F" logo + "formy" branding at top
- "Sign in" heading
- Email input
- Password input
- "Sign in" button (full-width)
- Link to Register: "Don't have an account? Register"

**States:**

- Default: Empty form
- Error: Red banner at top — "Invalid email or password" (from `?error=CredentialsSignin`)
- Loading: Button shows loading state
- Edge case: Already logged in → middleware redirects to `/dashboard`

**Design notes:**

- Centered card layout, max-width ~400px
- Card has gold top border (4px)
- Clean, minimal form styling

---

### 3. Register `/auth/register`

**Purpose:** Create a new account.

**User flow:**

1. User enters email + password (min 8 chars)
2. Submits → server creates account + logs in
3. Success → redirects to `/dashboard`
4. Failure (duplicate email) → shows error

**Content:**

- Same branded card layout as Login
- "Create your account" heading
- Email input
- Password input (minlength=8)
- "Create account" button (full-width)
- Link to Login: "Already have an account? Sign in"

**States:**

- Default: Empty form
- Error: "Email already in use" or other error in red banner
- Loading: Button shows loading state
- Edge case: Already logged in → middleware redirects to `/dashboard`

**Design notes:**

- Same visual pattern as Login (card, gold border, centered)
- Password field should allow toggling visibility (nice-to-have)

---

### 4. Success Page `/success?title=FormTitle`

**Purpose:** Show a confirmation to end-users after they submit a form via the public API (HTML form POST flow).

**User flow:**

1. External user submits a form → Formy API redirects here
2. User sees the success confirmation
3. User clicks "Back to Formy" → goes to landing page

**Content:**

- Green checkmark icon
- "Submission received!" heading
- Dynamic message: "Your response for '{title}' has been submitted successfully."
- Fallback: generic message if no title
- "Thank you for your time."
- "Back to Formy" link button

**States:**

- Default: Always renders the success message
- Edge case: No `?title=` param → shows generic message

**Design notes:**

- Centered, single-column layout
- Friendly, celebratory tone
- Green accent for success icon

---

### 5. Dashboard Home `/dashboard`

**Purpose:** Overview page showing the user's form metrics at a glance.

**User flow:**

1. User logs in → lands here
2. Sees 4 stats cards at top
3. If they have forms → sees recent activity section + quick actions
4. If no forms → sees empty state with CTA to create first form
5. Clicking "Create Form" opens a dialog

**Content:**

**Stats row (4 cards, 2x2 on mobile, 4-col on desktop):**

| Card         | Icon            | Data                      |
| ------------ | --------------- | ------------------------- |
| Total Forms  | FileText (gold) | `totalForms` count        |
| Submissions  | Send (blue)     | `totalSubmissions` count  |
| Last 30 Days | Inbox (amber)   | `recentSubmissions` count |
| This Week    | Clock (purple)  | `weeklySubmissions` count |

**Main area (2/3 width on desktop):**

- When forms exist: "Recent Activity" card with a summary line
- When no forms: "Create your first form" empty state with illustration, description, and CTA button

**Sidebar (1/3 width on desktop):**

- "Quick Actions" card with:
  - "Create new form" button (dashed outline)
  - "View all forms" button (dashed outline, appears only if forms exist)

**States:**

- Loading: Skeleton placeholders for stat cards (or server-rendered)
- Empty (no forms): Large illustration + "Create your first form" CTA
- With data: Stats populated, recent activity summary
- Edge case: 0 submissions across all forms → stat cards show 0, recent activity says "No recent activity"

**Design notes:**

- Stats cards: clean, subtle shadow, colored icons
- Empty state: playful illustration, gold accent circle behind icon
- Responsive grid layout

---

### 6. Forms List `/dashboard/forms`

**Purpose:** List all forms the user has created, with ability to create new ones.

**User flow:**

1. User sees a table of their forms
2. Can click a form title → navigates to form detail
3. Can delete a form → confirmation dialog
4. Can create a new form → dialog

**Content:**

- "Create Form" button at top-right
- Table columns:

  | Title                 | Slug                 | Submissions         | (Actions)          |
  | --------------------- | -------------------- | ------------------- | ------------------ |
  | Linked to detail page | Monospace code style | Right-aligned count | Delete icon button |

- Empty state: Centered icon + "No forms yet" + "Create your first form to get started."

**States:**

- Loading: Server-rendered, no loading skeleton needed
- Empty: Illustrated empty state with icon
- Delete: AlertDialog confirmation — "Delete this form? All submissions will be deleted."
- Edge case: Form with no submissions shows 0 in count

**Design notes:**

- Table should be clean, minimal borders
- Title links in secondary (red) color
- Slug in monospace code styling
- Delete action: only icon, turns red on hover

---

### 7. Form Detail `/dashboard/forms/[id]`

**Purpose:** All-in-one view for a single form with 4 tabs.

**User flow:**

1. User arrives from forms list
2. Sees 4 tabs: Details | Submissions | Integration | Settings
3. Interacts per tab

---

#### Tab 1: Details

**Purpose:** View form metadata and endpoint.

**Content:**

- Form info in a description list:
  - Title
  - Slug (monospace)
  - Submissions count
- "Submit Endpoint" card:
  - Shows `POST /api/submit (slug: {slug})`
  - Copy button to clipboard

**States:**

- Static display, no interactive states beyond copy button

---

#### Tab 2: Submissions

**Purpose:** Browse, search, and manage form submissions.

**User flow:**

1. User sees paginated table of submissions
2. Can search by data content (free text)
3. Can view individual submission → navigates to `/dashboard/forms/[id]/submissions/[submissionId]` (NOT YET BUILT — wireframe this page too)
4. Can delete individual submission → confirmation dialog
5. Can export all submissions as CSV

**Content:**

- "Export CSV" button at top-right
- Search input with search icon, placeholder "Search by ID..."
- Table columns:

  | ID                   | Data                                            | Submitted | (Actions)                   |
  | -------------------- | ----------------------------------------------- | --------- | --------------------------- |
  | Truncated (8 chars…) | Key-value badges (max 3 shown, "+N more" badge) | Datetime  | View eye icon + Delete icon |

- Empty state (no submissions): Eye icon + "No submissions yet" + "Share your form to start collecting responses."
- Empty search results: Eye icon + "No submissions match your search" + "Try a different search term."
- Pagination at bottom of table

**States:**

- Loading: Table shows skeleton while fetching (or server-rendered)
- Empty (no submissions): Illustrated empty state
- Empty (search): Same illustration, different message
- Delete: AlertDialog — "Delete this submission?"
- Search: URL-based (`?search=...`), shareable

**Design notes:**

- Search input should have a clear (X) button
- Data column: compact badge-style key-value pairs
- Pagination: simple page numbers, no size changer
- CSV export triggers file download

---

#### Tab 3: Integration

**Purpose:** Show developers how to connect to the form endpoint.

**Content:**

- Descriptive text about CORS and accepted content types
- Endpoint URL display with copy button
- Code snippets (with syntax highlighting / styled pre blocks):
  1. **Fetch (JSON)** — JavaScript fetch example
  2. **Form action** — HTML form example
- Each snippet has a "Copy" button with copied confirmation

**States:**

- Copy button: Shows "Copied" for 2 seconds after click
- Static content, no loading states

**Design notes:**

- Code blocks: monospace, light gray background, subtle border
- Copy buttons: small, inline, subtle
- Clean technical documentation feel

---

#### Tab 4: Settings

**Purpose:** Edit form metadata or delete the form entirely.

**User flow:**

1. Edit title (required) and slug (optional, alphanumeric + hyphens only)
2. "Save Changes" button
3. Danger zone: Delete form with confirmation

**Content:**

**General card:**

- Title input (required)
- Slug input (pattern validated: `^[a-z0-9-]*$`)
- "Save Changes" button

**Danger Zone card (red border):**

- Warning text: "Once you delete a form, all submissions and data are permanently removed."
- "Delete Form" button → AlertDialog confirmation

**States:**

- Edit: Form pre-filled with current values
- Loading: "Saving..." on button
- Error: Slug already taken → server shows error (redirect-based)
- Delete: AlertDialog — "Delete this form? All submissions and data will be permanently deleted."

**Design notes:**

- Danger Zone: Red border, red text, destructive button styling
- Settings form: Max-width ~480px
- Slug validation feedback should be shown inline

---

### 8. Page Routes NOT YET BUILT (design ahead)

#### Individual Submission View `/dashboard/forms/[id]/submissions/[submissionId]`

This page is linked from the eye icon on submission rows but doesn't exist yet. Design a page that:

- Shows full submission data as key-value pairs
- Shows submission ID, form title, submitted date
- Has a "Back to submissions" link
- Option to delete the submission
- Clean, readable layout for arbitrary JSON data

#### Settings Page `/dashboard/settings`

Linked from the sidebar. Design a page for:

- User email display
- Password change form (current password + new password)
- Account deletion (with confirmation)

---

## Empty States Matrix

| Page                                      | Empty Condition   | Design Needed                                 |
| ----------------------------------------- | ----------------- | --------------------------------------------- |
| `/dashboard`                              | No forms          | Illustration + "Create your first form" CTA   |
| `/dashboard/forms`                        | No forms          | Illustration + "No forms yet"                 |
| `/dashboard/forms/[id]` (Submissions tab) | No submissions    | Eye icon + "No submissions yet"               |
| `/dashboard/forms/[id]` (Submissions tab) | No search results | Eye icon + "No submissions match your search" |

---

## Global Components (appear on multiple pages)

### Dashboard Shell

- **Sidebar (240px):**
  - Brand logo "Formy" at top
  - Nav items: Dashboard (LayoutDashboard icon), Forms (FileText icon), Settings (Settings icon)
  - User email at bottom with small user icon
  - Active state highlighting on current route
- **Top bar:**
  - Hamburger menu (mobile only)
  - User avatar (first letter of email, gold background) + email
  - Dropdown: "Sign out"
- **Responsive:**
  - Desktop: Sidebar always visible
  - Mobile: Sidebar hidden, toggle via hamburger + overlay backdrop

### Header (public pages)

- Logo
- "Get Started" link to `/auth` (styled as gold button)

---

## Design Principles

1. **Developer-first** — Clean, code-friendly aesthetic. Monospace for code, snippets styled like an IDE.
2. **Gold accent** — Use `#FFC437` sparingly for CTAs and primary actions. Don't overuse.
3. **Red accent** — Use `#EA4335` for destructive actions (delete) and important badges ("soon").
4. **Whitespace** — Generous spacing. Cards should breathe.
5. **Minimal borders** — Prefer subtle shadows over heavy borders. Cards have a subtle ring.
6. **Feedback** — Every action gives feedback: button loading states, copied confirmation, dialog confirmations.
7. **Mobile** — Dashboard is fully responsive. Sidebar collapses to hamburger on mobile. Tables scroll horizontally on small screens.

---

## Flows (User Journeys)

### A. First-time visitor

```
/ → reads landing → clicks "Get Started" → /auth/register → registers → /dashboard (empty)
  → clicks "Create Form" → dialog → submits → /dashboard/forms/[id] (Details tab)
  → switches to Integration tab → copies code snippet → pastes in their app
  → receives submissions → views in Submissions tab → exports CSV
```

### B. Returning user

```
/auth → logs in → /dashboard (sees stats) → /dashboard/forms → clicks form → /dashboard/forms/[id]
```

### C. External form submitter

```
Fills HTML form on external site → POST /api/submit → redirects to /success
```

---

## Constraints for Design

- All interactive elements must work without JavaScript as much as possible (Next.js server actions handle form submissions).
- URL query params drive search and pagination (`?search=...&page=...`) — make sure these are reflected in the UI.
- The dashboard layout is built with Ant Design's `Layout` (Sider, Header, Content) — don't redesign the structural shell, just the visual treatment.
- All icons come from Lucide (not Font Awesome, not emoji).
- Font: Geist Sans (body), Geist Mono (code) — loaded via Next.js font system.
