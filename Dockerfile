FROM alpine:3.15 AS builder
# Update and install dependencies
RUN apk update \
    && apk add --no-cache nodejs npm py3-pip \
    && pip3 install --ignore-installed distlib bs4 beautifulsoup4 \
    requests google-auth gspread httplib2 oauth2client webargs flask flask-wtf \
    wtforms email-validator python-dotenv gunicorn google-api-python-client \
    google-auth-httplib2 google-auth-oauthlib
# Copy source code.
COPY assets /assets
COPY scripts /scripts
COPY submodules /submodules
COPY src /src
COPY package.json tsconfig.json /
# Install & build.
RUN npm install && npm run build
# Run the command
CMD ["npm", "start"]
