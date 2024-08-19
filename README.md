# DESCRIPCIÓN
<!-- breve descripción del proyecto -->


## DEV
1- Clonar el repositorio.

2- Crear una copia del archivo 
```.env.template```
y renombrarlo a 
```.env```
y cambiar las variables de entorno.

3- Levantar la base de datos
```docker compose up -d```

4- Correr migraciones de Prisma
```npx prisma migrate dev```

5- Ejecutar el archivo seed para poblar la base de datos
```npm run seed```

6- Instalar dependencias 
```npm install```

7- Correr el proyecto
```npm run dev```


### PROD