import { getAuthenticatedClient } from './authQueries';

export async function getAlleAfsprakenVoorUser() {
	try {
        const { client, userId } = await getAuthenticatedClient();
        const { data, error } = await client.from('reservations').select('*').eq('reserved_for', userId)
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
