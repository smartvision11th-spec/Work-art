import Link from "next/link";

export function Header() {
  return (
    <header>
      <Link className="logo" href="/">
        ARTIST <span>DIPALI SINGH</span>
      </Link>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/shop">Gallery</Link>
        <Link href="/about">About</Link>
        <Link href="/commission">Commissions</Link>
        <Link href="/cart">Bag</Link>
      </nav>
    </header>
  );
}
