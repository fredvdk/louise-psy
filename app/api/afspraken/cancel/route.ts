import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
	// 1. Input validation — fail fast before any DB calls
	let reservationId: string;
	try {
		const body = await request.json();
		reservationId = body?.reservationId;
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json(
			{ error: 'Invalid input ' + message },
			{ status: 400 },
		);
	}

	if (!reservationId || typeof reservationId !== 'string') {
		return NextResponse.json(
			{ error: 'Missing or invalid reservationId' },
			{ status: 400 },
		);
	}

	const supabase = await createClient();

	// 2. Auth
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (!user || authError) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	// 3. Get role
	const { data: profile, error: roleError } = await supabase
		.from('profiles')
		.select('role')
		.eq('id', user.id)
		.single();

	if (roleError || !profile) {
		return NextResponse.json({ error: 'Role fetch failed' }, { status: 500 });
	}

	const role = profile.role;

	// 4. Build query
	let query = supabase
		.from('reservations')
		.update({
			status: 'free',
			notes: role === 'admin' ? `Cancelled by admin (${user.id})` : null,
			updated_by: user.id,
			reserved_for: null,
			updated_at: new Date().toISOString(),
		})
		.eq('id', reservationId);

	if (role !== 'admin') {
		query = query.eq('reserved_for', user.id);
	}

	// 5. Execute
	const { data, error } = await query.select().single();

	if (error) {
		// PGRST116 = no rows matched — reservation not found or user doesn't own it
		const status = error.code === 'PGRST116' ? 404 : 500;
		const message =
			status === 404
				? 'Reservation not found or not allowed'
				: 'Database error';
		return NextResponse.json({ error: message }, { status });
	}

	// 6. Success
	return NextResponse.json({ reservation: data });
}
