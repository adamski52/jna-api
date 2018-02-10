var express = require("express"),
    app = express(),
    cors = require("cors"),
    router = require("./router"),
    db = require("./db"),
    port = 8080;

db.connect();

app.use(cors());
app.use("/api", router);

app.listen(port);

console.log("running on :" + port);