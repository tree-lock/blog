---
name: blog-commit
description: Stages and commits blog workspace changes in one pass with short English type(scope) subject lines, then rebases onto main or pulls with rebase on main/release. Use when the user asks to commit, add and commit together, write a commit message, or follow feat(xx) format in this repository.
---

# Blog commit messages

## Required format

```
<type>(<scope>): <subject in English>
```

- **Subject**: one short imperative sentence (like "add dark mode toggle"), **no trailing period**, **not** Title Case for the whole line.
- Prefer **under ~72 characters** for the full first line; aim for one clear clause.
- **Language**: English only for `type`, `scope`, and `subject`.

## Before writing the message

1. Inspect changes the commit will include:
   - Run `git status` first.
   - If the user only wants a message (no git commands): use staged diff if any, else unstaged.
   - If the user wants an actual commit (default when they say “commit” or “提交”): treat **unstaged + untracked** as the source of truth before staging; use `git diff` / `git diff --stat` and listed paths.
2. Summarize **what** changed and **why** in one line; drop boilerplate ("update", "minor tweaks") unless that is the real change.

## Choosing `type`

| Situation | type |
|-----------|------|
| New behavior, feature, route, visible UX | `feat` |
| Bug fix | `fix` |
| Refactor without behavior change | `refactor` |
| Tooling, CI, build, deps only | `chore` |
| README / comments / copy-only | `docs` |
| Format-only / lint auto-fix | `style` |
| Tests only | `test` |

Use `feat` when unsure between small UX and chore.

## Choosing `scope`

Short **lowercase** token from the main area touched. Examples for this Vite + TanStack Router blog:

| Area | scope examples |
|------|----------------|
| Routes / pages | `routes`, `home`, `about` |
| Layout / chrome | `layout`, `header`, `footer` |
| Theme / appearance | `theme` |
| Router setup | `router` |
| Vite / build | `vite`, `build` |
| Site title / meta hooks | `title` |
| Config (biome, tsconfig, vscode) | `config` |
| Dependencies | `deps` |
| CI / GitHub Actions | `ci` |

If several areas change, pick the **dominant** one or use `blog` as a fallback scope.

## Examples

```
feat(theme): add system preference sync for color mode
fix(router): correct base path for GitHub Pages
chore(vite): tighten dev server port configuration
refactor(header): extract nav links into a small map
docs(readme): note pnpm and preview commands
```

## Add and commit in one pass

When the user asks to commit (or clearly wants the change recorded), **do not** stop at suggesting a message unless they asked for text only.

1. **Stage**: `git add` only paths that belong to this single logical change. If the working tree mixes unrelated edits, either stage a subset or tell the user to split commits before proceeding.
   - If they want “everything currently changed” and it is one coherent change: `git add -A` from the repo root is acceptable.
   - Prefer explicit paths over blind `git add .` when status shows risky extras (secrets, generated artifacts, unrelated files).
2. **Verify**: `git diff --cached --stat` (and skim `git diff --cached` if needed) so the message matches what will be committed.
3. **Commit**: `git commit -m '<type>(<scope>): <subject>'` (single quotes in shell, or `-m` twice for body).
4. **After the commit succeeds**: run **After commit (branch sync)** below (skip if the user asked for a message only or explicitly skipped post-commit sync).

Git writes need appropriate permissions in the environment (e.g. `git_write`). `git pull --rebase` may need network access (e.g. `full_network`).

## After commit (branch sync)

Run **only after** a successful `git commit` in this workflow (not for message-only requests).

1. Read the current branch: `git branch --show-current`.
   - If empty (detached HEAD) or ambiguous, **do not** run the commands below; say so briefly.
2. If the branch is **`main`** or **`release`**:
   - Run: `git pull --rebase`
3. Otherwise (any other branch):
   - Run: `git rebase main`

If `git rebase main` fails because `main` is missing locally, run `git fetch origin main` (or equivalent) and retry once, or report the error. If rebase or pull stops on conflicts, stop and tell the user to resolve; do not force or autoskip.

## When committing

1. Derive **one** subject line in the required format from the diff that **will** be committed (unstaged/untracked before `git add`, or `git diff --cached` after staging); show it, then run add+commit as in **Add and commit in one pass** unless they refused execution or asked for message text only.
2. If multiple unrelated changes are mixed, suggest **splitting** into separate commits instead of one vague message.
3. Do **not** invent scope from imagination; derive it from paths and diff content.

## Optional body

Only add a body (blank line after subject) if the user asks or the change needs risk/release notes. Keep body English and brief.
