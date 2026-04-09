## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-20 - [Terminal Focus & Accessibility Standards]
**Learning:** Custom interactive components like the bash terminal require explicit visual focus states and ARIA labeling to be both intuitive and accessible. Removing `autofocus` from non-primary inputs prevents disruptive focus hijacking for screen reader users.
**Action:** Use `:focus-within` on container elements for custom inputs to provide holistic visual feedback, and always pair icon-only buttons with descriptive `aria-label` attributes.
