import { Info } from "lucide-react";
import { ProjectExplorer } from "@/components/project-explorer";
import { ContactCTA } from "@/components/contact-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Selected Work", "Explore full-stack application concepts, real-time systems, and AI architecture studies by Umesh Mavadiya.", "/work");

export default function WorkPage() {
  return <main id="main-content"><section className="page-hero"><div className="container"><p className="eyebrow"><span>THE PROJECT COLLECTION</span> / THOUGHTFULLY ENGINEERED</p><h1>Good ideas.<br /><span>Built on solid foundations.</span></h1><p>A collection of application concepts and architecture studies. A closer look at the interfaces, systems, and decisions behind a well-engineered product.</p><span className="page-note"><Info size={13} />Illustrative studies—not verified client engagements or measured results.</span></div></section><section className="work-page-content" aria-label="Project collection"><div className="container"><ProjectExplorer /></div></section><ContactCTA /></main>;
}
