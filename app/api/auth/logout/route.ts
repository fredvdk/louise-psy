import { createClient } from "@/lib/supabase/server";

export async function POST() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
	return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
