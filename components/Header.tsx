import Link from 'next/link';
export default function Header({name,logoUrl}:{name:string;logoUrl?:string}){
  return <header className="site-header"><div className="container header-inner">
    <Link className="site-brand" href="/"><span className="brand-mark">E</span><span>{name||'Elderz Real Estate'}</span></Link>
    <nav className="main-nav"><Link href="/">Home</Link><Link href="/properties">Properties</Link><Link href="/agents">Agents</Link><Link href="/profile">Profile</Link><Link href="/settings">Settings</Link></nav>
    <div className="header-actions"><Link className="signup" href="/contact">Sign up</Link><Link className="account" href="/profile">♙ Account</Link></div>
  </div></header>
}
