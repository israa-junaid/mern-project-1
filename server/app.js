const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');
const User = require('./models/userSchema');

const cookieParser = require("cookie-parser");
app.use(express.json());  

// we link the router files to make our route easy 
app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`Hello world from the server app.js`);
});

// app.get('/about', (req, res) => {
//     console.log(`Hello my About`);
//     res.send(`Hello About world from the server`);
// });

// app.get('/contact', (req, res) => {
//     res.cookie("Test",'thapa');
//     res.send(`Hello Contact world from the server`);
// });

app.get('/signin', (req, res) => {
    res.send(`Hello Login world from the server`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from the server`);
});

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})


