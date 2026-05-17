import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel project settings."
    );
  }
  _client = createClient(url, key);
  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type Database = {
  profiles: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "student" | "tutor";
    created_at: string;
  };
  kyc_personal: {
    id: string;
    user_id: string;
    dob: string;
    phone: string;
    country: string;
    city: string;
    address: string | null;
    gender: string;
    created_at: string;
  };
  kyc_documents: {
    id: string;
    user_id: string;
    doc_type: string;
    id_document_url: string;
    selfie_url: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
  };
};
