"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { projects, type Project } from "@/data/profile";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

function ChartPlaceholder() {
  const bars = [38, 62, 45, 80, 55, 92, 70, 48, 66, 84];
  return (
    <div className="relative flex size-full flex-col justify-end gap-4 bg-gradient-to-br from-surface-2 to-surface p-6">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="relative flex gap-3">
        {["Rows", "Mean", "Trend"].map((l) => (
          <div key={l} className="rounded-md border border-border bg-surface/80 px-2.5 py-1.5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-muted">{l}</p>
            <div className="mt-1 h-1.5 w-10 rounded-full bg-accent/50" />
          </div>
        ))}
      </div>
      <div className="relative flex h-1/2 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-accent/40 to-accent-2"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function Gallery({ project, className = "" }: { project: Project; className?: string }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = project.images.length;
  if (count === 0) return <ChartPlaceholder />;
  const img = project.images[index];

  // Swipe left/right on touchscreens to change screenshot.
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    setIndex((i) => (dx < 0 ? (i + 1) % count : (i - 1 + count) % count));
  };

  return (
    <div
      className={`group/g relative size-full touch-pan-y ${className}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Image
        key={img.src}
        src={img.src}
        alt={img.alt}
        fill
        sizes="(min-width: 1024px) 640px, 100vw"
        className="object-cover object-left-top transition duration-500 group-hover/g:scale-[1.02]"
      />
      {count > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {project.images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                aria-label={`Show screenshot ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all after:absolute after:-inset-3 relative ${
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index - 1 + count) % count);
            }}
            className="absolute left-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white opacity-0 transition group-hover/g:opacity-100 pointer-coarse:opacity-80"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index + 1) % count);
            }}
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white opacity-0 transition group-hover/g:opacity-100 pointer-coarse:opacity-80"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}
    </div>
  );
}

function TechList({ tech, limit }: { tech: string[]; limit?: number }) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const rest = limit ? tech.length - shown.length : 0;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <li key={t} className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent">
          {t}
        </li>
      ))}
      {rest > 0 && <li className="px-1 py-0.5 font-mono text-[11px] text-muted">+{rest} more</li>}
    </ul>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
    // Stop the page behind the popup from scrolling on phones.
    document.documentElement.style.overflow = project ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto mb-0 max-h-[92dvh] w-full max-w-full overflow-hidden rounded-t-2xl border border-border bg-surface p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm sm:mb-auto sm:w-[min(56rem,calc(100vw-2rem))] sm:rounded-2xl"
    >
      {project && (
        <div className="max-h-[92dvh] overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
          <div className="relative aspect-[16/9] border-b border-border bg-surface-2">
            <Gallery project={project} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{project.subtitle}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

            {project.metrics.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-border bg-surface-2 p-3 text-center">
                    <p className="text-base font-bold text-gradient sm:text-xl">{m.value}</p>
                    <p className="text-xs text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            )}

            <ul className="mt-6 space-y-3">
              {project.highlights.map((h) => (
                <li key={h.slice(0, 24)} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <TechList tech={project.tech} />
            </div>

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gradient-accent px-4 py-2.5 text-sm font-medium text-white"
              >
                <SiGithub className="size-4" /> View on GitHub
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

function CardActions({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
      <button
        type="button"
        onClick={onOpen}
        className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-accent hover:underline"
      >
        Case study <ArrowUpRight className="size-4" />
      </button>
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub`}
          className="grid size-10 place-items-center rounded-lg border border-border text-muted transition hover:border-accent/50 hover:text-accent"
        >
          <SiGithub className="size-4" />
        </a>
      )}
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section id="projects" className="border-y border-border bg-surface-2/40">
      <SectionHeading
        eyebrow="Featured projects"
        title="Things I've built and tested on real data"
        description="Every number below comes from an actual run, not a mock-up."
      />

      <div className="mt-14 space-y-8">
        {projects.map((project, i) => {
          // Alternate the screenshot side on desktop so the list reads like a zig-zag.
          const flip = i % 2 === 1;
          return (
            <Reveal key={project.slug}>
              <article className="card grid overflow-hidden transition hover:border-accent/40 lg:grid-cols-[1.25fr_1fr]">
                <div
                  className={`relative aspect-[16/11] border-b border-border bg-surface-2 lg:aspect-auto lg:min-h-[26rem] lg:border-b-0 ${
                    flip ? "lg:order-2 lg:border-l" : "lg:border-r"
                  }`}
                >
                  <Gallery project={project} />
                </div>
                <div className="flex flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {project.badge && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          i === 0 ? "bg-gradient-accent text-white" : "border border-accent/40 text-accent"
                        }`}
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{project.title}</h3>
                  <p className="text-sm text-accent">{project.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>
                  {project.metrics.length > 0 && (
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="rounded-lg border border-border bg-surface-2 p-2.5 text-center">
                          <p className="font-bold text-gradient">{m.value}</p>
                          <p className="text-[11px] leading-tight text-muted">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-5">
                    <TechList tech={project.tech} limit={8} />
                  </div>
                  <CardActions project={project} onOpen={() => setOpen(project)} />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
