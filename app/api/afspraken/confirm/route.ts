import { createClient } from '@/lib/supabase/server';
import { jsonResponse } from '@/lib/utils';

export async function POST(request: Request) {
	//1. input validation
	let reservatieId: string;

	try {
		const { reservatieId: id } = await request.json();
		reservatieId = id;
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		return jsonResponse({ error: 'Invalid input: ' + message }, 400);
	}

	if (!reservatieId || typeof reservatieId !== 'string') {
		return jsonResponse(
			{ error: 'Missing or invalid reservatieId' },
			422,
		);
	}

	//2. Auth
	const supabase = await createClient();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (!user || authError) {
		return jsonResponse({ error: 'Unauthorized' }, 401);
	}

	const { data, error: supabaseError } = await supabase
		.from('profiles')
		.select('role')
		.eq('id', user.id)
		.single();

	if (supabaseError || !data) {
		return jsonResponse({ error: 'Failed to fetch user role' }, 500);
	}

	if (data.role !== 'admin') {
		return jsonResponse(
			{ error: 'Only administrators can confirm reservations' },
			403,
		);
	}

	//3. Confirm the reservation
	const { error: updateError } = await supabase
		.from('reservations')
		.update({
			status: 'confirmed',
			updated_at: new Date().toISOString(),
			updated_by: user.id,
		})
		.eq('id', reservatieId);

	if (updateError) {
		return jsonResponse({ error: 'Failed to confirm reservation' }, 500);
	}

	return jsonResponse({ message: 'Reservation confirmed successfully' }, 200);
}
