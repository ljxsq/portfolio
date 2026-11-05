import type { Metadata } from "next";

import About from "@/components/About";
import Contact from "@/components/Contact";
import EmptyProjects from "@/components/EmptyProjects";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/site.config";

const description =
  siteConfig.about.length > 80 ? `${siteConfig.about.slice(0, 80)}…` : siteConfig.about;

export const metadata: Metadata = {
  title: `${siteConfig.name} · ${siteConfig.title}`,
  description,
};

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <Hero />

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="w-full border-b border-black/[.08] dark:border-white/[.145]"
        >
          <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24">
            <h2
              id="projects-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              项目
            </h2>

            <div className="mt-8">
              {projects.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      slug={project.slug}
                    />
                  ))}
                </div>
              ) : (
                <EmptyProjects />
              )}
            </div>
          </div>
        </section>

        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
