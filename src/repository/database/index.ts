import { createClient } from "@supabase/supabase-js";

const test = require('dotenv').config()
console.log(test)

// Replace these with your actual Supabase project URL and API key
const supabaseUrl = process.env["SUPABASE_URL"] as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
console.log(supabaseUrl);
console.log(supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
