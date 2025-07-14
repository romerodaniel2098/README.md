import { isAuthenticated } from './app/auth.js';

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
  } else {
    window.location.href = "dashboard.html";
  }
});
