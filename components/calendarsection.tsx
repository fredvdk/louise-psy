import CalendarComponent from "@/components/calendar";
import { createClient } from "@/lib/supabase/server";
import { CalendarEvent, Reservation } from "@/types/reservatie";

export async function CalendarSection() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("status", "free")

    if (error) {
        return <p>Failed to load calendar events. {error.message}</p>;
    }
    const reservations: Reservation[] = data ?? [];

    const calendarEvents: CalendarEvent[] = reservations.map(reservation => ({
        id: reservation.id,
        date: reservation.date,
        start: reservation.date + 'T' + reservation.time,
        duration: "01:00",
        title: reservation.status,
        backgroundColor: reservation.status === "free" ? "green" : "orange",
        url: reservation.status === 'free' ? "/" : "/protected/reservaties",
    }));
    //console.log("Calendar Events:", calendarEvents);

    return (
        <CalendarComponent
            events={calendarEvents}
        />
    );
}
