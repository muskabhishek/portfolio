import { Binary, Bot, BrainCircuit, Code2, Layers, Network, ShieldCheck, Wrench } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/data/profile";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const groupIcons: Record<SkillGroup["icon"], typeof Binary> = {
  shield: ShieldCheck,
  bot: Bot,
  network: Network,
  code: Code2,
  brain: BrainCircuit,
  layers: Layers,
  wrench: Wrench,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="My skills"
        title="What I bring to a security team"
        description="Blue-team fundamentals backed by the engineering skills to automate them."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = groupIcons[group.icon];
          return (
            <Reveal key={group.title} delay={0.05 * i}>
              <div className="card group h-full p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent transition group-hover:bg-gradient-accent group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-semibold">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[13px] text-foreground/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
