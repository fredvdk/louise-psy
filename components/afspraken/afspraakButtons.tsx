'use client'

import { useState } from 'react'
import { confirmAfspraakAction, setAfspraakToFreeAction, deleteAfspraakAction } from "@/actions/afspraken"
import { Button } from "../ui/button"
import { ConfirmationModal } from "../ui/confirmation-modal"
import { Afspraak } from "../../types/reservatie"
import { isWithin14Days } from "@/lib/utils"

export function DeleteAfspraakButton({ afspraak, admin = false }: { afspraak: Afspraak, admin?: boolean }) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showConfirm, setShowConfirm] = useState(false)

    const hideDeleteBtn = isWithin14Days(new Date(afspraak.date)) ? true : false;
    if (!admin && hideDeleteBtn) return null;

    async function handleDelete() {
        setIsLoading(true)
        setError(null)

        try {
            if (afspraak.status === 'free') {
                await deleteAfspraakAction(afspraak)
            } else {
                await setAfspraakToFreeAction(afspraak.id)
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Kan afspraak niet verwijderen'
            setError(message)
            console.error('Delete failed:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="m-1">
                <Button
                    variant="destructive"
                    onClick={() => setShowConfirm(true)}
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? 'Bezig met verwijderen...' : 'Verwijderen'}
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <ConfirmationModal
                open={showConfirm}
                onOpenChange={setShowConfirm}
                title="Afspraak verwijderen"
                description="Weet u zeker dat u deze afspraak wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
                confirmText="Verwijderen"
                cancelText="Annuleren"
                onConfirm={handleDelete}
                isLoading={isLoading}
                isDangerous
            />
        </>
    )
}


export function ConfirmButton({ afspraak }: { afspraak: Afspraak }) {
    return (
        <div className="m-1">
            <Button
                variant="default"
                onClick={() => confirmAfspraakAction(afspraak)}
            >
                Bevestigen
            </Button>
        </div>
    )
}