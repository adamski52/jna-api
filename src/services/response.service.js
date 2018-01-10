module.exports.buildResponse = function(err, result, callback) {
    if(err) {
        callback({
            status: 500,
            data: err
        });
        return;
    }

    if(!result) {
        callback({
            status: 404
        });
        return;
    }

    callback({
        status: 200,
        data: result
    });
};