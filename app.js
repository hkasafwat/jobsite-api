require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.route");
const jobsRoutes = require("./routes/jobs.route");
const userRoutes = require("./routes/user.route");
const auth = require("./middleware/auth");

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", auth, (req, res) => {
  res.send("hello world");
});

app.use("/", authRoutes);
app.use("/jobs", jobsRoutes);
app.use("/", userRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
