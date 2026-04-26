import { Afspraak } from '@/types/reservatie';
import { getAuthenticatedClient } from './authQueries';
import { createClient } from './server';

export async function getAlleAfsprakenVoorUser() {
	try {
		const { client, userId } = await getAuthenticatedClient();
		const { data, error } = await client
			.from('reservations')
			.select('*')
			.eq('reserved_for', userId)
			.in('status', ['confirmed', 'pending'])
			.order('date', { ascending: false });

		if (error) throw error;
		return { success: true, data: data, error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error:
				error instanceof Error ? error.message : 'An unknown error occured',
		};
	}
}

export async function getAllFreeAfspraken() {
	const client = await createClient();
	try {
		const { data, error } = await client
			.from('reservations')
			.select('*')
			.eq('status', 'free');
		if (error) throw error;
		return { success: true, data: data as Afspraak[], error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error:
				error instanceof Error ? error.message : 'An unknown error occured',
		};
	}
}

export async function getAllAfsprakenVoorAdmin() {
	const client = await createClient();
	try {
		const { data, error } = await client
			.from('reservations')
			.select('*, profiles!reservations_reserved_for_fkey(email, full_name)')
			.order('date');
		if (error) console.log(error);
		return { success: true, data: data as Afspraak[], error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error:
				error instanceof Error ? error.message : 'An unknown error occured',
		};
	}
}
