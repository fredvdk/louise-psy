import { createClient } from '@/lib/supabase/server';

// This route is for admin users to fetch all reservations. Regular users will only be able to fetch their own reservations from the /reservations route.
export async function GET() {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('role')
		.eq('id', user.id)
		.single();

	if (profileError) {
		return Response.json({ error: profileError.message }, { status: 500 });
	}

	if (profile?.role !== 'admin') {
		return Response.json({ error: 'Forbidden' }, { status: 403 });
	}

	const { data: reservations, error } = await supabase
		.from('reservations')
		.select('*');

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(reservations);
}
