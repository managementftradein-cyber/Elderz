import './globals.css';
import { db } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import CookieConsent from '@/components/CookieConsent';
export const dynamic='force-dynamic';
export default async function RootLayout({children}:{children:React.ReactNode}){const s=await db.siteSettings.findFirst();return <html lang="en"><body><div className="global-logo-watermark" aria-hidden="true"><img src="/elderz-logo-bg.png" alt=""/></div><Header name={s?.siteName||'Elderz Real Estate'} logoUrl={s?.logoUrl||'/elderz-logo.png'}/><div className="site-content">{children}</div><Footer name={s?.siteName||'Elderz Real Estate'} email={s?.email||''} phone={s?.phone||''} address={s?.address||''}/><Chatbot/><CookieConsent/></body></html>}
