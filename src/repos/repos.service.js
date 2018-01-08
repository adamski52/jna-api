var mongoose = require('mongoose'),
    ValidationService = require("../services/validation.service"),
    Model;

function init() {
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            validate: {
                isAsync: true,
                validator: function(value, callback) {
                    console.log("ask me about", value);
                    this.model("Repo").count({
                        name: value
                    }, function (err, count) {
                        console.log("COUNT", count);
                        if (err) {
                            return callback(false, "oh no");
                        }

                        callback(!count, "oh no 2");
                    });
                }
            }
        },
        hearts: {
            type: Number,
            default: 1
        }
    });

    schema.methods.heart = function (callback) {
        this.hearts++;
        this.save(callback);
    };

    Model = mongoose.model("Repo", schema);
}

function select(repoName, callback) {
    Model.findOne({
        name: repoName
    }, callback);
}

function create(repoName, callback) {
    Model.create({
        name: repoName,
        hearts: 1
    }, callback);
}

function heart(repoName, callback) {
    select(repoName, function(err, repo) {
        if(err) {
            callback(err, repo);
            return;
        }

        if(!repo) {
            create(repoName, callback);
            return;
        }

        repo.heart(function(err) {
            if(err) {
                callback(err, repo);
                return;
            }

            callback(undefined, repo);
        });
    })
}

init();

module.exports.Model = Model;
module.exports.select = select;
module.exports.heart = heart;