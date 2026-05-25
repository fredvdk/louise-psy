import { getCalendarEvents } from '@/lib/google/calendar';
import { verifyJWTToken } from '@/lib/supabase/jwtAuth';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const authHeader = request.headers.get('authorization');
		if (!authHeader?.startsWith('Bearer ')) {
			return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 });
		}

		const token = authHeader.slice(7);
		await verifyJWTToken(token);

		const events = await getCalendarEvents();
		return NextResponse.json({ events });
	} catch (error) {
		if (error instanceof Error && error.message.includes('Invalid or expired token')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		console.error('Google Calendar fetch error:', error);
		const message = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
