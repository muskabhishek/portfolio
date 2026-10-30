import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

// Makes the site installable on Android ("Add to Home screen" opens it full-screen like an app).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Portfolio`,
    short_name: "Abhishek",
    description: profile.intro,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#050a16",
    theme_color: "#050a16",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
