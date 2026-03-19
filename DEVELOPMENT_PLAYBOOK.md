# Development Playbook: Unified Brand Hub

This document defines the mandatory quality standards for any development iteration on the Portfolio and Launchpad.

> [!IMPORTANT]
> **Mandatory Rule**: The "Build Master" verification sequence MUST be executed and read before and after any code modification.

## 1. Quality Standards
- **Zero Regressions**: No feature may be added without verifying that the existing "Brand Discovery" (Move 3) and Launchpad connectivity remain 100% functional.
- **Design Consistency**: Follow the **Liquid Glass** aesthetic (OLED blacks, glass-blur, Archivo/Space Grotesk typography) as defined in the `brand-guidelines-cuauhtemoc-2026-03-16.md`.
- **Clean Builds**: Both the static root and the `launchpad-app` must pass all linting and build checks without critical warnings.

## 2. Mandatory Verification Steps
Before considering a task "Finished", the AI must:
1.  **Execute the Build Master**: `/Users/macos/Documents/GitHub/cuauhtemoccatano.github.io/.agents/skills/build-master/scripts/verify_build.sh`
2.  **Verify UI Flow**: Use the browser tool to confirm that the `Discovery` section on `index.html` correctly communicates with the Next.js API.
3.  **Check Versioning**: Ensure any package updates or project versions are synchronized across the ecosystem.

## 3. Communication
- Always report the verification results to the user.
- If a build fails, the AI is forbidden from requesting "approval" until the regression is fixed.

---
*Created on 2026-03-18*
