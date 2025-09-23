# Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
# sua app já escuta 3000 -> mantemos assim
EXPOSE 3000

CMD sh -lc 'if [ -n "$FIREBASE_ADMIN_JSON" ]; then printf "%s" "$FIREBASE_ADMIN_JSON" > /tmp/firebase.json && export GOOGLE_APPLICATION_CREDENTIALS=/tmp/firebase.json; fi; node lib/app.js'
