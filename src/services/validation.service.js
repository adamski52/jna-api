module.exports.isUnique = function(model, selector, callback) {
    model.count(selector, function (err, count) {
        if (err) {
            return callback(false);
        }

        callback(count < 2);
    });
};

module.exports.isNotNull = function(value, callback) {
    if(!value) {
        callback(false);
        return;
    }

    if(typeof value === "object" && Object.keys(value).length <= 0) {
        callback(false);
        return;
    }

    callback(!!value);
};