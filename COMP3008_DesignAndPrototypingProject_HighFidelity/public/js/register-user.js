
function registerUser() {  
  let fullname = document.getElementById('fullname').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirm_password').value;
  let email = document.getElementById('email').value;
  let confirmEmail = document.getElementById('confirm_email').value;
  let dob = document.getElementById('dob').value;
  let splitDob = dob.split('-');

  let year = parseInt(splitDob[0]);
  let month = parseInt(splitDob[1]);
  let day = parseInt(splitDob[2]);

  if (fullname == null) {
    alert("Please enter your name.");
    return;
  }

  if (password !== confirmPassword) {
    alert('ERROR: Passwords do not match');
    return;
  }

  if (email !== confirmEmail) {
    alert('ERROR: Email does not match');
    return;
  }

  if (splitDob.length != 3) {
    alert('ERROR: Date of birth not written correctly. Please use proper format.');
    return;
  }

  if (year === NaN || month === NaN || day === NaN) {
    alert('ERROR: Date of birth contains invalid values.');
  }

  if (splitDob[0].length != 4 || splitDob[1].length != 2 || splitDob[2].length != 2) {
    alert('ERROR: Date of birth contains invalid values.');
  }

  if (!validateDateOfBirth(year, month, day)) {
    alert('ERROR: Invalid date of birth.');
  }

  let newUser = {
    "username" : username,
    "Name" : fullname,
    "Email" : email,
    "School" : "Carleton University",
    "DOB" : dob,
    "Password" : password,
    "profilePicture" : "./img/profilePictures/NoPFP.png"
  }

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        alert("User registered successfully!");
        window.location.href = "/";
      } else if (this.status == 404) {
        alert("ERROR: Could not register user.");
      }
    }
  }
  xhttp.open("POST", "/register", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(newUser));
}

function validateDateOfBirth(year, month, day) {
  if (year < 1900 || year > 2023) {
    return false;
  } else {
    if (month < 1 || month > 12) {
      return false;
    } else {
      if (day < 1 || day > getMaxDay(month)) {
        return false;
      }
    }
  }
  return true;
}

function getMaxDay(month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12: return 31;
    case 2:  return 28;
    default: return 30;
  }
}