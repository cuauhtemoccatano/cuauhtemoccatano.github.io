## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-04-26 - [Global Focus Feedback in Custom Cursor Designs]
**Learning:** In applications that use `cursor: none` to implement custom liquid cursors, standard mouse-based feedback is lost. This makes global `:focus-visible` styles and container-level `:focus-within` feedback critical for both accessibility and general usability, as they provide the only reliable visual cues for interaction state.
**Action:** Always implement a theme-aware `--accent-glow` or similar variable to provide consistent, high-contrast focus rings and halo effects that complement the custom cursor's aesthetic without sacrificing keyboard navigability.
