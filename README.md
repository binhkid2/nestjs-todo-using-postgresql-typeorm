```
nest g module todos
nest g controller todos
nest g service todos
```
### Fill this in .env
```
DB_HOST=****
DB_PORT=****
DB_USER=****
DB_PASSWORD=****
DB_NAME=****
DB_SSL=****
```
### Create src/todos/entities/todo.entity.ts   
``` npm install class-validator class-transformer  ```
Open main.ts and enable validation globally:
```
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
```

👉 This is production standard.
# OPENAPI swagger
```
http://localhost:3000/api/docs
```
### API response example for GET /todos
```
{
  "data": [
    {
      "id": "uuid",
      "title": "Buy milk",
      "completed": false,
      "created_at": "2026-01-01T10:00:00.000Z",
      "updated_at": "2026-01-01T10:00:00.000Z"
    }
  ],
  "nextCursor": "2026-01-01T09:58:12.000Z"
}
```