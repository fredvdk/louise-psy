// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

const mockUser = { id: 'user-1', email: 'new@example.com' };

function makeSupabase(signUpResult: { data: unknown; error: unknown }) {
    const supabase = {
        auth: { signUp: vi.fn().mockResolvedValue(signUpResult) },
    };
    vi.mocked(supabaseServer.createClient).mockResolvedValue(supabase as never);
    return supabase;
}

function makeRequest(body: unknown) {
    return new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

beforeEach(() => vi.clearAllMocks());

describe('POST /api/auth/register', () => {
    it('returns 200 with user data on success', async () => {
        const data = { user: mockUser, session: null };
        makeSupabase({ data, error: null });

        const res = await POST(makeRequest({ email: 'new@example.com', password: 'pass' }));

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(data);
    });

    it('passes email and password to Supabase signUp', async () => {
        const supabase = makeSupabase({ data: { user: mockUser }, error: null });

        await POST(makeRequest({ email: 'new@example.com', password: 'secret' }));

        expect(supabase.auth.signUp).toHaveBeenCalledWith({
            email: 'new@example.com',
            password: 'secret',
        });
    });

    it('returns 500 with error message on failure', async () => {
        makeSupabase({ data: null, error: { message: 'User already registered' } });

        const res = await POST(makeRequest({ email: 'existing@example.com', password: 'pass' }));

        expect(res.status).toBe(500);
        expect(await res.json()).toEqual({ error: 'User already registered' });
    });
});
