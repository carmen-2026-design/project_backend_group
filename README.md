# project_backend_group
Proyecto backend grupal

#  Agencia de Superhéroes de Segunda

Aplicación web para registrar héroes con poderes poco espectaculares pero muy útiles: **Capitán Wifi**, **Doctor Cargador**, **Señora Táper**…

Cualquiera puede consultar el catálogo; los usuarios registrados crean sus propias identidades secretas (¡pueden tener varias!) y les asignan poderes; el administrador gestiona el catálogo de poderes.

Proyecto didáctico del módulo de Backend: **Node.js + Express + Sequelize + PostgreSQL + EJS + JWT**, todo levantado con **Docker Compose**.

---

## Qué vas a practicar

| Concepto | Dónde aparece |
| --- | --- |
| MVC + capa de repositorios | `routes → controllers → repositories → models` |
| Dos interfaces, una lógica | Controladores `web/` (EJS) y `api/` (JSON) usan los mismos repositorios |
| Relación 1:N | Un `User` crea muchos `Hero` |
| Relación N:M | `Hero` ↔ `Power` a través de `hero_powers` |
| Autenticación | Registro con bcrypt, login con JWT |
| Autorización por rol | Solo `admin` gestiona poderes |
| Autorización por propiedad | Solo el creador (o el admin) edita o borra un héroe |

---

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (o Docker Engine + plugin Compose)
- Un cliente HTTP para probar la API: curl, Thunder Client, Postman o Bruno

No hace falta instalar PostgreSQL. Node.js en local solo es necesario si quieres que el editor tenga autocompletado de las dependencias.

---

## Puesta en marcha

### Servicios

| Servicio | Qué es | URL |
| --- | --- | --- |
| `app` | Node + Express con nodemon (recarga al guardar) | <http://localhost:3000> |
| `db` | PostgreSQL 16, se carga solo con `init-db/` | `localhost:5432` |
| `adminer` | Cliente web para ver la base de datos | <http://localhost:8080> |

### 1. Variables de entorno

```bash
cp .env.example .env
```

El `.env` no se sube a Git. Docker Compose lo usa tanto para crear la base de datos como para configurar la app. Dentro de Docker, la app se conecta a la BD con `DB_HOST=db` (el nombre del servicio), que ya fija `docker-compose.yml`.

### 2. Dependencias y scripts

El `package.json` necesita estas dependencias:

```bash
npm install express sequelize pg pg-hstore ejs bcrypt jsonwebtoken dotenv cookie-parser
npm install -D nodemon
```

Y estos scripts:

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon --legacy-watch src/index.js"
  }
}
```

> `--legacy-watch` hace que nodemon detecte los cambios a través del volumen de Docker en Windows y macOS.

### 3. Arrancar

```bash
docker compose up --build
```

La primera vez, PostgreSQL ejecuta automáticamente los scripts de `init-db/` por orden alfabético:

1. `01-schema.sql`: crea las tablas.
2. `02-seed.sql`: carga los datos de ejemplo.

Abre <http://localhost:3000>.

### Comandos habituales

| Comando | Para qué |
| --- | --- |
| `docker compose up --build` | Arrancar (y reconstruir si cambió `package.json`) |
| `docker compose up -d` | Arrancar en segundo plano |
| `docker compose logs -f app` | Ver los logs de la app |
| `docker compose down` | Parar. **Los datos se conservan** |
| `docker compose down -v` | Parar y **borrar la base de datos**. Al volver a arrancar se recarga desde `init-db/` |
| `docker compose exec db psql -U agencia -d agencia_heroes` | Abrir una consola SQL |
| `docker compose exec app npm install <paquete>` | Instalar un paquete dentro del contenedor |

> ⚠️ Los scripts de `init-db/` **solo se ejecutan si el volumen de datos está vacío**. Si cambias el esquema o los datos, necesitas `docker compose down -v` para que se vuelvan a aplicar.

Para restaurar los datos de ejemplo sin borrar el volumen:

```bash
docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < init-db/02-seed.sql
```

### Conectarse a la base de datos

- **Adminer** (<http://localhost:8080>): Sistema `PostgreSQL`, Servidor `db`, usuario, contraseña y base de datos los del `.env`.
- **DBeaver, pgAdmin o la extensión de VS Code**: host `localhost`, puerto `5432`.

---

## Usuarios de prueba

| Usuario | Email | Contraseña | Rol | Héroes |
| --- | --- | --- | --- | --- |
| admin | admin@agencia.test | `admin1234` | admin | Capitán Obvio |
| paco | paco@agencia.test | `heroe1234` | user | Capitán Wifi, El Fantasma del Trastero, El Hombre que Llega Puntual |
| marta | marta@agencia.test | `heroe1234` | user | La Mujer que Siempre Encuentra Aparcamiento, Doctor Cargador, El Calcetín Desparejado |
| lucia | lucia@agencia.test | `heroe1234` | user | Señora Táper, Mister Mute, Abuela Radar |
| pepe | pepe@agencia.test | `heroe1234` | user | *(ninguno)* |

El poder **Abrir botes imposibles** no lo tiene ningún héroe: sirve para comprobar que tus consultas no pierden registros sin relaciones.

---

## Modelo de datos

```
users 1 ────< heroes >────< hero_powers >────< powers
        crea              (N:M)
```

| Tabla | Campos |
| --- | --- |
| `users` | id, username, email, password (hash), role (`admin` \| `user`) |
| `heroes` | id, name, description, utility_level (1–10), user_id → users |
| `powers` | id, name, description |
| `hero_powers` | hero_id → heroes, power_id → powers (PK compuesta) |

Todas las tablas tienen `created_at` y `updated_at`.

### Configuración de Sequelize para que encaje con el esquema

Las tablas están en `snake_case` y en plural; en JavaScript usamos `camelCase`. Configúralo así:

```javascript
// src/config/database.js
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: true   // utilityLevel <-> utility_level, createdAt <-> created_at
    }
  }
)
```

```javascript
// src/models/hero.model.js (ejemplo)
export const Hero = sequelize.define('Hero', {
  name:         { type: DataTypes.STRING(80), allowNull: false, unique: true },
  description:  { type: DataTypes.TEXT },
  utilityLevel: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 5,
                  validate: { min: 1, max: 10 } }
}, { tableName: 'heroes' })
```

```javascript
// src/models/index.js
User.hasMany(Hero, { foreignKey: 'userId', as: 'heroes' })
Hero.belongsTo(User, { foreignKey: 'userId', as: 'creator' })

Hero.belongsToMany(Power, { through: 'hero_powers', foreignKey: 'heroId', otherKey: 'powerId', as: 'powers' })
Power.belongsToMany(Hero, { through: 'hero_powers', foreignKey: 'powerId', otherKey: 'heroId', as: 'heroes' })
```

> ⚠️ Como el esquema lo crea `init-db/01-schema.sql`, **no** uses `sequelize.sync({ force: true })`: borraría las tablas.

---

## Estructura del proyecto

```
agencia-heroes/
├── init-db/                    # se ejecutan al crear el contenedor de la BD
│   ├── 01-schema.sql
│   └── 02-seed.sql
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── hero.model.js
│   │   ├── power.model.js
│   │   └── index.js            # asociaciones
│   ├── repositories/           # ÚNICA capa que usa los modelos
│   │   ├── user.repository.js
│   │   ├── hero.repository.js
│   │   └── power.repository.js
│   ├── controllers/
│   │   ├── api/                # res.json(...)
│   │   └── web/                # res.render(...) / res.redirect(...)
│   ├── routes/
│   │   ├── api/
│   │   └── web/
│   ├── middlewares/
│   │   ├── auth.middleware.js  # verifyToken, requireRole
│   │   └── error.middleware.js
│   ├── views/                  # plantillas EJS
│   └── index.js
├── .dockerignore
├── .env                        # NO se sube a Git
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

## API REST

Las rutas protegidas necesitan la cabecera `Authorization: Bearer <token>`.

### Autenticación

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Público | Crea un usuario con rol `user` |
| POST | `/api/auth/login` | Público | Devuelve `{ token }` |

### Héroes

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| GET | `/api/heroes` | Público | Lista con poderes. Filtro: `?power=<id>` |
| GET | `/api/heroes/:id` | Público | Detalle con poderes y creador |
| POST | `/api/heroes` | Usuario | Crea un héroe (el creador sale del token) |
| PUT | `/api/heroes/:id` | Creador o admin | Actualiza un héroe |
| DELETE | `/api/heroes/:id` | Creador o admin | Borra un héroe |
| POST | `/api/heroes/:id/powers/:powerId` | Creador o admin | Asigna un poder |
| DELETE | `/api/heroes/:id/powers/:powerId` | Creador o admin | Quita un poder |
| GET | `/api/me/heroes` | Usuario | Mis héroes |

### Poderes

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| GET | `/api/powers` | Público | Lista de poderes |
| GET | `/api/powers/:id` | Público | Poder con los héroes que lo tienen |
| POST | `/api/powers` | Admin | Crea un poder |
| PUT | `/api/powers/:id` | Admin | Actualiza un poder |
| DELETE | `/api/powers/:id` | Admin | Borra un poder |

### Códigos de estado

| Código | Cuándo |
| --- | --- |
| 200 / 201 / 204 | OK / creado / borrado sin contenido |
| 400 | Datos inválidos |
| 401 | Sin token o token inválido |
| 403 | Autenticado pero sin permiso |
| 404 | El recurso no existe |
| 409 | Nombre repetido |

### Pruébalo con curl

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"paco@agencia.test","password":"heroe1234"}'

# Guarda el token
TOKEN=pega-aqui-el-token

# Crear un héroe
curl -X POST http://localhost:3000/api/heroes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"La Desatascadora","description":"Ningún fregadero se le resiste.","utilityLevel":8}'

# Asignarle un poder
curl -X POST http://localhost:3000/api/heroes/11/powers/12 \
  -H "Authorization: Bearer $TOKEN"

# Intentar borrar un héroe de marta (debe dar 403)
curl -X DELETE http://localhost:3000/api/heroes/4 \
  -H "Authorization: Bearer $TOKEN"
```

---

## Rutas web

| Ruta | Página | Acceso |
| --- | --- | --- |
| `/heroes` | Listado de héroes | Público |
| `/heroes/:id` | Detalle y asignación de poderes | Público (asignar: creador o admin) |
| `/heroes/new` | Crear héroe | Usuario |
| `/heroes/:id/edit` | Editar héroe | Creador o admin |
| `/me/heroes` | Mis héroes | Usuario |
| `/powers` | Listado de poderes | Público (gestionar: admin) |
| `/login`, `/register` | Acceso | Público |

Los formularios HTML solo envían GET y POST, así que editar y borrar se hacen con rutas POST (`/heroes/:id/delete`, etc.). En la web el JWT se guarda en una cookie `httpOnly`.

---

## Hoja de ruta

- [ ] **Fase 1**: `docker compose up` con la BD cargada, servidor Express y conexión a PostgreSQL con Sequelize.
- [ ] **Fase 2**: CRUD de poderes en la API (modelo + repositorio + controlador + rutas).
- [ ] **Fase 3**: vistas EJS de poderes reutilizando el repositorio.
- [ ] **Fase 4**: héroes y relación N:M con poderes (`include`, asignar y quitar).
- [ ] **Fase 5**: registro, login, `verifyToken` y cookie en la web.
- [ ] **Fase 6**: relación 1:N con usuarios, comprobación de propiedad y `requireRole('admin')`.
- [ ] **Extra**: filtro por poder, validación, errores centralizados y paginación.

---

## Errores típicos

- **Las tablas no existen o están vacías**: el volumen ya existía antes de añadir los scripts. Ejecuta `docker compose down -v` y vuelve a arrancar.
- **`ECONNREFUSED 127.0.0.1:5432` desde la app**: dentro de Docker la BD no está en `localhost`, sino en `db`.
- **`port is already allocated`**: ya tienes un PostgreSQL local en el 5432 (o algo en el 3000/8080). Páralo o cambia el puerto de la izquierda en `docker-compose.yml` (por ejemplo `"5433:5432"`).
- **Instalo un paquete y la app no lo encuentra**: instálalo con `docker compose exec app npm install <paquete>` o reconstruye con `docker compose up --build`.
- **nodemon no recarga al guardar**: comprueba que el script `dev` lleva `--legacy-watch`.
- **`/heroes/new` devuelve "héroe no encontrado"**: has declarado `/heroes/:id` antes que `/heroes/new`.
- **Cualquiera puede crear héroes a nombre de otro**: estás leyendo `userId` de `req.body`. Debe salir de `req.user.id`.
- **La API devuelve la contraseña**: usa `attributes: { exclude: ['password'] }` en el repositorio.
- **`column "createdAt" does not exist`**: te falta `underscored: true` en la configuración de Sequelize.
- **`relation "Heroes" does not exist`**: te falta `tableName: 'heroes'` en el modelo.
