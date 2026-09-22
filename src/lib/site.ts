export const site = {
  name: "Umesh Mavadiya",
  role: "Full-Stack Developer",
  description: "Full-Stack Developer with 5+ years of experience building modern web applications, scalable frontend architectures, backend APIs, and cloud-based solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
};

function profileUrl(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

export const profiles = {
  contra: profileUrl(process.env.NEXT_PUBLIC_CONTRA_URL, "/contact?channel=contra"),
  github: profileUrl(process.env.NEXT_PUBLIC_GITHUB_URL, "/contact?channel=github"),
  linkedin: profileUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL, "https://www.linkedin.com/in/umesh-mavadiya"),
};

export const navigation = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Expertise", id: "expertise" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];
