'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "../ui/combobox"
import { Afspraak } from "@/types/reservatie"
import { getAfspraakDateTime } from "@/lib/utils"
import { updateAfspraakWithUsernameAction } from "@/actions/afspraken"

export function NieuweAfspraak({ afspraken }: { afspraken: Afspraak[] }) {
    const [hulpvraag, setHulpvraag] = useState("")
    const [slot, setSlot] = useState<Afspraak | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (!slot) return
        setIsLoading(true)
        try {
            await updateAfspraakWithUsernameAction(slot.id, { ...slot, notes: hulpvraag })
            setHulpvraag("")
            setSlot(null)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-4 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Nieuwe Afspraak</h2>
            <Textarea
                placeholder="Beschrijf uw hulpvraag..."
                value={hulpvraag}
                onChange={(event) => setHulpvraag(event.target.value)}
                className="min-h-[120px]"
            />
            <Combobox value={getAfspraakDateTime(slot) || ""} onOpenChange={(open) => open} onValueChange={(value) => {
                const selected = afspraken.find(a => getAfspraakDateTime(a) === value)
                if (selected) setSlot(selected)
            }}>
                <ComboboxInput placeholder="Selecteer een afspraak..." />
                <ComboboxContent>
                    <ComboboxList>
                        {afspraken.map((afspraak) => (
                            <ComboboxItem key={afspraak.id} value={getAfspraakDateTime(afspraak)}>
                                {getAfspraakDateTime(afspraak)}
                            </ComboboxItem>
                        )
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            <Button onClick={handleSubmit} disabled={isLoading || !hulpvraag.trim()}>{isLoading ? "Verzenden..." : "Verstuur"}</Button>
        </div>
    )
}