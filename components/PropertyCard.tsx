import Link from 'next/link';
export default function PropertyCard({p}:{p:any}){
 const label=String(p.status||'FOR_SALE').replace('_',' ').toLowerCase();
 return <article className="property-card"><div className="property-image-wrap"><img src={p.imageUrl||'/elderz-logo.png'} alt={p.title}/>{p.featured&&<span className="featured-badge">FEATURED</span>}<button className="heart" aria-label="Save property">♡</button><span className="sale-badge">{label.includes('rent')?'rent':'sale'}</span></div><div className="property-body"><div className="property-type">{p.type||'PROPERTY'}</div><h3>{p.title}</h3><div className="location">⌖ {p.location}</div><div className="property-meta"><span>▱ {p.bedrooms||0}</span><span>♧ {p.bathrooms||0}</span><span>◌ {Number(p.area||0).toLocaleString()} sqft</span></div><div className="property-bottom"><strong>{p.currency==='NGN'?'₦':p.currency||'$'}{Number(p.price||0).toLocaleString()}</strong><Link href={`/properties/${p.slug}`}>›</Link></div></div></article>
}
