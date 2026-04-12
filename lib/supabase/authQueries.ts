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

export async function getUserDetails(userId: string){
    //TODO: implement
}
