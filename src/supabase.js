import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

console.log("[supabase] env", {
  supabaseUrl: Boolean(supabaseUrl),
  supabaseKey: Boolean(supabaseKey),
});

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
