import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/project-preview";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <article className="project-card" data-reveal><Link href={`/work/${project.slug}`} className="project-card-link" aria-label={`View case study: ${project.title}`}><ProjectPreview variant={project.preview} /><div className="project-card-body"><div className="project-eyebrow"><span>{project.eyebrow}</span><span>0{index + 1}</span></div><div className="project-title-row"><h3>{project.title}</h3><span className="project-arrow"><ArrowUpRight size={21} /></span></div><p>{project.description}</p><div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-card-bottom"><span>Concept & architecture study</span><span>View case study <ArrowUpRight size={14} /></span></div></div></Link></article>;
}
