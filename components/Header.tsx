import Link from 'next/link';

export default function Header({name,logoUrl}:{name:string;logoUrl?:string}){
  return <header className="nav"><div className="container navinner">
    <Link className="brand" href="/">
      {logoUrl ? <img src={logoUrl} alt={name||'Elderz Real Estate'} className="brandlogo"/> : <span>{name || 'Elderz Real Estate'}<b>.</b></span>}
    </Link>
    <nav className="navlinks">
      <Link href="/properties">Properties</Link><Link href="/agents">Agents</Link><Link href="/#about">About</Link><Link href="/contact">Contact</Link><Link className="btn" href="/contact">Book a viewing</Link>
    </nav>
  </div></header>
}
