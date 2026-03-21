// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

const mockUser = { id: 'user-abc' };

const mockReservations = [
    { id: 'res-1', date: '2026-05-10', time: '10:00:00' },
    { id: 'res-2', date: '2026-05-11', time: '11:00:00' },
];

function makeChain(result: unknown) {
    const chain: any = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue(result),
        then: (resolve: Function) => Promise.resolve(result).then(resolve as any),
    };
    return chain;
}

interface MockOptions {
    user?: typeof mockUser | null;
    authError?: unknown;
    profileResult?: { data: unknown; error: unknown };
    reservationsResult?: { data: unknown; error: unknown };
}

function makeSupabase({
    user = mockUser,
    authError = null,
    profileResult = { data: { role: 'admin' }, error: null },
    reservationsResult = { data: mockReservations, error: null },
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
            if (table === 'reservations') return makeChain(reservationsResult);
        }),
    };
    vi.mocked(supabaseServer.createClient).mockResolvedValue(supabase as never);
    return supabase;
}

beforeEach(() => vi.clearAllMocks());

describe('GET /api/reservations/all', () => {
    it('returns 401 when user is not authenticated', async () => {
        makeSupabase({ user: null, authError: { message: 'Not authenticated' } });

        const res = await GET();

        expect(res.status).toBe(401);
        expect(await res.json()).toEqual({ error: 'Unauthorized' });
    });

    it('returns 500 when profile fetch fails', async () => {
        makeSupabase({ profileResult: { data: null, error: { message: 'DB error' } } });

        const res = await GET();

        expect(res.status).toBe(500);
    });

    it('returns 403 when user is not an admin', async () => {
        makeSupabase({ profileResult: { data: { role: 'user' }, error: null } });

        const res = await GET();

        expect(res.status).toBe(403);
        expect(await res.json()).toEqual({ error: 'Forbidden' });
    });

    it('returns 200 with all reservations for admin', async () => {
        makeSupabase();

        const res = await GET();

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(mockReservations);
    });

    it('returns 500 when reservations query fails', async () => {
        makeSupabase({
            reservationsResult: { data: null, error: { message: 'Query failed' } },
        });

        const res = await GET();

        expect(res.status).toBe(500);
        expect(await res.json()).toEqual({ error: 'Query failed' });
    });
});
