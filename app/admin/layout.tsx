import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin - Go Be Strong",
  description: "Project Management Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if Supabase is configured before attempting authentication
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Redirect to login if not authenticated
    if (!user && !children.toString().includes('auth')) {
      redirect('/admin/auth/login');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}