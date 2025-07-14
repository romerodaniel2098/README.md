
//  CONFIGURACIÓN BASE Y ELEMENTOS DEL DOM

// URL base de la API simulada con json-server
const API = "http://localhost:3000";

// Referencias a las vistas (SPA)
const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const dashboardView = document.getElementById("dashboardView");

// Formularios
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Botones de navegación
const goToRegister = document.getElementById("goToRegister");
const goToLogin = document.getElementById("goToLogin");
const logoutBtn = document.getElementById("logoutBtn");

// Elementos del dashboard
const welcomeMsg = document.getElementById("welcomeMsg");
const searchInput = document.getElementById("searchInput");
const adminPanel = document.getElementById("adminPanel");
const eventForm = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");



//  CONTROL DE VISTAS

function showView(view) {
  // Muestra solo la vista seleccionada y oculta las demás
  loginView.style.display = view === "login" ? "block" : "none";
  registerView.style.display = view === "register" ? "block" : "none";
  dashboardView.style.display = view === "dashboard" ? "block" : "none";
}

function getUser() {
  // Obtiene el usuario guardado en LocalStorage
  return JSON.parse(localStorage.getItem("user"));
}



//  NAVEGACIÓN ENTRE VISTAS (SPA)


// Botón para ir a registro
goToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  showView("register");
});

// Botón para ir al login
goToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  showView("login");
});

// Botón para cerrar sesión
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  showView("login");
});



//  REGISTRO DE USUARIO


registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const role = document.getElementById("registerRole").value;

  // ✅ Verificar si ya existe un usuario con el mismo nombre
  const checkRes = await fetch(`${API}/users?username=${username}`);
  const existingUsers = await checkRes.json();

  if (existingUsers.length > 0) {
    alert("Ese nombre de usuario ya está registrado. Inicia Sesión.");
    return;
  }

  // 📝 Crear nuevo usuario si no existe
  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role })
  });

  if (res.ok) {
    alert("Usuario registrado correctamente. Inicia sesión.");
    showView("login");
  } else {
    alert("Error al registrar. Intenta nuevamente.");
  }
});



//  LOGIN DE USUARIO


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Captura datos de login
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Busca en la base de datos si existe ese usuario
  const res = await fetch(`${API}/users?username=${username}&password=${password}`);
  const data = await res.json();

  if (data.length > 0) {
    // Guarda usuario en LocalStorage
    localStorage.setItem("user", JSON.stringify(data[0]));

    // Carga el dashboard
    showView("dashboard");
    initDashboard();
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});



//  INICIALIZACIÓN DEL DASHBOARD

function initDashboard() {
  const user = getUser();

  // Muestra mensaje de bienvenida
  welcomeMsg.textContent = `Bienvenido, ${user.username}`;

  // Muestra panel admin si el usuario es administrador
  adminPanel.style.display = user.role === "administrator" ? "block" : "none";

  // Carga eventos
  loadEvents();

  // Evento para crear nuevo evento (solo admin)
  if (eventForm) {
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("eventTitle").value;
      const capacity = parseInt(document.getElementById("eventCapacity").value);

      // Envía el nuevo evento al servidor
      fetch(`${API}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, capacity, attendees: [] })
      }).then(() => {
        eventForm.reset();
        loadEvents();
      });
    });
  }

  // Filtro por búsqueda de título
  if (searchInput) {
    searchInput.addEventListener("input", loadEvents);
  }
}



// CARGAR Y MOSTRAR EVENTOS


function loadEvents() {
  fetch(`${API}/events`)
    .then(res => res.json())
    .then(renderEvents); // Manda los eventos a la función que los muestra
}

function renderEvents(events) {
  const user = getUser();
  const filtered = searchInput.value.toLowerCase();
  eventList.innerHTML = "";

  events
    .filter(e => e.title.toLowerCase().includes(filtered)) // Filtro por búsqueda
    .forEach(event => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${event.title}</strong> (Capacidad: ${event.capacity})<br>`;

      // === VISITANTE ===
      if (user.role === "visitor") {
        const btn = document.createElement("button");
        const yaInscrito = event.attendees?.includes(user.username);
        const hayCupo = (event.attendees?.length || 0) < event.capacity;

        if (yaInscrito) {
          btn.textContent = "Ya inscrito";
          btn.disabled = true;
        } else if (!hayCupo) {
          btn.textContent = "Cupo lleno";
          btn.disabled = true;
        } else {
          btn.textContent = "Inscribirme";
          btn.onclick = () => {
            const nuevos = [...(event.attendees || []), user.username];

            // Actualiza lista de asistentes en el servidor
            fetch(`${API}/events/${event.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ attendees: nuevos })
            }).then(loadEvents);
          };
        }

        li.appendChild(btn);
      }

      // ADMINISTRADOR 
      if (user.role === "administrator") {
        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.onclick = () => {
          const nuevoTitulo = prompt("Nuevo título:", event.title);
          const nuevaCapacidad = prompt("Nueva capacidad:", event.capacity);
          if (nuevoTitulo && nuevaCapacidad) {
            fetch(`${API}/events/${event.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: nuevoTitulo,
                capacity: parseInt(nuevaCapacidad)
              })
            }).then(loadEvents);
          }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.onclick = () => {
          if (confirm("¿Eliminar evento?")) {
            fetch(`${API}/events/${event.id}`, {
              method: "DELETE"
            }).then(loadEvents);
          }
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
      }

      eventList.appendChild(li);
    });
}



// CARGA INICIAL (VERIFICA SI HAY SESIÓN ACTIVA)

const session = getUser();
if (session) {
  showView("dashboard");
  initDashboard();
} else {
  showView("login");
}