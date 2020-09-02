const express = require("express");
const request = require("request");
const app = express();

const routes = require("./routes")

app.use(express.json());

routes(app);

app.listen(5000, () => {
    console.log("Servidor corriendo en http://localhost:5000");
});
