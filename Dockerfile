FROM nginx:1.29.1-alpine

# Add static web page
COPY dist/* /usr/share/nginx/html/
COPY public/* /usr/share/nginx/html/