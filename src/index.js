var express = require("express"),
    app = express(),
    cors = require("cors"),
    proxy = require("http-proxy-middleware"),
    router = require("./router"),
    db = require("./db"),
    port = 8080,
    githubProxy = proxy({
        target: "https://api.github.com/",
        pathRewrite: {
            "^/git": ""
        },
        changeOrigin: true,
        onProxyReq: function(proxyReq, req, res) {
            proxyReq.setHeader("Authentication", "token " + process.env.GITHUB_TOKEN);
            proxyReq.setHeader("User-Agent", "maintaincomposure.com");
            proxyReq.setHeader("Content-Type", "application/json");
        }
    });

db.connect();

app.use(cors());
app.use("/api", router);
app.use("/git", githubProxy);


app.listen(port);

console.log("running on :" + port);