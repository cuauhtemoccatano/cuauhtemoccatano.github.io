## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-05-04 - [Global Focus Visibility in Liquid Glass UI]
**Learning:** In a 'Liquid Glass' design with , keyboard users are entirely dependent on clear visual focus indicators. A global `*:focus-visible` rule with a theme-aware glow provides this without cluttering the UI for mouse users.
**Action:** Always implement a dedicated `--accent-glow` variable and apply it via `*:focus-visible` for any UI using custom cursors or glassmorphism.

## 2026-05-04 - [Global Focus Visibility in Liquid Glass UI]
**Learning:** In a 'Liquid Glass' design with `cursor: none`, keyboard users are entirely dependent on clear visual focus indicators. A global `*:focus-visible` rule with a theme-aware glow provides this without cluttering the UI for mouse users.
**Action:** Always implement a dedicated `--accent-glow` variable and apply it via `*:focus-visible` for any UI using custom cursors or glassmorphism.
