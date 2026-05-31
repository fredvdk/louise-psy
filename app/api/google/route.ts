import { getCalendarEvents } from '@/lib/google/calendar';
import { areHeadersFromAdmin } from '@/lib/supabase/jwtAuth';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		if (await areHeadersFromAdmin(request.headers)) {

		const events = await getCalendarEvents();
		return NextResponse.json({ events });
		} else {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
	} catch (error) {
		if (error instanceof Error && error.message.includes('Invalid or expired token')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		console.error('Google Calendar fetch error:', error);
		const message = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
