import { Message } from '@/types/reservatie';
import { createClient } from './server';

export async function getAllMessages() {
	try {
		const client = await createClient();
		const { data, error } = await client
			.from('messages')
			.select('*')
			.order('valid_from', { ascending: true });

		if (error) throw error;
		return { success: true, messages: data as Message[], error: null };
	} catch (error) {
		return {
			success: false,
			messages: null,
			error:
				error instanceof Error ? error.message : 'An unknown error occured',
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
		return { success: true, messages: data as Message[], error: null };
	} catch (error) {
		return {
			success: false,
			messages: null,
			error:
				error instanceof Error ? error.message : 'An unknown error occured',
		};
	}
}
