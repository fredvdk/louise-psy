// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from './route';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

const mockUser = { id: 'user-abc' };

const mockReservations = [
	{ id: 'res-1', date: '2026-05-10', time: '10:00:00', reserved_for: 'user-abc' },
];

// --------------------
// Types
// --------------------

type SupabaseResult<T> = {
	data: T;
	error: { message: string } | null;
};

// --------------------
// Mock Factory
// --------------------

function makeSupabase({
	user = mockUser,
	userError = null,
	reservationsResult = { data: mockReservations, error: null },
}: {
	user?: typeof mockUser | null;
	userError?: unknown;
	reservationsResult?: SupabaseResult<unknown>;
} = {}) {
	const queryBuilder = {
		select: vi.fn().mockReturnThis(),
		insert: vi.fn().mockReturnThis(),
		eq: vi.fn().mockResolvedValue(reservationsResult),
		single: vi.fn().mockResolvedValue(reservationsResult),
	};

	const supabase = {
		auth: {
			getUser: vi.fn().mockResolvedValue({
				data: { user: userError ? null : user },
				error: userError,
			}),
		},
		from: vi.fn(() => queryBuilder),
	};

	vi.mocked(supabaseServer.createClient).mockResolvedValue(
		supabase as unknown as Awaited<
			ReturnType<typeof supabaseServer.createClient>
		>,
	);

	return { supabase, queryBuilder };
}

// --------------------
// Helpers
// --------------------

function makeRequest(body: unknown) {
	return new Request('http://localhost/api/reservations', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
}

beforeEach(() => vi.clearAllMocks());

// --------------------
// Tests
// --------------------

describe('GET /api/reservations', () => {
	it('returns 401 when user is not authenticated', async () => {
		makeSupabase({ user: null });

		const res = await GET();

		expect(res.status).toBe(401);
		expect(await res.json()).toEqual({ error: 'Unauthorized' });
	});

	it('returns reservations for the authenticated user', async () => {
		const result = { data: mockReservations, error: null };
		makeSupabase({ reservationsResult: result });

		const res = await GET();

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual(result);
	});

	it('filters reservations by reserved_for user id', async () => {
		const { queryBuilder } = makeSupabase();

		await GET();

		expect(queryBuilder.eq).toHaveBeenCalledWith('reserved_for', mockUser.id);
	});

	it('handles database errors gracefully', async () => {
		const dbError = { message: 'Database connection failed' };
		makeSupabase({
			reservationsResult: { data: null, error: dbError },
		});

		const res = await GET();

		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body).toEqual({ data: null, error: dbError });
	});
});

describe('POST /api/reservations', () => {
	it('returns 401 when user is not authenticated', async () => {
		makeSupabase({ user: null });

		const res = await POST(
			makeRequest({ date: '2026-05-10', time: '10:00:00' }),
		);

		expect(res.status).toBe(401);
		expect(await res.json()).toEqual({ error: 'Unauthorized' });
	});

	it('returns 400 when date is missing', async () => {
		makeSupabase();

		const res = await POST(makeRequest({ time: '10:00:00' }));

		expect(res.status).toBe(400);
		expect(await res.json()).toEqual({
			error: 'Missing required fields: date and time',
		});
	});

	it('returns 400 when time is missing', async () => {
		makeSupabase();

		const res = await POST(makeRequest({ date: '2026-05-10' }));

		expect(res.status).toBe(400);
		expect(await res.json()).toEqual({
			error: 'Missing required fields: date and time',
		});
	});

	it('returns 400 when both date and time are missing', async () => {
		makeSupabase();

		const res = await POST(makeRequest({}));

		expect(res.status).toBe(400);
		expect(await res.json()).toEqual({
			error: 'Missing required fields: date and time',
		});
	});

	it('returns 201 on success', async () => {
		const newReservation = {
			id: 'res-new',
			date: '2026-05-10',
			time: '10:00:00',
		};

		makeSupabase({
			reservationsResult: { data: newReservation, error: null },
		});

		const res = await POST(
			makeRequest({ date: '2026-05-10', time: '10:00:00' }),
		);

		expect(res.status).toBe(201);
		expect(await res.json()).toEqual(newReservation);
	});

	it('inserts correct data', async () => {
		const { queryBuilder } = makeSupabase();

		await POST(makeRequest({ date: '2026-05-10', time: '10:00:00' }));

		expect(queryBuilder.insert).toHaveBeenCalledWith({
			date: '2026-05-10',
			time: '10:00:00',
			updated_by: mockUser.id,
		});
	});

	it('returns 400 when insert fails', async () => {
		makeSupabase({
			reservationsResult: {
				data: null,
				error: { message: 'Slot not available' },
			},
		});

		const res = await POST(
			makeRequest({ date: '2026-05-10', time: '10:00:00' }),
		);

		expect(res.status).toBe(400);
		expect(await res.json()).toEqual({ error: 'Slot not available' });
	});

	it('returns 400 for invalid JSON', async () => {
		makeSupabase();

		const invalidRequest = new Request('http://localhost/api/reservations', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: 'invalid json',
		});

		const res = await POST(invalidRequest);

		expect(res.status).toBe(400);
		const body = await res.json();
		expect(body.error).toBeDefined();
	});
});
