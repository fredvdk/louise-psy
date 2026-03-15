import { createClient } from "@/lib/supabase/server";
import ReservationCard from "./reservatie";
import { Reservation } from "@/types/reservatie";

export default async function ReservatieLijst({hasStatus}: {hasStatus?: string}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return <p>You must be logged in to view reservations.</p>;
    }

    const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("updated_by", user.id)
        .eq("status", hasStatus)
        .order("date", { ascending: true });

    if (error) {
        return <p>Failed to load reservations. {error.message}</p>;
    }

    const reservations = data as Reservation[] | null;

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
                <ReservationCard reservatie={reservatie} key={reservatie.id} />
            ))}
        </div>
    );
}