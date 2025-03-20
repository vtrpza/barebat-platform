import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createBuilderContent } from '@/lib/builder/api';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const { template, data } = await request.json();

    // Create site in Supabase
    const { data: siteData, error: siteError } = await supabase
      .from('sites')
      .insert([
        {
          template_id: template,
          status: 'draft',
          // Add more fields as needed
        },
      ])
      .select()
      .single();

    if (siteError) {
      throw siteError;
    }

    // Create content in Builder.io
    const builderContent = await createBuilderContent(siteData, template, data);

    // Update site with Builder.io content ID
    const { error: updateError } = await supabase
      .from('sites')
      .update({ builder_content_id: builderContent.id })
      .eq('id', siteData.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ siteId: siteData.id });
  } catch (error) {
    console.error('Error creating site:', error);
    return NextResponse.json(
      { error: 'Failed to create site' },
      { status: 500 }
    );
  }
} 