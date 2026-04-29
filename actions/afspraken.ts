'use server';

import {
	setAfspraakToFree,
	confirmAfspraak,
	createFreeAfspraak,
	deleteAfspraak,
	updateAfspraakToPending,
} from '@/lib/supabase/afsprakenDb';
import { revalidatePath } from 'next/cache';

export async function setAfspraakToFreeAction(id: string) {
	const result = await setAfspraakToFree(id);
	if (result.success) {
		revalidatePath('/protected/reservaties');
		revalidatePath('/protected/admin');
	}
	return result;
}

export async function confirmAfspraakAction(id: string) {
	const result = await confirmAfspraak(id);
	if (result.success) {
		revalidatePath('/protected/admin');
	}
	return result;
}

export async function createFreeAfspraakAction(date: Date) {
	const result = await createFreeAfspraak(date);
	if (result.success) {
		revalidatePath('/protected/afspraken');
	}
	return result;
}

export async function deleteAfspraakAction(id: string) {
	const result = await deleteAfspraak(id);
	if (result.success) {
		revalidatePath('/protected/admin');
	}
	return result;
}

export async function updateAfspraakToPendingAction(
	reservationId: string,
	hulpvraag: string,
) {
	const result = await updateAfspraakToPending(reservationId, hulpvraag);
	if (result.success) {
		revalidatePath('/protected/afspraken');
	}
	return result;
}
