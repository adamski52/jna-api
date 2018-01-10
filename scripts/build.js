const fs = require("fs-extra");

fs.emptyDir("./dist", function(error) {
    if(error) {
        console.error(error);
        process.exitCode = 1;
        throw error;
    }

    console.log("./dist emptied/created");

    fs.copy("./src", "./dist", function(error) {
        if (error) {
            console.error(error);
            process.exitCode = 1;
            throw error;
        }

        console.log("Assets copied to ./dist");
    });
});
