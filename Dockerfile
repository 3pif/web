FROM rbnis/static-web:latest

# Add static web page
COPY dist/* /var/www/
COPY public/* /var/www/