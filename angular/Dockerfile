### STAGE 1: Build ###
FROM node:18 AS install_production_dependencies
WORKDIR /usr/src/app
RUN npm install -g @angular/cli 
COPY package.json tsconfig.json package-lock.json ./
RUN  npm install
COPY . .
RUN npm run build:prod
EXPOSE 4200
CMD ng serve --host 0.0.0.0 --port 4200
