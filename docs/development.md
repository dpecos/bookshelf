# Developement

## Local database

To create a new docker database:

```sh
docker run --name bookshelf-db -p 127.0.0.1:5432:5432 -d -e POSTGRES_DB=bookshelf -e POSTGRES_PASSWORD=bookshelf postgres
```

PSQL cli:

```sh
docker exec -it bookshelf-db psql -U postgres -d bookshelf
```

## Database backup / restore

### Backup

Everything:

```sh
docker exec -t bookshelf-db pg_dumpall -c -U postgres > bookshelf_`date +%Y%m%d"_"%H%M%S`.sql
```

Just data:

```sh
docker exec -t bookshelf-db pg_dump -U postgres -a --inserts bookshelf > bookshelf_data_`date +%Y%m%d"_"%H%M%S`.sql
```

Only schema:

```sh
docker exec -t bookshelf-db pg_dump -U postgres --schema-only bookshelf > bookshelf_schema_`date +%Y%m%d"_"%H%M%S`.sql
```

### Restore a backup

```sh
docker exec -i bookshelf-db psql -U postgres -d bookshelf < bookshelf_xxx.sql
```
