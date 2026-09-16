import Link from 'next/link';
import { db } from '@/lib/prisma';
import PropertyCard from '@/components/PropertyCard';

export const dynamic='force-dynamic';

export default async function Home(){
  const [s,featured,recent,agents]=await Promise.all([
    db.siteSettings.findFirst(),
    db.property.findMany({where:{featured:true,status:{not:'DRAFT'}},orderBy:{createdAt:'desc'},take:6}),
    db.property.findMany({where:{status:{not:'DRAFT'}},orderBy:{createdAt:'desc'},take:8}),
    db.agent.findMany({where:{status:'VERIFIED'},orderBy:{createdAt:'desc'},take:3})
  ]);
  const backgroundMode=s?.heroBackgroundMode||'image';
  const heroVideo=s?.heroVideoUrl||'';
  const heroImage=s?.heroImage||'';
  const configuredTitle=s?.heroTitle||'';
  const titleText=(!configuredTitle||configuredTitle==='Nurture your future home')?'Find Your Perfect|Property Today':configuredTitle.replace(/\n/g,'|');
  const titleParts=titleText.split('|');
  return <main>
    <section className="hero-modern hero-luxury">
      {backgroundMode==='video' && heroVideo ? <video className="hero-media" autoPlay muted loop playsInline poster={heroImage||undefined} aria-hidden="true"><source src={heroVideo}/></video> : heroImage ? <div className="hero-media hero-image" style={{backgroundImage:`url(${heroImage})`}}/> : null}
      <div className="hero-overlay"/>
      <div className="hero-logo-watermark" aria-hidden="true"><img src="/elderz-logo-bg.png" alt=""/></div>
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="eyebrow gold-eyebrow">WELCOME TO ELDERZ REAL ESTATE</div>
          <h1>{titleParts[0]}<br/><span>{titleParts.slice(1).join(' ')}</span></h1>
          <p>{s?.heroSubtitle||'Discover premium properties, trusted agents, and a seamless real estate experience. Your dream home is closer than you think.'}</p>
          <div className="hero-trust-icons"><span><b>♙</b> Trusted Agents<small>Verified &amp; Professional</small></span><span><b>♢</b> Secure Transactions<small>Safe &amp; Transparent</small></span><span><b>⌖</b> Wide Selection<small>Homes, Land &amp; More</small></span></div>
        </div>
      </div>
      <form className="luxury-search container" action="/properties">
        <label><span>⌖</span><small>Location</small><input name="q" placeholder="Search by city or area"/></label>
        <label><span>⌂</span><small>Property Type</small><select name="type" defaultValue=""><option value="">Select type</option><option>House</option><option>Apartment</option><option>Land</option><option>Commercial</option></select></label>
        <label><span>＄</span><small>Price Range</small><input name="price" placeholder="Select range"/></label>
        <label><span>▱</span><small>Bedrooms</small><select name="bedrooms" defaultValue=""><option value="">Select bedrooms</option><option>1+</option><option>2+</option><option>3+</option><option>4+</option><option>5+</option></select></label>
        <button>⌕ Search Properties</button>
      </form>
      <div className="hero-categories container"><Link href="/properties?type=House"><b>⌂</b><span>Houses<small>Modern &amp; Spacious</small></span></Link><Link href="/properties?type=Apartment"><b>▥</b><span>Apartments<small>Comfort &amp; Convenience</small></span></Link><Link href="/properties?type=Land"><b>♧</b><span>Land<small>Build Your Future</small></span></Link><Link href="/properties?type=Commercial"><b>▤</b><span>Commercial<small>Business Opportunities</small></span></Link></div>
    </section>

    <section className="section-modern muted-section"><div className="container"><div className="section-top"><div><div className="eyebrow blue">HANDPICKED</div><h2>Featured properties</h2><p>Standout homes selected for their location and character.</p></div><Link className="text-link" href="/properties">View all →</Link></div><div className="property-rail">{(featured.length?featured:recent).map(p=><PropertyCard key={p.id} p={p}/>)}</div></div></section>

    <section className="section-modern"><div className="container"><div className="section-top"><div><div className="eyebrow blue">JUST ADDED</div><h2>Recent properties</h2><p>New opportunities added to the collection.</p></div><Link className="text-link" href="/properties">Browse →</Link></div><div className="property-rail">{recent.map(p=><PropertyCard key={p.id} p={p}/>)}</div></div></section>

    <section className="agent-strip"><div className="container agent-strip-inner"><div><div className="eyebrow blue">ELDERZ VERIFIED</div><h2>Work with trusted agents.</h2><p>Our verification workflow checks identity, contact details and professional credentials before an agent is published.</p></div><Link className="btn-primary" href="/agents">Meet our agents →</Link></div>{agents.length>0&&<div className="container mini-agents">{agents.map(a=><Link href={`/agents/${a.id}`} className="mini-agent" key={a.id}><div className="mini-avatar">{a.photoUrl?<img src={a.photoUrl} alt=""/>:a.name.slice(0,1)}</div><div><strong>{a.name}</strong><span>✓ Verified agent</span></div></Link>)}</div>}</section>

    <section className="map-section"><div className="container map-grid"><div><div className="eyebrow blue">EXPLORE LOCATIONS</div><h2>Find your next address.</h2><p>Use the map to explore properties by location. Listings with coordinates are automatically reflected here.</p><Link className="btn-primary" href="/properties">Open property map ↗</Link></div><div className="map-placeholder"><div className="map-card"><span>⌖</span><strong>Interactive property map</strong><small>Explore live property markers</small><Link href="/properties">Open map →</Link></div></div></div></section>
  </main>
}
