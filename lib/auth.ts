import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me');
export async function createSession(userId: string) {
  const token = await new SignJWT({ userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret);
  const store = await cookies();
  store.set('estate_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 });
}
export async function getSession() {
  const token = (await cookies()).get('estate_session')?.value;
  if (!token) return null;
  try { return (await jwtVerify(token, secret)).payload as { userId: string }; } catch { return null; }
}
export async function requireAdmin() { const s = await getSession(); if (!s?.userId) throw new Error('UNAUTHORIZED'); return s; }
export async function clearSession() { (await cookies()).delete('estate_session'); }
