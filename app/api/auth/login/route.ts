import { jsonResponse } from '@/lib/utils';
import { loginAdminWithEmailPassword } from '@/lib/supabase/authDb';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email || !password) {
			return jsonResponse(
				{ success: false, jwt: null, error: 'Email and password are required' },
				400,
			);
		}

		const { success, token, error } = await loginAdminWithEmailPassword(
			email,
			password,
		);

		if (!success) {
			return jsonResponse({ success: false, jwt: null, error }, 401);
		}

		return jsonResponse({ success: true, jwt: token, error: null }, 200);
	} catch (err) {
		return jsonResponse(
			{
				success: false,
				jwt: null,
				error: err instanceof Error ? err.message : 'Invalid request',
			},
			400,
		);
	}
}
