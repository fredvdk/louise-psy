import { jwtVerify, createRemoteJWKSet } from 'jose';
import { createAuthenticatedClientFromJWT } from './server';

export interface JWTPayload {
	sub: string;
	email?: string;
	aud?: string;
	exp?: number;
	iss?: string;
}

const jwksUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/.well-known/jwks.json`;
const JWKS = createRemoteJWKSet(new URL(jwksUrl));

export async function areHeadersFromAdmin(
	headersList: Headers,
): Promise<JWTPayload | boolean> {
	const authHeader = headersList.get('Authorization');
	if (!authHeader?.startsWith('Bearer ')) {
		return false;
	}

	const token = authHeader.substring(7);
	const payload = await verifyJWTToken(token);
	console.log('JWT payload:', payload);
	if (!payload.iss?.includes('supabase')) {
		return false;
	}

	const adminStatus = await isAdmin(payload, token);
	if (!adminStatus) {
		return false;
	}

	return payload;
}

async function isAdmin(jwtPayload?: JWTPayload, token?: string): Promise<boolean> {
	const email = jwtPayload?.email;
	if (!email) {
		return false;
	}

	try {
		const client = await createAuthenticatedClientFromJWT(token!);
		const { data, error } = await client
			.from('profiles')
			.select('*')
			.eq('email', email)
			.single();

		if (error) {
			console.error('Error checking admin role:', error);
			return false;
		}

		return data?.role === 'admin';
	} catch (error) {
		console.error('Error verifying admin status:', error);
		return false;
	}
}

async function verifyJWTToken(token: string): Promise<JWTPayload> {
	try {
		const verified = await jwtVerify(token, JWKS);

		if (!verified.payload.iss?.includes('supabase')) {
			throw new Error('Token not issued by Supabase');
		}

		return verified.payload as JWTPayload;
	} catch (error) {
		console.error('JWT verification error:', error);
		throw new Error('Invalid or expired token');
	}
}
