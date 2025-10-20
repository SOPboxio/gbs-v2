import ProjectForm from "@/components/admin/project-form";
import { createClient } from "@/lib/supabase/server";

export default function NewProjectPage() {
  const handleSubmit = async (data: any) => {
    "use server";
    // This is where we'll add the Supabase logic to create a project
    // For now, we'll just log the data
    console.log("Creating project:", data);
    
    // Once Supabase is configured:
    // const supabase = await createClient();
    // const { error } = await supabase.from('projects').insert(data);
    // if (error) throw error;
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            New Project
          </h2>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <ProjectForm onSubmit={handleSubmit} submitLabel="Create Project" />
      </div>
    </div>
  );
}