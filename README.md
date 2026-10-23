# E-commerce Full Stack sobre merch de kakapos 🦜

Backend de un e-commerce de merchandising de kakapos.

## Tecnologías

* Node.js
* Express
* MongoDB
* Mongoose
* Docker
* dotenv
* nodemon (desarrollo)

## Estructura del proyecto

```text
backend_kakapos/
├── docker/
│   ├── docker-compose.yml
│   └── .env                  (credenciales de MongoDB, no se sube a git)
├── api/
│   ├── src/
│   │   ├── index.js
│   │   ├── config/db.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── services/
│   ├── .env                  (cadena de conexión, no se sube a git)
│   └── package.json
└── docs/
    ├── diagrams/             (diagrama de dominio)
    └── adrs/                 (decisiones de arquitectura)
```

La API sigue una arquitectura en capas:

```text
Petición HTTP → Ruta → Controlador → Servicio → Modelo → MongoDB
```

* **Ruta:** define el endpoint.
* **Controlador:** gestiona la parte HTTP (`req` y `res`).
* **Servicio:** contiene la lógica de negocio.
* **Modelo:** esquema de Mongoose con sus validaciones e índices.

## Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/crryzz9/backend_kakapos
```

### 2. Entrar en la carpeta del proyecto

```bash
cd backend_kakapos
```

### 3. Configurar las variables de entorno de Docker

Dentro de la carpeta `docker/` crea un archivo `.env` con las credenciales de MongoDB:

```text
MONGO_USER=<tu_usuario>
MONGO_PASSWORD=<tu_contraseña>
```

### 4. Levantar la base de datos con Docker

Con Docker Desktop abierto:

```bash
cd docker
docker-compose up -d
```

Esto inicia un contenedor de MongoDB (`ecommerce-mongo`) accesible en `localhost:27017`, con los datos persistidos en el volumen `mongo_data`.

### 5. Instalar las dependencias de la API

```bash
cd ../api
npm install
```

### 6. Configurar las variables de entorno de la API

Dentro de la carpeta `api/` crea un archivo `.env`. Usuario y contraseña deben ser los mismos del paso 3:

```text
MONGO_URI=mongodb://<tu_usuario>:<tu_contraseña>@localhost:27017/ecommerce?authSource=admin
PORT=3000
```

### 7. Ejecutar el proyecto

```bash
npm run dev
```

Si todo va bien, la terminal muestra:

```text
MongoDB connectat correctament
Servidor escoltant al port 3000
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## Endpoints

### Productos (`/api/productes`)

| Método | URL | Descripción |
|---|---|---|
| GET | `/api/productes` | Lista todos los productos |
| GET | `/api/productes/:id` | Obtiene un producto |
| POST | `/api/productes` | Crea un producto |
| PUT | `/api/productes/:id` | Modifica un producto |
| DELETE | `/api/productes/:id` | Elimina un producto |

Ejemplo de cuerpo para `POST /api/productes`:

```json
{
  "nom": "Samarreta Kakapos",
  "descripcio": "Samarreta oficial",
  "preu": 19.99,
  "estoc": 50,
  "categoriaId": "507f1f77bcf86cd799439011"
}
```
### Usuarios (`/api/usuaris`)

| Método | URL | Descripción |
|---|---|---|
| POST | `/api/usuaris` | Crea un usuario |
| GET | `/api/usuaris` | Lista los usuarios |
| GET | `/api/usuaris/:id` | Obtiene un usuario |
| PUT | `/api/usuaris/:id` | Modifica `nom`, `email` o `password` |
| DELETE | `/api/usuaris/:id` | Desactiva el usuario (`actiu: false`), sin borrarlo |

Ejemplo de cuerpo para `POST /api/usuaris`:

```json
{
  "nom": "Anna Prova",
  "email": "anna@example.com",
  "password": "Contrasenya-Prova-2026"
}
```

Notas:

* La contraseña tiene entre 12 y 72 caracteres, y se guarda como hash con bcrypt. Nunca se guarda ni se devuelve en texto plano.
* El servidor asigna `rol: client`. Los campos `rol`, `actiu` y `passwordHash` no se aceptan desde el cuerpo.
* **Aviso:** estos endpoints todavía no tienen autenticación. Solo se deben usar en local y con datos ficticios.

## Filtros, ordenación y paginación

Disponibles en `GET /api/categories` y `GET /api/usuaris`:

| Parámetro | Ejemplo | Descripción |
|---|---|---|
| `actiu` | `?actiu=true` | Filtra por activos o inactivos |
| `nom` | `?nom=anna` | Nombres que contienen el texto |
| `sort` | `?sort=nom` o `?sort=-createdAt` | Ordena por un campo permitido (`-` para descendente) |
| `page` | `?page=2` | Página, entero positivo (por defecto 1) |
| `limit` | `?limit=5` | Resultados por página (por defecto 10, máximo 50) |

Respuesta:

```json
{
  "success": true,
  "data": [],
  "pagination": { "page": 1, "limit": 10, "total": 25, "totalPages": 3 }
}
```

## Formato de errores

Todos los errores tienen el mismo formato:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Les dades no són vàlides",
    "details": [{ "field": "nom", "message": "El nom és obligatori" }]
  }
}
```

| Código | Significado |
|---|---|
| 200 | Consulta correcta |
| 201 | Recurso creado |
| 204 | Eliminación o baja, sin cuerpo |
| 400 | ID o datos incorrectos |
| 404 | Recurso inexistente |
| 409 | Email o slug duplicado |
| 422 | Error de validación |
| 500 | Error inesperado |

## Modelos de datos

Los modelos de Mongoose están en `api/src/models/`: `Usuari`, `Adreca`, `UsuariAdreca`, `Categoria`, `Proveidor`, `Producte`, `Comanda`, `ComandaProducte`, `Ressenya`, `Pagament`, `Carrito`, `CarritoProducte` y `MovimentEstoc`.

El diagrama de dominio está en `docs/diagrams/` y las decisiones de arquitectura en `docs/adrs/`.

## Autor

Victor Reig Herrera