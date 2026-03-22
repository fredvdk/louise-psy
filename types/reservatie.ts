export type Reservation = {
	id: string;
	date: string;
	time: string;
	status: "confirmed" | "pending" | "free";
	updated_at: string;
	reserved_for: string | null;
	notes?: string | null;
	client_email?: { email:string };
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

