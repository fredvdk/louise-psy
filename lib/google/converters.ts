import { Afspraak } from '@/types/reservatie';
import { calendar_v3 } from 'googleapis';

function googleEventToAfspraak(
	event: calendar_v3.Schema$Event,
): Afspraak | null {
	const startDateTime = event.start?.dateTime || event.start?.date;
	if (!startDateTime) {
		console.warn(`Event ${event.id} has no start time`);
		return null;
	}

	try {
		const date = new Date(startDateTime);
		if (isNaN(date.getTime())) {
			console.warn(`Invalid date for event ${event.id}: ${startDateTime}`);
			return null;
		}

		return {
			id: event.id ?? '',
			date: startDateTime.split('T')[0],
			starttime: event.start?.dateTime
				? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
				: '',
			endtime: event.end?.dateTime
				? new Date(event.end.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
				: '',
			timezone: event.start?.timeZone || event.end?.timeZone || 'Europe/Brussels',
			status: getStatus(event),
			updated_at: new Date().toISOString(),
			reserved_for: getReserverdFor(event),
			notes: event.description ?? null,
			profiles: null,
		};
	} catch (err) {
		console.warn(`Error processing event ${event.id}:`, err);
		return null;
	}
}

function getStatus(
	event: calendar_v3.Schema$Event,
): 'confirmed' | 'pending' | 'free' {
	if (event.summary === 'Te reserveren') {
		return 'free';
	}
	if (event.extendedProperties?.shared?.status?.includes('pending')) {
		return 'pending';
	}
	return 'confirmed';
}

function getReserverdFor(event: calendar_v3.Schema$Event): string | null {
	if (event.extendedProperties?.shared?.reserved_for) {
		return event.extendedProperties.shared.reserved_for;
	}
	if (getStatus(event) === 'free') {
		return 'Free';
	} else return event.summary ?? null;
}

function afspraakToGoogleEvent(afspraak: Afspraak): calendar_v3.Schema$Event {
	return {
		id: afspraak.id,
		summary: afspraak.reserved_for ?? 'Te reserveren',
		start: {
			dateTime: `${afspraak.date}T${afspraak.starttime}:00`,
			timeZone: afspraak.timezone ?? 'Europe/Brussels',
		},
		end: {
			dateTime: `${afspraak.date}T${afspraak.endtime}:00`,
			timeZone: afspraak.timezone ?? 'Europe/Brussels',
		},
		description: afspraak.notes ?? '',
		extendedProperties: {
			shared: {
				status: afspraak.status === 'pending' ? 'pending' : 'confirmed',
				reserved_for: afspraak.reserved_for ?? '',
			},
		},
	};
}

export { googleEventToAfspraak, afspraakToGoogleEvent };
