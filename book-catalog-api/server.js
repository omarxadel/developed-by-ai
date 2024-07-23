require("dotenv").config();
const app = require("./src/config/express");
const initMongoDB = require("./src/config/database");

const port = process.env.PORT || 3000;

initMongoDB();
app.listen(port, () => console.log("Server running on port", port));
