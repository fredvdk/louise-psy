import { createClient } from '@/lib/supabase/server';

// This route allows authenticated users to fetch their own reservations and create new reservations. Admin users can fetch all reservations from the /reservations/all route.
export async function GET() {
	const supabase = await createClient();
	
    // Check the authenticated user
    const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

    // Fetch reservations for the authenticated user
	const reservations = await supabase.from('Reservations').select('*').eq('updated_by', user.id);

	return new Response(JSON.stringify(reservations), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function POST(request: Request) {
	const supabase = await createClient();

	const { date, time } = await request.json();
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}
	const { data, error } = await supabase
		.from('Reservations')
		.insert({ date: date, time: time, updated_by: user.id })
		.select('*')
		.single();

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
	return new Response(JSON.stringify(data), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
}


