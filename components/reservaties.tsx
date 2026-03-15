import { createClient } from "@/lib/supabase/server";

export default async function ReservatieList() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return <p>You must be logged in to view reservations.</p>;
    }

    const { data: reservations, error } = await supabase
        .from('Reservations')
        .select('*')
        .eq('updated_by', user.id)
        .order('date', { ascending: true });

    if (error) {
        return <p>Failed to load reservations. {error.message}</p>;
    }

    if (!reservations || reservations.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No reservations found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reservations.map((reservation) => (
                <div
                    key={reservation.id}
                    className="border rounded-lg p-4 shadow-sm"
                >
                    <div className="font-semibold">
                        {new Date(reservation.date).toLocaleDateString()}
                    </div>

                    <div className="text-sm text-muted-foreground">
                        {reservation.time}
                    </div>

                    <div className="text-sm text-muted-foreground">
                        {reservation.status}
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Last updated:{" "}
                        {new Date(reservation.updated_at).toLocaleString()}
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Reserved for : {reservation.reserved_for}
                    </div>

                    {reservation.notes && (
                        <div className="mt-2 text-sm">{reservation.notes}</div>
                    )}
                </div>
            ))}
        </div>
    );
}