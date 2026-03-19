---
name: launchpad-master-guide
description: Master architectural and design guidelines for the LaunchPad Agency Hub. Use this to ensure 100% consistency in UI/UX, state management, and internationalization across the entire platform.
---

# 🚀 LaunchPad Master Skills Guide

This guide serves as the single source of truth for all engineering and design decisions within the LaunchPad application.

### 🛡️ Mandatory Enforcement
- **Change Control**: Before ANY modification to the application logic, UI components, or design tokens, you MUST use the **`/apply-change`** workflow located in `.agents/workflows/apply-change.md`.
- **Primary Skill Check**: Every new task MUST begin with a read of this `SKILL.md`. Failure to do so leads to regressions in branding and glassmorphism (Primary Rule).

## 🎨 Design System (The "Antigravity" Aesthetic)

LaunchPad uses a custom design system focused on **spatial depth**, **glassmorphism**, and **premium dark mode**.

### Core Tokens
- **Backgrounds**: Always `bg-zinc-950` or `bg-black`. Use `backdrop-blur-3xl` for overlays.
- **Accents**: Primary: `brand-500` (Electric Blue #3b82f6), Secondary: `brand-400`, Accent: `rose-500`.
- **Borders**: Subtle `border-white/10` or `border-brand-500/20`.
- **Corner Radius**: 
    - Full Pages/Main Containers: `rounded-3xl` (24px)
    - Modals/Step Cards: `rounded-2xl` (16px)
    - Buttons/Small Controls: `rounded-xl` (12px)

### The "Ecosystem Glassmorphism" Rule
For the internal wallpaper system to work, the interface must never use solid black/white backgrounds in layout-level containers.
- **Layer 1 (Foundation)**: Global Wallpaper gradient defined in `globals.css`.
- **Layer 2 (Sidebar/Header)**: `bg-black/20 backdrop-blur-xl`. Must allow the foundation color to bleed through.
- **Layer 3 (Main Workspace)**: `bg-[var(--surface-color)]/30 backdrop-blur-md`. Creates the "frosted glass" look.

```tsx
// Pattern for a glass-compliant container
<div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/5 rounded-3xl">
  {/* The wallpaper is now visible behind this component */}
</div>
```

## 🎬 Motion & GSAP Standards

All interactive elements must feel fluid. Avoid instant transitions.

- **Neural Entrances**: Use GSAP or Framer Motion for `y: 20`, `opacity: 0` to `y: 0`, `opacity: 1` with a `stagger: 0.1` on lists.
- **Hover States**: Always use `transition-all duration-300`. Scale transforms should be subtle (`scale-105`).
- **Loading States**: Use `animate-pulse` with zinc/indigo gradients for empty states.

## 🏗️ Architectural Patterns

### 1. Modular Step-Based Builders
When building multi-step flows (like New Project), isolate each step into its own component.
- **Prop Standard**: Each step should receive `config`, `updateConfig`, `onNext`, and `t` (translations).
- **State Location**: Keep the master state in the parent page/container, never in the individual steps.

### 2. Progressive Intelligence Analysis
For complex data extraction:
- **Sequential API**: Break analysis into discrete sections (Scrape → Visuals → Strategic → Technical).
- **Real-Time UI**: Update the frontend immediately as each JSON section arrives to improve perceived performance.

## 🌍 Internationalization (i18n)

LaunchPad is **bilingual (EN/ES)**. Hardcoded strings are strictly forbidden in components.

- **Translation Source**: `src/lib/translations.ts`
- **Implementation**:
```tsx
const { lang, t } = useTranslations(); // or passed via props
<h1>{t.title}</h1>
```

- **No `any`**: All API responses and component props must be strictly typed to ensure IDE intellisense and build stability.

## ⚙️ Configuration & Metadata
To avoid version desync and regression, use a single source of truth for all application-wide strings.

- **Centralized Constants**: Use `src/lib/constants.ts` for version numbers, agency names, and global status strings.
- **Strict Prohibition**: Hardcoding version strings (e.g., "v0.3.0") directly in UI components is forbidden.
- **Pattern**:
```tsx
import { APP_VERSION } from "@/lib/constants";
<span>Version {APP_VERSION}</span>
```

## 🛠 Build & Deployment (Electron Compatibility)

To prevent `404` errors and broken UI in the Electron environment (caused by stale CSS/JS chunks in the `.next` directory), always perform a clean production build before testing or distributing.

- **Clean Build Procedure**: 
    1. Interruption: `lsof -ti :3000 | xargs kill -9` (Clear existing server)
    2. Purge: `rm -rf .next` (Remove stale artifacts)
    3. Build: `npm run build` (Generate fresh production bundle)
    4. Start: `npm run start` (Run production server)
- **Pre-Launch Verification (Zero-Regression)**:
    - Before distributing a new version, navigate to **Settings** and **Templates** specifically. These routes often use complex icons or translations that can trigger a `500 Internal Error` if the build is incomplete.
- **Importance**: Stale chunks in `.next` or undefined Tailwind variables (e.g., missing `ring-color` tokens) can cause the main layout to reference missing assets, resulting in a black/unstyled screen.

---
*Follow these guidelines to maintain the premium quality of LaunchPad.*
