## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Focus Visibility in No-Cursor Environments]
**Learning:** In a UI where `cursor: none !important` is applied (like this 'Liquid Glass' design), high-contrast `:focus-visible` styles are the only way for keyboard users to navigate. Global `outline: none` on inputs without a robust replacement is a critical accessibility blocker.
**Action:** Always implement a high-contrast `:focus-visible` outline (e.g., `2px solid var(--accent-color)`) and use `:focus-within` on parent containers to provide broader visual context for focused nested elements.
