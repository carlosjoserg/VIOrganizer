FROM ubuntu:21.10

ENV DEBIAN_FRONTEND=

# basic stuff
RUN apt-get update
RUN apt-get install -y build-essential curl git gitk git-gui

# install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

# Create generic developer user
RUN groupadd --gid 1000 developer
RUN useradd -s /bin/bash --uid 1000 --gid 1000 -m developer

# [Optional] Add sudo support for the developer user
RUN apt-get install -y sudo
RUN echo developer ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/developer
RUN chmod 0440 /etc/sudoers.d/developer

# install global packages
ENV NPM_CONFIG_PREFIX=/home/developer/.npm-global
ENV PATH /home/developer/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest

## tunneling and building
RUN npm i -g @expo/ngrok@^4.1.0

## more dev tools
RUN npm install i -g jest jest-expo