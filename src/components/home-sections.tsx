import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Blocks, Braces, BriefcaseBusiness, Check, ChevronDown, Cloud, Code2, CodeXml, Database, Gauge, GitBranch, Layers, MessageCircle, Monitor, RefreshCw, ShieldCheck, Terminal, Timer, Workflow } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { SectionHeading, TechnologyMark, TextLink } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { projects } from "@/data/projects";
import { engineeringSkills, faqs, processSteps, services, skillGroups, workingStyles } from "@/data/content";

export function Hero() {
  return <section className="hero"><div className="container hero-inner"><div className="hero-copy"><div className="availability entrance"><span className="status-dot" /><span>Open to freelance & contract opportunities</span></div><h1 className="entrance entrance-1">I build scalable,<br /><span>high-performance</span><br />web applications.</h1><p className="hero-description entrance entrance-2">Full-Stack Developer with <strong>5+ years of experience</strong> building modern web applications, scalable architectures, and reliable cloud-based solutions.</p><div className="hero-technologies entrance entrance-3" aria-label="Core technologies">{["React", "Next.js", "Node.js", "MongoDB", "SQL", "AWS", "Azure"].map((name) => <span key={name}><TechnologyMark name={name} size={15} />{name}</span>)}</div><div className="hero-actions entrance entrance-4"><Link href="#work" className="button button-dark">View my work <ArrowDown size={16} /></Link><Link href="/contact" className="button button-outline">Let’s work together <ArrowUpRight size={17} /></Link></div><div className="hero-footnote entrance entrance-4"><CodeXml size={15} /><span>From the first idea to the final deploy.</span></div></div><div className="hero-visual entrance entrance-3"><HeroScene /></div></div></section>;
}

export function ProfessionalProof() {
  const stats = [{ icon: BriefcaseBusiness, title: "5+ years", subtitle: "Professional experience" }, { icon: Layers, title: "Full-stack", subtitle: "Frontend to backend" }, { icon: Blocks, title: "Modern stack", subtitle: "React, Node.js & cloud" }, { icon: ShieldCheck, title: "Production-focused", subtitle: "Performance. Quality. Scale." }];
  return <section className="professional-proof" aria-label="Professional experience"><div className="container proof-grid">{stats.map(({ icon: Icon, title, subtitle }) => <div className="proof-stat" key={title}><Icon size={22} strokeWidth={1.5} /><div><strong>{title}</strong><span>{subtitle}</span></div></div>)}</div></section>;
}

export function FeaturedWork() {
  return <section className="section selected-work" id="work"><div className="container"><SectionHeading number="01" label="A FEW THINGS I CAN BUILD" title={<>Selected work<span className="orange-period">.</span></>} description="Thoughtful interfaces. Solid architecture. Purposeful engineering."><TextLink href="/work">Explore all projects</TextLink></SectionHeading><div className="projects-grid">{projects.filter((project) => project.featured).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div><div className="work-disclosure"><span className="small-plus">+</span><p>Illustrative project concepts & architecture studies. No client or measured outcome claims.</p><span className="mono">BUILT AROUND REAL-WORLD CHALLENGES</span></div></div></section>;
}

const skillIcons = { frontend: Monitor, backend: Braces, database: Database, cloud: Cloud };
export function Expertise() {
  return <section className="expertise-section section" id="expertise"><div className="container"><div className="expertise-layout"><div className="expertise-intro" data-reveal><p className="eyebrow"><span>02</span> THE TOOLKIT</p><h2>The right tools.<br />The right<br /><span>foundations.</span></h2><p>A modern stack is only the starting point. It’s how the pieces fit together that makes a product work.</p><div className="expertise-signature"><CodeXml size={34} strokeWidth={1.3} /><span>One engineer.<br /><strong>The complete picture.</strong></span></div></div><div className="skill-groups">{skillGroups.map((group) => { const Icon = skillIcons[group.icon as keyof typeof skillIcons]; return <div className="skill-group" data-reveal key={group.title}><div className="skill-group-heading"><Icon size={20} strokeWidth={1.5} /><h3>{group.title}</h3></div><p>{group.description}</p><div className="skill-badges">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>; })}</div></div><div className="engineering-row"><span>ENGINEERING, FIRST.</span><div>{engineeringSkills.map((skill) => <span key={skill}><Check size={11} />{skill}</span>)}</div></div></div></section>;
}

export function Philosophy() {
  return <section className="section philosophy-section"><div className="container"><SectionHeading number="03" label="HOW I THINK" title={<>More than just<br />writing code.</>}><p className="heading-side-copy">Good software starts with the right questions. I connect business needs with maintainable architecture, clean implementation, and a better developer experience.</p></SectionHeading><div className="process-track">{processSteps.map((step, index) => <div className="process-step" key={step.title} data-reveal><div className="process-step-top"><span>0{index + 1}</span>{index < processSteps.length - 1 ? <ArrowRight size={15} /> : <RefreshCw size={15} />}</div><h3>{step.title}</h3><p>{step.description}</p></div>)}</div></div></section>;
}

export function Architecture() {
  return <section className="section architecture-section"><div className="container"><SectionHeading number="04" label="UNDER THE HOOD" title={<>Connected by design<span className="orange-period">.</span></>} description="Not just individual features. Thoughtful systems that work together."><span className="interactive-label"><span className="status-dot" /> INTERACTIVE BLUEPRINT</span></SectionHeading><ArchitectureDiagram /></div></section>;
}

const serviceIcons = { frontend: Monitor, fullstack: Layers, api: Braces, performance: Gauge, modernization: RefreshCw, cloud: Cloud };
export function Services({ standalone = false }: { standalone?: boolean }) {
  return <section className={`section services-section ${standalone ? "standalone-section" : ""}`} id="services"><div className="container">{!standalone && <SectionHeading number="05" label="YOUR NEXT TECHNICAL PARTNER" title={<>How I can help<span className="orange-period">.</span></>} description="Whether you’re starting from zero or building on what’s already there."><TextLink href="/contact">Let’s talk about your project</TextLink></SectionHeading>}<div className="services-grid">{services.map((service, index) => { const Icon = serviceIcons[service.icon as keyof typeof serviceIcons]; return <Link className="service-card" href={`/contact?service=${encodeURIComponent(service.title)}`} key={service.title} data-reveal><div className="service-card-top"><span className="service-icon"><Icon size={23} strokeWidth={1.5} /></span><span className="mono">0{index + 1}</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-card-bottom"><span>{service.detail}</span><ArrowUpRight size={19} /></div></Link>; })}</div></div></section>;
}

export function About({ standalone = false }: { standalone?: boolean }) {
  return <section className={`section about-section ${standalone ? "standalone-section" : ""}`} id="about"><div className="container about-layout"><div className="about-visual" data-reveal><Image src="/images/workspace.jpg" alt="A sunlit, minimal workspace with a laptop, notebook, and flowers" fill sizes="(max-width: 768px) 100vw, 45vw" className="about-image" /><div className="about-image-shade" /><span className="about-photo-label"><span className="status-dot" /> ALWAYS LEARNING. ALWAYS BUILDING.</span><div className="about-image-caption"><Code2 size={30} strokeWidth={1.5} /><span>Space to think.<br />Room to build.</span><ArrowUpRight size={27} /></div></div><div className="about-copy" data-reveal><p className="eyebrow"><span>{standalone ? "01" : "06"}</span> THE PERSON BEHIND THE CODE</p><h2>A developer.<br />A problem solver.<br /><span>A partner in your product.</span></h2><p>I’m Umesh, a full-stack developer with 5+ years of professional experience. I care about more than getting an application to work. I care about making it work well—and keeping it that way.</p><p>My focus spans e-commerce, business and enterprise applications, management systems, and real-time experiences, with an interest in practical AI and automation.</p><p>From understanding the business to shipping the final build, I bring a clear, considered approach to every stage.</p><div className="about-signoff"><span className="signature">Umesh.</span><span>Thoughtful by nature.<br />An engineer by trade.</span></div></div></div></section>;
}

const workingIcons = { communication: MessageCircle, ownership: GitBranch, delivery: Timer, quality: ShieldCheck };
export function WorkingStyle() {
  return <section className="working-section section"><div className="container"><div className="working-heading" data-reveal><span className="eyebrow">WHAT IT’S LIKE TO WORK TOGETHER</span><h2>Good code. Better collaboration.</h2></div><div className="working-grid">{workingStyles.map((style) => { const Icon = workingIcons[style.icon as keyof typeof workingIcons]; return <div className="working-item" data-reveal key={style.title}><Icon size={21} strokeWidth={1.5} /><h3>{style.title}</h3><p>{style.description}</p></div>; })}</div></div></section>;
}

export function FAQ() {
  return <section className="section faq-section"><div className="container faq-layout"><div className="faq-intro" data-reveal><p className="eyebrow"><span>07</span> A FEW THINGS YOU MIGHT ASK</p><h2>Good questions.<br />Straight answers.</h2><p>Have something else on your mind?<br />I’m happy to talk it through.</p><TextLink href="/contact">Ask me directly</TextLink><div className="faq-symbol" aria-hidden="true">?</div></div><div className="faq-list" data-reveal>{faqs.map((faq, index) => <details name="portfolio-faq" key={faq.question} open={index === 0}><summary><span className="faq-number">0{index + 1}</span><h3>{faq.question}</h3><ChevronDown size={16} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}
