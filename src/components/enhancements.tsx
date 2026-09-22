"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Enhancements() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px 50px 0px" });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight + 40) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    return () => { observer.disconnect(); document.querySelectorAll(".reveal-pending").forEach((element) => element.classList.remove("reveal-pending")); };
  }, [pathname]);
  return null;
}
