import { createClient } from "@/lib/supabase/server";
import AfspraakCard from "./afspraak";
import { Reservation } from "@/types/reservatie";

type ReservatieLijstProps = {
    statusList: string[],
    buttonText: string,
    isAdmin?: boolean
}

export default async function ReservatieLijst({ props }: { props: ReservatieLijstProps }) {
    const supabase = await createClient();
    const isAdmin = props.isAdmin ?? false;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.id).single();

    if (!user) {
        return <p>You must be logged in to view reservations.</p>;
    }

    let data, error;

    if (isAdmin && (profile?.role == 'admin')) {
        const result = await supabase
            .from("reservations")
            .select(`*, client_email: profiles!reservations_reserved_for_fkey(email)`)
            .in("status", props.statusList)
            .order("date", { ascending: true });
        data = result.data;
        error = result.error;
    } else {
        const result = await supabase
            .from("reservations")
            .select(`*, client_email: profiles!reservations_reserved_for_fkey(email)`)
            .eq("reserved_for", user.id)
            .in("status", props.statusList)
            .order("date", { ascending: true });
        data = result.data;
        error = result.error;
    }

    if (error) {
        return <p>Failed to load reservations. {error.message}</p>;
    }

    const reservations = data as Reservation[] | null;
    // console.log("reservations : ", reservations);

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
                <AfspraakCard
                    key={reservatie.id}
                    card={{
                        reservatie,
                        buttonText: props.buttonText
                    }}
                />
            ))}
        </div>
    );
}