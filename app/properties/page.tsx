import { db } from '@/lib/prisma';import PropertyCard from '@/components/PropertyCard';
export const dynamic='force-dynamic';
export default async function Properties(){const ps=await db.property.findMany({where:{status:{not:'DRAFT'}},orderBy:{createdAt:'desc'}});return <main className="section"><div className="container"><div className="eyebrow">Listings</div><h1>All properties</h1><div className="grid" style={{marginTop:30}}>{ps.map(p=><PropertyCard key={p.id} p={p}/>)}</div></div></main>}
