## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-04-23 - [Unified Localization for ARIA and Accessibility Attributes]
**Learning:** Standardizing localization for non-text attributes (ARIA labels, titles, placeholders) via `data-i18n-*` attributes ensures that accessibility features remain synchronized with the visual language state. Global focus styles using `*:focus-visible` provide a high-impact accessibility improvement without affecting the visual experience for mouse users.
**Action:** Use `data-i18n-label`, `data-i18n-title`, and `data-i18n-placeholder` on all interactive elements and ensure the `updateLanguage` utility iterates over these attributes. Apply `*:focus-visible` globally for consistent keyboard navigation feedback.
