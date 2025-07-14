# Nombre: Daniel Romero Garcia
# Clan: Hopper
# correo: romero.g.daniel@gmail.com
# Documento de identidad: 1007373290


#  SPA de Eventos con Autenticación y Roles



Este proyecto es una Aplicación de Página Única (SPA) construida con HTML, CSS y JavaScript que permite a usuarios registrarse, iniciar sesión y gestionar eventos según su rol: **administrador** o **visitante**.

---

##  Funcionalidades

###  Autenticación y roles
- Registro de usuarios con dos roles: `administrator` y `visitor`.
- Inicio de sesión con validación.
- Almacén de sesión usando `LocalStorage` para persistencia entre recargas.
- Protección de vistas según rol y sesión activa.

###  Gestión de eventos
- **Administrador**:
  - Crear, editar y eliminar eventos.
- **Visitante**:
  - Ver eventos disponibles.
  - Inscribirse si hay cupos.
  - Ver si ya está inscrito o si el evento está lleno.

###  Navegación fluida
- SPA real: se usa una sola página `index.html`.
- Las vistas (`login`, `register`, `dashboard`) se muestran/ocultan dinámicamente con JavaScript.

---

##  Tecnologías usadas

- HTML5
- CSS
- JavaScript 
- `json-server` 

---

##  Instalación y uso

### 1. Clona el repositorio


###  bash
'git clone' https://github.com/tuusuario/nombre-del-repo.git

## Instala Json Server

- Si no lo tienes unstalado globalmente 

npm install -g json-server

Inicia el Servidor

json-server --watch db.json --port 3000

Esto levantara una API REST  en: http://localhost:3000

-Usuarios: GET http://localhost:3000/users
-Eventos: GET http://localhost:3000/events


## Abre el  Archivo 

Abre el archivo Index.html en tu navehador o usa una extensión igual a Live server en VS code


## Administrador Por defecto 
{
    "username": "admin"
    "password": "admin123"
    "Role": "administrador"
}

## Comportamiento Por Rol

Administrador 
* Crea eventos (Titulo y Capacidad)
* Edita Eventos Existentes
* Elimina Eventos

Visitante
* Visualiza Eventos Disponibles
* Se registra en eventos (si hay cupo)
* Visualiza si ya esta inscrito al evento o  si noesta lleno

##
* La sesión se guarda en LocalStorage. Si recargas la página, no pierdes el login.
* Si no hay sesión activa, el usuario no puede ver el dashboard.
* Si ya estás logueado e intentas acceder a login/register, se redirige al dashboard.
* No se permite inscripción a eventos llenos.
* Un visitante no puede inscribirse varias veces al mismo evento.
* Si el Usuario ya esta registrado, no puede volver a registrarse


