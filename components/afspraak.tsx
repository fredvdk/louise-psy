'use client'

import { Reservation } from "@/types/reservatie"
import { Button } from "./ui/button"
import { useState } from "react";
import { deleteAfspraak } from "@/lib/afspraken";
import { isWithin14Days } from "@/lib/utils";


export default function AfspraakCard({ reservatie }: { reservatie: Reservation }) {
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isButtonDisabled = loading || isWithin14Days(new Date(reservatie.date));

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteAfspraak(reservatie.id);
            setCancelled(true);
        } catch (err) {
            console.error("Error deleting reservation:", err);
            setError("Annuleren mislukt. Probeer het opnieuw.");
        } finally {
            setLoading(false);
        }
    };

    if (cancelled) return null;

    return (
        <div className="border rounded-xl p-5 shadow-sm bg-background hover:shadow-md transition">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">
                    {new Date(reservatie.date).toLocaleDateString("nl-NL", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </div>
                <div className="text-lg font-semibold mb-3">
                    ⏰ {reservatie.time.slice(0, 5)}
                </div>

                <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                    ${reservatie.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : reservatie.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {reservatie.status}
                </span>
            </div>

            {/* Actions */}
            <div className="text-sm flex justify-between items-center">
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="ml-auto">
                    <Button variant="destructive" disabled={isButtonDisabled} onClick={handleDelete}>
                        {loading ? "Bezig..." : "Annuleer"}
                    </Button>
                </div>
            </div>

            {/* Notes */}
            {reservatie.notes && (
                <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                    {reservatie.notes}
                </div>
            )}

        </div>
    );
}