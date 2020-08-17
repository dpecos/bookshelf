# Developement

## Local database

To create a new docker database:

```sh
docker run --name bookshelf_db -p 127.0.0.1:5432:5432 -d -e POSTGRES_DB=bookshelf -e POSTGRES_PASSWORD=bookshelf postgres
```

PSQL cli:

```sh
docker exec -it bookshelf_db psql -U postgres -d bookshelf
```

## Database migration

1. Load a backup file into a MySQL instance

New MySQL instance:

```sh
docker run --name bookshelf_mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=bookshelf -e MYSQL_USER=bookshelf -e MYSQL_PASSWORD=bookshelf -p 127.0.0.1:3306:3306 -d mysql:5.7
```

Load data:

```sh
docker exec -i bookshelf_mysql mysql -ubookshelf -pbookshelf bookshelf < bookshelf_20200816_001502.sql
#docker exec -it bookshelf_mysql mysql -ubookshelf -pbookshelf bookshelf
```

2. Create a new PostgreSQL instance

```sh
docker run --name bookshelf_db -p 127.0.0.1:5432:5432 -d -e POSTGRES_DB=bookshelf -e POSTGRES_PASSWORD=bookshelf postgres
```

3. Perform the migration using `pgloader` (https://www.digitalocean.com/community/tutorials/how-to-migrate-mysql-database-to-postgres-using-pgloader)

```sh
pgloader mysql://bookshelf:bookshelf@localhost:3306/bookshelf postgresql://postgres:bookshelf@localhost:5432/bookshelf
```

4. Destroy the MySQL instance

```sh
docker stop bookshelf_mysql
docker rm bookshel_mysql
```

5. Prepare data in PostgreSQL

```sql
drop sequence books_id_seq cascade;
drop sequence categories_id_seq cascade;
drop sequence collections_id_seq cascade;
drop table schema_migrations;
```
