import { getAllFreeAfspraken } from "@/lib/supabase/afsprakenDb";
import { NieuweAfspraak } from "./nieuweAfspraak";


export async function NieuweAfspraakForm() {
    const freeSlots = await getAllFreeAfspraken();

    if (!freeSlots.success || !freeSlots.data) {
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
        <div className="my-6 md:w-1/2 mx-auto">
            <NieuweAfspraak afspraken={freeSlots.data} />
        </div>
    )
}