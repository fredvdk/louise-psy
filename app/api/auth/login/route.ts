import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
	const { email, password } = await request.json();
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 401,
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
