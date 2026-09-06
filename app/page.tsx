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
  return <main>
    <section className="hero-modern">
      <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow blue">✣ CURATED REAL ELDERZ REAL ESTATE</div>
          <h1>Find a place<br/>that feels <em>right.</em></h1>
          <p>Discover beautiful homes, apartments and investment properties in the places that matter to you.</p>
          <form className="hero-search" action="/properties">
            <span className="search-icon">⌕</span><input name="q" placeholder="Search by city, neighbourhood or property"/><button>⌕ Search</button>
          </form>
          <div className="trust-row"><span>● Verified listings</span><span>● Expert support</span><span>● Secure requests</span></div>
        </div>
      </div>
    </section>

    <section className="section-modern muted-section">
      <div className="container">
        <div className="section-top"><div><div className="eyebrow blue">HANDPICKED</div><h2>Featured properties</h2><p>Standout homes selected for their location and character.</p></div><Link className="text-link" href="/properties">View all →</Link></div>
        <div className="property-rail">{(featured.length?featured:recent).map(p=><PropertyCard key={p.id} p={p}/>)}</div>
      </div>
    </section>

    <section className="section-modern">
      <div className="container">
        <div className="section-top"><div><div className="eyebrow blue">JUST ADDED</div><h2>Recent properties</h2><p>New opportunities added to the collection.</p></div><Link className="text-link" href="/properties">Browse →</Link></div>
        <div className="property-rail">{recent.map(p=><PropertyCard key={p.id} p={p}/>)}</div>
      </div>
    </section>

    <section className="agent-strip"><div className="container agent-strip-inner"><div><div className="eyebrow blue">ELDERZ VERIFIED</div><h2>Work with trusted agents.</h2><p>Our verification workflow checks identity, contact details and professional credentials before an agent is published.</p></div><Link className="btn-primary" href="/agents">Meet our agents →</Link></div>{agents.length>0&&<div className="container mini-agents">{agents.map(a=><Link href="/agents" className="mini-agent" key={a.id}><div className="mini-avatar">{a.photoUrl?<img src={a.photoUrl} alt=""/>:a.name.slice(0,1)}</div><div><strong>{a.name}</strong><span>✓ Verified agent</span></div></Link>)}</div>}</section>

    <section className="map-section"><div className="container map-grid"><div><div className="eyebrow blue">EXPLORE LOCATIONS</div><h2>Find your next address.</h2><p>Use the map to explore properties by location. Listings with coordinates are automatically reflected here.</p><Link className="btn-primary" href="/properties">Open property map ↗</Link></div><div className="map-placeholder"><div className="map-card"><span>⌖</span><strong>Interactive property map</strong><small>Explore live property markers</small><Link href="/properties">Open map →</Link></div></div></div></section>
  </main>
}
