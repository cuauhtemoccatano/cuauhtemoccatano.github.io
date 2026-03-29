#!/bin/bash

# Unified Build Master - Verification Script
# This script ensures the Portfolio and Launchpad are in a healthy, production-ready state.

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

ROOT_DIR=$(pwd)
LAUNCHPAD_DIR="$ROOT_DIR/launchpad-app"

echo -e "${BLUE}=== Starting Unified Build Verification ===${NC}"

# 1. Launchpad Check
echo -e "\n${BLUE}1. Analyzing Launchpad (Next.js)...${NC}"
cd "$LAUNCHPAD_DIR" || exit

echo "Running pnpm install..."
pnpm install

echo "Running Linting..."
if pnpm run lint; then
    echo -e "${GREEN}✓ Linting passed.${NC}"
else
    echo -e "${RED}✗ Linting failed. Please fix warnings/errors before push.${NC}"
    exit 1
fi

echo "Running Production Build..."
if pnpm run build; then
    echo -e "${GREEN}✓ Build successful.${NC}"
else
    echo -e "${RED}✗ Build failed. Critical regression detected in Launchpad.${NC}"
    exit 1
fi

# 2. Portfolio Integrity Check
echo -e "\n${BLUE}2. Analyzing Portfolio (Static)...${NC}"
cd "$ROOT_DIR" || exit

echo "Checking index.html Discovery & Oracle Sections..."
if grep -q "id=\"discovery\"" index.html && grep -q "id=\"oracle-chat\"" index.html; then
    echo -e "${GREEN}✓ All key UI sections (Discovery & Oracle) found.${NC}"
else
    echo -e "${RED}✗ One or more key UI sections are missing in index.html.${NC}"
    exit 1
fi

echo "Checking API Paths in script.js..."
if grep -q "api/check-vitals" script.js; then
    echo -e "${GREEN}✓ API connectivity patterns verified.${NC}"
else
    echo -e "${RED}✗ script.js is missing API integration patterns.${NC}"
    exit 1
fi

# 3. UI/UX Contrast Audit
echo -e "\n${BLUE}3. Running UI/UX Contrast Audit...${NC}"
chmod +x "$ROOT_DIR/.agents/skills/build-master/scripts/check_ui_contrast.sh"
if "$ROOT_DIR/.agents/skills/build-master/scripts/check_ui_contrast.sh"; then
    echo -e "${GREEN}✓ UI Contrast Audit passed.${NC}"
else
    echo -e "${RED}✗ UI Contrast Audit failed. Accessibility issues detected.${NC}"
    exit 1
fi

echo -e "\n${GREEN}=== ALL CHECKS PASSED: READY FOR PRODUCTION ===${NC}"

exit 0
