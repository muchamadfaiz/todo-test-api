.PHONY: deploy up down restart build logs ps

deploy:
	git pull --ff-only origin main
	docker compose up --build -d
	docker compose ps

up:
	docker compose up --build -d

down:
	docker compose down

restart:
	docker compose down
	docker compose up --build -d

build:
	docker compose build

ps:
	docker compose ps

logs:
	docker compose logs -f --tail=100 app
