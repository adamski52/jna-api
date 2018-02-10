var ReposService = require("./repos.service"),
    ResponseService = require("../services/response.service");

function post(req, res) {
    ReposService.heart(req.params.repoName, function(err, result) {
        ResponseService.buildResponse(err, result, function(data) {
            res.set("Access-Control-Allow-Origin", "*");
            res.status(data.status).json(data);
        });
    });
}

function get(req, res) {
    ReposService.select(req.params.repoName, function(err, result) {
        ResponseService.buildResponse(err, result, function(data) {
            res.set("Access-Control-Allow-Origin", "*");
            res.status(data.status).json(data);
        });
    });
}

module.exports.get = get;
module.exports.post = post;