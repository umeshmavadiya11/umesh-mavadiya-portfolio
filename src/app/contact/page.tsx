import Link from "next/link";
import { ArrowUpRight, MessageCircle, ShieldCheck, Workflow } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/metadata";
import { profiles } from "@/lib/site";
import { projectTypes } from "@/lib/contact";
import { projects } from "@/data/projects";

export const metadata = pageMetadata("Let’s Work Together", "Have a product idea, an existing application, or a technical challenge? Start a project conversation with full-stack developer Umesh Mavadiya.", "/contact");
type Props = { searchParams: Promise<{ service?: string; project?: string; channel?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams;
  const project = projects.find((item) => item.slug === query.project);
  const service = projectTypes.find((item) => item === query.service) || (project ? "Full-Stack Development" : "");
  const initialMessage = project ? `I’d like to discuss a project similar to the ${project.title}. Here’s what I have in mind: ` : "";
  const benefits = [{ icon: MessageCircle, title: "A real conversation", description: "We start with the problem, not a sales pitch." }, { icon: Workflow, title: "A clear way forward", description: "An honest discussion of scope, fit, and next steps." }, { icon: ShieldCheck, title: "Thoughtful ownership", description: "A partner who considers the whole product." }];
  return <main id="main-content" className="contact-page"><section className="page-hero"><div className="container"><p className="eyebrow"><span className="status-dot" /> OPEN TO MEANINGFUL COLLABORATIONS</p><h1>Good things start<br />with a <span>conversation.</span></h1><p>A product idea. A team that needs another pair of experienced hands. An application that could work better. Tell me about it.</p></div></section><div className="container contact-layout"><div className="contact-intro"><p>I partner with founders, startups, agencies, and established teams to build reliable digital products—from architecture to the final deploy.</p><div className="contact-benefits">{benefits.map(({ icon: Icon, title, description }) => <div key={title} className="contact-benefit"><span><Icon size={18} strokeWidth={1.5} /></span><div><h2>{title}</h2><p>{description}</p></div></div>)}</div><div className="contact-contra"><span aria-hidden="true">✳</span><h2>Prefer to work through Contra?</h2><p>That works, too. Mention Contra in your project brief so we can discuss arranging the engagement there.</p><Link className="text-link" href={profiles.contra.startsWith("https") ? profiles.contra : "/contact?channel=contra#project-form"} target={profiles.contra.startsWith("https") ? "_blank" : undefined} rel={profiles.contra.startsWith("https") ? "noopener noreferrer" : undefined}>{profiles.contra.startsWith("https") ? "View my Contra profile" : "Discuss a Contra project"}<ArrowUpRight size={15} /></Link></div></div><div>{query.channel === "contra" && !profiles.contra.startsWith("https") && <p className="channel-notice" role="status">The direct Contra profile link hasn’t been published yet. You can still share your brief here and request the verified profile for your engagement.</p>}{query.channel === "github" && !profiles.github.startsWith("https") && <p className="channel-notice" role="status">A verified public GitHub profile hasn’t been published here yet. Tell me what kind of code samples or technical walkthrough you’d like to see.</p>}<ContactForm initialProjectType={service} initialMessage={initialMessage} source={project ? `project:${project.slug}` : query.channel === "contra" || query.channel === "github" ? query.channel : service ? `service:${service}` : "website"} /></div></div></main>;
}
