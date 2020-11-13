FROM ubuntu:16.04

MAINTAINER Farhad Ghasemi "farhadd7.ghasemi@gmail.com"

ENV TZ=Europe/Berlin

#Instalation
RUN apt-get update && apt-get install -y curl vim \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && curl https://deb.nodesource.com/setup_10.x | bash \
    && apt-get update && apt-get install -yq  tzdata nodejs git \
    && npm install pm2 -g \
    && mkdir /var/www/ /var/www/scratch

# Change TimeZone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

# Copy entrypoint
COPY entrypoint.sh /
COPY after_build.sh /

# Copy Project Files
COPY . /var/www

# Get and compile requirement
RUN cd /var/www

# Define working directory.
WORKDIR /var/www/

# Install Dependencies
RUN npm install && chmod +x /entrypoint.sh
RUN chmod +x /after_build.sh

# Build Project
RUN npm run build-server

# Define working directory.
WORKDIR /var/www/

ENTRYPOINT ["/entrypoint.sh"]
