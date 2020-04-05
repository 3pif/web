FROM nginx:alpine

# Add nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Add static web page
COPY dist/* /var/www/