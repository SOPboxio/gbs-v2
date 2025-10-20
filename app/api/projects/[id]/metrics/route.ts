import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    const searchParams = request.nextUrl.searchParams;
    const metricName = searchParams.get('metric_name');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    
    let query = supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', params.id);
    
    if (metricName) {
      query = query.eq('metric_name', metricName);
    }
    
    if (startDate) {
      query = query.gte('metric_date', startDate);
    }
    
    if (endDate) {
      query = query.lte('metric_date', endDate);
    }
    
    const { data, error } = await query.order('metric_date', { ascending: false });
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const { metric_name, metric_value, metric_date, metadata } = body;
    
    if (!metric_name || metric_value === undefined || !metric_date) {
      return NextResponse.json(
        { error: 'Missing required fields: metric_name, metric_value, metric_date' },
        { status: 400 }
      );
    }
    
    // Check if metric already exists for this date
    const { data: existing } = await supabase
      .from('project_metrics')
      .select('id')
      .eq('project_id', params.id)
      .eq('metric_name', metric_name)
      .eq('metric_date', metric_date)
      .single();
    
    if (existing) {
      // Update existing metric
      const { data, error } = await supabase
        .from('project_metrics')
        .update({ 
          metric_value,
          metadata,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single();
      
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      
      return NextResponse.json(data);
    } else {
      // Insert new metric
      const { data, error } = await supabase
        .from('project_metrics')
        .insert({
          project_id: params.id,
          metric_name,
          metric_value,
          metric_date,
          metadata
        })
        .select()
        .single();
      
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      
      return NextResponse.json(data, { status: 201 });
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const metricId = searchParams.get('metric_id');
    
    if (!metricId) {
      return NextResponse.json(
        { error: 'Missing metric_id parameter' },
        { status: 400 }
      );
    }
    
    const { error } = await supabase
      .from('project_metrics')
      .delete()
      .eq('id', metricId)
      .eq('project_id', params.id);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ message: 'Metric deleted successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}