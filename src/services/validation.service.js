module.exports.isUnique = function(ctx, selector, callback) {
    ctx.model("Repo").count({}, function (err, count) {
        console.log("COUNT", count);
        if (err) {
            return callback(false, "oh no");
        }

        callback(!count, "oh no 2");
    });
};

module.exports.isNull = function(Model, property) {
    return function(value, done) {
        done(!!value);
    };
};
//
// UserSchema.path('email').validate(function(value, done) {
//     this.model('User').count({ email: value }, function(err, count) {
//         if (err) {
//             return done(err);
//         }
//         // If `count` is greater than zero, "invalidate"
//         done(!count);
//     });
// }, 'Email already exists');