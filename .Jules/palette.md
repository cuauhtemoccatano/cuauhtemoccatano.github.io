## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-20 - [Terminal UX and Accessibility Polish]
**Learning:** In interactive terminal components, users instinctively click the terminal window to gain focus. Implementing a global click listener on the terminal body that focuses the hidden input field matches user mental models. Additionally, the `:focus-within` CSS selector is a powerful way to provide visual feedback to the entire container without complex JS logic.
**Action:** Always implement click-to-focus for terminal emulators and use `:focus-within` for container-level focus indicators. Ensure all icon-only buttons (like Oracle toggles, close buttons) have explicit `aria-label` attributes to provide context to screen reader users.
