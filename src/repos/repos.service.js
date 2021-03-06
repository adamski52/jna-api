var mongoose = require('mongoose'),
    ValidationService = require("../services/validation.service"),
    Model;

function init() {
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            validate: [{
                isAsync: true,
                validator: function(value, callback) {
                    ValidationService.isUnique(Model, {
                        name: value
                    }, callback);
                },
                msg: "Name must be unique"
            }, {
                isAsync: true,
                validator: ValidationService.isNotNull,
                msg: "Name must not be blank"
            }]
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
        name: repoName
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