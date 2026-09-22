# E-commerce Full Stack sobre merch de kakapos 🦜

Backend de un e-commerce de merchandising de kakapos.

## Tecnologías

* Node.js
* Express
* MongoDB
* Docker

## Ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO_BACKEND>
```

### 2. Entrar en la carpeta del proyecto

```bash
cd backend_kakapos
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno de Docker

Dentro de la carpeta `docker/` crea un archivo `.env` con las credenciales de MongoDB:

```text
MONGO_USER=<tu_usuario>
MONGO_PASSWORD=<tu_contraseña>
```

### 5. Levantar la base de datos con Docker

```bash
cd docker
docker-compose up -d
```

Esto inicia un contenedor de MongoDB (`ecommerce-mongo`) accesible en `localhost:27017`, con los datos persistidos en el volumen `mongo_data`.

### 6. Ejecutar el proyecto

```bash
npm run dev
```

El servidor estará disponible en la dirección indicada por la terminal, normalmente:

```text
http://localhost:3000
```

## Autor

Victor Reig Herrera
