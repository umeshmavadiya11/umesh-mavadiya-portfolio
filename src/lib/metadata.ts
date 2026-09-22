import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Umesh Mavadiya`, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | Umesh Mavadiya`, description },
  };
}
