#!/usr/bin/env node

// Check if the correct package manager is being used
const packageManager = process.env.npm_config_user_agent;

if (packageManager && !packageManager.startsWith('pnpm')) {
  console.error('\n❌ This project uses pnpm as the package manager.');
  console.error('Please use pnpm instead of npm or yarn:\n');
  console.error('  pnpm install');
  console.error('  pnpm run dev');
  console.error('  pnpm run build\n');
  console.error('If you don\'t have pnpm installed, run: npm install -g pnpm\n');
  process.exit(1);
}