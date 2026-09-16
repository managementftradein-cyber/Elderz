"use client";
import {useState} from "react";
export default function SettingsForm({settings}:{settings:any}){
 const[saved,setSaved]=useState(false);const[uploading,setUploading]=useState(false);const[logo,setLogo]=useState(settings?.logoUrl||"");
 async function upload(e:any){const f=e.target.files?.[0];if(!f)return;setUploading(true);const fd=new FormData();fd.append("file",f);const r=await fetch("/api/upload",{method:"POST",body:fd});const d=await r.json();if(r.ok){setLogo(d.url);setSaved(false)}setUploading(false)}
 async function submit(e:any){e.preventDefault();const b=Object.fromEntries(new FormData(e.currentTarget));b.logoUrl=logo;const r=await fetch('/api/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)});if(r.ok)setSaved(true)}
 return <form className="panel form-grid" onSubmit={submit}>
  <Field n="siteName" l="Site name" v={settings?.siteName}/><Field n="tagline" l="Tagline" v={settings?.tagline}/><Field n="email" l="Email" v={settings?.email}/><Field n="phone" l="Phone" v={settings?.phone}/><Field n="address" l="Address" v={settings?.address} full/>
  <Field n="heroTitle" l="Hero title" v={settings?.heroTitle} full/><Field n="heroSubtitle" l="Hero subtitle" v={settings?.heroSubtitle} area full/>
  <label><span>Hero background mode</span><select className="input" name="heroBackgroundMode" defaultValue={settings?.heroBackgroundMode||'image'}><option value="image">Image / luxury still</option><option value="video">Video</option><option value="none">No media — use logo watermark</option></select><small>Choose Video after adding a direct MP4/WebM URL below.</small></label>
  <Field n="heroImage" l="Hero image URL" v={settings?.heroImage} full/><Field n="heroVideoUrl" l="Hero video URL (MP4/WebM)" v={settings?.heroVideoUrl} full/>
  <div className="hero-media-help" style={{gridColumn:'1/-1'}}><strong>Hero media tips</strong><span>Use a short, compressed landscape video. The hero will autoplay muted, loop continuously and show the hero image as a fallback/poster.</span></div>
  <Field n="aboutTitle" l="About title" v={settings?.aboutTitle} full/><Field n="aboutText" l="About text" v={settings?.aboutText} area full/><Field n="facebook" l="Facebook URL" v={settings?.facebook}/><Field n="instagram" l="Instagram URL" v={settings?.instagram}/><Field n="whatsapp" l="WhatsApp" v={settings?.whatsapp}/>
  <label><span>Logo upload</span><input className="input" type="file" accept="image/*" onChange={upload}/><small>{uploading?"Uploading...":logo?"Logo uploaded ✓":"Choose an image"}</small></label>
  <label><span>Primary colour</span><input className="input" type="color" name="primaryColor" defaultValue={settings?.primaryColor||"#0B0F0C"}/></label><label><span>Gold accent</span><input className="input" type="color" name="secondaryColor" defaultValue={settings?.secondaryColor||"#C8A94B"}/></label><label><span>Red accent</span><input className="input" type="color" name="redColor" defaultValue={settings?.redColor||"#B42318"}/></label><label><span>Currency</span><select className="input" name="currencyMode" defaultValue={settings?.currencyMode||"NGN_USD"}><option value="NGN_USD">₦ and $</option><option value="NGN">₦ only</option><option value="USD">$ only</option></select></label>
  <div style={{gridColumn:"1/-1"}}><button className="btn gold">Save settings</button>{saved&&<span style={{marginLeft:12}}>Saved ✓</span>}</div>
 </form>
}
function Field({n,l,v,area=false,full=false}:{n:string,l:string,v?:string,area?:boolean,full?:boolean}){return <label style={full?{gridColumn:"1/-1"}:{}}><span>{l}</span>{area?<textarea className="input" name={n} defaultValue={v} rows={5}/>:<input className="input" name={n} defaultValue={v}/>}</label>}
