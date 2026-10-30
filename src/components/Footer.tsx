import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Logo } from "./Navbar";

const socials = [
  { href: profile.github, label: "GitHub", Icon: SiGithub },
  { href: profile.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8">
        <Logo />
        <p className="text-sm text-muted">© 2026 {profile.name}. Built with Next.js &amp; Tailwind CSS.</p>
        <div className="flex gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted transition hover:border-accent/50 hover:text-accent"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
