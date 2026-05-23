import { Afspraak } from '@/types/reservatie';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
	process.env.NEXT_PUBLIC_SUPABASE_URL &&
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function isWithin14Days(targetDate: Date): boolean {
	const today = new Date();
	const fourteenDaysFromNow = new Date(today);
	fourteenDaysFromNow.setDate(today.getDate() + 1);
	return targetDate <= fourteenDaysFromNow;
}

export function jsonResponse(data: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

export function formatDate(date: Date) {
	return date.toLocaleDateString('nl-NL', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

export function getAfspraakDateTime(afspraak: Afspraak | null): string | null {
	return afspraak
		? `${formatDate(new Date(afspraak.date))} - ${afspraak.time.slice(0, -3)}`
		: null;
}

export function handleError(error: unknown): string {
	console.log(error);
	return error instanceof Error ? error.message : 'An unknown error occurred';
}