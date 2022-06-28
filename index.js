const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.json({
    succes: true,
    message: "backend is running well",
  });
});

app.use("/", require("./src/routes"));

app.use("*", (req, res) => {
  return res.status(404).json({
    succes: false,
    message: "Resource not found",
  });
});

app.listen(3333, () => {
  console.log("App is running on port 3333");
});
