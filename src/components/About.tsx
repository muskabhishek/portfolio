import Image from "next/image";
import { ArrowUpRight, FileCheck2, ScrollText, ShieldHalf, Target } from "lucide-react";
import { about, profile, stats } from "@/data/profile";
import { CountUp } from "./ui/CountUp";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

const statIcons = { shield: ShieldHalf, logs: ScrollText, target: Target, check: FileCheck2 };

export function About() {
  return (
    <Section id="about" className="border-y border-border bg-surface-2/40">
      <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/about-formal.jpeg"
              alt="Abhishek Tripathi at the University of Delhi"
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 w-36 overflow-hidden rounded-2xl border-4 border-background shadow-xl sm:-right-10 sm:w-44">
            <div className="relative aspect-square">
              <Image
                src="/images/campus-1.jpeg"
                alt="Abhishek on campus"
                fill
                sizes="180px"
                className="object-cover object-[50%_35%]"
              />
            </div>
          </div>
          <div className="absolute -top-4 -left-4 rounded-xl border border-border bg-surface px-3 py-2 font-mono text-[11px] shadow-lg">
            <span className="text-accent">$</span> whoami
            <p className="text-muted">blue-team · builder</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">About me</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{about.heading}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="mt-5 leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-accent/50 hover:text-accent"
            >
              More on LinkedIn <ArrowUpRight className="size-4" />
            </a>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {stats.map((s, i) => {
              const Icon = statIcons[s.icon];
              return (
                <Reveal key={s.label} delay={0.05 * i}>
                  <div className="card h-full p-5 transition hover:border-accent/40">
                    <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                      <CountUp value={s.value} decimals={"decimals" in s ? s.decimals : 0} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-sm text-muted">{s.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
