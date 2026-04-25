'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "../ui/combobox"
import { updateReservationToPending } from "@/actions/afspraken"

export function NieuweAfspraak({ slots }: { slots: { text: string, id: string }[] }) {
    const [hulpvraag, setHulpvraag] = useState("")
    const [slot, setSlot] = useState<{ text: string, id: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (!slot) return
        setIsLoading(true)
        try {
            await updateReservationToPending(slot.id, hulpvraag)
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
            <Combobox value={slot?.text || ""} onOpenChange={(open) => open} onValueChange={(value) => {
                const selected = slots.find(s => s.text === value)
                if (selected) setSlot(selected)
            }}>
                <ComboboxInput placeholder="Selecteer een afspraak..." />
                <ComboboxContent>
                    <ComboboxList>
                        {slots.map((item) => (
                            <ComboboxItem key={item.id} value={item.text}>
                                {item.text}
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