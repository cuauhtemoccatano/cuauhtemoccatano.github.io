## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Localized Accessibility Attributes]
**Learning:** Standard internationalization often misses ARIA labels and titles, leaving screen reader users with untranslated or missing context. Using data-attributes (e.g., data-i18n-label) to declaratively link accessibility attributes to the translation engine ensures a consistent experience across all supported languages.
**Action:** Always include data-i18n-label and data-i18n-title markers on icon-only interactive elements and update the i18n logic to handle these attributes during language transitions.
