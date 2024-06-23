const express = require("express");
const fs = require("fs");

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const MIME_TYPES = {
  'css': 'text/css', 
  'gif': 'image/gif', 
  'htm': 'text/html',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'application/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'txt': 'text/plain'
}

let database = { "users" : {}, "quizzes" : {} };
let numUsers;
let numQuizzes;

// ----- Reading JSON files -----

// users.json
fs.readFile(__dirname + "/data/users.json", (err, data) => {
  if (err) {
    return console.log(err);
  }
  let users = JSON.parse(data);
  database.users = users.users;
  numUsers = Object.keys(database.users).length;
});

// quizzes.json
fs.readFile(__dirname + "/data/quizzes.json", (err, data) => {
  if (err) {
    return console.log(err);
  }
  let quizzes = JSON.parse(data);
  database.quizzes = quizzes.quizzes;
  numQuizzes = Object.keys(database.quizzes).length;
});

// ----- Home page (search page) -----
app.get("/", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", MIME_TYPES.html);
  res.sendFile(__dirname + "/search.html");
})

// ----- Login page -----
app.get("/login", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", MIME_TYPES.html);
  res.sendFile(__dirname + "/login.html");
})
app.post("/login", (req, res) => {
  let currUser = null;
  let wrongPassword = false;
  Object.keys(database.users).forEach(user => {
    if (database.users[user].Email === req.body.email) {
      if (database.users[user].Password === req.body.password) {
        currUser = database.users[user];
        currUser.Username = user;
      } else {
        wrongPassword = true;
      }
    }
  });
  if (currUser != null) {
    res.status(200);
    res.setHeader("Content-Type", MIME_TYPES.json);
    res.send(JSON.stringify(currUser));
  } else if (wrongPassword) {
    res.status(401);
    res.send("ERROR: Unauthorized.");
  } else {
    res.status(404);
    res.send("ERROR: Could not find this user.");
  }
})

// ----- Registration page -----
app.get("/register", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", MIME_TYPES.html);
  res.sendFile(__dirname + "/registration.html");
})
app.post("/register", (req, res) => {
  let data = req.body;
  let username = data.username;
  delete data.username;
  database.users[username] = data;
  numUsers++;
  const newData = {};
  newData.users = database.users;
  fs.writeFile(__dirname + "/data/users.json", JSON.stringify(newData), (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
  res.status(200).send();
})

// ----- Profile page -----
app.get("/profile", (req, res) => {
  if (req.query.username === undefined)
    req.query.username = "id1";
  res.status(200);
  res.setHeader("Content-Type", MIME_TYPES.html);
  res.sendFile(__dirname + "/profile.html")
})

// ----- Quiz creation page -----
app.get("/create", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", MIME_TYPES.html);
  res.sendFile(__dirname + "/createQuiz.html");
})

// ---- Quiz search page -----
app.get("/search", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", MIME_TYPES.html);
  res.sendFile(__dirname + "/search.html");
})

// ----- Get a user ------
app.get("/user", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", MIME_TYPES.json);
  res.send(JSON.stringify(database.users[req.query.username]));
})

// ---- Finding quizzes -----
app.get("/quiz", (req, res) => {
  if (req.query.search != undefined) {
    let data = {};
    let numQuizzesFound = 0;
    Object.keys(database.quizzes).forEach(key => {
      if (database.quizzes[key].title.toLowerCase().includes(req.query.search.toLowerCase())) {
        data[key] = database.quizzes[key];
      } else if (database.quizzes[key].category.toLowerCase().includes(req.query.search.toLowerCase())) {
        data[key] = database.quizzes[key];
      }
      numQuizzesFound++;
    });
    res.status(200);
    res.setHeader("Content-Type", MIME_TYPES.json);
    res.send(JSON.stringify(data));
  } else if (req.query.id != undefined) {
    let data = database.quizzes[req.query.id];
    if (data === undefined) {
      data = database.quizzes["1"];
    }
    res.status(200);
    res.setHeader("Content-Type", MIME_TYPES.json);
    res.send(JSON.stringify(data));
  }
})

// ---- Quiz page (depending on the id) -----
app.get("/quiz/:id", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/takeQuiz.html");
})

// ---- Solutions page for a quiz (dummy quiz for prototype) -----
app.get("/solutions", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/solutions.html")
})

// ----- History page -----
app.get("/history", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/history.html");
})

// ----- Add Sections page -----
app.get("/addSections", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/addSelection.html");
})

// ----- Add Questions (multiple pages) -----
app.get("/addMC", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/addmc.html");
})
app.get("/addSA", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/addsa.html");
})
app.get("/addLA", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/addla.html");
})

app.listen(3000);
console.log("Server listening at http://localhost:3000");