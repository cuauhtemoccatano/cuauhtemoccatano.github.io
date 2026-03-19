#!/bin/bash

# UI Contrast & Accessibility Guard
# Scans for low-contrast patterns in Portfolio and Launchpad

echo "--- Running UI Contrast & Accessibility Audit ---"

# 1. Check Portfolio (style.css)
echo "Checking Portfolio Contrast..."
TERMINAL_ACCENT=$(grep "\--accent-light" ./style.css)
if [[ -z "$TERMINAL_ACCENT" ]]; then
    echo "✗ ERROR: High-contrast terminal accent (--accent-light) missing in style.css"
    exit 1
fi
echo "✓ Terminal contrast variables found."

# 2. Check Launchpad (Tailwind Classes)
# We flag text-gray-400, text-gray-500, text-zinc-500, text-zinc-600 as they often fail on dark backgrounds
echo "Checking Launchpad Tailwind Contrast..."
LOW_CONTRAST_PATTERNS=("text-gray-400" "text-gray-500" "text-gray-600" "text-zinc-500" "text-zinc-600")

FAIL_COUNT=0
for pattern in "${LOW_CONTRAST_PATTERNS[@]}"; do
    FOUND=$(grep -r "$pattern" ./launchpad-app/src --exclude-dir=node_modules)
    if [[ ! -z "$FOUND" ]]; then
        echo "⚠ WARNING: Potential low-contrast class '$pattern' found in Launchpad:"
        echo "$FOUND" | head -n 3
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
done

if [ $FAIL_COUNT -gt 2 ]; then # Allow some for special edge cases, but fail if rampant
    echo "✗ UI Contrast Audit Failed: Too many low-contrast patterns detected."
    exit 1
fi

echo "✓ UI Contrast Audit Passed."
exit 0
