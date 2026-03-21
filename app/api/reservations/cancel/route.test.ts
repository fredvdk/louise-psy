// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

// ---- helpers ----------------------------------------------------------------

const mockUser = { id: 'user-abc' };

const mockReservation = {
    id: 'res-123',
    status: 'free',
    reserved_for: null,
    notes: null,
};

function makeChain(result: { data: unknown; error: unknown }) {
    const chain = {
        select: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue(result),
    };
    return chain;
}

interface MockOptions {
    user?: typeof mockUser | null;
    authError?: object | null;
    profileResult?: { data: unknown; error: unknown };
    reservationResult?: { data: unknown; error: unknown };
}

function makeSupabase({
    user = mockUser,
    authError = null,
    profileResult = { data: { role: 'user' }, error: null },
    reservationResult = { data: mockReservation, error: null },
}: MockOptions = {}) {
    const supabase = {
        auth: {
            getUser: vi.fn().mockResolvedValue({
                data: { user: authError ? null : user },
                error: authError,
            }),
        },
        from: vi.fn().mockImplementation((table: string) => {
            if (table === 'profiles') return makeChain(profileResult);
            if (table === 'reservations') return makeChain(reservationResult);
        }),
    };
    vi.mocked(supabaseServer.createClient).mockResolvedValue(supabase as never);
    return supabase;
}

function makeRequest(body: unknown) {
    return new Request('http://localhost/api/reservations/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

// ---- tests ------------------------------------------------------------------

beforeEach(() => {
    vi.clearAllMocks();
});

describe('POST /api/reservations/cancel', () => {
    describe('input validation', () => {
        it('returns 400 for malformed JSON', async () => {
            const req = new Request('http://localhost/api/reservations/cancel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: 'not json{{{',
            });
            const res = await POST(req);
            expect(res.status).toBe(400);
            expect(await res.json()).toEqual({ error: 'Invalid request body' });
        });

        it('returns 400 when reservationId is missing', async () => {
            makeSupabase();
            const res = await POST(makeRequest({}));
            expect(res.status).toBe(400);
            expect(await res.json()).toEqual({ error: 'Missing or invalid reservationId' });
        });

        it('returns 400 when reservationId is not a string', async () => {
            makeSupabase();
            const res = await POST(makeRequest({ reservationId: 42 }));
            expect(res.status).toBe(400);
            expect(await res.json()).toEqual({ error: 'Missing or invalid reservationId' });
        });
    });

    describe('authentication', () => {
        it('returns 401 when no user is returned', async () => {
            makeSupabase({ user: null });
            const res = await POST(makeRequest({ reservationId: 'res-123' }));
            expect(res.status).toBe(401);
            expect(await res.json()).toEqual({ error: 'Unauthorized' });
        });

        it('returns 401 when auth returns an error', async () => {
            makeSupabase({ authError: { message: 'JWT expired' } });
            const res = await POST(makeRequest({ reservationId: 'res-123' }));
            expect(res.status).toBe(401);
        });
    });

    describe('role lookup', () => {
        it('returns 500 when profile fetch fails', async () => {
            makeSupabase({ profileResult: { data: null, error: { message: 'DB error' } } });
            const res = await POST(makeRequest({ reservationId: 'res-123' }));
            expect(res.status).toBe(500);
            expect(await res.json()).toEqual({ error: 'Role fetch failed' });
        });

        it('returns 500 when profile is null', async () => {
            makeSupabase({ profileResult: { data: null, error: null } });
            const res = await POST(makeRequest({ reservationId: 'res-123' }));
            expect(res.status).toBe(500);
        });
    });

    describe('cancellation — regular user', () => {
        it('returns 200 with updated reservation', async () => {
            makeSupabase();
            const res = await POST(makeRequest({ reservationId: 'res-123' }));
            expect(res.status).toBe(200);
            expect(await res.json()).toEqual({ reservation: mockReservation });
        });

        it('filters by reserved_for to prevent cancelling others\' reservations', async () => {
            const supabase = makeSupabase();
            await POST(makeRequest({ reservationId: 'res-123' }));

            const reservationsChain = supabase.from.mock.results
                .find((_, i) => supabase.from.mock.calls[i][0] === 'reservations')?.value;

            const eqCalls = reservationsChain.eq.mock.calls;
            expect(eqCalls).toContainEqual(['reserved_for', mockUser.id]);
        });

        it('sets notes to null', async () => {
            const supabase = makeSupabase();
            await POST(makeRequest({ reservationId: 'res-123' }));

            const reservationsChain = supabase.from.mock.results
                .find((_, i) => supabase.from.mock.calls[i][0] === 'reservations')?.value;

            const updateArg = reservationsChain.update.mock.calls[0][0];
            expect(updateArg.notes).toBeNull();
        });

        it('returns 404 when reservation is not found (PGRST116)', async () => {
            makeSupabase({
                reservationResult: { data: null, error: { code: 'PGRST116', message: 'no rows' } },
            });
            const res = await POST(makeRequest({ reservationId: 'res-123' }));
            expect(res.status).toBe(404);
            expect(await res.json()).toEqual({ error: 'Reservation not found or not allowed' });
        });

        it('returns 500 on unexpected DB error', async () => {
            makeSupabase({
                reservationResult: { data: null, error: { code: '42501', message: 'permission denied' } },
            });
            const res = await POST(makeRequest({ reservationId: 'res-123' }));
            expect(res.status).toBe(500);
            expect(await res.json()).toEqual({ error: 'Database error' });
        });
    });

    describe('cancellation — admin', () => {
        it('does NOT filter by reserved_for', async () => {
            const supabase = makeSupabase({
                profileResult: { data: { role: 'admin' }, error: null },
            });
            await POST(makeRequest({ reservationId: 'res-123' }));

            const reservationsChain = supabase.from.mock.results
                .find((_, i) => supabase.from.mock.calls[i][0] === 'reservations')?.value;

            const eqCalls: [string, unknown][] = reservationsChain.eq.mock.calls;
            expect(eqCalls.map(([field]) => field)).not.toContain('reserved_for');
        });

        it('sets notes to "Cancelled by admin (<userId>)"', async () => {
            const supabase = makeSupabase({
                profileResult: { data: { role: 'admin' }, error: null },
            });
            await POST(makeRequest({ reservationId: 'res-123' }));

            const reservationsChain = supabase.from.mock.results
                .find((_, i) => supabase.from.mock.calls[i][0] === 'reservations')?.value;

            const updateArg = reservationsChain.update.mock.calls[0][0];
            expect(updateArg.notes).toBe(`Cancelled by admin (${mockUser.id})`);
        });
    });
});
