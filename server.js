const express = require("express");
const urlRoutes = require("./routes/url.routes");
const { DBConnect } = require("./config/db");

const app = express();
const PORT = 5000;

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

// server
app.listen(PORT, () => console.log("Server is listening at PORT:", PORT));
