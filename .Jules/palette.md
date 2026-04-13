## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-04-13 - [Focus-Visible and Interactive Terminal UX]
**Learning:** For terminal-style interfaces, users expect to be able to click anywhere in the container to focus the input. Additionally, global focus indicators (focus-visible) are essential for keyboard navigability in high-polish "glass" UIs.
**Action:** Always implement a container-level click listener for custom inputs like terminals, and use `:focus-within` for container-level visual feedback.
