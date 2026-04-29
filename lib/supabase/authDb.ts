import { createClient} from './server'

export async function getAuthenticatedClient() {
	const client = await createClient();
	const user = await client.auth.getUser();
	if (!user.data.user?.id) {
		throw new Error('Unauthorized: User not authenticated');
	}

    const role = await client
		.from('profiles')
		.select('role')
		.eq('id', user.data.user?.id);

	return { client, userId: user.data.user.id, role: role };
}

export async function getUserDetails(userId: string) {
	try {
		const client = await createClient();
		const { data, error } = await client
			.from('profiles')
			.select('id, email, full_name, mobile, address, role')
			.eq('id', userId)
			.single();

		if (error) throw error;
		return { success: true, data, error: null };
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'An unknown error occurred';
		return { success: false, data: null, error: message };
	}
}
