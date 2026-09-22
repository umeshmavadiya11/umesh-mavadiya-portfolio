"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, ArrowUpRight, Check, LockKeyhole, Send } from "lucide-react";
import { budgetOptions, projectTypes, validateInquiry, type InquiryErrors, type InquiryInput } from "@/lib/contact";

const CONTACT_EMAIL = "testmailto@test.com";

function buildMailtoLink(input: InquiryInput) {
  const subject = `New Project Inquiry — ${input.projectType} (${input.name})`;
  const divider = "----------------------------------------";
  const body = [
    "Hello Umesh,",
    "",
    "I would like to get in touch regarding a new project. Here are my details:",
    "",
    divider,
    "CONTACT INFORMATION",
    divider,
    `Name:              ${input.name}`,
    `Email:             ${input.email}`,
    "",
    divider,
    "PROJECT OVERVIEW",
    divider,
    `Service Needed:    ${input.projectType}`,
    `Estimated Budget:  ${input.budget}`,
    "",
    divider,
    "PROJECT DETAILS",
    divider,
    input.message,
    "",
    divider,
    "",
    "Looking forward to hearing from you.",
    "",
    "Best regards,",
    input.name,
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ initialProjectType = "", initialMessage = "", source = "website" }: { initialProjectType?: string; initialMessage?: string; source?: string }) {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [message, setMessage] = useState(initialMessage);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  void source;

  useEffect(() => { if (sent) successRef.current?.focus(); }, [sent]);

  function focusFirstError(fieldErrors: InquiryErrors) {
    const first = Object.keys(fieldErrors)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input: InquiryInput = { name: String(formData.get("name") || ""), email: String(formData.get("email") || ""), projectType: String(formData.get("projectType") || ""), budget: String(formData.get("budget") || ""), message, consent: formData.get("consent") === "on", website: String(formData.get("website") || ""), startedAt: Date.now(), source };
    const fieldErrors = validateInquiry(input);
    setErrors(fieldErrors);
    setError("");
    if (Object.keys(fieldErrors).length) { focusFirstError(fieldErrors); return; }
    window.location.href = buildMailtoLink(input);
    setSent(true);
  }

  if (sent) return <div className="contact-form" id="project-form"><div className="form-success" ref={successRef} tabIndex={-1} role="status"><span className="success-icon"><Check size={29} /></span><p className="eyebrow" style={{ justifyContent: "center", marginBottom: 14 }}>A GOOD FIRST STEP.</p><h2>Your idea is in<br />good company.</h2><p>Your email app should now be open with your details pre-filled. If it didn’t open, please email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> directly.<br />Thanks for sharing what you’re working on.</p><Link className="button button-dark" href="/work">Explore the project studies <ArrowUpRight size={17} /></Link><Link className="text-link" href="/" style={{ marginTop: 20 }}>Back to the portfolio <ArrowRight size={15} /></Link></div></div>;

  return <form className="contact-form" id="project-form" ref={formRef} onSubmit={handleSubmit} onChange={(event) => { const target: EventTarget = event.target; if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return; const field = target.name as keyof InquiryInput; if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined })); if (error) setError(""); }} noValidate><div className="form-heading"><div><h2>Tell me what you have in mind.</h2><p>A few details are all we need to get started.</p></div><Send size={21} strokeWidth={1.5} /></div><div className="form-grid"><div className="form-field"><label htmlFor="contact-name">Your name <span>*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Alex Morgan" maxLength={100} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "error-name" : undefined} />{errors.name && <p id="error-name" className="field-error">{errors.name}</p>}</div><div className="form-field"><label htmlFor="contact-email">Email address <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="alex@yourcompany.com" maxLength={254} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "error-email" : undefined} />{errors.email && <p id="error-email" className="field-error">{errors.email}</p>}</div><div className="form-field"><label htmlFor="contact-project">What do you need help with? <span>*</span></label><select id="contact-project" name="projectType" defaultValue={initialProjectType} required aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "error-projectType" : undefined}><option value="" disabled>Select a project type</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select>{errors.projectType && <p id="error-projectType" className="field-error">{errors.projectType}</p>}</div><div className="form-field"><label htmlFor="contact-budget">Estimated budget <span>*</span></label><select id="contact-budget" name="budget" defaultValue="Let’s discuss" required aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "error-budget" : undefined}>{budgetOptions.map((budget) => <option key={budget}>{budget}</option>)}</select>{errors.budget && <p id="error-budget" className="field-error">{errors.budget}</p>}</div><div className="form-field full-width"><label htmlFor="contact-message">A little about your project <span>*</span></label><textarea id="contact-message" name="message" placeholder="What are you building? Share the goal, current stage, ideal timeline, or any technical challenges you’re facing." value={message} onChange={(event) => setMessage(event.target.value)} maxLength={5000} minLength={20} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "error-message message-hint" : "message-hint"} />{errors.message && <p id="error-message" className="field-error">{errors.message}</p>}<span className="field-hint" id="message-hint">{message.length.toLocaleString()} / 5,000 characters · minimum 20</span></div></div><div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div><label className="consent-label" htmlFor="contact-consent"><input type="checkbox" id="contact-consent" name="consent" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "error-consent" : undefined} /><span>I agree to my details being used to respond to this inquiry. No mailing lists. No unnecessary follow-ups. <Link href="/privacy">Privacy details</Link>.</span></label>{errors.consent && <p id="error-consent" className="field-error">{errors.consent}</p>}{error && <div className="form-error" role="alert"><AlertCircle size={15} /><span>{error}</span></div>}<button className="button button-dark submit-button" type="submit">Let’s start a conversation <ArrowUpRight size={17} /></button><p className="form-security"><LockKeyhole size={11} />Your details stay private and are never stored.</p></form>;
}
