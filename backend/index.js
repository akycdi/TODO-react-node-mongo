const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config()
const cors = require('cors')

const userRoutes = require("./Routes/user.routes")
const todoRoutes = require("./Routes/todo.routes")

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended : false }))

app.use('/user', userRoutes)
app.use('/todo', todoRoutes)

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString).then(() => {
    console.log("data base connected");
}).catch((err) => {
    console.log(err);
});

const TODO = [];

app.listen(3000, () => { console.log("listing on port 3000") });