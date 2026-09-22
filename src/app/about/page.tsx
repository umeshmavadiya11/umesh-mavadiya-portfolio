import { About, Philosophy, WorkingStyle } from "@/components/home-sections";
import { ContactCTA } from "@/components/contact-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About", "Meet Umesh Mavadiya, a full-stack developer with 5+ years of professional experience and a thoughtful approach to building reliable digital products.", "/about");
export default function AboutPage() {
  return <main id="main-content" className="standalone-about"><section className="page-hero"><div className="container"><p className="eyebrow"><span>HELLO, I’M UMESH</span> / FULL-STACK DEVELOPER</p><h1>Good software starts<br />with <span>understanding.</span></h1><p>5+ years of professional experience. A full-stack perspective. A genuine interest in building things that make a difference.</p></div></section><About standalone /><WorkingStyle /><Philosophy /><ContactCTA /></main>;
}
