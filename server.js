const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const userprofiles = [];

app.post("/post", (req, res) => {
  const { email, image } = req.body;
  const token = jwt.sign(req.body, "test");
  const hash = bcrypt.hashSync(req.body.password, 12);
  const userId = uuidv4();
  const data = { token, email, password: hash, id: userId, image };
  userprofiles.push(data);
  console.log(uuidv4);
  res.json(data);
});
app.get("/post", (req, res) => {
  res.json(userprofiles);
});

app.listen(3000);
