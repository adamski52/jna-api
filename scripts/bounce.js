const utils = require("./utils");

utils.do([
    "sudo stop jna",
    "sudo stop jna-db",
    "sudo start jna-db"
]);
