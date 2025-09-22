async function registration() {
  let reg_email = document.getElementById("reg_email").value;
  let reg_pass = document.getElementById("reg_pass").value;
  let reg_rep_pass = document.getElementById("reg_rep_pass").value;

  if (!reg_email.includes("@") || reg_pass !== reg_rep_pass) {
    alert("Helytelen email vagy jelszó!");
    return;
  }

  try {
    const res = await fetch("/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email: reg_email, password: reg_pass })
    });

    if (res.ok) {
      const data = await res.json();
      alert("Sikeres regisztráció! Felhasználó ID: " + data.id);
    } else {
      const errorMsg = await res.text();
      alert("Hiba történt regisztráció közben: " + errorMsg);
    }
  } catch (err) {
    alert("Szerver hiba: " + err.message);
  }
}

async function login() {
  let log_email = document.getElementById("log_email").value;
  let log_pass = document.getElementById("log_pass").value;

  const res = await fetch("/users");
  const users = await res.json();
  const user = users.find(u => u.email === log_email && u.password === log_pass);

  if (user) {
    alert("Sikeres bejelentkezés!");
  } else {
    alert("Hibás email vagy jelszó!");
  }
}
function showRegistration() {
  document.querySelector(".reg").style.display = "block";
  document.querySelector(".log").style.display = "none";
}

function showLogin() {
  document.querySelector(".reg").style.display = "none";
  document.querySelector(".log").style.display = "block";
}
