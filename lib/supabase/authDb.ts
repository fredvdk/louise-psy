import { createClient } from './server';

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

export async function getUserProfile() {
	try {
		const client = await createClient();
		const { data: { user }, error: authError } = await client.auth.getUser();

		if (authError) throw authError;
		if (!user) throw new Error('No user found');

		const { data, error: profileError } = await client
			.from('profiles')
			.select('full_name, mobile, address')
			.eq('id', user.id)
			.single();

		if (profileError && profileError.code !== 'PGRST116') {
			throw profileError;
		}

		return {
			success: true,
			data: {
				email: user.email || '',
				full_name: data?.full_name || '',
				mobile: data?.mobile || '',
				address: data?.address || '',
			},
			error: null,
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Failed to load user data';
		return { success: false, data: null, error: message };
	}
}

export async function updateUserProfile(
	full_name: string,
	mobile: string,
	address: string
) {
	try {
		const client = await createClient();
		const { data: { user }, error: authError } = await client.auth.getUser();

		if (authError) throw authError;
		if (!user) throw new Error('No user found');

		const { error: updateError } = await client
			.from('profiles')
			.upsert({
				id: user.id,
				full_name,
				mobile,
				address,
			});

		if (updateError) throw updateError;
		return { success: true, error: null };
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'An error occurred';
		return { success: false, error: message };
	}
}
