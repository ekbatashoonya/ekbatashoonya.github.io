# Deploy and sync workflow

## Repos involved

- **This repo** = **ekbatashoonya.github.io** — the GitHub Pages site repo. It holds `staging` and `main`; only `main` is deployed to the live site.
- **Lovable repo** = **ek-bata-shoonya-portal-43-9d1ae0a6** — the repo where you edit the app in Lovable. Its `dev` branch is synced into this repo’s `staging` branch.

## Flow summary (Lovable dev → Pages staging → Pages main)

The pipeline is one-way; nothing auto-promotes to production:

1. **Lovable dev → Pages staging**: When the Lovable repo’s `dev` branch changes, a sync runs and updates **only** this repo’s `staging` branch. The sync workflow never touches `main`.
2. **Staging = test only**: The live site is **not** deployed from `staging`. You get one GitHub Pages URL, so only `main` deploys. Test staging locally (or via a PR) before promoting.
3. **Pages staging → Pages main**: When you’re happy with staging, open a PR from `staging` → `main` and merge. Only this manual step updates `main`.
4. **Pages main → production**: A push to `main` triggers the deploy workflow; the live site updates.

**Where workflow files live:** All `.github/workflows/*.yml` (and this doc) are maintained in the **Lovable repo** and flow here via sync (dev → staging) and your PR (staging → main). The sync pushes the full branch including workflows; deploy runs only on push to **main**.

## Staging vs prod (one URL)

GitHub Pages gives you **one** site per repo (e.g. `ekbatashoonya.github.io` or your custom domain). So:

- **Production**: Deploy runs only on push to `main`. That’s your live site.
- **Staging**: Sync from Lovable updates the `staging` branch only. We do **not** deploy from `staging`, so the live site is never overwritten by staging.

To test staging before merging:

- **Local**: From this repo, checkout `staging`, then run `npm ci && npm run build && npm run preview` and open the URL it prints (e.g. http://localhost:4173).
- **CI**: The sync workflow runs on `staging`; you can open a PR from `staging` to `main` and use the PR diff as your final check before merging.

## How Lovable → staging sync runs

This repo has a single sync workflow: **“Sync Lovable into staging”** (`sync-lovable.yml`). It runs when:

1. **Push to dev (immediate)** — The Lovable repo’s workflow calls this repo’s `repository_dispatch` when you push to `dev`. Requires **`REPO_DISPATCH_TOKEN`** in the Lovable repo (see below).
2. **Manual** — In this repo, open Actions → **“Sync Lovable into staging”** → Run workflow.
3. **Daily backup** — A cron runs at 06:00 UTC as a fallback.

Sync merges the Lovable repo’s public `dev` branch into this repo’s `staging`; no token is needed in the Pages repo to read from the public Lovable repo.

### Setting up REPO_DISPATCH_TOKEN (walkthrough)

You only need **one** token. It must be able to trigger workflows in **ekbatashoonya/ekbatashoonya.github.io** (the Pages repo). Create it on the GitHub account that has push access to that repo, then add it as a secret in the Lovable repo.

**Step 1: Create a Personal Access Token**

- Go to **GitHub.com** → your profile (top right) → **Settings** → **Developer settings** (left sidebar) → **Personal access tokens**.
- Choose one of:
  - **Fine-grained tokens** (recommended): **Generate new token**. Name it e.g. `trigger-pages-sync`. Under **Repository access**, choose **Only select repositories** and pick **ekbatashoonya/ekbatashoonya.github.io**. Under **Permissions** → **Repository permissions**, set **Actions** to **Read and write**. Generate the token and copy it (you won’t see it again).
  - **Tokens (classic)**: **Generate new token (classic)**. Name it, set an expiry, check the **repo** scope (full control). Generate and copy the token.
- Store the token somewhere safe temporarily (e.g. password manager); you’ll paste it in Step 2.

**Step 2: Add the token as a secret in the Lovable repo**

- Open the **Lovable repo**: **https://github.com/ekbatashoonya/ek-bata-shoonya-portal-43-9d1ae0a6** (or the actual org/user that owns it).
- Go to **Settings** → **Secrets and variables** → **Actions**.
- Click **New repository secret**.
  - **Name**: `REPO_DISPATCH_TOKEN` (exactly this; the workflow expects this name).
  - **Value**: paste the token you created in Step 1.
- Click **Add secret**.

**Step 3: Verify**

- Push a commit to the **dev** branch of the Lovable repo (or run the “Trigger sync to GitHub Pages repo” workflow from the Actions tab).
- In the **Pages repo** (ekbatashoonya.github.io), open **Actions** and confirm that **“Sync Lovable into staging”** (or the workflow that listens for `sync-from-lovable`) ran. If the token is missing or wrong, the trigger workflow in the Lovable repo will fail with a 401/403.

**Summary:** One token → create with permission to trigger workflows in the Pages repo → add as `REPO_DISPATCH_TOKEN` in the Lovable repo. No token is needed in the Pages repo for this flow.

## Versioning (which version where)

| Where | How to see the version |
|-------|-------------------------|
| **Lovable repo, `dev` branch** | Git: `git log -1 --oneline` on `dev`. That’s the source of edits. |
| **This repo, `staging` branch** | Open **version-info.json** on the `staging` branch. It’s updated on every sync and lists `branch`, `commit`, `sourceRepo`, `sourceBranch`, `updatedAt`, `role: "staging"`. |
| **This repo, `main` branch** | Open **version-info.json** on the `main` branch. Updated after each deploy; lists `branch`, `commit`, `role: "production"`, `deployed: true`, `updatedAt`. |
| **Live site (deployed)** | **Footer**: version line under the copyright (e.g. `main @ a1b2c3d · 13/02/2025, 12:00 UTC`), linking to **version.json**. **Direct URL**: `https://ekbatashoonya.github.io/version.json` (branch, commit, buildTime, repo, deployed). |

- **In the app**: Deployed builds show the version in the footer; local dev shows no version line.
- **Machine-readable**: Use **version.json** on the live site or **version-info.json** in each branch of this repo.
