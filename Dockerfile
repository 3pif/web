FROM nginx:1.27.5-alpine

# Add static web page
COPY dist/* /usr/share/nginx/html/
COPY public/* /usr/share/nginx/html/