var express = require("express"),
    RepoService = require("../services/repos.service"),
    ResponseService = require("../services/response.service"),
    router = express.Router();

router.get("/:repoName", function(req, res) {
    RepoService.select(req.params.repoName, function(err, result) {
        ResponseService.buildResponse(err, result, function(data) {
            res.status(data.status).json(data);
        });
    });
});

router.post("/:repoName", function(req, res) {
    RepoService.heart(req.params.repoName, function(err, result) {
        ResponseService.buildResponse(err, result, function(data) {
            res.status(data.status).json(data);
        });
    });
});

module.exports.routes = router;
