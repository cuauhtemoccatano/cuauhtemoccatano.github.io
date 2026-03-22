## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-22 - [Refining Terminal Interaction and Accessibility]
**Learning:** For terminal emulators in web interfaces, removing `autofocus` prevents disruptive page jumps on load, while implementing a click-to-focus pattern on the terminal body ensures the interaction remains intuitive.
**Action:** Always provide explicit `aria-label` attributes for terminal inputs and interactive elements lacking text, and use `:focus-within` on the container to provide visual feedback for the entire component.
