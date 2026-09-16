import './globals.css';
import { db } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
export const dynamic='force-dynamic';
export default async function RootLayout({children}:{children:React.ReactNode}){const s=await db.siteSettings.findFirst();return <html lang="en"><body><Header name={s?.siteName||'Your Estate'} logoUrl={s?.logoUrl||'/elderz-logo.png'}/>{children}<Footer name={s?.siteName||'Your Estate'} email={s?.email||''} phone={s?.phone||''} address={s?.address||''}/><Chatbot/></body></html>}
