# Elderz Real Estate — Vercel + Supabase CMS

## Stack
Next.js 16 • React 19 • TypeScript • Prisma 7 • Supabase Postgres • Supabase Storage • Vercel • GitHub

## What is controlled from the CMS
Properties, featured properties, agents, services, testimonials, FAQs, blog posts, enquiries, homepage text, hero image, logo, contact details, social links, brand colours and currency mode.

## Supabase setup
1. Create a Supabase project.
2. In Connect, copy the Transaction Pooler URL for `DATABASE_URL` and the Direct URL for `DIRECT_URL`. Supabase recommends transaction pooling for serverless application traffic and direct/session connections for migration workflows.
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

For migrations on deployment, run `npm run db:deploy` from a controlled migration workflow rather than running `prisma migrate dev` in production.

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

### Deployment
1. Run the Prisma migration with `npx prisma migrate deploy` against `DIRECT_URL`.
2. Make sure `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`, and `JWT_SECRET` are configured in Vercel.
3. Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL=gpt-5.6-luna` for the chatbot.
4. Ensure the Supabase service role can create/use the `agent-documents` private bucket.
5. Do not commit or deploy the repository `.env` file; use Vercel Environment Variables instead.
