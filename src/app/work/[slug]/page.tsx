import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";
import { ProjectPreview } from "@/components/project-preview";
import { ContactCTA } from "@/components/contact-cta";
import { projects, projectDisclosure } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return pageMetadata("Project not found", "Explore Umesh Mavadiya’s project collection.", "/work");
  return pageMetadata(project.title, `${project.description} An illustrative architecture study by Umesh Mavadiya.`, `/work/${slug}`);
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];
  const sections = [{ id: "overview", label: "The challenge" }, { id: "solution", label: "Proposed solution" }, { id: "scope", label: "Engineering scope" }, { id: "technology", label: "The stack" }, { id: "architecture", label: "Architecture" }, { id: "challenges", label: "Key decisions" }, { id: "outcomes", label: "Intended outcomes" }];
  const jsonLd = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: `Illustrative architecture study: ${project.description}`, genre: "Software architecture concept", author: { "@type": "Person", name: "Umesh Mavadiya" }, url: `${site.url}/work/${project.slug}`, keywords: project.technologies.join(", ") };
  return <main id="main-content"><section className="case-hero"><div className="container"><Link href="/work" className="back-link"><ArrowLeft size={14} />Back to all work</Link><p className="eyebrow"><span>{project.eyebrow}</span> / ARCHITECTURE STUDY</p><h1>{project.title}<span className="orange-period">.</span></h1><p className="case-hero-description">{project.description}</p><div className="case-meta"><div><span>DISCIPLINE</span><strong>{project.category}</strong></div><div><span>PROJECT TYPE</span><strong>Illustrative concept</strong></div><div><span>FOCUS</span><strong>Architecture & implementation plan</strong></div><Link href={`/contact?project=${project.slug}`} className="button button-dark">Build something like this <ArrowUpRight size={15} /></Link></div></div></section><div className="container case-preview-container"><ProjectPreview variant={project.preview} large /><div className="case-disclosure"><Info size={15} /><p>{projectDisclosure}</p></div></div><div className="container"><div className="case-content-layout"><aside className="case-toc"><span>IN THIS STUDY</span><nav aria-label="Case study sections">{sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}</nav></aside><article className="case-content"><section id="overview"><span className="case-section-label">01 / UNDERSTANDING THE PROBLEM</span><h2>The challenge.</h2><p>{project.problem}</p></section><section id="solution"><span className="case-section-label">02 / A CONSIDERED APPROACH</span><h2>The proposed solution.</h2><p>{project.solution}</p></section><section id="scope"><span className="case-section-label">03 / FROM PLAN TO IMPLEMENTATION</span><h2>Engineering scope.</h2><ul className="scope-list">{project.responsibilities.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul></section><section id="technology"><span className="case-section-label">04 / THE RIGHT TOOLS</span><h2>The stack.</h2><div className="case-tech">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></section><section id="architecture"><span className="case-section-label">05 / UNDER THE HOOD</span><h2>One connected system.</h2><div className="case-architecture">{project.architecture.map((node, nodeIndex) => <div className="case-architecture-node" key={node.title}><span>0{nodeIndex + 1}</span><div><h3>{node.title}</h3><p>{node.detail}</p></div>{nodeIndex < project.architecture.length - 1 && <ArrowDown size={16} />}</div>)}</div></section><section id="challenges"><span className="case-section-label">06 / THE DETAILS MATTER</span><h2>Key engineering decisions.</h2><div className="challenge-list">{project.challenges.map((challenge) => <div key={challenge.title}><h3>{challenge.title}</h3><p>{challenge.description}</p></div>)}</div></section><section id="outcomes"><span className="case-section-label">07 / WHAT GOOD LOOKS LIKE</span><h2>Intended outcomes.</h2><p className="outcome-note">These are design goals for this concept, not measured or delivered project results.</p><ul className="scope-list">{project.outcomes.map((outcome) => <li key={outcome}><Check size={14} />{outcome}</li>)}</ul></section></article></div><Link className="next-project" href={`/work/${nextProject.slug}`}><div><span>KEEP EXPLORING / NEXT STUDY</span><h2>{nextProject.title}</h2></div><ArrowUpRight size={26} /></Link></div><ContactCTA /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></main>;
}
