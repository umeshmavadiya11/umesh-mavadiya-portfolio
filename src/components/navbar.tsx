"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/ui";
import { navigation } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-20% 0px -60% 0px" });
    navigation.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); toggleRef.current?.focus(); }
        else if (event.shiftKey && document.activeElement === toggleRef.current) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggleRef.current?.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 900) setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); window.removeEventListener("resize", onResize); };
  }, [open]);

  function href(id: string) { return id === "contact" ? "/contact" : `/#${id}`; }
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><div className="container header-inner"><Brand /><nav aria-label="Main navigation" className="desktop-nav">{navigation.map((item) => <Link href={href(item.id)} key={item.id} className={(pathname === "/" && active === item.id) || pathname === `/${item.id}` ? "nav-active" : ""} aria-current={pathname === `/${item.id}` ? "page" : undefined}>{item.label}</Link>)}</nav><Link className="button button-dark header-action" href="/contact">Let’s work together <ArrowUpRight size={16} aria-hidden="true" /></Link><button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} ref={toggleRef}>{open ? <X /> : <Menu />}</button></div>{open && <div className="mobile-menu" id="mobile-navigation" ref={panelRef}><nav aria-label="Mobile navigation">{navigation.map((item, index) => <Link href={href(item.id)} key={item.id} onClick={() => setOpen(false)}><span className="mono">0{index + 1}</span>{item.label}<ArrowUpRight size={22} /></Link>)}<Link className="button button-dark" href="/contact" onClick={() => setOpen(false)}>Let’s work together <ArrowUpRight size={18} /></Link></nav><p><span className="status-dot" /> Open to meaningful collaborations</p></div>}</header>;
}
