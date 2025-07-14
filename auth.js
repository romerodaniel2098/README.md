// app/auth.js

export function isAuthenticated() {
  return !!localStorage.getItem("user");
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
