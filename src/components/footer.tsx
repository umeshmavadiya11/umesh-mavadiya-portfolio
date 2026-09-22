import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Brand } from "@/components/ui";
import { profiles } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer"><div className="container"><div className="footer-main"><div><Brand /><p>Thoughtful engineering.<br />Reliable digital products.</p></div><div className="footer-links"><div><span className="footer-label">EXPLORE</span><Link href="/#work">Work</Link><Link href="/#about">About</Link><Link href="/#services">Services</Link><Link href="/contact">Contact</Link></div><div><span className="footer-label">ELSEWHERE</span>{Object.entries(profiles).map(([label, href]) => <Link href={href} key={label} target={href.startsWith("https") ? "_blank" : undefined} rel={href.startsWith("https") ? "noopener noreferrer" : undefined}>{label === "github" ? "GitHub" : label === "linkedin" ? "LinkedIn" : "Contra"}<ArrowUpRight size={13} aria-hidden="true" /></Link>)}</div></div><a className="back-to-top" href="#top" aria-label="Back to top"><ArrowUp size={19} /><span>Back to top</span></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Umesh Mavadiya</span><span className="footer-stack">React · Next.js · Node.js · MongoDB · AWS · Azure</span><Link href="/privacy">Privacy</Link><span className="built-with">Built with care <span>↗</span></span></div></div></footer>
  );
}
