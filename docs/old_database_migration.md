# Database migration

1. Load a backup file into a MySQL instance

New MySQL instance:

```sh
docker run --name bookshelf_mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=bookshelf -e MYSQL_USER=bookshelf -e MYSQL_PASSWORD=bookshelf -p 127.0.0.1:3306:3306 -d mysql:5.7
```

Load data:

```sh
docker exec -i bookshelf_mysql mysql -ubookshelf -pbookshelf bookshelf < bookshelf.sql
#docker exec -it bookshelf_mysql mysql -ubookshelf -pbookshelf bookshelf
```

2. Create a new PostgreSQL instance

```sh
docker run --name bookshelf_postgres -p 127.0.0.1:5432:5432 -d -e POSTGRES_DB=bookshelf -e POSTGRES_PASSWORD=bookshelf postgres
```

3. Perform the migration using `pgloader` (https://www.digitalocean.com/community/tutorials/how-to-migrate-mysql-database-to-postgres-using-pgloader)

```sh
pgloader mysql://bookshelf:bookshelf@localhost:3306/bookshelf postgresql://postgres:bookshelf@localhost:5432/bookshelf
```

4. Destroy the MySQL instance

```sh
docker rm -f bookshelf_mysql
```

5. Prepare data in PostgreSQL

Connect to PG:

```sh
docker exec -it bookshelf_postgres psql -U postgres -d bookshelf
```

And then start the backend to create the initial schema, but rename the entity tables to have the suffix: `-new`.

Then execute these sentences in the CLI:

```sql
insert into "categories-new" (name, created, modified) select name, created_at, updated_at from categories;

insert into "collections-new" (name, link, description, created, modified) select name, link, description, created_at, updated_at from collections;

-- insert into "books-new" (title, "titleOV", author, year, pages, editorial, isbn, url, abstract, "readingDates", cover, created, modified)
-- select title, title_vo, author, year, pages, editorial, isbn, url, abstract, string_to_array(reading_date,','), cover, created_at, updated_at from books;

-- update "books-new" bn set "categoryId" = (select cn.id from "categories-new" cn, categories c, books b where cn.name = c.name and c.id = b.category_id and b.title = bn.title);

-- update "books-new" bn set "collectionId" = (select cn.id from "collections-new" cn, collections c, books b where cn.name = c.name and c.id = b.collection_id and b.title = bn.title);

insert into "books-new" (title, "titleOV", author, year, pages, editorial, isbn, url, abstract, "readingDates", cover, created, modified, "categoryId", "collectionId")
select title, title_vo, author, year, pages, editorial, isbn, url, abstract, string_to_array(reading_date,','), cover, created_at, updated_at, (select cn.id from "categories-new" cn, categories c where cn.name = c.name and c.id = category_id), (select cn.id from "collections-new" cn, collections c where cn.name = c.name and c.id = collection_id)  from books;

---

select title, "titleOV", author, year, pages, editorial, isbn, url, "readingDates", "categoryId", "collectionId", created, modified from "books-new";

drop table books;
drop table categories;
drop table collections;
drop table schema_migrations;

alter table "books-new" rename to books;
alter table "collections-new" rename to collections;
alter table "categories-new" rename to categories;
```

6. Export the data to a file

```sh
docker exec -t bookshelf_postgres pg_dump -U postgres -a --inserts -t books -t categories -t collections bookshelf > bookshelf_migration.sql
```