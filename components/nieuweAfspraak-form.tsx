import { getAllFreeAfspraken } from "@/lib/supabase/afsprakenQueries";
import { NieuweAfspraak } from "./nieuweAfspraak";

export async function NieuweAfspraakForm(){
    const freeSlots = await getAllFreeAfspraken();
    const list = freeSlots.map((slot)=> ({ text: slot.date + ' - ' + slot.time, id: slot.id }))
    console.log(list);

    return (
        <NieuweAfspraak slots={list} />
    )
}