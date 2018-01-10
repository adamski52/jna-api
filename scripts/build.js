const fs = require("fs-extra");

fs.copy("./src", "./dist", function(error) {
    if (error) {
        console.error(error);
        process.exitCode = 1;
        throw error;
    }

    console.log("./src copied to ./dist");

    fs.copy("./node_modules", "./dist/node_modules", function(error) {
        if (error) {
            console.error(error);
            process.exitCode = 1;
            throw error;
        }

        console.log("./node_modules copied to ./dist/node_modules");
    });
});
