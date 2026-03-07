import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();
    const reservations = await supabase.from("Reservations").select("*");

    return new Response(JSON.stringify(reservations), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { date, time, name } = await request.json();
    const { data, error } = await supabase.from("Reservations").insert({ date, time, name }).select("*").single();

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
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
