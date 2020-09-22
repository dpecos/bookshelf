# Production instructions

## Deployment

    docker-compose up -d

or to force a rebuild:

    docker-compose up -d --build

To rebuild an specific container:

    docker-compose build frontend

## Restore data

    docker exec -i bookshelf_postgres_1 psql -U postgres -d bookshelf < bookshelf_xxx.sql
 

## HTTP Auth

Traefik is configured to use HTTP Auth for frontend. The user / password to use in `docker-compose.yml` can be generated with the following command:

    echo $(htpasswd -nb bookshelf bookshelf) | sed -e s/\\$/\\$\\$/g