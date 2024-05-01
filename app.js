const express = require('express');
const app = express();
const errorMiddleware = require('./Middleware/errorMiddleware')
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
// const dotenv = require('dotenv');
const path = require("path");

// Setting up config file
if (process.env.NODE_ENV === 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(fileUpload());




// import all routes
const products =require('./routes/product');
const user =require('./routes/userRoutes');
const order =require('./routes/orderRoute');
const payment =require('./routes/payment');

app.use('/api/v1', products )
app.use('/api/v1', user )
app.use('/api/v1', order )
app.use('/api/v1', payment )


if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "../frontend/index.html"))
    })
  }


// Middleware to handle error
app.use(errorMiddleware);

module.exports = app