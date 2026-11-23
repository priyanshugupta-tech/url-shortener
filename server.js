const express = require("express");
const { DBConnect } = require("./config/db");
const path = require("path");

// Routes
const urlRoutes = require("./routes/url.routes");
const staticRoutes = require("./routes/static.routes");

const app = express();
const PORT = 5000;

// templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// DB connection
DBConnect(
  "mongodb://127.0.0.1:27017/url-service?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.10.0",
)
  .then(() => console.log("DB connected📎"))
  .catch((err) => console.log("Error in DB connection: ", err));

// Middleware
app.use(express.json());

// Routes
app.use("/url", urlRoutes);
app.use("/", staticRoutes);

// server
app.listen(PORT, () => console.log("Server is listening at PORT:", PORT));
