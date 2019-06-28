const express = require("express");

const server = express();
server.use(express.json());

// Query Params = ?nome=pedro
// Route Params = /users/1
// Request Body = { "name: "Pedro", "email:" "phpioner@gmail.com"}

const users = ["Pedro Pioner", "Felipe", "Otavio"];

server.use((req, res, next) => {
  console.time("Request");

  console.log(`Método ${req.method}; URL ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required." });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exist." });
  }

  return next();
}

//lista users
server.get("/users", (req, res) => {
  return res.json(users);
});

//lista users by id
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(user);
});

server.post("/users", checkUserExist, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
