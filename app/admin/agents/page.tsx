import {db} from '@/lib/prisma';import {requireAdmin} from '@/lib/auth';import AgentReview from './AgentReview';
export const dynamic='force-dynamic';
export default async function Agents(){await requireAdmin();const agents=await db.agent.findMany({orderBy:{createdAt:'desc'}});return <><div className="sectionhead"><div><h1>Agents & verification</h1><p className="muted">Review applications, inspect documents and decide who can appear on the public agent directory.</p></div><a className="btn" href="/admin/agents/new">Add approved agent</a></div><AgentReview agents={agents}/></>}
