// Starts Next.js on all network interfaces and prints the URLs that actually
// work from a phone. Usage: node scripts/lan.mjs dev | start
import { spawn } from "node:child_process";
import { networkInterfaces } from "node:os";

const mode = process.argv[2] === "start" ? "start" : "dev";
const port = process.env.PORT || "3000";

// Virtual adapters (VirtualBox, Hyper-V/WSL, VMware, Docker) aren't reachable from other devices.
const VIRTUAL = /virtualbox|vbox|vmware|vethernet|hyper-v|wsl|docker|loopback|bluetooth/i;

const candidates = Object.entries(networkInterfaces()).flatMap(([name, addrs]) =>
  (addrs ?? [])
    .filter((a) => a.family === "IPv4" && !a.internal && !a.address.startsWith("169.254."))
    .map((a) => ({ name, address: a.address, virtual: VIRTUAL.test(name) || a.address.startsWith("192.168.56.") })),
);
const real = candidates.filter((c) => !c.virtual);

const line = "─".repeat(52);
console.log(`\n${line}`);
console.log(`  Open on any device on the same Wi-Fi:`);
for (const c of real.length ? real : candidates) {
  console.log(`  ➜  http://${c.address}:${port}   (${c.name})`);
}
if (!candidates.length) console.log("  (no network connection found — only localhost will work)");
console.log(`  Ignore the "Network:" line Next prints if it shows a different IP.`);
console.log(`${line}\n`);

const child = spawn("npx", ["next", mode, "-H", "0.0.0.0", "-p", port], {
  stdio: "inherit",
  shell: true,
});
child.on("exit", (code) => process.exit(code ?? 0));
