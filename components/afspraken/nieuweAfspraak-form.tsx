import { getAllFreeAfspraken } from "@/lib/supabase/afsprakenDb";
import { NieuweAfspraak } from "./nieuweAfspraak";
import { formatDate } from "@/lib/utils";

export async function NieuweAfspraakForm() {
    const freeSlots = await getAllFreeAfspraken();
    const list = freeSlots.data?.map((slot) => ({ text: formatDate(new Date(slot.date)) + ' - ' + slot.time.slice(0, -3), id: slot.id }))

    return (
        <div className="my-6 md:w-1/2 mx-auto">
            <NieuweAfspraak slots={list ? list : [{ text: "No slots", id: '0' }]} />
        </div>
    )
}