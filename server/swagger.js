const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Stripe Payment API",
      version: "1.0.0",
      description: "API для обработки платежей через Stripe",
      contact: {
        name: "Разработчик",
      },
      servers: ["http://localhost:5555"],
    },
  },
  apis: ["./index.js"], // путь к файлу с эндпоинтами
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
