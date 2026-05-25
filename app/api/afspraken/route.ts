import { jsonResponse } from "@/lib/utils";
import { verifyJWTToken } from '@/lib/supabase/jwtAuth';
import { createAuthenticatedClientFromJWT } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function GET() {
	try {
		const headersList = await headers();
		const authHeader = headersList.get('Authorization');

		if (!authHeader?.startsWith('Bearer ')) {
			return jsonResponse({ error: 'Unauthorized' }, 401);
		}

		const token = authHeader.substring(7);
		await verifyJWTToken(token);

		const supabase = await createAuthenticatedClientFromJWT(token);
		const { data, error } = await supabase
			.from('reservations')
			.select('*, profiles!reservations_reserved_for_fkey(email, full_name)')
			.order('date', { ascending: false });

		if (error) {
			return jsonResponse({ error: error.message }, 500);
		}

		return jsonResponse({ success: true, afspraken: data }, 200);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unauthorized';
		return jsonResponse({ error: message }, 401);
	}
}
