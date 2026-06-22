import { NieuweAfspraak } from "./nieuweAfspraak";
import { getCalendarEvents } from "@/lib/google/calendar";
import { headers } from "next/headers";

export async function NieuweAfspraakForm({ geenAfspraken = false }: { geenAfspraken?: boolean }) {
    await headers();
    const timeMin = new Date().toISOString();
    const freeSlots = await getCalendarEvents(true, timeMin);

    if (freeSlots.error || !freeSlots.data) {
        return (
            <div className="my-6 md:w-1/2 mx-auto">
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">Er is een fout opgetreden bij het laden van beschikbare afspraken.</p>
                    {freeSlots.error && <p className="text-sm text-red-600 mt-1">{freeSlots.error}</p>}
                </div>
            </div>
        )
    }

    return (
        geenAfspraken ? (<div className="my-6 md:w-1/2 mx-auto">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800">Er kunnen voorlopig geen online afspraken gemaakt worden. Neem telefonisch contact op of stuur een e-mail.</p>
            </div>
        </div>) : (
            <div className="my-6 md:w-1/2 mx-auto">
                <NieuweAfspraak afspraken={freeSlots.data} />
            </div>
        ))
}