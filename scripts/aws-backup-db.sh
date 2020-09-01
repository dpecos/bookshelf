FILE=bookshelf_$(date +%Y%m%d_%H%M%S).sql.gz

echo "Dumping database..."
docker exec -t bookshelf_postgres_1 pg_dumpall -c -U postgres | gzip > /tmp/$FILE 

echo "Copying dump to s3..."
aws s3 cp /tmp/$FILE s3://backups-dplabs-global/apps-bookshelf-pg/

rm /tmp/$FILE

echo "Done"