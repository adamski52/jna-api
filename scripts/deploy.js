const path = require("path"),
      tar = require("tar"),
      utils = require("./utils"),
      ScpClient = require("scp2").Client,
      date = new Date(),
      name = "" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds(),
      nameTgz = name + ".tgz",
      scpClient = new ScpClient(utils.config);

tar.c({
    gzip: true,
    file: name + ".tgz",
    cwd: "dist"
}, ["."]).then(function() {
    console.log("Created " + nameTgz);

    scpClient.upload(nameTgz, "/home/bitnami/" + nameTgz, function(error) {
        if(error) {
            console.error(error);
            process.exitCode = 1;
            throw error;
        }

        console.log("SCP finished.");

        utils.do([
            "mkdir -p /home/bitnami/public",
            "mkdir -p /home/bitnami/archive",
            "mkdir -p /home/bitnami/tmp",

            "tar -xvf /home/bitnami/" + nameTgz + " -C /home/bitnami/tmp",

            "mv /home/bitnami/public /home/bitnami/archive/" + name,
            "mv /home/bitnami/tmp /home/bitnami/public",

            "rm -rf /home/bitnami/tmp",
            "rm /home/bitnami/" + nameTgz
        ]);
    });
}).catch(function(error) {
    console.error(error);
    process.exitCode = 1;
    throw error;
});
