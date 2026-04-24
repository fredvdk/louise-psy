import { createClient } from '@/lib/supabase/server';
import { jsonResponse } from '@/lib/utils';

export async function POST() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return jsonResponse({ error: 'Unauthorized' }, 401);
	}

	// Generate 20 random reservations
	const reservations = [];
	const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

	for (let i = 0; i < 20; i++) {
		const daysAhead = Math.floor(Math.random() * 30) - 15; // -15 to +15 days
		const date = new Date();
		date.setDate(date.getDate() + daysAhead);
		const dateStr = date.toISOString().split('T')[0];
		const time = times[Math.floor(Math.random() * times.length)];

		reservations.push({
			date: dateStr,
			time,
			reserved_for: user.id,
			updated_by: user.id,
		});
	}

	const { data, error } = await supabase
		.from('reservations')
		.insert(reservations)
		.select('*');

	if (error) {
		return jsonResponse({ error: error.message }, 400);
	}

	return jsonResponse({ success: true, count: data?.length || 0 }, 201);
}
