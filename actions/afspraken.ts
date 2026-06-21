'use server';

import { Afspraak } from '@/types/reservatie';
import { createClient } from '@/lib/supabase/server';
import { updateGoogleEvent } from '@/lib/google/calendar';
import { sendMailVoorAfspraak } from '@/lib/mailer';
import { revalidatePath } from 'next/cache';


export async function updateAfspraakWithUsernameAction(
	afspraakId: string,
	afspraak: Afspraak,
) {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();
	const username = user?.email || user?.user_metadata?.full_name || 'Unknown';

	return await updateGoogleEvent(afspraakId, afspraak, username);
}

export async function confirmAfspraakAction(afspraak: Afspraak) {
	try {
		const updatedAfspraak = { ...afspraak, status: 'confirmed' as const };
		const result = await updateGoogleEvent(afspraak.id, updatedAfspraak);

		if (result.error) {
			return { success: false, error: result.error };
		}

		await sendMailVoorAfspraak(updatedAfspraak);
		revalidatePath('/protected/afspraken');

		return { success: true };
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Kan afspraak niet bevestigen';
		console.error('confirmAfspraakAction error:', err);
		return { success: false, error: message };
	}
}

export async function setAfspraakToFreeAction(afspraak: Afspraak) {
	try {
		const updatedAfspraak = { ...afspraak, status: 'free' as const, reserved_for: null };
		const result = await updateGoogleEvent(afspraak.id, updatedAfspraak);

		if (result.error) {
			return { success: false, error: result.error };
		}

		await sendMailVoorAfspraak(updatedAfspraak);
		revalidatePath('/protected/afspraken');

		return { success: true };
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Kan afspraak niet vrijmaken';
		console.error('setAfspraakToFreeAction error:', err);
		return { success: false, error: message };
	}
}

export async function deleteAfspraakAction(afspraak: Afspraak) {
	try {
		// For now, treat delete same as setting to free since we're using Google Calendar
		// (permanent deletion would require using Google Calendar API deleteEvent)
		const updatedAfspraak = { ...afspraak, status: 'free' as const, reserved_for: null };
		const result = await updateGoogleEvent(afspraak.id, updatedAfspraak);

		if (result.error) {
			return { success: false, error: result.error };
		}

		revalidatePath('/protected/afspraken');

		return { success: true };
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Kan afspraak niet verwijderen';
		console.error('deleteAfspraakAction error:', err);
		return { success: false, error: message };
	}
}
