FROM node:10.7.0-stretch
RUN apt-get update && apt-get install -y \
    apt-utils \
    ghostscript \
    unoconv \
    imagemagick \
    poppler-utils\
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
