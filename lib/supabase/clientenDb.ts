import { handleError } from '../utils';
import { createClient } from './server';


export async function getAllClients() {
	try {
		const client = await createClient();
		const { data, error } = await client.from('profiles').select('*');
        if (error) throw error;
        return { success: true, data: data, error: null };

	} catch (error) {
		return { success: false, data: null, error: handleError(error) };
	}
}
