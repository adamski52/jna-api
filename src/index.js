var express = require("express"),
    app = express(),
    router = require("./router"),
    db = require("./db"),
    port = 8080;

db.connect();

app.use("/api", router);

app.listen(port);

console.log("running on :" + port);