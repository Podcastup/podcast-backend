FROM node:13.10.1

WORKDIR /var/www/html/api

COPY ./ ./

EXPOSE 8000
RUN npm install && npm run build
CMD ["/bin/bash", "node_modules"]
