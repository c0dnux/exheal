/**
 * auth.js
 * Simple client-side login check for InsureConnect demo page.
 * NOTE: This is for UI/demo purposes only — real auth must happen
 * on a server, never validate credentials in client-side JS for
 * anything production-facing (anyone can view this file).
 */

(function () {
  // Hardcoded demo credentials — change these as needed
  const VALID_USERNAME = "khalid@insureconnect.com";
  const VALID_PASSWORD = "12345";

  // Where to send the user after a successful login
  const REDIRECT_URL = "dashboard.html";

  document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const emailInput = document.getElementById("exampleInputEmail1");
    const passwordInput = document.getElementById("exampleInputPassword1");
    const msgBox = document.getElementById("loginMsg");

    if (!loginBtn || !emailInput || !passwordInput) {
      console.warn("auth.js: expected form elements not found on this page.");
      return;
    }

    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handleLogin();
    });

    // Also allow pressing Enter inside the password field
    passwordInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleLogin();
      }
    });

    function handleLogin() {
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      clearFieldErrors();

      if (!email || !password) {
        showMessage("Please enter both email and password.", "danger");
        return;
      }

      if (email === VALID_USERNAME && password === VALID_PASSWORD) {
        showMessage("Login successful! Redirecting...", "success");
        loginBtn.classList.add("disabled");
        setTimeout(function () {
          window.location.href = REDIRECT_URL;
        }, 900);
      } else {
        showMessage("Invalid email or password. Please try again.", "danger");
        emailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
      }
    }

    function clearFieldErrors() {
      emailInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-invalid");
    }

    function showMessage(text, type) {
      if (!msgBox) {
        alert(text);
        return;
      }
      msgBox.innerHTML =
        '<div class="alert alert-' +
        type +
        ' py-2 mb-0" role="alert">' +
        text +
        "</div>";
    }
  });
})();
