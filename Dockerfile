FROM node as builder
WORKDIR /build
COPY . .
RUN npm install && npm run build

FROM nginx
WORKDIR /build
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /build/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]