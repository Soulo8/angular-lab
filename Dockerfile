# syntax=docker/dockerfile:1.4

# https://github.com/docker/awesome-compose/blob/master/angular/angular/Dockerfile

FROM --platform=$BUILDPLATFORM node:22-bookworm-slim as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@19

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM builder as dev-envs

RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git chromium
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

ENV CHROME_BIN=/usr/bin/chromium

CMD ["ng", "serve", "--host", "0.0.0.0"]