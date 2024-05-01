const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if(process.env.NODE_ENV === 'DEVELOPMENT'){
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack
    })
  }

  if(process.env.NODE_ENV === 'PRODUCTION'){
    let error = {...err}

    error.message = err.message

    // Wrong Mongodb Id error api 
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //  Mongodb Validation error api 
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(values => values.message);
    err = new ErrorHandler(message, 400);
  }

    res.status(err.statusCode).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  }

  // Wrong Mongodb Id error
  // if (err.name === "CastError") {
  //   const message = `Resource not found. Invalid: ${err.path}`;
  //   err = new ErrorHandler(message, 400);
  // }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  
};

