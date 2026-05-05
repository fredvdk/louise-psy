import { getAllFreeAfspraken } from "@/lib/supabase/afsprakenDb";
import { NieuweAfspraak } from "./nieuweAfspraak";

export async function NieuweAfspraakForm() {
    const freeSlots = await getAllFreeAfspraken();

    if (!freeSlots.success || !freeSlots.data) {
        return (
            <div className="my-6 md:w-1/2 mx-auto">
                <div className="p-4 border border-border rounded-md text-center">
                    <p className="text-muted-foreground">Er zijn momenteel geen beschikbare afspraken gevonden.</p>
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