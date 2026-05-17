import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
