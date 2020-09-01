# Production instructions

## Deployment

    docker-compose up -d

or to force a rebuild:

    docker-compose up -d --build

## Restore data

    docker exec -i bookshelf_postgres_1 psql -U postgres -d bookshelf < bookshelf_xxx.sql
 