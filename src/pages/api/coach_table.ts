// src/pages/api/coach_table.ts
import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from '../../utils/database';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(context: { request: Request }) {
  // Extract query parameters correctly
  const url = new URL(context.request.url);

  console.log("🌍 Full request URL:", url.toString());  // Debugging

  const coach_id = url.searchParams.get('coach_id');

  if (!coach_id) {
    // return new Response(JSON.stringify([4,5,6]),{status: 200})
    return new Response(JSON.stringify({ error: `Missing coach_id parameter: ${coach_id}`}), { status: 400 });
  }

  // Call the Supabase function
  const { data, error } = await supabase.rpc('get_coach_history', { coach_id });


  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}