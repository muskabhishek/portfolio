// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: "Abhishek Tripathi",
  firstName: "Abhishek",
  role: "Cybersecurity · SOC · Security Automation",
  tagline: "I detect threats and automate defence.",
  intro:
    "MSc Informatics student at the University of Delhi building a career in cybersecurity — focused on SOC operations, threat detection, and Python-driven security automation, with a strong edge in AI-assisted workflows.",
  location: "Delhi, India",
  email: "abhishektripathi1xd@gmail.com",
  github: "https://github.com/muskabhishek",
  githubHandle: "muskabhishek",
  linkedin: "https://www.linkedin.com/in/abhishek-tripathi-5a8144225",
  resume: "/resume.pdf",
  openTo: "Open to SOC / Security Analyst internships",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  heading: "Turning raw logs into clear, actionable security decisions",
  paragraphs: [
    "I'm a first-year MSc Informatics student at the Institute of Informatics and Communication, University of Delhi South Campus, with a BSc (Hons.) in Electronics Science behind me.",
    "My focus is the blue team: log analysis, threat hunting, OSINT and detection engineering mapped to MITRE ATT&CK. I like building tools that make an analyst's day faster — parsers, detection rules, triage playbooks — and I bring AI/ML experience to automate the boring parts without hiding the evidence.",
  ],
};

// Real numbers taken from project results — no inflated claims.
export const stats = [
  { value: 19, suffix: "", label: "Detection rules mapped to MITRE ATT&CK", icon: "shield" },
  { value: 86839, suffix: "", label: "Real SSH log lines analysed", icon: "logs" },
  { value: 92.9, suffix: "%", decimals: 1, label: "Top-3 retrieval accuracy (RAG)", icon: "target" },
  { value: 25, suffix: "", label: "Automated tests in CI", icon: "check" },
] as const;

export type SkillGroup = {
  title: string;
  icon: "shield" | "code" | "network" | "bot" | "brain" | "layers" | "wrench";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Cybersecurity",
    icon: "shield",
    items: [
      "SOC Operations",
      "Security Monitoring",
      "Log Analysis",
      "Threat Hunting",
      "OSINT",
      "Ethical Hacking",
      "MITRE ATT&CK",
      "EDR (Endpoint Detection & Response)",
    ],
  },
  {
    title: "Security & Automation",
    icon: "bot",
    items: [
      "Python Automation",
      "SIEM Concepts",
      "Splunk SPL",
      "Sentinel KQL",
      "Brute-Force Detection",
      "Security Scripting",
    ],
  },
  {
    title: "Systems & Networking",
    icon: "network",
    items: ["Linux", "Windows", "Networking Fundamentals", "Nmap", "Wireshark", "Scapy"],
  },
  {
    title: "Programming",
    icon: "code",
    items: ["Python", "SQL", "HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "AI / Data",
    icon: "brain",
    items: [
      "Machine Learning",
      "Generative AI",
      "RAG",
      "Hybrid Search (BM25 + Embeddings)",
      "ChromaDB",
      "Ollama",
      "LangChain",
      "Pandas",
    ],
  },
  {
    title: "Development & Tools",
    icon: "layers",
    items: [
      "FastAPI",
      "React",
      "Tailwind CSS",
      "SQLite",
      "Git / GitHub",
      "REST APIs",
      "n8n",
      "Kali Linux",
      "Jupyter",
      "VS Code",
    ],
  },
];

// Logos shown in the hero "tools I work with" row (keys map to icons in TechIcon).
export const heroTools = [
  "python",
  "linux",
  "kali",
  "wireshark",
  "splunk",
  "fastapi",
  "react",
  "git",
] as const;

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  images: { src: string; alt: string }[];
  highlights: string[];
  metrics: { value: string; label: string }[];
  tech: string[];
  repo?: string;
  badge?: string;
};

export const projects: Project[] = [
  {
    slug: "soc-ai-analyst",
    title: "AI-Powered SOC Analyst",
    subtitle: "Threat Detection & Triage Platform",
    summary:
      "A SOC L1 triage platform that ingests Linux SSH logs, Windows Security events and Wireshark captures, detects attacks with MITRE-mapped rules, and runs the full case workflow.",
    images: [
      { src: "/images/soc-alerts.png", alt: "SOC Analyst alert queue with risk scores and MITRE technique IDs" },
      { src: "/images/soc-overview.png", alt: "SOC Analyst overview dashboard with traffic, severity and MITRE charts" },
    ],
    highlights: [
      "19 detection rules mapped to MITRE ATT&CK — brute force, password spraying, privilege escalation, encoded PowerShell, port scans, C2 beaconing, DNS tunnelling and remote shells.",
      "Validated on real attack data: an internet-facing server's SSH log (86,839 lines → 236 alerts, 0 on internal IPs) and 13 public PCAPs (4 of 7 attacks detected, 0 of 6 benign captures flagged). Real traffic exposed a false positive and log-parsing gaps — both fixed.",
      "Case workflow with True/False Positive verdicts, audit trail, MTTA/MTTR and false-positive rate per rule, plus cross-source attacker correlation and 19 triage playbooks with a 5W worksheet.",
      "Detections also written in Splunk SPL and Microsoft Sentinel KQL; every network alert carries a Wireshark display filter; a local LLM (Ollama) drafts incident reports with invented-IP checks.",
    ],
    metrics: [
      { value: "19", label: "MITRE rules" },
      { value: "86,839", label: "log lines tested" },
      { value: "0/6", label: "benign PCAPs flagged" },
    ],
    tech: [
      "Python",
      "Pandas",
      "Scapy",
      "Wireshark",
      "MITRE ATT&CK",
      "Splunk SPL",
      "Sentinel KQL",
      "FastAPI",
      "Streamlit",
      "SQLite",
      "Ollama",
      "GitHub Actions",
    ],
    repo: "https://github.com/muskabhishek/soc-ai-analyst",
    badge: "Flagship",
  },
  {
    slug: "eduastra",
    title: "EduAstra",
    subtitle: "Exam-Ready AI Study Assistant (RAG)",
    summary:
      "Hybrid-retrieval RAG over NCERT textbooks, previous-year papers and CBSE marking schemes that writes marks-scaled board answers with citations.",
    images: [
      { src: "/images/eduastra-1.jpeg", alt: "EduAstra chat answering a 5-mark maths question with sources" },
      { src: "/images/eduastra-2.jpeg", alt: "EduAstra step-by-step answer with KaTeX maths rendering" },
    ],
    highlights: [
      "Hybrid retrieval (BGE-M3 dense + BM25) reaching 92.9% top-3 accuracy vs 85.7% dense-only and 82.1% BM25-only on a 28-question test set.",
      "Automatic cloud-to-local LLM failover (Kaggle T4 GPU via Cloudflare tunnel → local Qwen2.5-3B) with health checks and mid-stream recovery, at zero API cost.",
      "Page-routing PDF extraction pipeline (prose, maths, scanned and handwritten pages with vision OCR) raising usable page coverage from ~17% to 37.8%.",
      "React + FastAPI app with streamed answers (SSE), KaTeX maths, source citations, chat history and dark mode.",
    ],
    metrics: [
      { value: "92.9%", label: "top-3 accuracy" },
      { value: "₹0", label: "API cost" },
      { value: "2/5/10", label: "mark formats" },
    ],
    tech: ["Python", "FastAPI", "React", "ChromaDB", "BGE-M3", "BM25", "Ollama", "Qwen2.5", "PyMuPDF", "Kaggle GPU"],
    badge: "Team Project",
  },
];

export const education = [
  {
    period: "2026 — Present",
    title: "MSc Informatics",
    place: "Institute of Informatics and Communication (IIC), University of Delhi South Campus",
    note: "First year",
    current: true,
  },
  {
    period: "2023 — 2026",
    title: "BSc (Hons.) Electronics Science",
    place: "Acharya Narendra Dev College, University of Delhi",
  },
  {
    period: "2019 — 2023",
    title: "Senior Secondary Education",
    place: "Maharishi Vidya Mandir Senior Secondary School",
  },
];

export const credentials = [
  { kind: "Certification", title: "Introduction to Generative AI", org: "Google Cloud Skills Boost" },
  { kind: "Membership", title: "Member, SPIE", org: "International Society for Optics and Photonics" },
  { kind: "Achievement", title: "Bronze Medal", org: "Olympiad" },
];
