'use server';

import { deleteMessage, createMessage } from '@/lib/supabase/messagesDb';
import { revalidatePath } from 'next/cache';

export async function deleteMessageAction(id: string) {
	const result = await deleteMessage(id);
    if (result.success) {
            revalidatePath('/protected/admin');
        }
    return result;
}

export async function createMessageAction(data: {
	valid_from: string
	valid_till: string
	message: string
}) {
	const result = await createMessage(
		data.message,
		new Date(data.valid_from),
		new Date(data.valid_till)
	);
	if (result.success) {
		console.log('succes creating msg');
		revalidatePath('/protected/admin');
	}
	else console.log(result);
	return result;
}
