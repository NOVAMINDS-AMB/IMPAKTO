# impakto-frontend/Dockerfile

# --- Stage 1: Build the Vite apps ---
FROM node:20-alpine as builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy dependency files first for caching
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/ packages/
COPY apps/ apps/
COPY tooling/ tooling/

# Install dependencies and build all apps
RUN pnpm install
RUN cd apps/landing-webpage && pnpm run build
RUN cd apps/msme-PWA && pnpm run build
RUN cd apps/MFI-dashboard && pnpm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from the builder stage into separate folders
COPY --from=builder /app/apps/landing-webpage/dist /usr/share/nginx/html/landing
COPY --from=builder /app/apps/msme-PWA/dist /usr/share/nginx/html/msme
COPY --from=builder /app/apps/MFI-dashboard/dist /usr/share/nginx/html/mfi

# Copy our custom Nginx routing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
