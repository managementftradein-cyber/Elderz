import Link from 'next/link';

export default function Header({name,logoUrl}:{name:string;logoUrl?:string}){
  const logo=logoUrl||'/elderz-logo.png';
  return <header className="site-header">
    <div className="container header-inner">
      <Link className="site-brand" href="/" aria-label={name||'Elderz Real Estate'}>
        <span className="brand-logo"><img src={logo} alt="Elderz Real Estate" /></span>
        <span className="brand-wordmark"><strong>ELDERZ</strong><small>REAL ESTATE</small></span>
      </Link>
      <nav className="main-nav">
        <Link href="/">Home</Link><Link href="/properties">Properties</Link><Link href="/agents">Agents</Link><Link href="/profile">Profile</Link><Link href="/settings">Settings</Link>
      </nav>
      <div className="header-actions"><Link className="signup" href="/contact">Sign up</Link><Link className="account" href="/profile">♙ Account</Link></div>
    </div>
  </header>
}
