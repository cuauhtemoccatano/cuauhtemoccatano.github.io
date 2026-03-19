---
description: how to verify the entire unified platform for regressions
---

# Platform Verification Workflow

This workflow ensures the integrity of the Portfolio and Launchpad ecosystem.

1. Ensure the Next.js development server is running in `launchpad-app/`.
2. Run the Build Master verification script:
```bash
/Users/macos/Documents/GitHub/cuauhtemoccatano.github.io/.agents/skills/build-master/scripts/verify_build.sh
```
3. Open the browser and navigate to `index.html`.
4. Perform a test scan on the **Brand Discovery** tool.
5. If all checks pass, the platform is considered stable.
