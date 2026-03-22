import { createClient } from '@/lib/supabase/server';
import { jsonResponse } from '@/lib/utils';

// This route allows authenticated users to fetch their own reservations and create new reservations. Admin users can fetch all reservations from the /reservations/all route.
export async function GET() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return jsonResponse({ error: 'Unauthorized' }, 401);
	}

	const result = await supabase
		.from('reservations')
		.select('*')
		.eq('reserved_for', user.id);

	return jsonResponse(result);
}

export async function POST(request: Request) {
	try {
		const { date, time } = await request.json();

		if (!date || !time) {
			return jsonResponse(
				{ error: 'Missing required fields: date and time' },
				400
			);
		}

		const supabase = await createClient();

		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError || !user) {
			return jsonResponse({ error: 'Unauthorized' }, 401);
		}

		const { data, error } = await supabase
			.from('reservations')
			.insert({ date, time, updated_by: user.id })
			.select('*')
			.single();

		if (error) {
			return jsonResponse({ error: error.message }, 400);
		}

		return jsonResponse(data, 201);
	} catch (err) {
		return jsonResponse(
			{ error: err instanceof Error ? err.message : 'Invalid request' },
			400
		);
	}
}


