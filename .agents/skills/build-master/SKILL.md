---
name: build-master
description: Automated verification system to prevent regressions in the Unified Portfolio and Launchpad. Runs build, lint, and cross-app connectivity checks. Use when the user wants to "verify build", "check for regressions", or "ensure quality before push".
---

# Unified Build Master

> [!IMPORTANT]
> **Mandatory Execution**: This skill MUST be executed before and after every code change. It is the designated "Gatekeeper" of the platform's engineering and design quality.

## Purpose
Ensure that no changes break the core functionality, styling, or connectivity of the Unified Platform (Portfolio + Launchpad).

## Core Verification Sequence

### 1. Launchpad Application Check
- **Context**: `/Users/macos/Documents/GitHub/cuauhtemoccatano.github.io/launchpad-app`
- **Actions**:
    - Run `npm run lint`: Stop execution if linting fails.
    - Run `npm run build`: Ensure production build is successful.

### 2. Portfolio Integrity Check
- **Context**: `/Users/macos/Documents/GitHub/cuauhtemoccatano.github.io/index.html`
- **Actions**:
    - Verify `discovery` section exists (lead gen tool).
    - Verify `launchpad-app` link is valid in the navbar.
    - Verify `script.js` uses relative API paths (`/api/check-vitals`) instead of absolute localhost.

### 3. API Reliability Check
- **Actions**:
    - If `npm run dev` is running, hit `http://localhost:3000/api/check-vitals` with a mock POST request.
    - Verify the response structure: `{ score: number, metrics: { performance: number, identity: number } }`.

## Instructions for the Agent
When this skill is invoked:
1.  **Launch the Verification Sequence** in the background or synchronously.
2.  **Report any failures immediately** with the exact error log.
3.  **Produce a Quality Score** for the current state (100% if all pass).

---

## Skill Configuration
- **Repository Root**: `/Users/macos/Documents/GitHub/cuauhtemoccatano.github.io/`
- **Launchpad Dir**: `/Users/macos/Documents/GitHub/cuauhtemoccatano.github.io/launchpad-app/`
