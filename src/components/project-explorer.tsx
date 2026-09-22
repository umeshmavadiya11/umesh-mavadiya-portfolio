"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

const filters = ["All work", "Full-Stack", "Real-Time", "AI & Automation"];
export function ProjectExplorer() {
  const [active, setActive] = useState("All work");
  const [query, setQuery] = useState("");
  const visibleProjects = useMemo(() => projects.filter((project) => (active === "All work" || project.category === active) && `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())), [active, query]);
  return <div className="project-explorer"><div className="project-controls"><div className="filter-tabs" role="group" aria-label="Filter projects by category">{filters.map((filter) => <button key={filter} className={active === filter ? "filter-active" : ""} aria-pressed={active === filter} onClick={() => setActive(filter)}>{filter}{filter === "All work" && <span>{projects.length}</span>}</button>)}</div><div className="project-search"><Search size={16} aria-hidden="true" /><label htmlFor="project-search" className="sr-only">Search projects or technologies</label><input id="project-search" type="search" placeholder="Search projects or stack" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div><p className="results-count" aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}{active !== "All work" ? ` in ${active}` : " to explore"}</p>{visibleProjects.length ? <div className="projects-grid">{visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />)}</div> : <div className="empty-state"><Search size={32} /><h3>No projects found.</h3><p>Try another keyword or explore a different category.</p><button className="button button-dark" onClick={() => { setQuery(""); setActive("All work"); }}>Clear filters <X size={16} /></button></div>}</div>;
}
