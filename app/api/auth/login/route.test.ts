// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

const mockUser = { id: 'user-1', email: 'test@example.com' };

function makeSupabase(signInResult: { data: unknown; error: unknown }) {
    const supabase = {
        auth: {
            signInWithPassword: vi.fn().mockResolvedValue(signInResult),
        },
    };
    vi.mocked(supabaseServer.createClient).mockResolvedValue(supabase as never);
    return supabase;
}

function makeRequest(body: unknown) {
    return new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

beforeEach(() => vi.clearAllMocks());

describe('POST /api/auth/login', () => {
    it('returns 200 with session data on success', async () => {
        const data = { user: mockUser, session: { access_token: 'tok' } };
        makeSupabase({ data, error: null });

        const res = await POST(makeRequest({ email: 'test@example.com', password: 'pass' }));

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(data);
    });

    it('passes email and password to Supabase', async () => {
        const supabase = makeSupabase({ data: { user: mockUser }, error: null });

        await POST(makeRequest({ email: 'a@b.com', password: 'secret' }));

        expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
            email: 'a@b.com',
            password: 'secret',
        });
    });

    it('returns 401 with error message on auth failure', async () => {
        makeSupabase({ data: null, error: { message: 'Invalid login credentials' } });

        const res = await POST(makeRequest({ email: 'a@b.com', password: 'wrong' }));

        expect(res.status).toBe(401);
        expect(await res.json()).toEqual({ error: 'Invalid login credentials' });
    });
});
