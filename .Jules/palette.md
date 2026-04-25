## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Unified Accessibility Localization]
**Learning:** Icon-only buttons and interactive inputs often lack localized accessibility attributes (ARIA labels, titles, placeholders) in multi-language sites. A scalable pattern is to use `data-i18n-label`, `data-i18n-title`, and `data-i18n-placeholder` attributes and update the `updateLanguage` function to apply these automatically from the translation object.
**Action:** Always pair `data-i18n` with its ARIA counterparts (`data-i18n-label`, etc.) for all interactive elements to ensure screen reader accessibility across all supported languages.
