FROM node:13.10.1

WORKDIR /var/www/html/mailService

COPY ./ ./

EXPOSE 7000
RUN npm install && npm run build
CMD ["npm", "dev"]
