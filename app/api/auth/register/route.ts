import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { email, password } = await request.json();
    const { data, error } = await supabase.auth.signUp({ email, password });    
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }   return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}