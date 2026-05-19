## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Multi-Attribute Localization Pattern]
**Learning:** In a multi-lingual application with custom interactive components (like terminals or AI overlays), localizing only the text content is insufficient for accessibility. ARIA labels, titles, and placeholders must also be synchronized during language switches.
**Action:** Use a centralized localization loop that iterates over multiple data attributes (e.g., `data-i18n-label`, `data-i18n-placeholder`) and applies the corresponding translations to the respective DOM attributes.
