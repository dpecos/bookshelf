echo "Building docker images locally..."
docker-compose build

echo "\n\nExporting frontend image to server (Ctrl+C if not needed)"
docker save bookshelf_frontend | ssh -C dani@192.168.1.100 docker load
	
echo "\n\nExporting backend image to server (Ctrl+C if not needed)"
docker save bookshelf_backend | ssh -C dani@192.168.1.100 docker load

echo "\n\nRedeploying application..."
ssh dani@192.168.1.100 "cd projects/bookshelf && docker-compose up -d"
