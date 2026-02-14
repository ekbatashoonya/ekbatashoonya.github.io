# Deploy and sync workflow

**This doc is maintained in the Lovable repo.** It reaches the Pages repo via sync (Lovable dev → Pages staging) and then your PR (staging → main). Edit here only; the same file lives at **ekbatashoonya.github.io** `docs/DEPLOY-WORKFLOW.md` after you merge that PR.

## Repos and branches: where this doc lives

| Repo | Branch | How it gets there |
|------|--------|-------------------|
| **Lovable repo** (ek-bata-shoonya-portal-43-9d1ae0a6) | **dev** | You edit here. Source of truth. |
| **Pages repo** (ekbatashoonya.github.io) | **staging** | Sync merges Lovable dev → staging, so staging gets this file. |
| **Pages repo** (ekbatashoonya.github.io) | **main** | You open a PR staging → main and merge; main then has this file. |

All workflow YAML files (`.github/workflows/*.yml`) are maintained in the **Lovable repo** and flow to the Pages repo via sync (dev → staging) and your PR (staging → main). The sync pushes the full branch including workflows; the deploy runs only on push to **main** in the Pages repo.

## Repos involved

- **Lovable repo** = **ek-bata-shoonya-portal-43-9d1ae0a6** — app source; you edit here in Lovable. The **dev** branch is synced into the Pages repo’s **staging** branch.
- **Pages repo** = **ekbatashoonya.github.io** — holds **staging** (updated from Lovable dev) and **main** (production). Only **main** is deployed to the live site.

## Flow summary (Lovable dev → Pages staging → Pages main)

The pipeline is one-way; nothing auto-promotes to production:

1. **Lovable dev → Pages staging**: When the Lovable repo’s **dev** branch changes, a sync runs and updates **only** the Pages repo’s **staging** branch. The sync workflow never touches **main**.
2. **Staging = test only**: The live site is **not** deployed from **staging**. Only **main** deploys. Test staging locally (from the Pages repo: `git checkout staging && npm ci && npm run build && npm run preview`) or via a PR diff before promoting.
3. **Pages staging → Pages main**: When you’re happy with staging, open a PR from **staging** → **main** in the Pages repo and merge. Only this manual step updates **main**.
4. **Pages main → production**: A push to **main** triggers the deploy workflow in the Pages repo; the live site updates.

## Staging vs prod (one URL)

GitHub Pages gives **one** site per repo. So:

- **Production**: Deploy runs only on push to **main** in the Pages repo. That’s the live site.
- **Staging**: Sync from Lovable updates **staging** only. The live site is never overwritten by staging.

## How Lovable → staging sync runs

The Pages repo has a workflow **“Sync Lovable into staging”** (`sync-lovable.yml`). It runs when:

1. **Push to dev (immediate)** — The Lovable repo’s workflow calls the Pages repo’s `repository_dispatch` when you push to **dev**. Requires **`REPO_DISPATCH_TOKEN`** in the Lovable repo (see below).
2. **Manual** — In the Pages repo, Actions → **“Sync Lovable into staging”** → Run workflow.
3. **Daily backup** — A cron runs at 06:00 UTC in the Pages repo.

Sync merges the Lovable repo’s public **dev** branch into the Pages repo’s **staging**; no token is needed in the Pages repo to read from the public Lovable repo. The sync pushes the full branch (including `.github/workflows/` from Lovable), so the **Pages repo** must grant workflow write.

**Pages repo: allow workflow write for GITHUB_TOKEN**

In **ekbatashoonya.github.io** → **Settings** → **Actions** → **General** → **Workflow permissions**, select **“Read and write permissions”** (not “Read repository contents and packages permissions only”). Save. Without this, the sync push fails with “refusing to allow a GitHub App to create or update workflow … without workflows permission”.

### Setting up REPO_DISPATCH_TOKEN (one-time)

You need **one** token that can trigger workflow events (repository_dispatch) in **ekbatashoonya/ekbatashoonya.github.io** (the Pages repo). Create it on the GitHub account that has push access to that repo, then add it as a secret **in the Lovable repo**.

**Step 1: Create a Personal Access Token**

- **GitHub.com** → profile (top right) → **Settings** → **Developer settings** → **Personal access tokens**.
- **Fine-grained** (recommended): **Generate new token**. Name it e.g. `trigger-pages-sync`. Under **Repository access**, choose **Only select repositories** and pick **ekbatashoonya/ekbatashoonya.github.io**. Under **Permissions** → **Repository permissions**, set **Contents** to **Read and write** (required for `POST /repos/.../dispatches`). **Actions: Read and write** alone is not enough. Generate and copy the token.
- **Tokens (classic)**: **Generate new token (classic)**. Name it, set expiry, check **repo** and **workflow** (workflow is required to trigger repository_dispatch). Generate and copy.

**Step 2: Add the token in the Lovable repo**

- In the **Lovable repo**, go to **Settings** → **Secrets and variables** → **Actions**.
- **New repository secret**: Name **`REPO_DISPATCH_TOKEN`**, value = token from Step 1.

**Step 3: Verify**

- Push a commit to **dev** in the Lovable repo (or run “Trigger sync to GitHub Pages repo” from Actions there).
- In the **Pages repo**, open **Actions** and confirm **“Sync Lovable into staging”** ran. If the token is wrong or missing, the trigger workflow in the Lovable repo will fail with 401/403.

**If you see 403 “Resource not accessible by personal access token”**: the token cannot call `POST /repos/.../dispatches`. Use a **classic** token with **repo** and **workflow**, or a **fine-grained** token with **Contents: Read and write** on the Pages repo (Actions: Read and write alone is not sufficient). Update the token and `REPO_DISPATCH_TOKEN` in the Lovable repo.

## Versioning (which version where)

| Where | How to see the version |
|-------|-------------------------|
| **Lovable repo, `dev`** | `git log -1 --oneline` on **dev**. |
| **Pages repo, `staging`** | **version-info.json** on the **staging** branch (`role: "staging"`, `updatedAt`, etc.). |
| **Pages repo, `main`** | **version-info.json** on **main** (`role: "production"`, `deployed: true`). |
| **Live site** | Footer version line; or **https://ekbatashoonya.github.io/version.json** (branch, commit, buildTime, deployed). |

## Testing the workflow (Lovable dev → staging → main → live)

### 1. Lovable dev → Pages staging

- **Option A:** In the **Pages repo**, Actions → **“Sync Lovable into staging”** → Run workflow.
- **Option B:** Push a commit to **dev** in the Lovable repo; the trigger workflow will run and the Pages sync will run.

**Verify:** In the Pages repo, **staging** branch has **version-info.json** with `"role": "staging"` and recent `updatedAt`. Optionally: from Pages repo `git checkout staging && npm ci && npm run build && npm run preview` and open the preview URL.

### 2. Pages staging → Pages main

- In the **Pages repo**, open a **Pull request** from **staging** into **main**. Review the diff, then **merge**.

**Verify:** **main** is updated; **“Deploy to GitHub Pages”** runs.

### 3. Pages main → live site

- After the deploy workflow completes, the live site updates.

**Verify:** Pages repo Actions → “Deploy to GitHub Pages” success; open the site and footer version line; open **https://ekbatashoonya.github.io/version.json** and confirm `deployed: true` and branch/commit match **main**.

### Quick reference

| Step | Where | Action |
|------|--------|--------|
| 1 | Pages repo → Actions, or push to Lovable dev | Run “Sync Lovable into staging” (or push to dev) |
| 2 | Pages repo | PR **staging** → **main**, then merge |
| 3 | Automatic | Deploy runs on push to main; check live site + version.json |
