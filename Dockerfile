FROM nginx:1.17.4-alpine
COPY ./build /usr/share/nginx/html
COPY ./nginx_fe_dev.conf /etc/nginx/conf.d/default.conf
