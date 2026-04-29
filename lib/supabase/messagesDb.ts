import { Message } from '@/types/reservatie';
import { getAuthenticatedClient } from './authDb';
import { createClient } from './server';

function handleError(error: unknown): string {
	return error instanceof Error ? error.message : 'An unknown error occurred';
}

export async function createMessage(
	message: string,
	validFrom: Date,
	validTill: Date,
) {
	try {
		const { client, userId } = await getAuthenticatedClient();
		const { data, error } = await client.from('messages').insert({
			message,
			valid_from: validFrom.toISOString().split('T')[0],
			valid_till: validTill.toISOString().split('T')[0],
			created_at: new Date().toISOString(),
			created_by: userId,
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

export async function updateMessage(
	id: string,
	message: string,
	validFrom: Date,
	validTill: Date,
) {
	try {
		const { client, userId } = await getAuthenticatedClient();
		const { data, error } = await client
			.from('messages')
			.update({
				message,
				valid_from: validFrom.toISOString().split('T')[0],
				valid_till: validTill.toISOString().split('T')[0],
				updated_at: new Date().toISOString(),
				updated_by: userId,
			})
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

export async function deleteMessage(id: string) {
	try {
		const { client } = await getAuthenticatedClient();
		const { error } = await client.from('messages').delete().eq('id', id);

		if (error) throw error;
		return { success: true, error: null };
	} catch (error) {
		return {
			success: false,
			error: handleError(error),
		};
	}
}

export async function getMessageById(id: string) {
	try {
		const client = await createClient();
		const { data, error } = await client
			.from('messages')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw error;
		return { success: true, data: data as Message, error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: handleError(error),
		};
	}
}

export async function getAllMessages() {
	try {
		const client = await createClient();
		const { data, error } = await client
			.from('messages')
			.select('*')
			.order('valid_from', { ascending: true });

		if (error) throw error;
		return { success: true, data: data as Message[], error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: handleError(error),
		};
	}
}

export async function getAllMessagesForToday() {
	try {
		const client = await createClient();
		const today = new Date().toISOString().split('T')[0];
		const { data, error } = await client
			.from('messages')
			.select('*')
			.lte('valid_from', today)
			.gte('valid_till', today);

		if (error) throw error;
		return { success: true, data: data as Message[], error: null };
	} catch (error) {
		return {
			success: false,
			data: null,
			error: handleError(error),
		};
	}
}
