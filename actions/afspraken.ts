'use server';

import { sendMailVoorAfspraak } from '@/lib/mailer';
import { Afspraak } from '@/types/reservatie';
import {
	setAfspraakToFree,
	confirmAfspraak,
	createFreeAfspraak,
	deleteAfspraak,
	updateAfspraakToPending,
	getAllPendingAfspraken,
} from '@/lib/supabase/afsprakenDb';
import { revalidatePath } from 'next/cache';

export async function setAfspraakToFreeAction(afspraak: Afspraak) {
	const result = await setAfspraakToFree(afspraak.id);
	if (result.success) {
		revalidatePath('/protected/reservaties');
		revalidatePath('/protected/admin');
		if (result.data && result.data.length > 0) {
			const temp_afspraak = afspraak;
			temp_afspraak.status = "free";
			const emailResult = await sendMailVoorAfspraak(temp_afspraak);
			if (!emailResult.success) {
				console.error('Failed to send confirmation email:', emailResult.error);
			}
		}
	}
	return result;
}

export async function confirmAfspraakAction(afspraak: Afspraak) {
	const result = await confirmAfspraak(afspraak.id);
	if (result.success) {
		revalidatePath('/protected/admin');
		if (result.data && result.data.length > 0) {
			const emailResult = await sendMailVoorAfspraak(result.data[0]);
			if (!emailResult.success) {
				console.error('Failed to send confirmation email:', emailResult.error);
			}
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
			console.error(
				'Failed to send pending appointment email:',
				emailResult.error,
			);
		}
	}
	return result;
}

export async function confirmAllPendingAction() {
	const result = await getAllPendingAfspraken();
	if (result.success && result.data != null) {
		for (const afspraak of result.data) {
			await confirmAfspraakAction(afspraak);
		}
		revalidatePath('/protected/admin');
		return { success: true };
	}
	return result;
}
