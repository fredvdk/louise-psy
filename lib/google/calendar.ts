import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

export async function getCalendarEvents() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: SCOPES,
    });

    const calendar = google.calendar({ version: 'v3', auth });
    
    console.log('====== Fetching calendar events =====');
    console.log('Using calendar ID:', process.env.GOOGLE_CALENDAR_ID);
    console.log(await calendar.calendarList.list());
    console.log('======')
    const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';

    const events: Array<unknown> = [];
    let pageToken: string | undefined;

    do {
        const response = await calendar.events.list({
            calendarId,
            maxResults: 200,
            singleEvents: true,
            orderBy: 'startTime',
            timeMin: new Date().toISOString(),
            pageToken,
        });

        if (response.data.items) {
            events.push(...response.data.items);
        }

        pageToken = response.data.nextPageToken ?? undefined;
    } while (pageToken);

    return events;
}
