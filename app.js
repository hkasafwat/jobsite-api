require("dotenv").config();
require("./config/database").connect();

const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.route');
const auth = require("./middleware/auth");

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

app.get('/', auth, (req, res) => {
  res.send('hello world');
})

app.use('/', authRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
})