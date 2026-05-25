import { jsonResponse } from "@/lib/utils";
import { getAllAfsprakenVoorAdmin } from '@/lib/supabase/afsprakenDb';
import { verifyJWTToken } from '@/lib/supabase/jwtAuth';
import { headers } from 'next/headers';

export async function GET() {
	try {
		const headersList = await headers();
		const authHeader = headersList.get('Authorization');

		let email: string | undefined;

		if (authHeader?.startsWith('Bearer ')) {
			// JWT token from Flutter app
			const token = authHeader.substring(7);
			const payload = verifyJWTToken(token);
			email = payload.email || '';
			console.log('User email:', email);
		} else {
			return jsonResponse(
				{ error: 'Unauthorized: No valid authentication provided' },
				401,
			);
		}
	

		const result = await getAllAfsprakenVoorAdmin();

		if (!result.success) {
			return jsonResponse({ error: result.error }, 500);
		}

		return jsonResponse({ success: true, afspraken: result.data }, 200);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'An unknown error occurred';
		return jsonResponse({ error: message }, 401);
	}
}
