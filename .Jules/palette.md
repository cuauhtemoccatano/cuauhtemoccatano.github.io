## 2025-05-14 - [Accessibility in Cloned DOM Environments]
**Learning:** This project implements dark mode by cloning the entire `.container` into a `#dark-container` for a clip-path transition. This results in duplicate interactive elements in the DOM. ARIA labels and focus indicators must be robust enough to work across both containers.
**Action:** When adding accessibility features or event listeners, use class-based selectors or event delegation (e.g., `event.target.closest`) to ensure the behavior is consistent in both the original and cloned containers.

## 2026-03-16 - [Snappy Interaction Feedback]
**Learning:** Initial transition speeds of 0.5s to 1.5s for hover states and color changes felt sluggish. Reducing these to 0.3s significantly improved the perceived responsiveness of the interface without sacrificing the smoothness of the animation.
**Action:** Default to 0.3s for micro-interactions (hover, color swaps, active states) in this design system to maintain a snappy, high-quality feel.
