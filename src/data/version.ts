/** Baked at dev/build time from git commit count (see `siteVersion.ts`). */
export const SITE_VERSION = Number(import.meta.env.VITE_SITE_VERSION || "0");

export function siteVersionLabel(version = SITE_VERSION): string {
  return `v${version}`;
}
