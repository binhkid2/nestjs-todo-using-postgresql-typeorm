 
### Fill this in .env
```
DB_HOST=****
DB_PORT=****
DB_USER=****
DB_PASSWORD=****
DB_NAME=****
DB_SSL=false
```
Open main.ts and enable validation globally:
```
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
```
# OPENAPI swagger
```
http://localhost:3000/api/docs
```
 