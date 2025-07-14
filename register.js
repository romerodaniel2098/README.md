// register.js
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // Verifica si ya existe el usuario
  const res = await fetch(`http://localhost:4000/users?username=${username}`);
  const existing = await res.json();

  if (existing.length > 0) {
    alert("El usuario ya existe");
    return;
  }

  await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role })
  });

  alert("Registro exitoso");
  window.location.href = "login.html";
});