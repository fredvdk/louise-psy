'use server';

import { Afspraak } from '@/types/reservatie';
import { google } from 'googleapis';
import { googleEventToAfspraak } from './converters';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

interface CalendarResponse {
	error: string | null;
	data: Array<Afspraak> | null;
}

function validateEnvironmentVariables(): string | null {
	if (!process.env.GOOGLE_CLIENT_EMAIL) {
		return 'Missing GOOGLE_CLIENT_EMAIL environment variable';
	}
	if (!process.env.GOOGLE_PRIVATE_KEY) {
		return 'Missing GOOGLE_PRIVATE_KEY environment variable';
	}
	return null;
}

export async function getCalendarEvents(
	onlyFree: boolean,
	timeMin: string,
): Promise<CalendarResponse> {
	try {
		const envError = validateEnvironmentVariables();
		if (envError) {
			return { error: envError, data: null };
		}

		let auth;
		try {
			auth = new google.auth.GoogleAuth({
				credentials: {
					client_email: process.env.GOOGLE_CLIENT_EMAIL,
					private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
				},
				scopes: SCOPES,
			});
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Unknown authentication error';
			return {
				error: `Failed to initialize Google Auth: ${message}`,
				data: null,
			};
		}

		const calendar = google.calendar({ version: 'v3', auth });
		const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';

		const events: Array<Afspraak> = [];

		let response;
		try {
			response = await calendar.events.list({
				calendarId,
				maxResults: 100,
				singleEvents: true,
				orderBy: 'startTime',
				timeMin,
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unknown error';
			const statusCode = (err as Record<string, unknown>)?.status || 'unknown';

			if (statusCode === 404) {
				return { error: `Calendar not found: ${calendarId}`, data: null };
			}
			if (statusCode === 403) {
				return {
					error: 'Insufficient permissions to access calendar',
					data: null,
				};
			}
			if (statusCode === 401) {
				return {
					error: 'Authentication failed: invalid credentials',
					data: null,
				};
			}

			return {
				error: `Failed to fetch calendar events: ${message}`,
				data: null,
			};
		}

		if (response.data.items && response.data.items.length > 0) {
			try {
				const processedEvents: Afspraak[] = [];
				for (const event of response.data.items) {
					if (!event) continue;

					if (
						onlyFree &&
						event.summary?.toLowerCase() !== 'te reserveren' &&
						event.summary?.toLowerCase() !== 'vrij'
					) {
						continue;
					}

					const afspraak = googleEventToAfspraak(event);
					if (afspraak) {
						processedEvents.push(afspraak);
					}
				}
				events.push(...processedEvents);
			} catch (err) {
				const message = err instanceof Error ? err.message : 'Unknown error';
				return {
					error: `Error processing calendar events: ${message}`,
					data: null,
				};
			}
		}

		return { error: null, data: events };
	} catch (err) {
		const message =
			err instanceof Error ? err.message : 'Unknown error occurred';
		console.error('Unexpected error in getCalendarEvents:', err);
		return { error: `Unexpected error: ${message}`, data: null };
	}
}

export async function updateGoogleEvent(id: string, afspraak: Afspraak, username?: string) {
	
	try {
		const envError = validateEnvironmentVariables();
		if (envError) {
			return { error: envError, data: null };
		}

		let auth;
		try {
			auth = new google.auth.GoogleAuth({
				credentials: {
					client_email: process.env.GOOGLE_CLIENT_EMAIL,
					private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
				},
				scopes: SCOPES,
			});
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Unknown authentication error';
			return {
				error: `Failed to initialize Google Auth: ${message}`,
				data: null,
			};
		}

		const calendar = google.calendar({ version: 'v3', auth });
		const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';


		const result = await calendar.events.update({
			calendarId,
			eventId: id,
			requestBody: {
				summary: username || afspraak.reserved_for,
				colorId: getColorIdForStatus(afspraak.status == 'free' ? 'pending' : 'confirmed'),
				description: afspraak.notes ?? '',
				start: {
					dateTime: afspraak.date + 'T' + afspraak.starttime + ':00',
					timeZone: afspraak.timezone || 'Europe/Brussels',
				},
				end: {
					dateTime: afspraak.date + 'T' + afspraak.endtime + ':00',
					timeZone: afspraak.timezone || 'Europe/Brussels',
				},
				extendedProperties: {
					shared: {
						status: afspraak.status === 'pending' ? 'pending' : 'confirmed',
						reserved_for: afspraak.reserved_for ?? '',
					},
				},
			},
		});

		console.log(
			`END Updating Google Event with ID ${id}:`,
			JSON.stringify(result.data, null, 2),
		);

		if (result.status !== 200) {
			return {
				error: `Failed to update event, status code: ${result.status}`,
				data: null,
			};
		}
		console.log('Google Event updated successfully:', result.data);
		return { error: null, data: result.data };
	} catch (err) {
		console.error('GOOGLE UPDATE ERROR');
		console.error(err);

		throw err;
	}
}

function getColorIdForStatus(status: 'confirmed' | 'pending' | 'free'): string {
	switch (status) {
		case 'confirmed':
			return '7';
		case 'pending':
			return '6';
		case 'free':
			return '10';
		default:
			return '10';
	}
}
