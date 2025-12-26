
migrate-up-all:
	migrate -path db/migrations -database "$(DB_URL)" -verbose up

migrate-down-all:
	migrate -path db/migrations -database "$(DB_URL)" -verbose down

migrate-up-1:
	migrate -path db/migrations -database "$(DB_URL)" -verbose up 1

migrate-down-1:
	migrate -path db/migrations -database "$(DB_URL)" -verbose down 1

migrate-status:
	migrate -path db/migrations -database "$(DB_URL)" -verbose version