'use client'

import { useState } from 'react'
import { confirmAfspraakAction, setAfspraakToFreeAction, deleteAfspraakAction } from "@/actions/afspraken"
import { Button } from "../ui/button"
import { ConfirmationModal } from "../ui/confirmation-modal"
import { Afspraak } from "../../types/reservatie"
import { isWithin14Days } from "@/lib/utils"
import { toast } from 'sonner';

export function DeleteAfspraakButton({ afspraak, admin = false }: { afspraak: Afspraak, admin?: boolean }) {
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const hideDeleteBtn = isWithin14Days(new Date(afspraak.date)) ? true : false;
    if (!admin && hideDeleteBtn) return null;

    async function handleDelete() {
        setIsLoading(true)

        try {
            if (afspraak.status === 'free') {
                await deleteAfspraakAction(afspraak)
            } else {
                await setAfspraakToFreeAction(afspraak)
            }
            // Success feedback
            toast.success('Afspraak succesvol verwijderd');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Kan afspraak niet verwijderen'
            // Toast handles the visual hierarchy and prominence
            toast.error(message);
            console.error('Delete failed:', err)
        } finally {
            setIsLoading(false)
            setShowConfirm(false)
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
                {/* REMOVED: {error && <p className="...">} as per issue requirement */}
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
    const [isLoading, setIsLoading] = useState(false);

    async function handleConfirm() {
        setIsLoading(true);
        try {
            await confirmAfspraakAction(afspraak);
            toast.success('Afspraak succesvol bevestigd!');
        } catch (err) {
            toast.error('Bevestigen mislukt. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="m-1">
            <Button
                variant="default"
                onClick={handleConfirm}
                disabled={isLoading}
            >
                {isLoading ? 'Bezig...' : 'Bevestigen'}
            </Button>
        </div>
    )
}