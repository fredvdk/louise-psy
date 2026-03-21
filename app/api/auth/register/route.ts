import { createClient } from "@/lib/supabase/server";
import { jsonResponse } from "@/lib/utils";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return jsonResponse({ error: 'Email and password are required' }, 400);
        }

        const supabase = await createClient();
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            return jsonResponse({ error: error.message }, 400);
        }

        return jsonResponse(data, 201);
    } catch (err) {
        return jsonResponse(
            { error: err instanceof Error ? err.message : 'Invalid request' },
            400
        );
    }
}