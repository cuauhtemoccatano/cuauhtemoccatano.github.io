## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-05-01 - [Keyboard Accessibility with Custom Cursors]
**Learning:** In environments using `cursor: none`, keyboard navigation feedback becomes the primary way to understand interactive state. Standard focus rings are often suppressed or insufficient.
**Action:** Always implement high-contrast `:focus-visible` styles with theme-aware glow effects to ensure inclusive navigation when visual mouse indicators are hidden.
