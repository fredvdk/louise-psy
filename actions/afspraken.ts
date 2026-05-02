'use server';

import { sendMailVoorAfspraak } from '@/lib/mailer';
import { Afspraak } from '@/types/reservatie';
import {
	setAfspraakToFree,
	confirmAfspraak,
	createFreeAfspraak,
	deleteAfspraak,
	updateAfspraakToPending,
} from '@/lib/supabase/afsprakenDb';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function setAfspraakToFreeAction(id: string) {
	const result = await setAfspraakToFree(id);
	if (result.success) {
		revalidatePath('/protected/reservaties');
		revalidatePath('/protected/admin');
	}
	return result;
}

export async function confirmAfspraakAction(afspraak: Afspraak) {
	const result = await confirmAfspraak(afspraak.id);
	if (result.success) {
		revalidatePath('/protected/admin');
		const emailResult = await sendMailVoorAfspraak(afspraak);
		if (!emailResult.success) {
			console.error('Failed to send confirmation email:', emailResult.error);
		}
	}
	return result;
}

export async function createFreeAfspraakAction(date: Date) {
	const result = await createFreeAfspraak(date);
	if (result.success) {
		revalidatePath('/protected/admin');
	}
	return result;
}

export async function deleteAfspraakAction(afspraak: Afspraak) {
	const result = await deleteAfspraak(afspraak.id);
	if (result.success) {
		sendMailVoorAfspraak(afspraak);
		revalidatePath('/protected/admin');
	}
	return result;
}

export async function updateAfspraakToPendingAction(
	afspraakId: string,
	hulpvraag: string,
) {
	const result = await updateAfspraakToPending(afspraakId, hulpvraag);
	if (result.success && result.data && result.data.length > 0) {
		revalidatePath('/protected/afspraken');
		const afspraak = result.data[0] as Afspraak;
		const emailResult = await sendMailVoorAfspraak(afspraak);
		if (!emailResult.success) {
			console.error('Failed to send pending appointment email:', emailResult.error);
		}
	}
	return result;
}

export async function confirmAllPendingAction() {
	const client = await createClient();

	const { data: pending } = await client
		.from('reservations')
		.select('id')
		.eq('status', 'pending');

	if (!pending || pending.length === 0) {
		console.log('No pending afspraken');
		return { success: true, count: 0 };
	}

	for (const afspraak of pending) {
		await confirmAfspraak(afspraak.id);
	}

	revalidatePath('/protected/admin');
	return { success: true, count: pending.length };
}
