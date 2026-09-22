import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Enhancements } from "@/components/enhancements";
import { site } from "@/lib/site";
import "./globals.css";

// const manrope = localFont({ src: "../../public/fonts/manrope-latin.woff2", variable: "--font-heading", display: "swap", weight: "400 800" });
// const dmSans = localFont({ src: "../../public/fonts/dm-sans-latin.woff2", variable: "--font-body", display: "swap", weight: "400 700" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Umesh Mavadiya | Full-Stack Developer", template: "%s | Umesh Mavadiya" },
  description: site.description,
  applicationName: "Umesh Mavadiya — Portfolio",
  authors: [{ name: site.name }],
  keywords: ["Umesh Mavadiya", "Full-Stack Developer", "React Developer", "Next.js", "TypeScript", "Node.js", "Freelance Developer", "Contra"],
  openGraph: { siteName: site.name, locale: "en_US", type: "website", title: "Umesh Mavadiya | Full-Stack Developer", description: site.description },
  twitter: { card: "summary_large_image", title: "Umesh Mavadiya | Full-Stack Developer", description: site.description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f8f7f4" };

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "Person", "@id": `${site.url}/#person`, name: site.name, jobTitle: site.role, url: site.url, description: site.description, knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "SQL", "AWS", "Azure"] }, { "@type": "WebSite", name: site.name, url: site.url, author: { "@id": `${site.url}/#person` } }] };
  return <html lang="en"><body id="top"><a href="#main-content" className="skip-link">Skip to main content</a><Navbar />{children}<Footer /><Enhancements /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></body></html>;
}
