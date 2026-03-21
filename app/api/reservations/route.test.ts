// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from './route';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

const mockUser = { id: 'user-abc' };

const mockReservations = [
    { id: 'res-1', date: '2026-05-10', time: '10:00:00', updated_by: 'user-abc' },
];

function makeChain(result: unknown) {
    const chain: any = {
        select: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue(result),
        then: (resolve: Function) => Promise.resolve(result).then(resolve as any),
    };
    return chain;
}

interface MockOptions {
    user?: typeof mockUser | null;
    userError?: unknown;
    reservationsResult?: unknown;
}

function makeSupabase({
    user = mockUser,
    userError = null,
    reservationsResult = { data: mockReservations, error: null },
}: MockOptions = {}) {
    const supabase = {
        auth: {
            getUser: vi.fn().mockResolvedValue({
                data: { user: userError ? null : user },
                error: userError,
            }),
        },
        from: vi.fn().mockReturnValue(makeChain(reservationsResult)),
    };
    vi.mocked(supabaseServer.createClient).mockResolvedValue(supabase as never);
    return supabase;
}

function makeRequest(body: unknown) {
    return new Request('http://localhost/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

beforeEach(() => vi.clearAllMocks());

describe('GET /api/reservations', () => {
    it('returns 401 when user is not authenticated', async () => {
        makeSupabase({ user: null });

        const res = await GET();

        expect(res.status).toBe(401);
        expect(await res.json()).toEqual({ error: 'Unauthorized' });
    });

    it('returns reservations for the authenticated user', async () => {
        const supabaseResult = { data: mockReservations, error: null };
        makeSupabase({ reservationsResult: supabaseResult });

        const res = await GET();
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body).toEqual(supabaseResult);
    });

    it('filters reservations by the authenticated user id', async () => {
        const supabase = makeSupabase();
        await GET();

        const chain = supabase.from.mock.results[0].value;
        expect(chain.eq).toHaveBeenCalledWith('updated_by', mockUser.id);
    });
});

describe('POST /api/reservations', () => {
    it('returns 401 when user is not authenticated', async () => {
        makeSupabase({ user: null, userError: { message: 'Not authenticated' } });

        const res = await POST(makeRequest({ date: '2026-05-10', time: '10:00:00' }));

        expect(res.status).toBe(401);
        expect(await res.json()).toEqual({ error: 'Unauthorized' });
    });

    it('returns 201 with the new reservation on success', async () => {
        const newReservation = { id: 'res-new', date: '2026-05-10', time: '10:00:00' };
        makeSupabase({ reservationsResult: { data: newReservation, error: null } });

        const res = await POST(makeRequest({ date: '2026-05-10', time: '10:00:00' }));

        expect(res.status).toBe(201);
        expect(await res.json()).toEqual(newReservation);
    });

    it('inserts the reservation with the correct fields', async () => {
        const supabase = makeSupabase({
            reservationsResult: { data: { id: 'res-new' }, error: null },
        });

        await POST(makeRequest({ date: '2026-05-10', time: '10:00:00' }));

        const chain = supabase.from.mock.results[0].value;
        expect(chain.insert).toHaveBeenCalledWith({
            date: '2026-05-10',
            time: '10:00:00',
            updated_by: mockUser.id,
        });
    });

    it('returns 400 when the insert fails', async () => {
        makeSupabase({ reservationsResult: { data: null, error: { message: 'Insert failed' } } });

        const res = await POST(makeRequest({ date: '2026-05-10', time: '10:00:00' }));

        expect(res.status).toBe(400);
        expect(await res.json()).toEqual({ error: 'Insert failed' });
    });
});
