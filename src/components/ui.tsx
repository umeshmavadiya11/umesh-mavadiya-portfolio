import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Cloud, Database, Leaf } from "lucide-react";

export function Brand() {
  return <Link className="brand" href="/" aria-label="Umesh Mavadiya, home"><span className="brand-mark" aria-hidden="true">u<span>m</span><i /></span><span>Umesh Mavadiya<span className="brand-period">.</span></span></Link>;
}

export function SectionHeading({ number, label, title, description, children }: { number: string; label: string; title: ReactNode; description?: string; children?: ReactNode }) {
  return <div className="section-heading" data-reveal><div><p className="eyebrow"><span>{number}</span> {label}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>{children && <div className="section-heading-action">{children}</div>}</div>;
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <Link className={`text-link ${className}`} href={href}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>;
}

export function TechnologyMark({ name, size = 18 }: { name: string; size?: number }) {
  if (name === "React") return <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" className="technology-mark react-mark" aria-hidden="true"><circle r="2" fill="currentColor" /><ellipse rx="11" ry="4.3" stroke="currentColor" strokeWidth="1.1" /><ellipse rx="11" ry="4.3" stroke="currentColor" strokeWidth="1.1" transform="rotate(60)" /><ellipse rx="11" ry="4.3" stroke="currentColor" strokeWidth="1.1" transform="rotate(120)" /></svg>;
  if (name === "Next.js") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="technology-mark" aria-hidden="true"><circle cx="12" cy="12" r="10.5" stroke="currentColor" /><path d="M8 17V7l9 12M16 7v7" stroke="currentColor" strokeWidth="1.5" /></svg>;
  if (name === "Node.js") return <svg width={size} height={size} viewBox="0 0 24 24" className="technology-mark node-mark" fill="none" aria-hidden="true"><path d="m12 2 9 5v10l-9 5-9-5V7Z" stroke="currentColor" strokeWidth="1.4" /><text x="6.2" y="15.3" fill="currentColor" fontSize="9" fontWeight="700" fontFamily="monospace">JS</text></svg>;
  if (name === "MongoDB") return <Leaf size={size} className="technology-mark mongo-mark" aria-hidden="true" />;
  if (name === "SQL") return <Database size={size} className="technology-mark" aria-hidden="true" />;
  if (name === "Azure") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="technology-mark azure-mark" aria-hidden="true"><path d="m13 2-8 17H1L9 4Zm2 4 8 16H7l11-2-5-10Z" /></svg>;
  if (name === "AWS") return <svg width={size + 4} height={size} viewBox="0 0 28 24" className="technology-mark aws-mark" aria-hidden="true"><text x="1" y="15" fill="currentColor" fontSize="12" fontFamily="Arial" fontWeight="600">aws</text><path d="M3 18q10 6 21-1m-4 0h4v4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>;
  return <Cloud size={size} aria-hidden="true" />;
}
