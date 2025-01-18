import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/types'

const supabaseUrl = import.meta.env.SUPABASE_DATABASE_URL
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseKey ? createClient<Database>(supabaseUrl, supabaseKey) : null;

export function imgPath(sport:string,abbrev:string,year=2024){
    return `/images/${sport}/${abbrev.toLowerCase()}-${year}.png`;
}