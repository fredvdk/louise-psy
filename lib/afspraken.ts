export async function deleteAfspraak(reservationId: string) {
    try {
        const response = await fetch('/api/reservations/cancel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reservationId }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete reservation');
        }

        return result.reservation;
    } catch (err) {
        console.error('Delete afspraak failed:', err);
        throw err;
    }
}
