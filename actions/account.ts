'use server';

import { getUserProfile, updateUserProfile } from '@/lib/supabase/authDb';

export async function getUserProfileAction() {
	return await getUserProfile();
}

export async function updateAccountAction(
	full_name: string,
	mobile: string,
	address: string
) {
	const result = await updateUserProfile(full_name, mobile, address);
	return result;
}
