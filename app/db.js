var mongoose = require("mongoose");

module.exports = {
    connect: function () {
        mongoose.connect("mongodb://localhost");
        const db = mongoose.connection;
        db.on("error", function () {
            console.error("connection error");
        });

        db.once("open", function () {
            console.log("connected");
        });
    }
};
