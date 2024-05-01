const app = require('./app');
const connectDatabase = require('./config/database')
// const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

// Handling Uncaught Exception like console.log(a)
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
   
// Setting up config file
if (process.env.NODE_ENV === 'PRODUCTION') require('dotenv').config({ path: 'config/config.env' })


// connecting Database 
connectDatabase();

// seting cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () =>{
    console.log(`Server is Started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} node.`)
});

// Unhandled Promise Rejection for mongodb url
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });