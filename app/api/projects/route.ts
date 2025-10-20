// import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // For now, return static data
    // Once Supabase is configured, we'll fetch from the database
    // const supabase = await createClient();
    const projects = [
      {
        id: "sopbox",
        title: "SOPbox",
        description: "A Chrome extension that provides SOPs and Checklists for streamlined workflows",
        testimonial: "This is a testimonial of monumental proportions and not to be taken lightly.",
        testimonialAuthor: "M. Pinkowski",
        webUrl: "sopbox-main.vercel.app",
        status: "v2 in Dev. Beta target is Sept 1",
        milestone: "Checklists, SOPs are scaffolded",
        bestMetric: "",
        contact: "support@sopbox.io",
        logo: "/sopbox-logo.png",
        lastUpdated: "July 7, 2025",
      },
      {
        id: "pink-cow",
        title: "Pink Cow",
        description: "A SaaS, iOS, and Android service supporting Special Education Instructors",
        logo: "/pinkcow-logo.png",
      },
      {
        id: "two-friends",
        title: "TwoFriends",
        description: "An upcoming hardware project that helps friends and families stay in touch",
        comingSoon: true,
        logo: "/twofriends-logo.png",
      },
    ];

    // Once Supabase is configured, use this instead:
    // const supabase = await createClient();
    // const { data: projects, error } = await supabase
    //   .from('projects')
    //   .select('*')
    //   .eq('is_published', true)
    //   .order('created_at', { ascending: false });
    
    // if (error) {
    //   throw error;
    // }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}