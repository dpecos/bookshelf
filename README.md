Build & Run

    docker build -t bookshelf .
    docker run -it -p 3000:3000 bookshelf

    docker-compose build
    docker-compose up

Import data

    docker exec -i bookshelf_db_1 mysql -ubookshelf -pbookshelf bookshelf < bookshelf_20180918.sql

    docker exec -it bookshelf_db_1 mysql -u bookshelf -p bookshelf

Docker clean

    docker rm $(docker ps -a -f status=exited -q)
    docker rmi $(docker images -a -q)