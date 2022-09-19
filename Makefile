IMAGE_NAME?=algo3_discord_bot
ENV?=.env

build:
	npm install \
	&& npm run build

run: build
	npm start

build_docker:
	docker build -t $(IMAGE_NAME) .

run_docker: build_docker
	docker run --rm --env-file ${ENV} $(IMAGE_NAME)
