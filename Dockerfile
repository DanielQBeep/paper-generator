FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.mjs .
COPY .eslintrc.json .
COPY components.json .

ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}
ARG PUPPETEER_EXECUTABLE_PATH
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

FROM base AS runner

RUN apk update
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    npm

# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub
# RUN apk update --no-install-recommends \
# RUN apk add google-chrome-stable \
#     fonts-ipafont-gothic \
#     fonts-wqy-zenhei \
#     fonts-thai-tlwg \
#     fonts-kacst \
#     fonts-freefont-ttf \
#     libxss1 \
# RUN rm -rf /var/lib/apt/lists/*

WORKDIR /app

ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

ARG PUPPETEER_DOWNLOAD_PATH   
ENV PUPPETEER_DOWNLOAD_PATH=/usr/local/puppeteer/download   
RUN npm install -g npm@latest

RUN npm install -g puppeteer
# RUN npx puppeteer browsers install chrome@stable

RUN addgroup --system --gid 1001 chrome-user
RUN adduser --system --uid 1001 --shell /bin/bash chrome-user
RUN addgroup --system --gid 1002 nodejs
RUN adduser --system --uid 1002 nextjs

RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/ ./

# CMD ["node", "server.js"]
CMD ["npm", "run", "start"]
