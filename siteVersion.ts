import { execSync } from "node:child_process";

function git(command: string): string {
  return execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

/**
 * Site version is the git commit count. It ticks up on every commit.
 * Uncommitted work shows the next number so the UI stays ahead of HEAD.
 */
export function computeSiteVersion(): number {
  const override = Number(process.env.SITE_VERSION);
  if (Number.isFinite(override) && override > 0) return override;

  try {
    const count = Number(git("git rev-list --count HEAD"));
    if (!Number.isFinite(count) || count < 1) return 1;
    const dirty = git("git status --porcelain") !== "";
    return dirty ? count + 1 : count;
  } catch {
    return 1;
  }
}
