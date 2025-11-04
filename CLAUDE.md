# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Timeer is a simple, mobile-friendly timer application built as a Progressive Web App (PWA). Users can start a timer from "now" or a custom date/time, and the timer continuously runs with localStorage persistence across sessions. The timer display uses progressive humanization (seconds → minutes → hours → days → weeks).

## Development Commands

```bash
# Start development server
npm run dev

# Start dev server with network access (for testing on mobile devices)
npm run dev -- --host

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### State Management
- **Central Hook**: `useTimer` (src/hooks/useTimer.ts) manages all timer state
- **localStorage Persistence**: Timer state is automatically saved/restored using the key `timeer-state`
- **Timer Updates**: Uses a 1-second interval when timer is active (isConfigured=true)
- **Elapsed Time Calculation**: Computed on every render from startTime and currentTime

### Progressive Humanization Logic
The `formatElapsedTime` function in TimerDisplay.tsx implements cascading time display:
- < 60s: "X seconds"
- < 60min: "X minutes" / "Y seconds" (two lines)
- < 24h: "X hours" / "Y minutes" (two lines)
- < 7d: "X days" / "Y hours" (two lines)
- ≥ 7d: "X weeks" / "Y days" (two lines)

All displays except < 60s use a two-line format (primary/secondary) for better mobile readability.

## GitHub Pages Deployment

- **Base Path**: Vite is configured with `base: '/timeer/'` for GitHub Pages
- **Auto-Deploy**: Push to `main` branch triggers GitHub Actions workflow (.github/workflows/deploy.yml)
- **Live URL**: https://kyrrigle.github.io/timeer/
- **PWA Manifest**: public/manifest.json includes `/timeer/` paths for proper home screen behavior

## Git Configuration

This repository uses a specific SSH configuration for the kyrrigle GitHub account:
- **Remote host**: `kyrriglegit` (defined in SSH config)
- **Git email**: kyrrigle@gmail.com (local repo config, not global)

When pushing, use the configured remote: `git push origin main`

## PWA Configuration

- **Manifest**: public/manifest.json with start_url and scope set to `/timeer/`
- **Icons**: Uses SVG icon at `/timeer/vite.svg`
- **iOS Support**: Includes meta tags for apple-mobile-web-app-capable and mobile-web-app-capable
- **Display Mode**: Standalone for app-like experience

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- No external date libraries (vanilla JS Date API)
