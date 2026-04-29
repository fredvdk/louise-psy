export type Afspraak = {
	id: string;
	date: string;
	time: string;
	status: 'confirmed' | 'pending' | 'free';
	updated_at: string;
	reserved_for: string | null;
	notes?: string | null;
	client_email: { email: string };
	profiles: { email: string; full_name: string } | null;
};

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
