const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS

const { errorHandler } = require('./middleware/errorHandler');
const { swaggerSpec, swaggerUi } = require('./utils/swagger');  // Import Swagger config
const ErrorHandler = require('./utils/errorHandler');

// Initialize environment variables
dotenv.config();



// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*', // Angular frontend
    credentials: true, // Allow credentials (cookies) to be sent
}));// swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Endpoint for Swagger UI


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);


// Global Error Handler
app.use(ErrorHandler);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
