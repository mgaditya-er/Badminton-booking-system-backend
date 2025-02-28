const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',  // OpenAPI version
    info: {
      title: 'User API',  // API title
      version: '1.0.0',   // API version
      description: 'API documentation for User-related operations', // Description
    },
    servers: [
      {
        url: 'http://localhost:5000/api',  // Base URL for your API
      },
    ],
  },
  apis: ['./routes/userRoutes.js'],  // Path to the route files you want to document
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
