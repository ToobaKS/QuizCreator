let globalUsername = "Something";

function login() {
  const email = document.getElementById("email_address").value;
  const password = document.getElementById("password").value;

  let userLoginInfo = {
    "email" : email,
    "password" : password
  }

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
      if (xhttp.status == 200) {
        alert("Login successful!");
        let data = JSON.parse(xhttp.responseText);
        window.location.href = `/profile?username=${data.Username}`;
      } else if (xhttp.status == 401) {
        alert("ERROR: Unauthorized.");
        return;
      } else {
        alert("ERROR: This user does not exist. Please register.");
        return;
      }
    }
  }
  xhttp.open("POST", `/login`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(userLoginInfo));
}

function loadRegistration() {
  window.location.href = "/register";
}