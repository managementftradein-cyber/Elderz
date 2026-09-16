# Elderz Real Estate — Vercel + Supabase CMS

## Stack
Next.js 16 • React 19 • TypeScript • Prisma 7 • Supabase Postgres • Supabase Storage • Vercel • GitHub

## What is controlled from the CMS
Properties, featured properties, agents, services, testimonials, FAQs, blog posts, enquiries, homepage text, hero image, logo, contact details, social links, brand colours and currency mode.

## Supabase setup
1. Create a Supabase project.
2. In **Supabase → Connect**, use the **Transaction Pooler** connection for `DATABASE_URL` (normally port `6543`). This is the runtime connection used by Vercel.
3. Use the **Direct** connection, or the **Session Pooler** connection when a direct connection is not available, for `DIRECT_URL` (normally port `5432`). This is used by Prisma migrations.
4. Replace the password placeholder with your current **database password**. Do not use your Supabase account password unless it is also the database password.
5. If the database password contains URL-reserved characters such as `@`, `:`, `/`, `?`, `#`, `%` or `&`, use the connection string copied directly from Supabase or URL-encode those characters.
3. In Project Settings → API, copy the service-role key into `SUPABASE_SERVICE_ROLE_KEY`. NEVER expose this as `NEXT_PUBLIC_*`.
4. The app creates a public `site-media` Storage bucket on first authenticated upload.

Supabase + Prisma reference: https://supabase.com/docs/guides/database/prisma

## Local setup
Copy `.env.example` to `.env`, fill the values, then:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

## GitHub
Create a repository, then:
```bash
git init
git add .
git commit -m "Initial Elderz Real Estate CMS"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Vercel
Import the GitHub repository into Vercel. Add the same environment variables in Vercel Project Settings → Environment Variables for Production/Preview as needed. The app is configured for a Next.js deployment.

The Vercel build runs `prisma migrate deploy` automatically before `next build`. Set both `DATABASE_URL` and `DIRECT_URL`; `DATABASE_URL` is the runtime pooler connection and `DIRECT_URL` is used for migrations. Do not run `prisma migrate dev` in production.

## Security
Keep `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` server-only. Do not commit `.env`. Vercel environment variables are not automatically exposed to browser code unless deliberately prefixed with `NEXT_PUBLIC_`.


## Elderz agent verification + AI assistant

This version adds:
- Public `/agents` directory showing only `VERIFIED` agents.
- Public `/agents/apply` onboarding form with identity, license and supporting-document collection.
- Private `agent-documents` Supabase Storage bucket for verification documents; documents are exposed to admins only through short-lived signed URLs.
- Admin `/admin/agents` review workflow with email, phone, identity, license and background-check controls. An agent cannot be approved until all five checks are marked complete.
- Global Elderz AI chat assistant. Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` (defaults to `gpt-5.6-luna`) in Vercel/server environment variables. Never expose the API key in client code.
- Elderz logo is included at `public/elderz-logo.png` and used as the default site header logo.


### Existing Supabase database / P3005 baseline
If your Supabase database already contains the Elderz tables, do **not** run `prisma migrate reset`. Baseline the existing schema once by running this command from the project root against the same `DIRECT_URL` used by Vercel:

```bash
npm run db:baseline
```

After that, `npm run build` can safely run `prisma migrate deploy`. The second agent-verification migration is intentionally a no-op because the agent verification fields are already part of the initial schema in this project.

### Deployment
1. Set the required Vercel environment variables, then deploy. The build automatically runs `prisma migrate deploy` against `DIRECT_URL`.
2. Make sure `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`, and `JWT_SECRET` are configured in Vercel.
3. Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL=gpt-5.6-luna` for the chatbot.
4. Ensure the Supabase service role can create/use the `agent-documents` private bucket.
5. Do not commit or deploy the repository `.env` file; use Vercel Environment Variables instead.

## Database authentication troubleshooting
If Vercel reports Prisma `P1000` / `Authentication failed against the database server`, the application code has reached PostgreSQL but the username/password in the Vercel connection string is not accepted. Re-copy the connection string from Supabase Connect, verify the current database password, and update **DATABASE_URL** in Vercel. Do not paste database passwords into source code or chat. Redeploy after changing the variable.

For this project, the runtime connection should resemble:
`postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres`

Do not replace `DATABASE_URL` with `NEXT_PUBLIC_SUPABASE_URL`; they serve different purposes.

## UI merge note
The public-facing UI follows the Elderz live-site visual direction: light neutral surfaces, blue actions, rounded property cards, hero search, recent/featured rails, map CTA, customer navigation, and compact footer. Agent verification, applications, chatbot, CMS and the existing admin routes remain available.
