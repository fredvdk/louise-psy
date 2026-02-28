import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();
    const reservations = await supabase.from("Reservations").select("*");
    console.log(reservations);

    return new Response(JSON.stringify(reservations), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}