import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Vercel sets this automatically on deploy, so social preview images resolve to the live URL.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — Cybersecurity & SOC Portfolio`,
  description: profile.intro,
  keywords: [
    "Abhishek Tripathi",
    "SOC Analyst",
    "Cybersecurity",
    "Threat Detection",
    "MITRE ATT&CK",
    "Security Automation",
    "Python",
    "University of Delhi",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    title: `${profile.name} — Cybersecurity & SOC Portfolio`,
    description: profile.intro,
    type: "website",
    images: [{ url: "/images/headshot.jpeg", width: 960, height: 1280, alt: profile.name }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the page draw under Android gesture bars / notches; safe-area padding is in globals.css.
  viewportFit: "cover",
  // Android keyboard shrinks the page instead of covering the contact form.
  interactiveWidget: "resizes-content",
};

// Runs before first paint: applies the saved theme (or the OS preference) so there's no flash,
// keeps the Android browser bar colour (theme-color) in sync, and follows the system
// dark/light setting live until the visitor picks a theme with the toggle.
const themeScript = `(function(){
var colors={light:"#f4f9fd",dark:"#050a16"};
var mq=window.matchMedia("(prefers-color-scheme: light)");
function stored(){try{var t=localStorage.getItem("theme");return t==="light"||t==="dark"?t:null}catch(e){return null}}
function apply(t){
  document.documentElement.setAttribute("data-theme",t);
  var m=document.getElementById("theme-color");
  if(!m){m=document.createElement("meta");m.id="theme-color";m.name="theme-color";document.head.appendChild(m)}
  m.content=colors[t];
}
window.__setTheme=function(t){try{localStorage.setItem("theme",t)}catch(e){}apply(t)};
apply(stored()||(mq.matches?"light":"dark"));
mq.addEventListener("change",function(e){if(!stored())apply(e.matches?"light":"dark")});
})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* If JavaScript can't run, show the scroll-reveal content instead of leaving it hidden. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col overflow-x-clip font-sans">{children}</body>
    </html>
  );
}
