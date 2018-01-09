module.exports.isUnique = function(model, selector, callback) {
    model.count(selector, function (err, count) {
        if (err) {
            return callback(false);
        }

        callback(!count);
    });
};

module.exports.isNull = function(value, callback) {
    callback(!!value);
};