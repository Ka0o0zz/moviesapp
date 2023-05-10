# Movies App API

¡Bienvenido a Movies app! Esta es una API para la prueba tecnica en Kubo SAS.

Esta aplicación ha sido diseñada y desarrollada utilizando las mejores prácticas de la industria, implementando Clean Architecture y utilizando pruebas con Supertest para garantizar su calidad y rendimiento. En este documento, te proporcionaremos una breve explicación de estos conceptos clave.

## Tabla de contenidos

- [Requisitos](#requisitos)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Rutas](#rutas)
- [MODELO RELACIONAL DE LA BASE DE DATOS](#modelo-relacional-de-la-base-de-datos)
- [SCRIPT SQL DE LA BASE DE DATOS](#script-sql-de-la-base-de-datos)
- [Cuestionario](#cuestionario)

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (versión 12 o superior)
- NPM (versión 6 o superior)
- Tener una base de datos mySQL
- incluir un archivo .env con las siguientes propiedades y sus respectivas credenciales:

```

    DATABASE="*******"
    USER="*******"
    HOST="*******"
    PASSWORD="*******"

```

## Configuración

1. Clona este repositorio en tu máquina local: `git clone https://github.com/Ka0o0zz/moviesapp.git`
2. Navega al directorio del proyecto: `cd moviesapp`
3. Instala las dependencias del proyecto: `npm install`
4. Configura cualquier archivo de configuración necesario (por ejemplo, archivos de entorno, credenciales, etc.)
5. ¡Listo! La configuración inicial está completa.

## Ejecución

Para ejecutar la aplicación, sigue estos pasos:

1. Asegúrate de haber completado la configuración mencionada anteriormente.
2. Ejecuta el siguiente comando: `npm run dev` para desarrollo
3. La aplicación se iniciará y estará disponible en `http://localhost:8080` (o cualquier otro puerto especificado).
4. para ejecutar los tests ejecute el siguiente comando `npm run test`

## Rutas

## Login

Autentica a un usuario en el sistema y retorna un token de acceso válido.

- **URL**

  `/auth/login`

- **Método HTTP**

  `POST`

- **Parámetros del cuerpo de la solicitud**

  `{ email: [string], password: [string] }`

- **Respuesta exitosa**

  Código: `200 OK`

  ```

  {
    "ok": true,
    "data": {
      "token": [string],
      "id": [integer],
      "email": [string],
      "name": [string],
      "lastname": [string],
      "phone": [string]
    }
  }

  ```

### Respuesta de error

En caso de que ocurra algún error durante la ejecución del endpoint, se enviará una respuesta con el siguiente formato:

```

{
  "ok": false,
  "msg": "Mensaje de error"
}

```

## Register

Register a new user.

- **URL**

  `/auth/`

- **Method:**

  `POST`

- **Data Params**

  La información del usuario debe enviarse en el cuerpo de la solicitud como un objeto JSON con los siguientes campos:

`{
		"email": string,
		"name": string,
		"lastname": string,
		"phone": string,
		"password": string
	}
`

- **Success Response:**

- **Code:** 200 OK <br />
  **Content:**

  ```
  {
    "ok": true,
    "data": {
      "id": number,
      "userIn": {
        "email": string,
        "name": string,
        "lastname": string,
        "phone": string,
        "password": string
      }
    }
  }
  ```

- **Error Response:**

- **Code:** 400 Bad Request <br />
  **Content:**

  ```
  {
    "ok": false,
    "msg": "This email or phone is already registered, do you want to recover the password?"
  }
  ```

  ## Método HTTP

  GET

## Descripción

Este endpoint devuelve las 10 películas más recientes en orden descendente por fecha de lanzamiento.

## URL

/api/movies/latest-releases

## Parámetros de consulta

- No se requiere ninguna información adicional en el cuerpo de la petición.

## Respuestas

### Respuesta exitosa

- Código de estado: 200
- Cuerpo:

```

{
  "ok": true,
  "data": {
    "result": [
      {
        "id": 1,
        "name": "Spider-Man: No Way Home",
        "description": "Peter Parker's world has changed a lot since the events of Avengers: Endgame...",
        "category": "Action, Adventure, Sci-Fi",
        "release_date": "2021-12-16"
      },
      {
        "id": 2,
        "name": "The Batman",
        "description": "The Riddler has returned to terrorize Gotham City, but his gruesome puzzles 					       merely...",
        "category": "Action, Crime, Drama",
        "release_date": "2022-03-03"
      },
      ...
    ]
  }
}


```

### Respuesta de error

- Código de estado: 500
- Cuerpo:

```
{
  "ok": false,
  "msg": "Descripción del error"
}

```

## Método HTTP

GET

## URL

/api/movies

## Parámetros de consulta

- title (opcional): string
- category (opcional): string
- sort (opcional): string, puede ser "asc" o "desc"
- page (opcional): número de página, por defecto es 1
- limit (opcional): número de resultados por página, por defecto es 10

## ejemplo

`/movie?title=La%20casa%20de%20papel&category=Suspense&sort=desc`

## Respuestas

### Respuesta exitosa

- Código de estado: 200
- Cuerpo:

```

{
	ok: true,
	data: {
		result: [
		{
			id: number,
			name: string,
			description: string,
			category: string,
			release_date: string en formato "YYYY-MM-DD"
		},
		...
		]
	}
}

```

### Respuesta de error

- Código de estado: 500
- Cuerpo:

```
{
	ok: false,
	msg: string
}

```

## Crear una nueva película

Crea una nueva película en la base de datos.

- **URL:** `/api/movies`
- **Método:** `POST`
- **Cuerpo:**
  - `name` (string, requerido): Nombre de la película.
  - `description` (string, requerido): Descripción de la película.
  - `category` (string, requerido): Categoría de la película.
  - `release_date` (string, requerido): Fecha de lanzamiento de la película en formato (año/mes/día).
- **Respuesta exitosa:**
  - **Código:** 201 OK
  - **Cuerpo:**
    ```
    {
      "ok": true,
    }
    ```
- **Respuestas de error:**
  - **Código:** 400 Unprocessable Entity
    - **Cuerpo:**
      ```
      {
        "ok": false,
        "msg": "Fecha de lanzamiento inválida, el formato correcto es (año/mes/día)."
      }
      ```

## Obtener usuarios con películas vistas

Endpoint para obtener una lista de usuarios con las películas que han visto.

- URL: `/view-makers`
- Método: `GET`
- Parámetros de consulta:
  - Ninguno
- Respuesta exitosa:
  - Código: `200`
  - Contenido: Objeto con la propiedad "result", que contiene un arreglo de objetos con la información de cada usuario y las películas que ha visto:
    ```
    {
      "ok": true,
      "data": {
        "result": [
          {
            "id": 1,
            "email": "usuario1@example.com",
            "name": "Usuario 1",
            "lastname": "Apellido 1",
            "phone": "1234567890",
            "movies_viewed": [
              {
                "viewed_at": "2023-05-10",
                "movie_name": "Pelicula 1"
              },
              {
                "viewed_at": "2023-05-09",
                "movie_name": "Pelicula 2"
              }
            ]
          },
          {
            "id": 2,
            "email": "usuario2@example.com",
            "name": "Usuario 2",
            "lastname": "Apellido 2",
            "phone": "0987654321",
            "movies_viewed": [
              {
                "viewed_at": "2023-05-08",
                "movie_name": "Pelicula 3"
              }
            ]
          }
        ]
      }
    }
    ```
- Respuesta de error:

  - Código: `500`
  - Contenido: Objeto con la propiedad "msg", que contiene un mensaje de error:
    `   {
  "ok": false,
  "msg": "Error al obtener los usuarios con películas vistas"
}`

                    ## Método HTTP

            POST

## Descripción

Create a new view marker for a movie.

## URL

/api/view-makers

## Parámetros de consulta

- Para conseguir el id del usuario, inicia sesion.
- para conseguir el id de la pelicula, busca la pelicula en `/movies`

`	{
		"user_id": "string",
		"movie_id": "string"
	}`

## Respuestas

### Respuesta exitosa

- Código de estado: 200
- Cuerpo:

```
{
  "ok": true
}

```

### Respuesta de error

- Código de estado: 500
- Cuerpo:

```
{
  "ok": false,
  "msg": "The movie could not be marked as viewed by the user."
}

```

# MODELO RELACIONAL DE LA BASE DE DATOS

         +-----------------+         +-------------------+         +-----------------+
         |      movie      |         |       users       |         |    view_maker   |
         +-----------------+         +-------------------+         +-----------------+
         |       id        |         |         id        |         |        id       |
         |      name       |         |       email       |         |     user_id     |
         |   description   |         |        name       |         |     movie_id    |
         |     category    |         |     password      |         |    viewed_at    |
         |  release_date   |         |      lastname     |         +-----------------+
         +-----------------+         |       phone       |
                                     +-------------------+

CREATE TABLE movie (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
category VARCHAR(255) NOT NULL,
release_date DATE
);

CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
name VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
phone VARCHAR(255) NOT NULL
);

CREATE TABLE view_makers (
id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT UNSIGNED NOT NULL,
movie_id INT UNSIGNED NOT NULL,
viewed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (movie_id) REFERENCES movie (id)
);

# SCRIPT SQL DE LA BASE DE DATOS

-- Crear base de datos
CREATE DATABASE appmovies;

-- Seleccionar base de datos
USE appmovies;

-- Crear tabla movie
CREATE TABLE movie (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
category VARCHAR(255) NOT NULL,
release_date DATE
);

-- Crear tabla users
CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
name VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
phone VARCHAR(255) NOT NULL
);

-- Crear tabla view_makers
CREATE TABLE view_makers (
id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id INT UNSIGNED NOT NULL,
movie_id INT UNSIGNED NOT NULL,
viewed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (movie_id) REFERENCES movie (id)
);

# CUESTIONARIO

## ¿Cuál es el propósito de "module.exports"?

El propósito de module.exports en Node.js es permitir que un archivo de código JavaScript exporte funciones, objetos, variables u otros valores para que puedan ser utilizados en otros archivos del proyecto.

Al asignar un objeto o valor a module.exports, el código se convierte en un módulo de Node.js que puede ser requerido o importado por otros archivos de JavaScript en el proyecto.

## ¿Qué es un middleware?

En el contexto de Node.js y otros frameworks web, un middleware es una función que se ejecuta entre la solicitud del cliente y la respuesta del servidor.

Cuando una solicitud HTTP llega a un servidor, el middleware tiene la tarea de procesar la solicitud y realizar una o varias operaciones en ella antes de que sea manejada por la aplicación principal del servidor o antes de que se envíe la respuesta al cliente.

Un middleware puede realizar una amplia variedad de operaciones, como comprobar si el usuario tiene permisos para acceder a ciertas rutas, agregar encabezados a las respuestas, manejar errores, autenticar usuarios, entre otras cosas.

## ¿Cual es la diferencia entre código bloqueante y código no bloqueante?

- El código bloqueante se refiere a aquel que detiene el flujo de ejecución de un programa mientras se espera que una operación de entrada/salida (I/O), como la lectura o escritura de un archivo o la conexión a una base de datos, se complete. Durante este tiempo, el proceso se bloquea y no puede manejar otras solicitudes o tareas, lo que puede provocar una disminución en la capacidad de respuesta del sistema.

- Por otro lado, el código no bloqueante es aquel que no detiene el flujo de ejecución mientras espera que una operación I/O se complete. En cambio, el proceso continúa manejando otras solicitudes o tareas, lo que permite una mayor capacidad de respuesta y eficiencia del sistema.

## ¿Qué biblioteca de javascript usaría para manejar datos en tiempo real?

### yo usaria alguna de estas dos:

- Socket.io: Es una biblioteca que permite la comunicación bidireccional en tiempo real entre el servidor y el cliente a través de WebSocket. Permite enviar y recibir mensajes en tiempo real y también admite la creación de salas de chat y la emisión de eventos a grupos de usuarios.

- Firebase: Es una plataforma de desarrollo de aplicaciones móviles y web que ofrece una base de datos en tiempo real. Firebase permite la sincronización en tiempo real de datos entre dispositivos y el servidor, lo que permite a los usuarios ver los cambios en los datos en tiempo real.

## ¿Cual es la principal ventaja de trabajar un proyecto dockerizado?

Una de las principales ventajas de trabajar en un proyecto dockerizado es la portabilidad y consistencia del entorno de desarrollo, prueba y producción.

Al trabajar en un proyecto dockerizado, los desarrolladores pueden crear un entorno de desarrollo y prueba consistente, que se asemeja al entorno de producción en el que se ejecutará la aplicación. Esto permite identificar y solucionar problemas en el entorno de prueba antes de desplegar la aplicación en producción.

## ¿Cual es la diferencia entre una imagen y un volumen en Docker?

En Docker, tanto las imágenes como los volúmenes son componentes fundamentales de la arquitectura de contenedores. Sin embargo, tienen diferentes propósitos y comportamientos.

- Una imagen de Docker es una plantilla o molde de solo lectura que se utiliza para crear contenedores Docker. Contiene todo lo necesario para ejecutar una aplicación, como el código fuente, las dependencias, la configuración del sistema y las bibliotecas. Las imágenes se construyen utilizando un archivo Dockerfile que define las instrucciones necesarias para crear la imagen.

- Por otro lado, un volumen de Docker es un espacio de almacenamiento persistente que se utiliza para almacenar datos fuera del contenedor. Los volúmenes se pueden usar para persistir los datos generados por un contenedor, como bases de datos o archivos de registro, y pueden compartirse entre varios contenedores.

## ¿Con qué herramienta se puede orquestar un proyecto con múltiples imágenes en docker?

### se que se puede hacer con estos tools:

- ### Docker Compose
- ### Kubernetes
- ### Docker Swarm

## ¿Cual es la principal ventaja de trabajar con cluster de kubernetes?

La principal ventaja de trabajar con un cluster de Kubernetes es la capacidad de gestionar y escalar aplicaciones de contenedores de manera eficiente y escalable.
