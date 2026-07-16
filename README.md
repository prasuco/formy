# Formy — The Backend for Forms

**Just plug in your forms, we will do the magic.**

Formy is a form-backend-as-a-service (form-BaaS). Create a form, get a public CORS-enabled API endpoint, embed it in any HTML/React/Vue frontend, and Formy collects submissions with email notifications, webhooks, and CSV/JSON export.

> ⚠️ **Pre-release** — This is an early prototype. Active development in progress.

---

## Features

- **Public Submit API** — JSON and `application/x-www-form-urlencoded` support with CORS headers
- **Email Notifications** — Get notified via email (powered by Resend) when someone submits
- **Webhooks** — Real-time HTTP callbacks on new submissions
- **CSV / JSON Export** — Download all form submissions in your preferred format
- **Form Management** — Create, update, and delete forms from a clean dashboard
- **Search & Pagination** — Find submissions fast with full-text search
- **JWT Authentication** — Custom auth with httpOnly cookies and bcrypt password hashing
- **Responsive Dashboard** — Full-featured mobile-responsive UI

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [Ant Design 6](https://ant.design/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) |
| Database | PostgreSQL via [Prisma 7](https://www.prisma.io/) |
| Auth | Custom JWT (jose) + bcryptjs |
| Email | [React Email](https://react.email/) + [Resend](https://resend.com/) |
| Fonts | Geist Sans + Geist Mono (via next/font) |
| Icons | [Lucide React](https://lucide.dev/) |
| State | Zustand + nuqs (URL query state) |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL database (local or [Neon](https://neon.tech/))

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/formy.git
cd formy

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Run database migrations
pnpm prisma migrate dev

# Start dev server
pnpm dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | Application URL (e.g. `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | JWT signing secret (min 32 chars) |
| `RESEND_KEY` | Resend API key (for email notifications) |
| `RESEND_FROM` | Sender email address for notifications |

---

## API Reference

### Submit a form

```bash
POST /api/submit
Content-Type: application/json

{
  "slug": "your-form-slug",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

Or use a regular HTML form:

```html
<form action="https://your-app.com/api/submit" method="POST">
  <input type="hidden" name="slug" value="your-form-slug">
  <input name="name" placeholder="Your Name">
  <input name="email" type="email" placeholder="Email">
  <button type="submit">Submit</button>
</form>
```

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes* | Form slug (from dashboard) |
| `formId` | string | Yes* | Form ID (alternative to slug) |

*Either `slug` or `formId` must be provided.

**Responses:**
- `201` — `{ "success": true }` (JSON request)
- `303` — Redirects to `/success` page (form-data request)
- `400` — `{ "error": "formId or slug is required" }`
- `404` — `{ "error": "Form not found" }`

---

## Project Structure

```
app/
├── (auth)/            # Login & Register pages
├── (marketing)/       # Landing page
├── actions/           # Server actions (auth, forms)
├── api/               # API routes (submit, export, auth)
├── dashboard/         # Dashboard pages (protected)
├── lib/               # Server utilities (auth, session, prisma, email, slug)
├── success/           # Post-submission confirmation page
├── generated/prisma/  # Prisma client (gitignored)
├── globals.css        # Tailwind + design tokens
└── layout.tsx         # Root layout (Antd theme, fonts)

components/
├── dashboard/         # Dashboard components (Home, Forms, FormTabs, etc.)
├── emails/            # React Email templates
├── ui/                # shadcn/ui primitives
├── Header.tsx         # Public header
├── Providers.tsx      # Client providers wrapper
└── AntdRegistry.tsx   # Antd SSR registry

prisma/
└── schema.prisma      # Database schema (User, Form, Submission)
```

---

## Screenshots

| Page | Preview |
|------|---------|
| Landing | (add screenshot) |
| Login | (add screenshot) |
| Dashboard | (add screenshot) |
| Form Detail | (add screenshot) |
| Integration | (add screenshot) |

---

## Roadmap

- [ ] Individual submission detail view ✅
- [x] CSV/JSON export
- [ ] User settings page (password change, account deletion)
- [ ] Rate limiting
- [ ] File upload support
- [ ] Team collaboration
- [ ] Form analytics
- [ ] API tokens

---

## License

MIT
