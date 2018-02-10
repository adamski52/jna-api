var sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect,
    ValidationService = require("../../src/services/validation.service"),
    stubs,
    model,
    error,
    selector,
    count;


describe("validation service", function() {
    describe("is unique validator", function() {
        beforeEach(function() {
            model = {
                count: function(){}
            };

            count = 5;

            error = {
                error: "oh no"
            };

            selector = {
                name: "bob"
            };

            stubs = {};

            stubs.count = sinon.stub(model, "count").callsFake(function(selector, callback) {
                callback(error, count);
            });
        });

        afterEach(function() {
            Object.keys(stubs).forEach(function(stub) {
                stubs[stub].restore();
            });
        });

        it("should query the count for the model based on selector", function() {
            ValidationService.isUnique(model, selector, function(result) {
                expect(stubs.count).to.have.been.calledWith(selector);
            });
        });

        it("should return false if count errors", function() {
            count = undefined;
            ValidationService.isUnique(model, {}, function(result) {
                expect(result).to.equal(false);
            });
        });

        it("should return false if count > 0", function() {
            error = undefined;
            ValidationService.isUnique(model, {}, function(result) {
                expect(result).to.equal(false);
            });
        });

        it("should return true if count is 0", function() {
            error = undefined;
            count = 0;
            ValidationService.isUnique(model, {}, function(result) {
                expect(result).to.equal(true);
            });
        });
    });

    describe("is not null validator", function() {
        it("should return true if value is null", function() {
            ValidationService.isNotNull(null, function(result) {
                expect(result).to.equal(false);
            });
        });

        it("should return true if value is undefined", function() {
            ValidationService.isNotNull(null, function(result) {
                expect(result).to.equal(false);
            });
        });

        it("should return true if value is false", function() {
            ValidationService.isNotNull(false, function(result) {
                expect(result).to.equal(false);
            });
        });

        it("should return true if value is a blank string", function() {
            ValidationService.isNotNull('', function(result) {
                expect(result).to.equal(false);
            });
        });

        it("should return true if value is an object with no keys", function() {
            ValidationService.isNotNull({}, function(result) {
                expect(result).to.equal(false);
            });
        });

        it("should return true if value is a blank array", function() {
            ValidationService.isNotNull([], function(result) {
                expect(result).to.equal(false);
            });
        });

        it("should return false if value is a non-blank string", function() {
            ValidationService.isNotNull("lol", function(result) {
                expect(result).to.equal(true);
            });
        });

        it("should return false if value is a number", function() {
            ValidationService.isNotNull(123, function(result) {
                expect(result).to.equal(true);
            });
        });

        it("should return false if value is a an object with keys", function() {
            ValidationService.isNotNull({
                lol: "wat"
            }, function(result) {
                expect(result).to.equal(true);
            });
        });

        it("should return false if value is an array with values", function() {
            ValidationService.isNotNull(["wat"], function(result) {
                expect(result).to.equal(true);
            });
        });
    });
});