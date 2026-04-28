## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2025-05-15 - [Accessible Focus States with Custom Cursors]
**Learning:** In designs using `cursor: none` for custom "liquid" cursors, keyboard users become completely blind to their position if standard focus indicators are missing. Brand-aligned `:focus-visible` styles with glowing effects (e.g., `--accent-glow`) provide high-contrast feedback without compromising the aesthetic.
**Action:** Always implement a prominent `*:focus-visible` style that uses the brand's accent color and a glow/shadow to ensure discoverability during keyboard navigation.

## 2025-05-15 - [Localization of Non-Text Attributes]
**Learning:** For a fully accessible multi-language UI, localizing `aria-label`, `title`, and `placeholder` is as critical as localizing text content. Using `data-i18n-[attribute]` patterns in the HTML allows the translation engine to handle interactive metadata systematically.
**Action:** Extend the `updateLanguage` function to scan for `data-i18n-label`, `data-i18n-title`, and `data-i18n-placeholder`, ensuring icon-only buttons and inputs remain accessible across all supported languages.
