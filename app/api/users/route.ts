import { createClient } from "@/lib/supabase/server";
import { jsonResponse } from "@/lib/utils";

export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) {
        return jsonResponse({ error: error.message }, 500);
    }

    return jsonResponse(data);
}