var express = require("express"),
    router = express.Router(),
    ReposController = require("./repos.controller");

router.get("/:repoName", ReposController.get);

router.post("/:repoName", ReposController.post);

module.exports.routes = router;
