var Repo = require("../models/Repo"),
    express = require("express"),
    router = express.Router();

function handleError(err, callback) {
    callback({
        status: 500,
        data: {
            error: err.message || "Unknown error"
        }
    });
}

function handleNoResults(callback) {
    callback({
        status: 404,
        data: {}
    });
}

function handleResults(results, callback) {
    callback({
        status: 200,
        data: results[0]
    });
}

function handleCreated(repo, callback) {
    callback({
        status: 201,
        data: repo
    });
}

function handleUpdate(repo, callback) {
    callback({
        status: 200,
        data: repo
    });
}

function createRepo(repoName, callback) {
    var repo = new Repo({
        name: repoName,
        hearts: 1
    });

    repo.save();

    handleCreated(repo, callback);
}

function updateRepo(repo, callback) {
    repo.heart();

    handleUpdate(repo, callback);
}

function get(repoName, callback) {
    Repo.find({
        name: repoName
    }, function (err, results) {
        if (err) {
            handleError(err, callback);
            return;
        }

        if (!results.length) {
            handleNoResults(callback);
            return;
        }

        handleResults(results, callback);
    });
}

function post(repoName, callback) {
    Repo.find({
        name: repoName
    }, function(err, results) {
        if(err) {
            handleError(err, callback);
            return;
        }

        if(!results.length) {
            createRepo(repoName, callback);
            return;
        }

        updateRepo(results[0], callback);
    });
}

module.exports = (function() {
    router.get("/:repoName", function(req, res) {
        console.log("get: ", req.params.repoName);
        get(req.params.repoName, function(data) {
            console.log("get done", data);
            res.status(data.status).json(data.data).send();
        });
    });

    router.post("/:repoName",  function(req, res) {
        post(req.params.repoName, function(data) {
            res.status(data.status).json(data.data).send();
        });
    });

    return router;
}());
