import { Services, FAQ } from "@/components/home-sections";
import { ContactCTA } from "@/components/contact-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Services", "Frontend and full-stack development, REST APIs, application modernization, performance optimization, and cloud deployment with Umesh Mavadiya.", "/services");
export default function ServicesPage() {
  return <main id="main-content"><section className="page-hero"><div className="container"><p className="eyebrow"><span>YOUR NEXT TECHNICAL PARTNER</span> / FROM IDEA TO PRODUCTION</p><h1>The right experience.<br /><span>Where you need it.</span></h1><p>End-to-end product development or focused help with one piece of the puzzle. A practical, considered approach to moving your application forward.</p></div></section><Services standalone /><FAQ /><ContactCTA /></main>;
}
