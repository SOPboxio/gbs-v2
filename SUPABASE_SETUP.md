# Supabase Setup Instructions

## Prerequisites
1. Create a Supabase account at https://supabase.com
2. Create a new project

## Setup Steps

### 1. Get Your Project Credentials
After creating your project, go to Settings > API and copy:
- Project URL (looks like: https://xxxxx.supabase.co)
- Anon/Public key
- Service Role key (keep this secret!)

### 2. Create Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

Then fill in your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Apply Database Schema
In your Supabase dashboard:
1. Go to SQL Editor
2. Click "New Query"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and run the query

### 4. Create Your Admin User
1. Go to Authentication > Users
2. Click "Invite User"
3. Enter your email (michael@gobestrong.com)
4. You'll receive an email to set your password

### 5. Update TypeScript Types
Generate TypeScript types from your database schema:
```bash
npx supabase login
npx supabase gen types typescript --project-id your-project-id > lib/supabase/database.types.ts
```

### 6. Configure Admin Subdomain (for production)
When ready to deploy:
1. Deploy the main site to your primary domain
2. Configure admin.gobestrong.com to point to the same deployment
3. Use middleware to handle routing based on subdomain

## Testing the Setup
1. Start the development server: `npm run dev`
2. Visit http://localhost:3000/admin/auth/login
3. Sign in with your admin credentials
4. You should see the project dashboard

## Next Steps
Once connected to Supabase:
1. The admin panel will show real projects from the database
2. The public site will fetch published projects via the API
3. You can invite other users to specific projects
4. All changes will be tracked in the project_history table

## Security Notes
- Never commit `.env.local` to git
- Keep your service role key secret
- Row Level Security (RLS) is enabled on all tables
- Users can only see/edit projects they have access to