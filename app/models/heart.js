var mongoose = require('mongoose'),
    schema = mongoose.Schema({
        repo: String,
        hearts: Number
    });

schema.methods.heart = function() {
    this.hearts++;
    this.save(function(err, instance) {
        if(err) {
            console.error(err);
            return;
        }
    });
};

module.exports = mongoose.model("Heart", schema);
