const express = require("express");
const app = express();
const routerNavigation = require("./src/routes");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.json({
    succes: true,
    message: "backend is running well",
  });
});

app.use("/", routerNavigation);

app.use("*", (req, res) => {
  return res.status(404).json({
    succes: false,
    message: "Resource not found",
  });
});

app.listen(3333, () => {
  console.log("App is running on port 3333");
});
