import Image from "next/image";
import { ArrowUpRight, Download, ShieldCheck } from "lucide-react";
import { heroTools, profile } from "@/data/profile";
import { Reveal } from "./ui/Reveal";
import { TechIcon } from "./TechIcon";

function CodeCard() {
  const k = "text-sky-400";
  const s = "text-amber-300";
  const p = "text-slate-300";
  return (
    <div className="w-[17.5rem] rounded-xl border border-white/10 bg-code/95 p-4 font-mono text-[11.5px] leading-relaxed shadow-2xl shadow-black/40 backdrop-blur sm:w-[19rem]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-slate-400">{"</>"} analyst.ts</span>
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-rose-400/80" />
          <span className="size-2 rounded-full bg-amber-300/80" />
          <span className="size-2 rounded-full bg-emerald-400" />
        </span>
      </div>
      <pre className="whitespace-pre-wrap">
        <span className="text-violet-400">const</span> <span className={p}>analyst</span>{" "}
        <span className="text-slate-500">=</span> <span className={p}>{"{"}</span>
        {"\n  "}
        <span className={k}>name</span>: <span className={s}>&quot;Abhishek&quot;</span>,
        {"\n  "}
        <span className={k}>focus</span>: [<span className={s}>&quot;SOC&quot;</span>,{" "}
        <span className={s}>&quot;Threat Hunting&quot;</span>],
        {"\n  "}
        <span className={k}>stack</span>: [<span className={s}>&quot;Python&quot;</span>,{" "}
        <span className={s}>&quot;SPL&quot;</span>, <span className={s}>&quot;KQL&quot;</span>],
        {"\n  "}
        <span className={k}>mission</span>: <span className={s}>&quot;Detect early, respond fast&quot;</span>
        {"\n"}
        <span className={p}>{"};"}</span>
      </pre>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-[38rem] rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute top-60 left-[-15%] size-[28rem] rounded-full bg-accent-2/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-accent sm:text-[11px] sm:tracking-[0.15em]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.openTo}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Hi, I&apos;m <span className="text-gradient">{profile.firstName}</span>
            </h1>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground/90 sm:text-4xl">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">{profile.intro}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-accent px-5 py-3 text-sm font-medium text-white shadow-lg shadow-accent/25 transition hover:opacity-90"
              >
                View My Work <ArrowUpRight className="size-4" />
              </a>
              <a
                href={profile.resume}
                download="Abhishek_Tripathi_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium transition hover:border-accent/50 hover:text-accent"
              >
                Download CV <Download className="size-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Tools I work with
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {heroTools.map((t) => (
                <TechIcon key={t} name={t} />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-[85%] sm:w-[75%] lg:w-[82%]">
            <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-accent opacity-30 blur-2xl" />
            <div className="relative size-full overflow-hidden rounded-[2rem] border border-border bg-surface-2 p-1.5">
              <div className="relative size-full overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/images/hero-laptop.jpeg"
                  alt="Abhishek Tripathi working on a laptop"
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 80vw"
                  className="object-cover object-[50%_45%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* floating status chip */}
            <div className="absolute -right-4 top-8 flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 text-xs shadow-xl backdrop-blur sm:-right-8">
              <ShieldCheck className="size-4 text-emerald-500" />
              <div>
                <p className="font-semibold leading-tight">Alert triaged</p>
                <p className="font-mono text-[10px] text-muted">T1110 · Brute Force</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 left-0 sm:-left-2 lg:-left-10">
            <CodeCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
