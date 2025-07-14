// login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
  const users = await res.json();

  if (users.length === 1) {
    const user = users[0];
    localStorage.setItem("user", JSON.stringify(user));
    alert("Bienvenido " + user.username);
    window.location.href = "dashboard.html";
  } else {
    alert("Credenciales incorrectas");
  }
});
