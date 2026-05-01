'use client'

import { useState } from 'react'
import { confirmAfspraakAction, setAfspraakToFreeAction, deleteAfspraakAction } from "@/actions/afspraken"
import { Button } from "../ui/button"
import { Afspraak } from "../../types/reservatie"
import { isWithin14Days } from "@/lib/utils"



export function DeleteAfspraakButton({ reservatie, admin = false }: { reservatie: Afspraak, admin?: boolean }) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const hideDeleteBtn = isWithin14Days(new Date(reservatie.date)) ? true : false;
    if (!admin && hideDeleteBtn) return null;

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this reservation?')) {
            return;
        }

        setIsLoading(true)
        setError(null)

        try {
            if (reservatie.status === 'free') {
                await deleteAfspraakAction(id)
            } else {
                await setAfspraakToFreeAction(id)
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to delete reservation'
            setError(message)
            console.error('Delete failed:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="m-1">
            <Button
                variant="destructive"
                onClick={() => handleDelete(reservatie.id)}
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    )
}


export function ConfirmButton({ reservatie }: { reservatie: Afspraak }) {
    return (
        <div className="m-1">
            <Button
                variant="default"
                onClick={() => confirmAfspraakAction(reservatie)}
            >
                Confirm
            </Button>
        </div>
    )
}