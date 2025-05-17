# 🏋️ GymArian - API REST para gestión de gimnasio

**GymArian** es una API REST creada con Node.js, Express y MongoDB, diseñada para gestionar usuarios, entrenamientos y planes de membresía. Incluye autenticación con JWT, control de roles y relaciones entre colecciones.

---

## 🚀 Cómo empezar

### 1. Clona el proyecto

```bash
git clone https://github.com/tu_usuario/gymarian.git
cd gymarian
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Crea un archivo `.env` con lo siguiente:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
```

## 🌱 Nutrir la base de datos (semillas)

### 4. Crear suscripciones, usuarios y entrenamientos de prueba

```bash
npm run seed
```

Esto ejecuta automáticamente:

- `memberships.js`
- `users.js`
- `workouts.js`

---

### 5. Ejecuta el servidor

```bash
npm run dev
```

---

## 🔐 Autenticación y roles

El login devuelve un **token JWT** que debe enviarse en el header:

```
Authorization: Bearer <token>
```

---

## 📌 Roles

- `admin`: acceso completo a todos los endpoints (incluyendo usuarios)
- `user`: acceso limitado a su propia cuenta y entrenamientos

---

## 🔁 Endpoints principales

### 🧑 Usuarios

| Método | Ruta             | Descripción                                | Rol requerido |
| ------ | ---------------- | ------------------------------------------ | ------------- |
| GET    | `/api/users/`    | Obtener todos los usuarios                 | admin         |
| GET    | `/api/users/:id` | Obtener un usuario por ID (propio o admin) | autenticado   |
| PUT    | `/api/users/:id` | Actualizar usuario (propio o admin)        | autenticado   |
| DELETE | `/api/users/:id` | Eliminar un usuario (solo admin)           | admin         |

### 📩 Auth

| Método | Ruta                 | Descripción       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Registrar usuario |
| POST   | `/api/auth/login`    | Login de usuario  |

### 🧾 Suscripciones

| Método | Ruta                | Descripción                             |
| ------ | ------------------- | --------------------------------------- |
| GET    | `/api/memberships/` | Ver todas las suscripciones disponibles |

### 🏋️ Entrenamientos

| Método | Ruta             | Descripción                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | `/api/workouts/` | Ver todos los entrenamientos propios |
| POST   | `/api/workouts/` | Crear un nuevo entrenamiento         |

---

## 🌱 Semillas (seed)

El script `npm run seed` ejecuta de forma ordenada:

1. Inserción de membresías
2. Inserción de usuarios (con roles y membresías)
3. Inserción de entrenamientos asociados

---

## 🛡️ Seguridad

Todas las rutas privadas usan middleware `verifyToken`, que comprueba el JWT enviado en el header:

```
Authorization: Bearer <token>

```

---

## ✍️ Autor

Desarrollado por Àrian Castro.
