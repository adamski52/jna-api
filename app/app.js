var express = require("express"),
    app = express(),
    router = express.Router(),
    fs = require("fs"),
    mongoose = require("mongoose");

function connect() {
    mongoose.connect("mongodb://localhost");
    const db = mongoose.connection;
    db.on("error", function () {
        console.error("connection error");
    });

    db.once("open", function () {
        console.log("connected");
    });
}

function getRoutes(dir) {
    var api = fs.readdirSync(dir),
        routes = [],
        path;

    api.forEach(function(file) {
        path = dir + file;

        if(fs.statSync(path).isDirectory()) {
            routes = routes.concat(getRoutes(path + '/'));
        }
        else {
            path = path.replace(".js", "");
            path = path.replace("./app/", "./");

            var friendly = path.replace("./", "/");

            routes.push({
                path: path,
                friendly: friendly
            });
        }
    });
    return routes;
}

function bindRoutes() {
    var routes = getRoutes("./app/api/");

    routes.forEach(function(route) {
        router.use(route.friendly, require(route.path));
    });

    app.use(router);
}

function start(port) {
    connect();

    bindRoutes();

    app.listen(port);

    console.log("Running on :", port);
}

module.exports = {
    start: start
};
