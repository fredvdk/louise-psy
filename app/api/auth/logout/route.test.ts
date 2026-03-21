// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

function makeSupabase(signOutResult: { error: unknown }) {
    const supabase = {
        auth: { signOut: vi.fn().mockResolvedValue(signOutResult) },
    };
    vi.mocked(supabaseServer.createClient).mockResolvedValue(supabase as never);
    return supabase;
}

beforeEach(() => vi.clearAllMocks());

describe('POST /api/auth/logout', () => {
    it('returns 200 with success message on logout', async () => {
        makeSupabase({ error: null });

        const res = await POST();

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({ message: 'Logged out successfully' });
    });

    it('returns 500 with error message when signOut fails', async () => {
        makeSupabase({ error: { message: 'Session not found' } });

        const res = await POST();

        expect(res.status).toBe(500);
        expect(await res.json()).toEqual({ error: 'Session not found' });
    });
});
