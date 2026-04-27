'use server';

import { getAuthenticatedClient } from '@/lib/supabase/authQueries';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function setAfspraakToFree(id: string) {
	try {
		const { client, userId } = await getAuthenticatedClient();

		const { data, error } = await client
			.from('reservations')
			.update({
				status: 'free',
				updated_by: userId,
				updated_at: new Date().toISOString(),
				reserved_for: null,
				notes: null,
			})
			.eq('id', id)
			.select();

		if (error) {
			console.log('Error details:', error);
			throw error;
		}

		revalidatePath('/protected/reservaties');
		revalidatePath('/protected/admin');
		return { success: true, data: data, error: null };
	} catch (error) {
		console.log('Catch block error:', error);
		return {
			success: false,
			data: null,
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		};
	}
}

export async function confirmAfspraak(id: string) {
	try {
		const { client, userId } = await getAuthenticatedClient();

		const { data, error } = await client
			.from('reservations')
			.update({
				status: 'confirmed',
				updated_by: userId,
				updated_at: new Date().toISOString(),
			})
			.eq('id', id)
			.select();

		if (error) {
			console.log('Error details:', error);
			throw error;
		}

		revalidatePath('/protected/admin');
		return { success: true, data: data, error: null };
	} catch (error) {
		console.log('Catch block error:', error);
		return {
			success: false,
			data: null,
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		};
	}
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
		revalidatePath('/protected/afspraken');
		return { success: true, data: data, error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: error instanceof Error ? error.message : 'An unkown error occured',
		};
	}
}

export async function deleteAfspraak(id: string) {
	try {
		const { client } = await getAuthenticatedClient();

		const { error } = await client.from('reservations').delete().eq('id', id);

		if (error) throw error;

		revalidatePath('/protected/admin');
		return { success: true, error: null };
	} catch (error) {
		console.log('Catch block error:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		};
	}
}

export async function updateAfspraakToPending(
	reservationId: string,
	hulpvraag: string,
) {
	try {
		const { client, userId } = await getAuthenticatedClient();

		const { error } = await client
			.from('reservations')
			.update({
				status: 'pending',
				reserved_for: userId,
				notes: hulpvraag,
				updated_at: new Date().toISOString(),
			})
			.eq('id', reservationId);

		if (error) throw error;

		revalidatePath('/protected/afspraken');
		return { success: true, error: null };
	} catch (error) {
		console.log(error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		};
	}
}
