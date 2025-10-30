# Dockerfile Optimization Tasks

- [x] Update Dockerfile: Switch to alpine-based images (node:20-alpine, nginx:alpine), use npm ci for faster installs, combine RUN commands, remove npm cache clean, add ENV NODE_ENV=production.
- [x] Update nginx.conf: Add gzip compression and caching headers for better performance.
- [x] Test the optimized build with docker build to verify performance improvement and correctness.
