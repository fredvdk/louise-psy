import AfspraakCard from "./afspraakCard";
import { Afspraak } from "@/types/reservatie";
import { getAlleAfsprakenVoorUser } from "@/lib/supabase/afsprakenDb";


export default async function AfsprakenLijstVoorCurrentUser() {
    const { success, data, error } = await getAlleAfsprakenVoorUser();

    if (!success) {
        return <p>Probleem om afspraken op te halen. {error}</p>;
    }

    const afspraken = data as Afspraak[] | null;

    if (!afspraken || afspraken.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                Geen afspraken gevonden.
            </div>
        );
    }

    return (
        <div className="space-y-4 md:w-1/2 mx-auto">
            {afspraken.map((afspraak) => (
                <AfspraakCard
                    key={afspraak.id}
                    reservatie={afspraak}
                    purpose='delete'
                />
            ))}
        </div>
    );
}