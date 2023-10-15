import { createClient } from "@supabase/supabase-js";
require('dotenv').config()

const supabaseUrl = process.env["SUPABASE_URL"] as string;
const supabaseKey = process.env["SUPABASE_KEY"] as string;

// console.log(supabaseUrl);
// console.log(supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
