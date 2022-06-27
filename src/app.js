const express = require('express');
const app = express();
const employeesRouter = require("./routes/employees.router");
const port = 3010;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world from EXPRESS WORKSHOP2!');
})

app.use("/", employeesRouter);

app.listen(port, () => {
    console.log(`Example app listening port ${port}`)});
