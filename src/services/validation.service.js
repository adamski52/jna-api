module.exports.isUnique = function(model, selector, callback) {
    model.count(selector, function (err, count) {
        if (err) {
            return callback(false);
        }

        callback(!count);
    });
};

module.exports.isNull = function(value, callback) {
    if(!value) {
        callback(true);
        return;
    }

    if(typeof value === "object" && Object.keys(value).length <= 0) {
        callback(true);
        return;
    }

    callback(!value);
};