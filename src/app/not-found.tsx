import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="not-found"><span>404 / A SMALL DETOUR</span><h1>This page isn’t in the plan<span className="orange-period">.</span></h1><p>Let’s get you back to something worth exploring.</p><Link className="button button-dark" href="/work">Explore the project collection <ArrowUpRight size={17} /></Link></main>;
}
