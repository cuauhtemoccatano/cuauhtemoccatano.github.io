## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-18 - [Interactive Terminal UX Patterns]
**Learning:** For terminal-style components, users expect "click-anywhere-to-focus" behavior. Additionally, providing visual feedback via `:focus-within` on the container (e.g., border color change) helps users understand that the terminal is the active interactive context.
**Action:** Implement click event listeners on terminal body containers that delegate focus to the underlying input, and use `:focus-within` for container-level visual state feedback.
