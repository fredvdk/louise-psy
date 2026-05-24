// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

const mockProfiles = [
    { id: 'user-1', role: 'user' },
    { id: 'user-2', role: 'admin' },
];

function makeChain(result: { data: unknown; error: unknown }) {
    const chain: any = {
        select: vi.fn().mockReturnThis(),
        then: (resolve: Function) => Promise.resolve(result).then(resolve as any),
    };
    return chain;
}

function makeSupabase(profilesResult: { data: unknown; error: unknown }) {
    const supabase = {
        from: vi.fn().mockReturnValue(makeChain(profilesResult)),
    };
    vi.mocked(supabaseServer.createClient).mockResolvedValue(supabase as never);
    return supabase;
}

beforeEach(() => vi.clearAllMocks());

describe('GET /api/users', () => {
    it('returns 200 with profiles data', async () => {
        makeSupabase({ data: mockProfiles, error: null });

        const res = await GET();

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(mockProfiles);
    });

    it('returns error message when query fails', async () => {
        makeSupabase({ data: null, error: { message: 'DB error' } });

        const res = await GET();
        const body = await res.json();

        expect(body).toEqual({ error: 'DB error' });
    });
});
