import { Afspraak } from '@/types/reservatie';
import { getAuthenticatedClient } from './authDb';
import { createClient } from './server';
import { handleError } from '../utils';



export async function getAlleAfsprakenVoorUser() {
	try {
		const { client, userId } = await getAuthenticatedClient();
		const { data, error } = await client
			.from('reservations')
			.select('*, profiles!reservations_reserved_for_fkey(email, full_name)')
			.eq('reserved_for', userId)
			.in('status', ['confirmed', 'pending'])
			.order('date', { ascending: false });

		if (error) throw error;
		return { success: true, data: data as Afspraak[], error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: handleError(error),
		};
	}
}

export async function getAllFreeAfspraken() {
	const client = await createClient();
	try {
		const today = new Date().toISOString().split('T')[0];
		const { data, error } = await client
			.from('reservations')
			.select('*')
			.eq('status', 'free')
			.gte('date', today)
			.order('date', { ascending: true });
		if (error) throw error;
		return { success: true, data: data as Afspraak[], error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: handleError(error),
		};
	}
}

export async function getAllPendingAfspraken() {
	const client = await createClient();
	try{
		const { data, error } = await client
		.from('reservations')
		.select('*, profiles!reservations_reserved_for_fkey(email, full_name)')
		.eq('status', 'pending');

		if (error) throw error;
		return {success: true, data: data as Afspraak[], error: null }
	}
	catch(error){
		return({
			success: false,
			data: null,
			error: handleError(error)
		})
	}
}

export async function getAllAfsprakenVoorAdmin() {
	const client = await createClient();
	try {
		const today = new Date().toISOString().split('T')[0];
		const { data, error } = await client
			.from('reservations')
			.select('*')
			.select('*, profiles!reservations_reserved_for_fkey(email, full_name)')
			.gte('date', today)
			.order('date', { ascending: true });
		if (error) throw error;
		console.log('Retrieved afspraken for admin:', data);
		return { success: true, data: data as Afspraak[], error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: handleError(error),
		};
	}
}

export async function updateAfspraakStatus(
	id: string,
	status: 'free' | 'confirmed' | 'pending',
	additionalUpdates?: Record<string, unknown>,
) {
	try {
		const { client, userId } = await getAuthenticatedClient();

		const baseUpdates = {
			status,
			updated_by: userId,
			updated_at: new Date().toISOString(),
		};

		const updates =
			status === 'free'
				? { ...baseUpdates, reserved_for: null, notes: null, ...additionalUpdates }
				: { ...baseUpdates, ...additionalUpdates };

		const { data, error } = await client
			.from('reservations')
			.update(updates)
			.eq('id', id)
			.select('*, profiles!reservations_reserved_for_fkey(email, full_name)');

		if (error) throw error;
		return { success: true, data : data as Afspraak[], error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: handleError(error),
		};
	}
}

export async function setAfspraakToFree(id: string) {
	return updateAfspraakStatus(id, 'free');
}

export async function confirmAfspraak(id: string) {
	return updateAfspraakStatus(id, 'confirmed');
}

export async function createFreeAfspraak(date: Date) {
	try {
		const { client, userId } = await getAuthenticatedClient();
		const { data, error } = await client.from('reservations').insert({
			date: date.toISOString().split('T')[0], // "YYYY-MM-DD"
			time: date.toTimeString().split(' ')[0],
			status: 'free',
			updated_by: userId,
			updated_at: new Date().toISOString(),
		});
		if (error) throw error;
		return { success: true, data, error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: handleError(error),
		};
	}
}

export async function deleteAfspraak(id: string) {
	try {
		const { client } = await getAuthenticatedClient();

		const { error } = await client.from('reservations').delete().eq('id', id);

		if (error) throw error;
		return { success: true, error: null };
	} catch (error) {
		return {
			success: false,
			error: handleError(error),
		};
	}
}

export async function updateAfspraakToPending(
	reservationId: string,
	hulpvraag: string,
) {
	const { userId } = await getAuthenticatedClient();
	return updateAfspraakStatus(reservationId, 'pending', {
		reserved_for: userId,
		notes: hulpvraag,
	});
}
