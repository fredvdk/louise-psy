'use client'

import { updateAfspraakStatus } from "@/actions/afspraken"
import { Button } from "./ui/button"
import { Reservation } from "../types/reservatie"
import { isWithin14Days } from "@/lib/utils"


export function DeleteButton({ reservatie }: { reservatie: Reservation }) {
    const isDisabled = isWithin14Days(new Date(reservatie.date)) ? true : false;
    return (
        <Button
            variant="destructive"
            onClick={() => updateAfspraakStatus(reservatie.id, 'free')}
            disabled={isDisabled}
        >
            Delete
        </Button>
    )
}

export function ConfirmButton({ reservatie }: { reservatie: Reservation }) {
    return (
        <Button
            variant="default"
            onClick={() => updateAfspraakStatus(reservatie.id, 'confirmed')}
        >
            Confirm
        </Button>
    )
}