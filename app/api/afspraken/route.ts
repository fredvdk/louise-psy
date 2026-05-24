import { getAuthenticatedClient } from '@/lib/supabase/authDb';
import { getAllAfsprakenVoorAdmin } from '@/lib/supabase/afsprakenDb';
import { NextResponse } from 'next/server';

// This route is for admin users to fetch all reservations. Regular users will only be able to fetch their own reservations from the /reservations route.
export async function GET() {
	try {
		const { role } = await getAuthenticatedClient();

		if (role.data?.[0]?.role !== 'admin') {
			return NextResponse.json(
				{ error: 'Unauthorized: Admin access required' },
				{ status: 403 }
			);
		}

		const result = await getAllAfsprakenVoorAdmin();

		if (!result.success) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true, afspraken: result.data });
	} catch (error) {
		const message = error instanceof Error ? error.message : 'An error occurred';
		return NextResponse.json(
			{ error: message },
			{ status: error instanceof Error && error.message.includes('Unauthorized') ? 401 : 500 }
		);
	}
}
