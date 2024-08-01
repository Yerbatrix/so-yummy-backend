const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "So Yummy API",
      version: "1.0.0",
      description: "API documentation for the So Yummy project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUI, swaggerDocs };
