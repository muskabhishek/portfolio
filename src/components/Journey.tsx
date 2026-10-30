import { Award, BadgeCheck, GraduationCap, Users } from "lucide-react";
import { credentials, education } from "@/data/profile";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const credentialIcons = { Certification: BadgeCheck, Membership: Users, Achievement: Award } as const;

export function Journey() {
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow="Journey"
        title="Education & credentials"
        description="From electronics to informatics, always closer to how systems really work."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <ol className="relative space-y-6 border-l border-border pl-8">
          {education.map((e, i) => (
            <li key={e.title} className="relative">
              <span
                className={`absolute -left-[2.6rem] top-5 grid size-6 place-items-center rounded-full border-2 ${
                  e.current ? "border-accent bg-accent text-white" : "border-border bg-surface text-muted"
                }`}
              >
                <GraduationCap className="size-3" />
              </span>
              <Reveal delay={0.05 * i}>
                <div className="card p-5 transition hover:border-accent/40">
                  <p className="font-mono text-xs text-accent">{e.period}</p>
                  <h3 className="mt-1.5 font-semibold">
                    {e.title}
                    {e.note && (
                      <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 align-middle text-[11px] font-medium text-accent">
                        {e.note}
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{e.place}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="space-y-4">
          {credentials.map((c, i) => {
            const Icon = credentialIcons[c.kind as keyof typeof credentialIcons];
            return (
              <Reveal key={c.title} delay={0.05 * i}>
                <div className="card flex items-start gap-4 p-5 transition hover:border-accent/40">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-accent text-white shadow-lg shadow-accent/20">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{c.kind}</p>
                    <h3 className="mt-0.5 font-semibold">{c.title}</h3>
                    <p className="text-sm text-muted">{c.org}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
