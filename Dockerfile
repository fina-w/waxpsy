# Étape de build
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances d'abord
COPY package*.json ./
COPY .npmrc* ./

# Installer les dépendances
RUN npm ci --legacy-peer-deps

# Copier le reste des fichiers
COPY . .

# Construire l'application
ENV NODE_ENV=production
RUN npm run build -- --mode production

# Étape de production
FROM nginx:alpine

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Créer le répertoire de destination et copier les fichiers construits
RUN mkdir -p /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html/

# Définir les permissions
RUN chmod -R 755 /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
