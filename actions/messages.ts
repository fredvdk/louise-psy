'use server';

import { deleteMessage, createMessage } from '@/lib/supabase/messagesDb';
import { revalidatePath } from 'next/cache';

export async function deleteMessageAction(id: string) {
    try {
        const result = await deleteMessage(id);
        if (result.success) {
            revalidatePath('/protected/admin');
        }
        return result;
    } catch (error) {
        return { success: false, error: 'Kon bericht niet verwijderen' };
    }
}

export async function createMessageAction(data: {
    valid_from: string
    valid_till: string
    message: string
}) {
    try {
        const result = await createMessage(
            data.message,
            new Date(data.valid_from),
            new Date(data.valid_till)
        );
        if (result.success) {
            revalidatePath('/protected/admin');
        }
        return result;
    } catch (error) {
        return { success: false, error: 'Fout bij het aanmaken van bericht' };
    }
}