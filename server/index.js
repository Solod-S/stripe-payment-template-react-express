require("dotenv").config();
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const { swaggerUi, swaggerDocs } = require("./swagger"); // Импорт Swagger
const paymentRouter = require("./routes/payment");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(logger(formatsLogger));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/payment", paymentRouter);

app.listen(5555, () => {
  console.log("Server is running on port 5555");
  console.log("http://localhost:5555/api-docs/");
  console.log("Test card 1: ", "4111 1111 1111 1111");
  console.log("Test card 2: ", "4242 4242 4242 4242");
});
