# Database Migrations

Log into PROD DB:

```
docker exec -it bookshelf-db psql -U postgres -d bookshelf_postgres_1
```

## 2020/09/13 Move authors to their own table

```
INSERT INTO authors(name) SELECT distinct(author) FROM books;
UPDATE books b SET "authorEntityId" = (SELECT id from authors WHERE name = b.author);
```