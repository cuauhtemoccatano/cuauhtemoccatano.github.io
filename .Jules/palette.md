## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-04-29 - [Synchronized Accessibility Localization]
**Learning:** For dynamic interactive elements (like theme toggles), `aria-label` and `title` attributes must be synchronized not only with the visual state but also with the active language. Relying on static text in JS for these labels breaks accessibility when the language is switched.
**Action:** Use a standardized `data-i18n-label` and `data-i18n-title` pattern in HTML and update the `updateLanguage` utility to synchronize these attributes whenever the language or state changes.
