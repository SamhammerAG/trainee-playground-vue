FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:22

ENV CHOKIDAR_USEPOLLING=true
RUN npm install -g http-server @vue/cli @vue/cli-service-global
WORKDIR /app

EXPOSE 8080