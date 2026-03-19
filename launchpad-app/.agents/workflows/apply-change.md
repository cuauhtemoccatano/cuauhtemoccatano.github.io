---
description: Mandatory Pre-Change Verification for LaunchPad Hub
---

# 🛡️ Mandatory Logic & Design Verification

Every code change (fix, feature, refactor) MUST follow these steps before implementation:

## 1. Primary Skill Review
// turbo
1. Use `view_file` to read the **LaunchPad Master Skills Guide** (`.agents/skills/launchpad-master-guide/SKILL.md`).
2. Verify if the change affects:
    - **Global Branding** (Electric Blue / Pure Black)
    - **Glassmorphism Layers** (Is it blocking a wallpaper?)
    - **Internationalization** (Ensure NO hardcoded strings)
    - **Versioning** (Use `lib/constants.ts`)

## 2. Dependency Audit
Check if your change introduces new icons or components that could conflict with existing layouts.
- Prefer `lucide-react` icons already in use.
- Use `cn()` from `@/lib/utils` for all conditional classes.

## 3. Pre-Implementation Tasking
Created a `task.md` for any logic change with a mandatory "Design Sync Audit" step.

## 4. Post-Change Verification
If the change affects any layout or shared component:
// turbo
1. Run `rm -rf .next && npm run build` to verify webpack integrity.
2. Confirm the server starts correctly with `npm run start`.
