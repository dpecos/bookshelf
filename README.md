Build & Run

    docker build -t bookshelf .
    docker run -it -p 3000:3000 bookshelf

or with docker-compose (which includes a mysql instance):

    docker-compose build
    docker-compose up

for production, modify `config/environments/production.env` file and then:

    docker-compose -f docker-compose.yml -f docker-compose-production.yml build
    docker-compose -f docker-compose.yml -f docker-compose-production.yml up -d

Import data

    docker exec -i bookshelf_db_1 mysql -ubookshelf -pbookshelf bookshelf < bookshelf_data.sql
    docker exec -it bookshelf_db_1 mysql -ubookshelf -pbookshelf bookshelf

Backups from EC2 to S3, with crontab:

    0 0 * * 7 /bin/sh /home/ec2-user/projects/bookshelf/script/aws-backup-db.sh

Docker clean

    docker rm $(docker ps -a -f status=exited -q)
    docker rmi $(docker images -a -q)