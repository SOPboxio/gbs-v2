// Script to seed sample monthly revenue data for Pink Cow project
// Run with: npx tsx scripts/seed-revenue-data.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedRevenueData() {
  try {
    // First, get or create the Pink Cow project
    let { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', 'pink-cow')
      .single();
    
    if (!project) {
      // Create Pink Cow project if it doesn't exist
      const { data: newProject, error: createError } = await supabase
        .from('projects')
        .insert({
          title: 'Pink Cow',
          slug: 'pink-cow',
          logo_url: '/pinkcow-logo.png',
          live_url: 'https://pinkcow.com',
          description: 'A premium milk delivery service with farm-fresh products',
          status: 'Live',
          version: 'v2.0',
          is_published: true
        })
        .select()
        .single();
      
      if (createError) {
        console.error('Error creating project:', createError);
        return;
      }
      
      project = newProject;
    }

    if (!project) {
      console.error('Failed to get or create project');
      return;
    }

    console.log('Project ID:', project.id);
    
    // Generate monthly revenue data for the last 12 months
    const revenueData = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      date.setDate(1); // First day of the month
      
      // Generate realistic revenue with growth trend
      const baseRevenue = 45000;
      const growthFactor = 1 + (0.05 * (11 - i)); // 5% monthly growth
      const randomVariation = 1 + (Math.random() - 0.5) * 0.2; // ±10% variation
      const revenue = Math.round(baseRevenue * growthFactor * randomVariation);
      
      revenueData.push({
        project_id: project.id,
        metric_name: 'monthly_revenue',
        metric_value: revenue,
        metric_date: date.toISOString().split('T')[0],
        metadata: {
          currency: 'USD',
          source: 'seed_script'
        }
      });
    }
    
    // Insert revenue data
    const { data, error } = await supabase
      .from('project_metrics')
      .upsert(revenueData, { 
        onConflict: 'project_id,metric_name,metric_date',
        ignoreDuplicates: false 
      });
    
    if (error) {
      console.error('Error inserting revenue data:', error);
      return;
    }
    
    console.log(`Successfully seeded ${revenueData.length} months of revenue data for Pink Cow project`);
    console.log('Sample data:', revenueData.slice(-3)); // Show last 3 months
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the seed function
seedRevenueData();