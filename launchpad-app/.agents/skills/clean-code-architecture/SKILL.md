# LaunchPad Hub Clean Code & Architecture standard

Architectural guidelines for maintaining the premium quality, performance, and maintainability of the LaunchPad Hub codebase.

## 1. Principle of Isolation
Keep the core business logic decoupled from the UI and external services.
- **Utilities (`/src/lib`)**: Extract heavy logic (like scraping, AI orchestration) into dedicated pure functions or classes.
- **Hooks**: Use custom hooks for complex state or data fetching to keep components focused on rendering.

## 2. Resource-Aware Engineering
Given the heavy tools used (Playwright, Ollama), code must be optimized for local performance.
- **Lazy Cleanup**: Always close headless browsers, database connections, and file streams in `finally` blocks.
- **Asset Blocking**: When scraping, block unnecessary resources (images, fonts, media) to save CPU/RAM.
- **Concurrency Control**: Use locks or queues for heavy background tasks to prevent system stalls.

## 3. High-Fidelity UI Standards
Adhere to the "Antigravity" design system for a consistent premium experience.
- **CSS Variables**: Use theme-aware variables for colors, spacing, and glassmorphism levels.
- **Micro-Animations**: Use Framer Motion for subtle transitions that make the app feel alive without causing layout shifts.
- **Performance**: Avoid expensive CSS filters (like heavy `backdrop-blur`) on too many elements simultaneously.

## 4. Scalable Directory Structure
Follow the established App Router patterns.
- `src/components`: Divided into `builder`, `layout`, and `ui`. 
- `src/app/api`: Clean RESTful endpoints that serve as bridges to the private local engine.

## 5. Defensive Implementation
- **Robust Fallbacks**: Always provide a "Stable Fallback" object if an AI call or complex scrape fails.
- **Type Safety**: Maintain strict TypeScript interfaces for all shared data models (ScrapeResult, ProjectBrief).

---
*Version 1.0.0 - LaunchPad Hub Excellence Specification*
