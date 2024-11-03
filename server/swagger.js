const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stripe API Documentation",
      version: "1.0.0",
      description: "API Documentation for payment processing",
    },
    tags: [
      { name: "Payments", description: "Endpoints for payment processing" },
    ],
  },

  apis: ["./swagger/*.js"], // путь к папке с файлами Swagger
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerDocs };
