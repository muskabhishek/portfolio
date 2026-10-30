import type { IconType } from "react-icons";
import {
  SiFastapi,
  SiGit,
  SiKalilinux,
  SiLinux,
  SiPython,
  SiReact,
  SiSplunk,
  SiWireshark,
} from "react-icons/si";

const icons: Record<string, { Icon: IconType; label: string; color: string }> = {
  python: { Icon: SiPython, label: "Python", color: "#3776AB" },
  linux: { Icon: SiLinux, label: "Linux", color: "#E8A317" },
  kali: { Icon: SiKalilinux, label: "Kali Linux", color: "#557C94" },
  wireshark: { Icon: SiWireshark, label: "Wireshark", color: "#1679A7" },
  splunk: { Icon: SiSplunk, label: "Splunk", color: "#65A637" },
  fastapi: { Icon: SiFastapi, label: "FastAPI", color: "#009688" },
  react: { Icon: SiReact, label: "React", color: "#149ECA" },
  git: { Icon: SiGit, label: "Git", color: "#F05032" },
};

export function TechIcon({ name }: { name: string }) {
  const entry = icons[name];
  if (!entry) return null;
  const { Icon, label, color } = entry;
  return (
    <span
      title={label}
      className="group grid size-11 place-items-center rounded-xl border border-border bg-surface transition hover:-translate-y-0.5 hover:border-accent/50"
    >
      <Icon className="size-6 dark:brightness-[1.7] dark:saturate-[1.2]" style={{ color }} aria-label={label} />
    </span>
  );
}
