function registration() {
  let reg_email = document.getElementById("reg_email").value;
  let reg_pass = document.getElementById("reg_pass").value;
  let reg_rep_pass = document.getElementById("reg_rep_pass").value;

  let joEmail = reg_email.includes("@");

  if (!joEmail) {
    alert("Helytelen email vagy jelszó!");
    return;
  }

  if (reg_pass !== reg_rep_pass) {
    alert("Helytelen email vagy jelszó!");
    return;
  }
}

function login() {
  let log_email = document.getElementById("log_email").value;
  let log_pass = document.getElementById("log_pass").value;

  if (!log_email.includes("@") || log_pass.length < 4) {
    alert("Helytelen email vagy túl rövid jelszó!");
    return;
  }

  alert("Sikeres bejelentkezés!");
}
function showRegistration() {
  document.querySelector(".reg").style.display = "block";
  document.querySelector(".log").style.display = "none";
}

function showLogin() {
  document.querySelector(".reg").style.display = "none";
  document.querySelector(".log").style.display = "block";
}
