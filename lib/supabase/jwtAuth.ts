import { decodeJwt } from 'jose';

export interface JWTPayload {
  sub: string;
  email?: string;
  role?: string;
  aud?: string;
  exp?: number;
  iss?: string;
}

export function verifyJWTToken(token: string): JWTPayload {
  try {
    const decoded = decodeJwt(token);

    // Check expiration
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token has expired');
    }

    // Verify token is from Supabase
    if (!decoded.iss?.includes('supabase')) {
      throw new Error('Token not issued by Supabase');
    }

    return decoded as JWTPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    throw new Error('Invalid or expired token');
  }
}
