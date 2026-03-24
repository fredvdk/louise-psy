// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';
import { createClient } from '@/lib/supabase/server';
import { User } from '@/types/reservatie';

vi.mock('@/lib/supabase/server');

const mockUser: User = { id: 'abc' };


function makeSupabase({
	user = mockUser,
	authError = null
}: {
	user?: User | null;
	authError?: object | null;
} = {}) {
	const supabase = {
		auth: {
			getUser: vi.fn().mockResolvedValue({
				data: { user: authError ? null : user },
				error: authError,
			}),
		},
		from: vi.fn(),
	};
	vi.mocked(createClient).mockResolvedValue(supabase as never);
	return supabase;
}

beforeEach(() => {
	vi.clearAllMocks();
});

describe('input validation', () => {
	it('returns status 400 if invalid JSON', async () => {
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: 'no valid json',
		});
		const res = await POST(req);
		expect(res.status).toBe(400);
		const body = await res.json();
		expect(body.error).toContain('Invalid input');
	});

	it('returns status 422 if reservatieId is missing', async () => {
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({}),
		});
		const res = await POST(req);
		expect(res.status).toBe(422);
		expect(await res.json()).toEqual({
			error: 'Missing or invalid reservatieId',
		});
	});

	it('returns status 422 if reservatieId is not a string', async () => {
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reservatieId: 123 }),
		});
		const res = await POST(req);
		expect(res.status).toBe(422);
		expect(await res.json()).toEqual({
			error: 'Missing or invalid reservatieId',
		});
	});
});

describe('Authentication', () => {
	it('Return 401 when no user logged in', async () => {
		makeSupabase({ user: null });
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reservatieId: '123' }),
		});
		const res = await POST(req);
		expect(res.status).toBe(401);
		expect(await res.json()).toEqual({ error: 'Unauthorized' });
	});
	it('Return 401 when there is an auth error', async ()=>{
		makeSupabase({user: mockUser, authError: {error: "Auth problem"}});
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reservatieId: '123' }),
		});
		const res = await POST(req);
		expect(res.status).toBe(401);
		expect(await res.json()).toEqual({ error: 'Unauthorized' });

	})
});

describe('Role validation', () => {
	it('returns 500 if fetching user role fails', async () => {
		const supabase = makeSupabase({});
		supabase.from = vi.fn().mockReturnValue({
			select: vi.fn().mockReturnValue({
				eq: vi.fn().mockReturnValue({
					single: vi.fn().mockResolvedValue({
						data: null,
						error: { message: 'Database error' },
					}),
				}),
			}),
		});
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reservatieId: '123' }),
		});
		const res = await POST(req);
		expect(res.status).toBe(500);
		expect(await res.json()).toEqual({ error: 'Failed to fetch user role' });
	});

	it('returns 403 if user is not an admin', async () => {
		const supabase = makeSupabase({});
		supabase.from = vi.fn().mockReturnValue({
			select: vi.fn().mockReturnValue({
				eq: vi.fn().mockReturnValue({
					single: vi.fn().mockResolvedValue({
						data: { role: 'user' },
						error: null,
					}),
				}),
			}),
		});
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reservatieId: '123' }),
		});
		const res = await POST(req);
		expect(res.status).toBe(403);
		expect(await res.json()).toEqual({
			error: 'Only administrators can confirm reservations',
		});
	});
});

describe('Reservation confirmation', () => {
	it('returns 500 if update fails', async () => {
		const supabase = makeSupabase({});
		supabase.from = vi.fn().mockReturnValue({
			select: vi.fn().mockReturnValue({
				eq: vi.fn().mockReturnValue({
					single: vi.fn().mockResolvedValue({
						data: { role: 'admin' },
						error: null,
					}),
				}),
			}),
			update: vi.fn().mockReturnValue({
				eq: vi.fn().mockResolvedValue({
					error: { message: 'Update failed' },
				}),
			}),
		});
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reservatieId: '123' }),
		});
		const res = await POST(req);
		expect(res.status).toBe(500);
		expect(await res.json()).toEqual({ error: 'Failed to confirm reservation' });
	});

	it('returns 200 and confirms reservation successfully', async () => {
		const supabase = makeSupabase({});
		supabase.from = vi.fn().mockReturnValue({
			select: vi.fn().mockReturnValue({
				eq: vi.fn().mockReturnValue({
					single: vi.fn().mockResolvedValue({
						data: { role: 'admin' },
						error: null,
					}),
				}),
			}),
			update: vi.fn().mockReturnValue({
				eq: vi.fn().mockResolvedValue({
					error: null,
				}),
			}),
		});
		const req = new Request('http://localhost:3000/api/reservations/confirm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reservatieId: '123' }),
		});
		const res = await POST(req);
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({
			message: 'Reservation confirmed successfully',
		});
	});
});
