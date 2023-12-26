# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker-compose up -d
```

2. Renombrar el archivo .env.template por .env
3. Reemplazar las variables de entorno en .env
4. Ejecutar el comando `npm install`
5. Ejecutar el comando `npm run dev`
6. Ejecutar estos comandos de prisma

```
npx prisma migrate dev
npx prisma generate

```

## Nota: usuario por defecto

**usuario**: elmer@google.com
**password**: 123456

7. Ejecutar el seed para [levantar la base de datos local]('http://localhost:3000/api/seed')

## Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
