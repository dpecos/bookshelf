# Bookshelf

## docker install

```
cd backend && docker build . --network host -t latest && cd -
cd frontend && docker build . --network host --build-arg REACT_APP_BACKEND_PORT=3100 -t latest && cd -
docker-compose up -d
```
