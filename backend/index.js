const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express();
const authRoute = require("./routes/auth");
const tasksRoute = require("./routes/tasks");

dotenv.config();
app.use(express.json());

mongoose 
.connect(process.env.MONGODB_URL, {
})   
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/tasks", tasksRoute);

app.listen(8000, () => {
    console.log("Backend server is running");
});