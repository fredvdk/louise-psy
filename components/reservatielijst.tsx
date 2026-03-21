import { createClient } from "@/lib/supabase/server";
import AfspraakCard from "./afspraak";
import { Reservation } from "@/types/reservatie";

export default async function ReservatieLijst() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return <p>You must be logged in to view reservations.</p>;
    }

    const { data, error } = await supabase
        .from("reservations")
        .select(`*, client_email: profiles!reservations_reserved_for_fkey(email)`)
        .eq("reserved_for", user.id)
        .in("status", ["pending", "confirmed"])
        .order("date", { ascending: true });

    if (error) {
        return <p>Failed to load reservations. {error.message}</p>;
    }

    const reservations = data as Reservation[] | null;
    console.log(reservations);

    if (!reservations || reservations.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No reservations found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reservations.map((reservatie) => (
                <AfspraakCard reservatie={reservatie} key={reservatie.id} />
            ))}
        </div>
    );
}