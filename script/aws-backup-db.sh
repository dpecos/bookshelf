FILE=bookshelf_$(date +%Y%m%d_%H%M%S).sql.gz

echo "Dumping database..."
docker exec -it bookshelf_db_1 mysqldump -ubookshelf -pbookshelf bookshelf | gzip > /tmp/$FILE

echo "Copying dump to s3..."
#s3put --region eu-central-1 -b danielpecos-backups -p apps-bookshelf /tmp/$FILE
aws s3 cp /tmp/$FILE s3://danielpecos-backups/apps-bookshelf/

rm /tmp/$FILE

echo "Done"