## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-20 - [Terminal Micro-UX Patterns]
**Learning:** Interactive terminal emulators in portfolios benefit significantly from three small touches: 1) Click-to-focus on the terminal body to mimic real CLI behavior, 2) `:focus-within` visual feedback on the outer window to signal activity, and 3) explicit `aria-label` on the input since CLI prompts ($) are often ignored by screen readers.
**Action:** Apply the "click-to-focus" and `:focus-within` pattern to all terminal-like components to ensure they feel responsive and accessible.
