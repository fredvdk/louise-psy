'use server';

import { getAuthenticatedClient } from '@/lib/supabase/authQueries';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateAfspraakStatus(id: string, newStatus: string) {
	try {
		const { client, userId } = await getAuthenticatedClient();
		const { data, error } = await client
			.from('reservations')
			.update({
				status: newStatus,
				updated_by: userId,
				updated_at: new Date().toISOString(),
			})
			.eq('id', id);
		if (error) throw error;
		revalidatePath('/protected/reservaties');
		return { success: true, data: data, error: null };
	} catch (error) {
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
	const client = await createClient();
	const { error } = await client.from('reservations').delete().eq('id', id);
	if (error) {
		console.log('Error while deleting : ', error);
	}
}
