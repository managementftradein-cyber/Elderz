"use client";
import {useState} from 'react';
export default function AgentApplicationForm(){
 const [busy,setBusy]=useState(false),[msg,setMsg]=useState('');
 async function submit(e:any){e.preventDefault();setBusy(true);setMsg('');const fd=new FormData(e.currentTarget);const r=await fetch('/api/agent-applications',{method:'POST',body:fd});const data=await r.json().catch(()=>({}));if(r.ok){e.currentTarget.reset();setMsg('Application submitted. Elderz will review your verification documents and contact you with the result.')}else setMsg(data.error||'Unable to submit application. Please try again.');setBusy(false)}
 return <form className="panel formgrid" onSubmit={submit}>
 <div className="field"><label>Full name *</label><input required name="name"/></div><div className="field"><label>Email *</label><input required type="email" name="email"/></div>
 <div className="field"><label>Phone *</label><input required name="phone"/></div><div className="field"><label>WhatsApp</label><input name="whatsapp"/></div>
 <div className="field"><label>Professional role *</label><input required name="role" placeholder="Real Estate Agent"/></div><div className="field"><label>License / registration number *</label><input required name="licenseNumber"/></div>
 <div className="field"><label>License type / issuing body *</label><input required name="licenseType" placeholder="e.g. state regulator / professional body"/></div><div className="field"><label>Profile photo</label><input type="file" name="photo" accept="image/*"/></div>
 <div className="field full"><label>Short professional bio *</label><textarea required name="bio" rows={5}/></div>
 <div className="field"><label>Government ID *</label><input required type="file" name="governmentId" accept="image/*,.pdf"/></div><div className="field"><label>Professional license *</label><input required type="file" name="licenseDocument" accept="image/*,.pdf"/></div>
 <div className="field"><label>Proof of address</label><input type="file" name="proofAddress" accept="image/*,.pdf"/></div><div className="field"><label>Selfie / profile verification</label><input type="file" name="selfie" accept="image/*"/></div>
 <div className="field full"><label className="check"><input required type="checkbox" name="consent" value="yes"/> I confirm that the information and documents supplied are accurate and I consent to Elderz reviewing them for agent verification.</label></div>
 <div className="field full"><button className="btn gold" disabled={busy}>{busy?'Submitting...':'Submit application'}</button>{msg&&<p className="notice">{msg}</p>}</div>
 </form>
}
