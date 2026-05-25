import { jwtVerify, createRemoteJWKSet } from 'jose';

export interface JWTPayload {
  sub: string;
  email?: string;
  aud?: string;
  exp?: number;
  iss?: string;
}

const jwksUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/.well-known/jwks.json`;
const JWKS = createRemoteJWKSet(new URL(jwksUrl));

export async function verifyJWTToken(token: string): Promise<JWTPayload> {
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
