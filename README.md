# GoBeStrong v2

A personal project management system for tracking vibecoding projects and SaaS businesses.

## Features

### Public Site (gobestrong.com)
- Personal landing page with project showcase
- Dynamic project cards pulled from database
- Contact form
- Responsive design with your personal branding

### Admin Dashboard (admin.gobestrong.com)
- Secure authentication with Supabase
- Full CRUD operations for projects
- User invitation system for project collaboration
- Project notes and history tracking
- Integration framework for metrics and costs (coming soon)

## Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd gbs-v2
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Follow the instructions in `SUPABASE_SETUP.md`
   - Create your `.env.local` file with your credentials

4. Run the development server:
```bash
npm run dev
```

5. Open:
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## Project Structure

```
gbs-v2/
├── app/
│   ├── admin/          # Admin dashboard
│   ├── api/           # API routes
│   ├── contact/       # Contact page
│   ├── projects/      # Projects page
│   └── page.tsx       # Home page
├── components/        # Reusable components
├── lib/              # Utilities and configs
│   └── supabase/     # Supabase client setup
├── public/           # Static assets
└── supabase/         # Database migrations
```

## Database Schema

The system uses a comprehensive database schema including:
- **projects**: Main project information
- **project_access**: User permissions per project
- **project_notes**: Timestamped notes with authors
- **project_history**: Audit trail of all changes
- **Integration tables**: For future metrics and cost tracking

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables from `.env.local`
4. Deploy!

### Admin Subdomain Setup
Configure admin.gobestrong.com to point to the same deployment. The middleware will handle routing based on the subdomain.

## Security
- Row Level Security (RLS) enabled on all tables
- User authentication required for admin access
- Project-based access control
- Encrypted credential storage for integrations

## Future Features
- GitHub integration for version tracking
- Google Analytics and other metrics providers
- Real-time cost monitoring and alerts
- Advanced reporting and visualizations
- File attachments and media management

## Contributing
This is a personal project, but suggestions are welcome!

## License
Private project - All rights reserved