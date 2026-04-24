import { Reservation } from '@/types/reservatie';
import { getAuthenticatedClient } from './authQueries';
import { createClient } from './server';

export async function getAlleAfsprakenVoorUser() {
	try {
        const { client, userId } = await getAuthenticatedClient();
        const { data, error } = await client.from('reservations')
			.select('*').eq('reserved_for', userId)
			.in('status', ['confirmed', 'pending'])
			.order('date', { ascending: false })

        if (error) throw error;
        return { success: true, data: data, error: null }
	} catch (error) {
		return {
			success: false,
            data: null,
			error:
				error instanceof Error ? error.message : 'An unknown error occured',
		};
	}
}

export function getAllPendingAfspraken() {}

export async function getAllFreeAfspraken(){
	const client = await createClient();
	const { data, error } = await client.from('reservations').select("*").eq('status', 'free');
	if (error) throw error;
	return (data as Reservation[])
}
