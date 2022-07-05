const express = require("express");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const catsRouter = require("./routes/cats.router");
const usersRouter = require("./routes/users.router");


const app = express(); // Uso de express en app
const port = 3010; //Puerto determinado
const url = "mongodb+srv://anibalcastro:Web02@cluster0.e82klf0.mongodb.net/CatsDB?retryWrites=true&w=majority"; //URL que se obtiene de mongoDB (atlas)
const cors = require('cors'); //Uso de cors


app.use(cors()); //Lo use todo el mundo
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World from Express!!!!");
});

app.use("/api/cats", catsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  const error = new HttpError("Could not find this route..", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error ocurred!!" });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}
      Connection to BD: OK`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// nodemon
// npm install -D nodemon
