export type Reservation = {
	id: string;
	date: string;
	time: string;
	status: string;
	updated_at: string;
	reserved_for: string | null;
	notes?: string | null;
};

export type CalendarEvent = {
	date: string;
	start: string;
	end?: string;
	duration: string;
	title: string;
}

