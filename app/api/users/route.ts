import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}