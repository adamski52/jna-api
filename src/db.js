var mongoose = require("mongoose");

function connect() {
    mongoose.connect("mongodb://localhost");

    mongoose.connection.on("error", function (err) {
        console.error("connection error", err);
    });

    mongoose.connection.once("open", function () {
        console.log("connected");
    });

}

module.exports.connect = connect;
