"use client";

import { useRef, useState } from "react";
import { ArrowRight, Braces, CheckCheck, Cloud, Code2, Database, GitBranch, Layers, Radio, Rocket, Server, ShieldCheck, Workflow } from "lucide-react";

const diagrams = [
  { title: "Full-Stack Application", label: "A CONNECTED SYSTEM, NOT A COLLECTION OF PARTS", nodes: [
    { title: "React / Next.js", label: "Frontend", icon: Code2, description: "Accessible, responsive interfaces with reusable components. Server rendering and deliberate state management keep the experience fast and predictable." },
    { title: "REST API", label: "API layer", icon: Braces, description: "Clear contracts connect the interface to business capabilities. Validate input, enforce permissions, and return consistent, useful errors at the boundary." },
    { title: "Node.js / Express", label: "Backend", icon: Server, description: "Business logic lives in focused services, independent of the UI. Authentication, authorization, and error handling are first-class concerns." },
    { title: "MongoDB / SQL", label: "Persistence", icon: Database, description: "Choose storage around data relationships and access patterns. Use indexes, constraints, and versioned changes to protect integrity as the product grows." },
    { title: "AWS / Azure", label: "Infrastructure", icon: Cloud, description: "Repeatable environments, private secrets, and observable releases. The infrastructure supports the application rather than adding unnecessary complexity." },
  ] },
  { title: "Real-Time System", label: "DURABLE STATE. IMMEDIATE FEEDBACK.", nodes: [
    { title: "Backend events", label: "Source", icon: Server, description: "Meaningful domain events are created by the backend, with stable IDs and a well-defined event contract." },
    { title: "Durable storage", label: "Source of truth", icon: Database, description: "Persist the event before announcing it. A durable history lets clients recover updates missed while disconnected." },
    { title: "WebSocket / SSE", label: "Live transport", icon: Radio, description: "Authenticate subscriptions, handle reconnects, and apply backpressure. A live connection delivers updates; it does not replace durable storage." },
    { title: "React application", label: "Experience", icon: Code2, description: "Reconcile new events with cached state, avoid duplicate entries, and announce updates accessibly without stealing focus." },
  ] },
  { title: "CI/CD Pipeline", label: "A SAFER PATH FROM COMMIT TO PRODUCTION", nodes: [
    { title: "Git push", label: "Source control", icon: GitBranch, description: "A reviewed, version-controlled change starts the pipeline. Keep a clear history and protect the release branch." },
    { title: "Build", label: "Compile", icon: Layers, description: "Install locked dependencies, generate route types, check TypeScript, and produce a repeatable production artifact." },
    { title: "Test", label: "Verify", icon: CheckCheck, description: "Run automated tests and quality checks against the same artifact that will be released. Stop the pipeline when an important check fails." },
    { title: "Deploy", label: "Release", icon: Rocket, description: "Promote the validated artifact with environment-specific configuration and a documented rollback path." },
    { title: "AWS / Azure", label: "Operate", icon: Cloud, description: "Check application health, watch operational signals, and feed what you learn back into the next iteration." },
  ] },
];

export function ArchitectureDiagram() {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const diagram = diagrams[tab];
  const current = diagram.nodes[selected];
  function selectTab(index: number) { setTab(index); setSelected(0); }
  return <div className="architecture-diagram" data-reveal><div className="architecture-tabs" role="tablist" aria-label="Architecture examples">{diagrams.map((item, index) => <button key={item.title} role="tab" aria-selected={index === tab} aria-controls={`architecture-panel-${index}`} id={`architecture-tab-${index}`} tabIndex={index === tab ? 0 : -1} ref={(node) => { tabRefs.current[index] = node; }} onClick={() => selectTab(index)} onKeyDown={(event) => { let next = index; if (event.key === "ArrowRight") next = (index + 1) % diagrams.length; else if (event.key === "ArrowLeft") next = (index + diagrams.length - 1) % diagrams.length; else if (event.key === "Home") next = 0; else if (event.key === "End") next = diagrams.length - 1; else return; event.preventDefault(); selectTab(next); tabRefs.current[next]?.focus(); }}><span>0{index + 1}</span>{item.title}</button>)}</div><div className="architecture-panel" role="tabpanel" id={`architecture-panel-${tab}`} aria-labelledby={`architecture-tab-${tab}`}><p className="architecture-label"><Workflow size={13} />{diagram.label}<span>SELECT A LAYER TO EXPLORE</span></p><div className="architecture-flow">{diagram.nodes.map(({ title, label, icon: Icon }, index) => <div className="architecture-node-wrap" key={`${tab}-${title}`}><button className={`architecture-node ${selected === index ? "node-selected" : ""}`} onClick={() => setSelected(index)} aria-pressed={selected === index}><span className="architecture-node-icon"><Icon size={25} strokeWidth={1.5} /></span><span className="architecture-node-label">{label}</span><strong>{title}</strong><span className="node-indicator" /></button>{index < diagram.nodes.length - 1 && <span className="architecture-arrow"><ArrowRight size={18} /></span>}</div>)}</div><div className="architecture-detail" aria-live="polite" aria-atomic="true"><div><span className="eyebrow">0{selected + 1} / {current.label.toUpperCase()}</span><h3>{current.title}</h3><p>{current.description}</p></div><span className="architecture-principle"><ShieldCheck size={18} /> Every layer, intentional.</span></div></div></div>;
}
