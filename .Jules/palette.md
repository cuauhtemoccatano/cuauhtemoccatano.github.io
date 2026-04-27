## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2024-03-20 - [Unified Localized Accessibility Pattern]
**Learning:** In a multi-lingual interface with hidden custom cursors, keyboard accessibility depends on high-contrast focus indicators and descriptive localized labels. Standard `aria-label` and `title` attributes often get left behind during language toggles if they aren't integrated into the i18n system.
**Action:** Use a declarative `data-i18n-label` and `data-i18n-title` pattern in HTML to ensure all accessibility strings are automatically refreshed alongside visual content during language transitions.
