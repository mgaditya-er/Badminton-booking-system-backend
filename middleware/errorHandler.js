// const ErrorHandler = require('../utils/errorHandler');  // Change to require

// export function errorHandler(err, req, res, next) {
//     console.log(err); // Log the error for debugging
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";

//     // Mongoose cast error (Invalid resource)
//     if (err.name === "CastError") {
//         const message = `Resource Not Found. Invalid: ${err.path}`;
//         err = new ErrorHandler(message, 400);
//     }

//     // Mongoose duplicate key error
//     if (err.code === 11000) {
//         const message = `${Object.keys(err.keyValue)} already exists`;
//         err = new ErrorHandler(message, 400);
//     }

//     // JWT invalid error
//     if (err.code === "JsonWebTokenError") {
//         const message = 'Invalid JWT Token';
//         err = new ErrorHandler(message, 400);
//     }

//     // JWT expired error (TokenExpiredError)
//     if (err.name === "TokenExpiredError") {
//         const message = 'JWT is Expired';
//         err = new ErrorHandler(message, 401); // Unauthorized (401)
//     }

//     // Mongoose validation error
//     if (err.name === 'ValidationError') {
//         const messages = Object.values(err.errors).map(val => val.message);
//         return res.status(400).json({ success: false, error: messages.join(', ') });
//     }

//     res.status(err.statusCode).json({
//         success: false,
//         message: err.message,
//     });
// }

// // Catch async errors
// export function asyncErrorHandler(fn) {
//     return (req, res, next) =>
//         Promise.resolve(fn(req, res, next)).catch(next);
// }
