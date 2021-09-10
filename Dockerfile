FROM nginx:1.21.3-alpine

# Add static web page
COPY dist/* /usr/share/nginx/html/
COPY public/* /usr/share/nginx/html/