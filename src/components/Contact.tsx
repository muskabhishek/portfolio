"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

const inputClass =
  "w-full rounded-lg border border-border bg-surface-2 px-3.5 py-3 text-base outline-none sm:py-2.5 sm:text-sm transition placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-[var(--ring)]";

export function Contact() {
  const [sent, setSent] = useState(false);

  // No backend: opens the visitor's mail app with the message pre-filled.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const links = [
    { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail },
    { href: profile.linkedin, label: "linkedin.com/in/abhishek-tripathi", Icon: FaLinkedin },
    { href: profile.github, label: `github.com/${profile.githubHandle}`, Icon: SiGithub },
  ];

  return (
    <Section id="contact" className="border-t border-border bg-surface-2/40">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Let&apos;s work together
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Have a role, project or CTF team in mind?
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            I&apos;m looking for SOC and security analyst internships and I&apos;m always happy to talk detection
            engineering, automation or AI for security. My inbox is open.
          </p>

          <div className="card mt-8 flex items-center gap-4 p-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-accent/50">
              <Image
                src="/images/headshot.jpeg"
                alt="Abhishek Tripathi"
                fill
                sizes="64px"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-sm text-muted">MSc Informatics · University of Delhi</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                <MapPin className="size-3.5" /> {profile.location}
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {links.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 break-all py-1 text-sm text-muted transition hover:text-foreground"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-accent transition group-hover:border-accent/50">
                    <Icon className="size-4" />
                  </span>
                  {label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Name</span>
                <input name="name" required autoComplete="name" enterKeyHint="next" placeholder="Your name" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  inputMode="email"
                  enterKeyHint="next"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell me about the role or project…"
                className={`${inputClass} resize-y`}
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-accent px-5 py-3 text-sm font-medium text-white shadow-lg shadow-accent/25 transition hover:opacity-90"
            >
              Send message <Send className="size-4" />
            </button>
            <p className="text-center text-xs text-muted" aria-live="polite">
              {sent
                ? "Your email app should have opened. Thanks for reaching out!"
                : "Opens your email app with the message ready to send."}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
