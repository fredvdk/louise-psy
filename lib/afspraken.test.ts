// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteAfspraak } from './afspraken';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
    vi.clearAllMocks();
});

describe('deleteAfspraak', () => {
    it('calls the correct endpoint with the reservationId', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({ reservation: { id: 'res-1' } }),
        });

        await deleteAfspraak('res-1');

        expect(mockFetch).toHaveBeenCalledWith('/api/reservations/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reservationId: 'res-1' }),
        });
    });

    it('returns the reservation on success', async () => {
        const reservation = { id: 'res-1', status: 'free' };
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({ reservation }),
        });

        const result = await deleteAfspraak('res-1');
        expect(result).toEqual(reservation);
    });

    it('throws when the response is not ok', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Reservation not found or not allowed' }),
        });

        await expect(deleteAfspraak('res-1')).rejects.toThrow('Reservation not found or not allowed');
    });

    it('throws a fallback message when error field is missing', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: async () => ({}),
        });

        await expect(deleteAfspraak('res-1')).rejects.toThrow('Failed to delete reservation');
    });

    it('rethrows when fetch itself throws', async () => {
        mockFetch.mockRejectedValue(new Error('Network error'));

        await expect(deleteAfspraak('res-1')).rejects.toThrow('Network error');
    });
});
