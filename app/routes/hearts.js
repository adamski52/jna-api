var express = require("express"),
    router = express.Router();
    Heart = require("../models/heart");

function findRepo(repo, callback) {
    if(!repo) {
        callback({
            code: 400,
            message: "Repo is required"
        });
        return;
    }

    Heart.find({
        repo: repo
    }, function(err, results) {
        if(err) {
            callback({
                code: 500,
                message: err.message || "Error"
            });
            return;
        }

        if(!results.length) {
            callback(undefined, undefined);
            return;
        }

        callback(undefined, results[0]);
    });
}

router.get("/:repo", function(req, res, next) {
    findRepo(req.params.repo, function(err, heart) {
        if(err) {
            res.status(err.code);
            res.json(err);
            return;
        }

        if(!heart) {
            res.json({
                hearts: 0
            });

            return;
        }

        res.json({
            hearts: heart.hearts
        });
    });
});

router.post("/:repo", function(req, res, next) {
    findRepo(req.params.repo, function(err, heart) {
        if(err) {
            res.status(err.code);
            res.json(err);
            return;
        }

        if(!heart) {
            heart = new Heart({
                repo: req.params.repo,
                hearts: 0
            });
        }

        heart.heart();

        res.json({
            hearts: heart.hearts
        });
    });
});

module.exports = router;

