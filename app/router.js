var express = require("express"),
    router = express.Router();

router.use("/heart", require("./routes/hearts"));

module.exports = router;