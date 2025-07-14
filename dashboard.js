import { getUserFromLocalStorage } from './auth.js';

const API = "http://localhost:3000";
const eventList = document.getElementById("event-list");
const searchInput = document.getElementById("search");
const eventForm = document.getElementById("eventForm");
const adminPanel = document.getElementById("adminPanel");

export function fetchAndRenderEvents() {
  fetch(`${API}/events`)
    .then(res => res.json())
    .then(loadEvents);
}

function loadEvents(events) {
  eventList.innerHTML = "";
  const filtered = searchInput.value.toLowerCase();
  const user = getUserFromLocalStorage();

  events
    .filter(e => e.title.toLowerCase().includes(filtered))
    .forEach(event => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${event.title}</strong> (Capacidad: ${event.capacity})<br>`;

      // ✅ Visitantes: Inscribirse
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
            const nuevosAsistentes = [...(event.attendees || []), user.username];

            fetch(`${API}/events/${event.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ attendees: nuevosAsistentes })
            }).then(() => {
              alert("Inscripción exitosa");
              fetchAndRenderEvents();
            });
          };
        }

        li.appendChild(btn);
      }

      // ✅ Administradores: Editar / Eliminar
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
            }).then(fetchAndRenderEvents);
          }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.onclick = () => {
          if (confirm("¿Seguro que quieres eliminar este evento?")) {
            fetch(`${API}/events/${event.id}`, {
              method: "DELETE"
            }).then(fetchAndRenderEvents);
          }
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
      }

      eventList.appendChild(li);
    });
}
// Mostrar el panel de admin si el usuario es administrador
document.addEventListener("DOMContentLoaded", () => {
  const user = getUserFromLocalStorage();
  if (user && user.role === "administrator") {
    adminPanel.style.display = "block";
  }
});

// Formulario para crear eventos
if (eventForm) {
  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("eventTitle").value;
    const capacity = parseInt(document.getElementById("eventCapacity").value);

    fetch(`${API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        capacity,
        attendees: [] // 
      })
    }).then(() => {
      eventForm.reset();
      fetchAndRenderEvents();
    });
  });
}

// ✅ Búsqueda en tiempo real
if (searchInput) {
  searchInput.addEventListener("input", fetchAndRenderEvents);
}
