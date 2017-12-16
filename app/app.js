var express = require("express"),
    router = require("./router"),
    app = express(),
    db = require("./db");

db.connect();

app.use("/api", router);

app.listen(8080);
console.log("Running on :8080");

module.exports = app;
