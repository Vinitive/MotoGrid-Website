const SUPABASE_URL = "https://vsqczlaszguuahwhlfcg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_jAbXmUvxqNgx7kNo5LpkEw_CyTIGKJe";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);