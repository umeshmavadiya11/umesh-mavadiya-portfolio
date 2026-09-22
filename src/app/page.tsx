import type { Metadata } from "next";
import { About, Architecture, Expertise, FAQ, FeaturedWork, Hero, Philosophy, ProfessionalProof, Services, WorkingStyle } from "@/components/home-sections";
import { ContactCTA } from "@/components/contact-cta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Umesh Mavadiya | Full-Stack Developer",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: "Umesh Mavadiya — Thoughtful engineering. Reliable products.", description: site.description, url: "/", type: "website" },
};

export default function HomePage() {
  return <main id="main-content"><Hero /><ProfessionalProof /><FeaturedWork /><Expertise /><Philosophy /><Architecture /><Services /><About /><WorkingStyle /><FAQ /><ContactCTA /></main>;
}
