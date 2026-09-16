'use client';
import {useEffect,useState} from 'react';

type Choice='accepted'|'rejected'|'custom';
export default function CookieConsent(){
 const [visible,setVisible]=useState(false); const [prefs,setPrefs]=useState(false); const [analytics,setAnalytics]=useState(false); const [marketing,setMarketing]=useState(false);
 useEffect(()=>{try{if(!localStorage.getItem('elderz_cookie_consent'))setVisible(true)}catch{setVisible(true)}},[]);
 const save=(choice:Choice)=>{try{localStorage.setItem('elderz_cookie_consent',JSON.stringify({choice,analytics,marketing,necessary:true,savedAt:new Date().toISOString()}))}catch{} setVisible(false);setPrefs(false)};
 if(!visible)return null;
 return <div className="cookie-layer" role="dialog" aria-label="Cookie preferences">
  {!prefs?<div className="cookie-banner"><div><strong>We value your privacy</strong><p>We use necessary cookies to keep Elderz secure and remember your preferences. Optional analytics or marketing cookies are only used if you allow them.</p><div className="cookie-links"><a href="/privacy">Privacy Policy</a><a href="/cookies">Cookie Policy</a></div></div><div className="cookie-actions"><button className="cookie-secondary" onClick={()=>setPrefs(true)}>Customize</button><button className="cookie-secondary" onClick={()=>save('rejected')}>Reject optional</button><button className="cookie-primary" onClick={()=>save('accepted')}>Accept all</button></div></div>
  :<div className="cookie-modal"><div className="cookie-modal-head"><div><div className="eyebrow blue">Privacy controls</div><h2>Cookie preferences</h2></div><button className="cookie-x" onClick={()=>setPrefs(false)} aria-label="Close">×</button></div><p className="muted">Choose which optional cookies you want to allow. Necessary cookies cannot be switched off because they support core site functions.</p><label className="cookie-option"><span><strong>Necessary cookies</strong><small>Security, login sessions and essential preferences.</small></span><input type="checkbox" checked readOnly/></label><label className="cookie-option"><span><strong>Analytics cookies</strong><small>Help us understand how visitors use the site so we can improve it.</small></span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label><label className="cookie-option"><span><strong>Marketing cookies</strong><small>Used only for optional campaign and personalization features.</small></span><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)}/></label><div className="cookie-actions cookie-actions-end"><button className="cookie-secondary" onClick={()=>save('rejected')}>Reject optional</button><button className="cookie-primary" onClick={()=>save('custom')}>Save preferences</button></div></div>}
 </div>
}
