var Client = require("ssh2").Client,
    conn = new Client(),
    path = require("path"),
    fs = require("fs"),
    os = require("os");

function getPrivateKey() {
    var pk = "/tmp/deploy_rsa";

    pk = fs.existsSync(pk) ? pk : path.resolve(os.homedir() + "/.ssh/id_rsa");

    console.log("PK: ", pk);

    return fs.readFileSync(pk);
}

var config = {
    port: 22,
    host: "maintaincomposure.com",
    username: "bitnami",
    privateKey: getPrivateKey()
};

module.exports = {
    config: config,
    do: function(commands) {
        conn.on("ready", function() {
            conn.shell(function(err, stream) {
                if(err) {
                    console.error(error);
                    process.exitCode = 1;
                    throw error;
                }

                stream.on("close", function (code, signal) {
                    console.log("SSH closed.");
                    console.log("   Code: ", code);
                    console.log("   Signal: ", signal);
                    conn.end();
                    process.exit();
                }).on("data", function (data) {
                    // console.log("SSH: ", data.toString());
                }).stderr.on("data", function (data) {
                    console.error("SSH: " + data);
                });

                commands.push("exit");
                var script = commands.join("\n") + "\n";

                console.log(script);

                stream.end(script);
            });
        }).connect(config);
    }
};
