/**
 * Build-time version info (injected by deploy workflow from version-info.json on main).
 * Version flows: Lovable dev → sync → staging → PR → main → deploy reads version-info.json.
 * In local dev these are undefined; deployed builds show source commit and date.
 */
export interface AppVersion {
  branch: string | undefined;
  commit: string | undefined;
  buildTime: string | undefined;
  repo: string | undefined;
  deployed: boolean;
}

export function getAppVersion(): AppVersion {
  const branch = import.meta.env.VITE_GIT_BRANCH as string | undefined;
  const commit = import.meta.env.VITE_GIT_SHA as string | undefined;
  const buildTime = import.meta.env.VITE_BUILD_TIME as string | undefined;
  const repo = import.meta.env.VITE_APP_REPO as string | undefined;
  return {
    branch,
    commit,
    buildTime,
    repo,
    deployed: !!(branch && commit),
  };
}

/** Human-readable one-liner e.g. "main @ a1b2c3d · 2025-02-13 12:00 UTC" */
export function getVersionLabel(): string {
  const v = getAppVersion();
  if (!v.deployed) return "development";
  const parts = [`${v.branch} @ ${v.commit}`];
  if (v.buildTime) {
    const d = new Date(v.buildTime);
    parts.push(d.toLocaleString("en-GB", { timeZone: "UTC", dateStyle: "short", timeStyle: "short" }).replace(",", " UTC"));
  }
  return parts.join(" · ");
}
