import { areHeadersFromAdmin, JWTPayload } from '@/lib/supabase/jwtAuth';
import { createAuthenticatedClientFromJWT } from '@/lib/supabase/server';
import { jsonResponse } from '@/lib/utils';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const headersList = await headers();
		const jwtcheckresult = await areHeadersFromAdmin(headersList);

		if (jwtcheckresult !== false) {
			const body = await request.json();
			const { id, reserved_for } = body;

			if (!id || !reserved_for) {
				return jsonResponse(
					{ error: 'Missing required fields: id and reserved_for' },
					400,
				);
			}

			const supabase = await createAuthenticatedClientFromJWT(
				headersList.get('Authorization')!.substring(7),
			);
			const { data, error } = await supabase
				.from('reservations')
				.update({
					status: 'confirmed',
					reserved_for: reserved_for,
					updated_at: new Date().toISOString(),
					updated_by: (jwtcheckresult as JWTPayload).sub,
				})
				.eq('id', id)
				.select();

			if (error) {
				return jsonResponse({ error: error.message }, 500);
			}
			return jsonResponse({ success: true, data }, 201);
		} else {
			return jsonResponse({ error: 'Unauthorized' }, 401);
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		return jsonResponse({ error: message }, 500);
	}
}
