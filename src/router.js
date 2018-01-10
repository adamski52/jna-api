var express = require("express"),
    router = express.Router(),
    repos = require("./repos/repos.routes");

router.use("/repos", repos.routes);

module.exports = router;