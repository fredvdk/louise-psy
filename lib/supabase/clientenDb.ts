import { handleError } from '../utils';
import { getAuthenticatedClient } from './authDb';


export async function getAllClients() {
	try {
		const { client } = await getAuthenticatedClient();
		const { data, error } = await client.from('profiles_with_auth').select('*');
        if (error) throw error;
        return { success: true, data: data, error: null };

	} catch (error) {
		return { success: false, data: null, error: handleError(error) };
	}
}
