# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Louise PSY is a Next.js web application for a psychologist's practice. It provides appointment booking (afspraken), client account management, messaging, and admin tools for managing the business.

## Development Commands

### Building and Running

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run ESLint
npm run test         # Vitest in watch mode
npm run test:ui      # Vitest with visual UI dashboard
npm run test:run     # Single test run (CI mode)
```

### Running Individual Tests

```bash
npm run test -- afspraken.test.ts                    # Test specific file
npm run test -- --grep "test name pattern"           # Test by pattern
npm run test:run -- afspraken.test.ts --reporter=v1  # Single run with pattern
```

## Architecture

### Core Technology Stack

- **Framework**: Next.js (app router) with React 19 and TypeScript
- **Database**: Supabase (PostgreSQL) for data and authentication
- **Email**: Nodemailer for appointment confirmation emails
- **UI**: Tailwind CSS with Radix UI components
- **Calendar**: FullCalendar for appointment scheduling visualization
- **Testing**: Vitest with React Testing Library
- **Theme**: next-themes for light/dark mode support

### Directory Structure

```
app/                      # Next.js app router pages
├── layout.tsx           # Root layout with theme provider
├── page.tsx             # Public home page
├── auth/                # Login, signup, password recovery
├── protected/           # Auth-required pages
│   ├── afspraken/       # Appointment booking interface
│   ├── account/         # User account settings
│   └── admin/           # Admin dashboard
└── privacy-policy/      # Static pages

components/             # Reusable React components
├── account/            # Auth and profile forms
├── afspraken/          # Appointment-related components
├── messages/           # Message display components
├── ui/                 # Base UI components (button, input, etc.)
├── navbar.tsx          # Navigation menu
├── menu.tsx            # Mobile menu
├── footer.tsx          # Footer
├── pageElements.tsx    # Layout helper components
└── calendar.tsx        # Calendar display

lib/                    # Utilities and business logic
├── mailer.ts          # Email sending (nodemailer)
├── utils.ts           # Utility functions
└── supabase/          # Database operations
    ├── server.ts      # Server-side Supabase client (SSR)
    ├── client.ts      # Client-side Supabase client
    ├── afsprakenDb.ts # Appointment CRUD
    ├── messagesDb.ts  # Message CRUD
    ├── authDb.ts      # User/auth operations
    └── proxy.ts       # Supabase API proxy

actions/               # Next.js server actions ("use server")
├── afspraken.ts      # Appointment mutations with revalidation
└── messages.ts       # Message mutations with revalidation

types/                # TypeScript type definitions
└── reservatie.ts     # Afspraak, User, Message, CalendarEvent types

public/               # Static files and assets
```

### Key Data Models

**Afspraak (Appointment)**
- `id`: UUID
- `date`: Date string
- `time`: Time string
- `status`: 'confirmed' | 'pending' | 'free'
- `reserved_for`: User ID or null
- `profiles`: User profile (name, email)
- `notes`: Optional notes

**Message**
- `id`: UUID
- `message`: Text content
- `valid_from`, `valid_till`: Display date range
- `created_at`, `created_by`: Audit fields

**User** (Supabase Auth)
- `id`: UUID
- `email`: Email address
- `full_name`: Display name

## Database

Uses Supabase (hosted PostgreSQL). Key tables:
- `reservations` (afspraken)
- `messages`
- `profiles` (extends auth.users)
- `auth.users` (managed by Supabase Auth)

Environment variables required:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Public anon key
- `NEXT_EMAIL_USER`: Gmail account for sending emails
- `NEXT_EMAIL_PASS`: Gmail app password (not regular password)

## Component and Server Action Patterns

### Server Actions (actions/)

- All functions use `'use server'` directive
- Wrap database operations with error handling
- Always call `revalidatePath()` after mutations to refresh cached pages
- Don't pass large objects between server/client; return simple success/error responses

Example:

```typescript
export async function updateAfspraakToPendingAction(reservationId: string, hulpvraag: string) {
  const result = await updateAfspraakToPending(reservationId, hulpvraag);
  if (result.success) {
    revalidatePath('/protected/afspraken');
    sendMailVoorAfspraak({...});  // Email confirmation
  }
  return result;
}
```

### Database Layer (lib/supabase/)

- Each file handles a specific table/domain (afsprakenDb, messagesDb, authDb)
- Functions return `{ success: boolean, data?: T, error?: string }`
- Use `createClient()` for server-side operations (Next.js server components/actions)
- Supabase client is instantiated per-request (important for Fluid compute compatibility)

### Component Patterns

- Components in `/ui` are base/unstyled and should be reusable
- Feature-specific components (afspraken/, account/, messages/) compose UI components
- Use `'use client'` directive sparingly; prefer server components with server actions
- Form components often call server actions on submit

## Testing

- Tests live alongside source files with `.test.ts` extension
- Test files for components: `components/afspraken/afspraakButtons.test.tsx`
- Test files for utils/logic: `lib/utils.test.ts`, `lib/afspraken.test.ts`

Example test structure:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SomeComponent from './SomeComponent';

describe('SomeComponent', () => {
  it('renders correctly', () => {
    render(<SomeComponent />);
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
});
```

Vitest config uses jsdom environment and React plugin for component testing.

## Email Sending

Use `sendMailVoorAfspraak()` from `lib/mailer.ts`. Requires:

- Gmail account with app password (enable 2FA on Gmail, generate app password)
- `NEXT_EMAIL_USER` and `NEXT_EMAIL_PASS` environment variables

Current implementation:
- Hardcoded recipient (frederick.vdkerckhove@telenet.be) — should use `email` parameter
- Basic HTML template — can be enhanced
- Called after appointment status changes to notify user

## Performance Notes

- Use `Suspense` boundaries with fallbacks for async components (see home page)
- Calendar component may be heavy; consider lazy loading if performance degrades
- Supabase queries use realtime subscriptions sparingly (they add cost)
- Static generation: Use `generateStaticParams()` for dynamic routes if needed

## Common Development Tasks

### Adding a New Page

1. Create file in `app/` or `app/protected/` with `page.tsx`
2. Import components from `/components`
3. Add route to navbar if needed

### Adding a New Server Action

1. Create/edit file in `actions/`
2. Start with `'use server'` directive
3. Import database functions from `lib/supabase/`
4. Call `revalidatePath()` for affected pages
5. Return `{ success, data?, error? }` shape

### Modifying Database Operations

1. Edit corresponding file in `lib/supabase/`
2. Test changes with `npm run test`
3. Update TypeScript types in `types/` if schema changes
4. Update related server actions in `actions/`

### Working with Forms

- Components in `account/` show auth form patterns (login, signup, password reset)
- Use `<form action={serverAction}>` for server action forms
- Validation: Client-side with HTML5 attributes, server-side in actions

## Common Pitfalls

- **Forgetting revalidatePath**: Cache won't update after mutations
- **Hardcoded email addresses**: `sendMailVoorAfspraak` has hardcoded recipient
- **Passing Date objects between server/client**: Serialize to strings
- **Creating Supabase client globally**: Always create per-request with `createClient()`
