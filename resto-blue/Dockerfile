# Using a special version of Ngnix, for ARM only
FROM alexellis2/nginx-arm
# Moving the website sources into the image
COPY www/ /var/www/html
# Moving the Ngnix config into the image
COPY ./nginx/default.conf /etc/nginx/conf.d/.
EXPOSE 80