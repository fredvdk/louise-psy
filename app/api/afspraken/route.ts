import { jsonResponse } from '@/lib/utils';
import { areHeadersFromAdmin } from '@/lib/supabase/jwtAuth';
import { createAuthenticatedClientFromJWT } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function GET() {
	try {
		const headersList = await headers();
		if (await areHeadersFromAdmin(headersList)) {
			const supabase = await createAuthenticatedClientFromJWT(
				headersList.get('Authorization')!.substring(7),
			);
			const { data, error } = await supabase
				.from('reservations')
				.select('*, profiles!reservations_reserved_for_fkey(email, full_name)')
				.order('date', { ascending: false });

			if (error) {
				return jsonResponse({ error: error.message }, 500);
			}
			return jsonResponse({ success: true, afspraken: data }, 200);
		} else {
			return jsonResponse({ error: 'Unauthorized' }, 401);
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unauthorized';
		return jsonResponse({ error: message }, 401);
	}
}
