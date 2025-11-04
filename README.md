# Timeer

A simple, elegant timer application with localStorage persistence. Track elapsed time from now or a custom start date/time.

## Features

- 🕐 Start timer from "now" or custom date/time
- 📱 Mobile-friendly, PWA-ready for iOS home screen
- 💾 Automatic persistence across sessions (localStorage)
- ⏱️ Progressive humanized display (seconds → minutes → hours → days → weeks)
- 🎨 Clean, minimal UI built with Tailwind CSS

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test on mobile (exposes on local network)
npm run dev -- --host

# Build for production
npm run build
```

## Live Demo

https://kyrrigle.github.io/timeer/

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- GitHub Pages (auto-deploy on push to main)
