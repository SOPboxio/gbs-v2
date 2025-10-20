import { Suspense } from "react";
import MonthlyRevenueChart from "@/components/admin/metrics/monthly-revenue-chart";

// Generate empty data structure with 0 values for the last 12 months
function generateEmptyRevenueData() {
  const data = [];
  const currentDate = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    date.setDate(1);
    
    data.push({
      metric_date: date.toISOString().split('T')[0],
      metric_value: 0
    });
  }
  
  return data;
}

async function getProjectBySlug(slug: string) {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return minimal project data
    return {
      id: 'pink-cow-placeholder',
      title: 'Pink Cow',
      slug: 'pink-cow'
    };
  }
  
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching project:', error);
      return {
        id: 'pink-cow-placeholder',
        title: 'Pink Cow',
        slug: 'pink-cow'
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return {
      id: 'pink-cow-placeholder',
      title: 'Pink Cow',
      slug: 'pink-cow'
    };
  }
}

async function getMonthlyRevenue(projectId: string) {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return empty revenue data (all zeros)
    return generateEmptyRevenueData();
  }
  
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    
    // Get the last 12 months of revenue data
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1);
    
    const { data, error } = await supabase
      .from('project_metrics')
      .select('metric_date, metric_value')
      .eq('project_id', projectId)
      .eq('metric_name', 'monthly_revenue')
      .gte('metric_date', startDate.toISOString().split('T')[0])
      .order('metric_date', { ascending: true });
    
    if (error) {
      console.error('Error fetching revenue metrics:', error);
      // Return empty data on error
      return generateEmptyRevenueData();
    }
    
    // If no data found, return empty structure
    if (!data || data.length === 0) {
      return generateEmptyRevenueData();
    }
    
    return data;
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return generateEmptyRevenueData();
  }
}

export default async function PinkCowMetricsPage() {
  const project = await getProjectBySlug('pink-cow');
  
  if (!project) {
    return (
      <div className="p-8">
        <div className="text-red-600">Project not found</div>
      </div>
    );
  }
  
  const revenueData = await getMonthlyRevenue(project.id);
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pink Cow Metrics</h1>
        <p className="text-gray-600 mt-2">Track performance and growth metrics</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-500">Loading...</div>}>
            <MonthlyRevenueChart data={revenueData} />
          </Suspense>
        </div>
        
        {/* Placeholder for other metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Coming soon...
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Conversion Rate</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Coming soon...
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Satisfaction</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}