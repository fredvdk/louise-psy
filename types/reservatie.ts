export type Afspraak = {
	id: string;
	date: string;
	starttime: string;
	endtime: string;
	timezone: string;
	status: 'confirmed' | 'pending' | 'free';
	updated_at: string;
	reserved_for: string | null;
	notes?: string | null;
	profiles: { email: string; full_name?: string } | null;
};

export function afspraakToString(afspraak: Afspraak): string {
	const name = afspraak.profiles?.full_name || afspraak.profiles?.email;
	return `${name} - ${afspraak.date} at ${afspraak.starttime} (${afspraak.status})`;
}

export type CalendarEvent = {
	id: string;
	date: string;
	start: string;
	end?: string;
	duration: string;
	title: string;
};

type ProfileData = {
	full_name: string;
	mobile: string;
	avatar_url: string;
};

type MockError = {
	message: string;
} | null;

export type SetupProps = {
	profileData?: ProfileData;
	profileError?: MockError;
	upsertError?: MockError;
};

export type User = {
	id: string;
	email?: string;
	full_name?: string;
};

export type Message = {
	id: string;
	message: string;
	valid_from : Date;
	valid_till : Date;
	created_at : Date;
	created_by : string
}

export type GoogleEvent = {
	id?: string;
	summary?: string;
	start?: {
		dateTime?: string;
		date?: string;
		timeZone?: string;
	};
	end?: {
		dateTime?: string;
		date?: string;
		timeZone?: string;
	};
	description?: string;
	location?: string;
	status?: string;
	htmlLink?: string;
}
