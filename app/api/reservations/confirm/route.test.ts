// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';
import { createClient } from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

type User = {
	id: string;
};

const mockUser: User = { id: 'abc' };

/* const mockReservation = {
	id: 'res-123',
	status: 'pending',
	reserved_for: 'edf',
	notes: null,
}; */

function makeSupabase({
	user = mockUser,
	authError = null
}: {
	user: User | null;
	authError?: object | null;
}) {
	const supabase = {
		auth: {
			getUser: vi.fn().mockResolvedValue({
				data: { user: authError ? null : user },
				error: authError,
			}),
		}
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
