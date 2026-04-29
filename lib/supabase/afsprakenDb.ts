import { Afspraak } from '@/types/reservatie';
import { getAuthenticatedClient } from './authDb';
import { createClient } from './server';

function handleError(error: unknown): string {
	return error instanceof Error ? error.message : 'An unknown error occurred';
}

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
		return { success: true, data, error: null };
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
			error: handleError(error),
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

async function updateAfspraakStatus(
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
			.select();

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
			date: date.getDate().toString(),
			time: date.getTime().toString(),
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
