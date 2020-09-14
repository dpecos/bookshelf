docker-compose build

docker save bookshelf_frontend | ssh -C dani@192.168.1.100 docker load
docker save bookshelf_backend | ssh -C dani@192.168.1.100 docker load

ssh dani@192.168.1.100 "cd projects/bookshelf && docker-compose up -d"
