## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-05-03 - [Dynamic State Accessibility and Visual Feedback]
**Learning:** In highly interactive 'Liquid Glass' interfaces, default browser outlines can clash with the aesthetic. However, removing them without providing a high-contrast alternative (like a custom `:focus-visible` with a theme-aware glow) compromises keyboard accessibility. Additionally, dynamic content like AI responses requires `aria-live` to be perceptible to screen reader users.
**Action:** Always pair `outline: none` with a robust `:focus-visible` style using `var(--accent-glow)` and ensure dynamic message containers use `aria-live="polite"`.
