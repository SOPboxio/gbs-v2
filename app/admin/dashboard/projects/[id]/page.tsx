import ProjectForm from "@/components/admin/project-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  // For now, we'll use static data
  // Once Supabase is configured, we'll fetch the actual project
  const project = {
    title: "SOPbox",
    slug: "sopbox",
    logo_url: "/sopbox-logo.png",
    live_url: "https://sopbox.io",
    description: "A Chrome extension that provides SOPs and Checklists for streamlined workflows",
    testimonial: "This is a testimonial of monumental proportions and not to be taken lightly.",
    testimonial_author: "M. Pinkowski",
    test_url: "https://sopbox-main.vercel.app",
    status: "Development",
    version: "v2",
    latest_milestone: "Checklists, SOPs are scaffolded",
    best_metric: "",
    contact_email: "support@sopbox.io",
    is_published: true,
  };

  const handleSubmit = async (data: any) => {
    "use server";
    // This is where we'll add the Supabase logic to update a project
    console.log("Updating project:", params.id, data);
    
    // Once Supabase is configured:
    // const supabase = await createClient();
    // const { error } = await supabase
    //   .from('projects')
    //   .update(data)
    //   .eq('id', params.id);
    // if (error) throw error;
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Edit Project
          </h2>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <ProjectForm 
          initialData={project} 
          onSubmit={handleSubmit} 
          submitLabel="Update Project" 
        />
      </div>
    </div>
  );
}