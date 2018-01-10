var sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect,
    ResponseService = require("../../src/services/response.service");

describe("response service", function() {
    it("should return 500 if err is supplied", function() {
        var err = {
            error: "oh no"
        };

        ResponseService.buildResponse(err, undefined, function(result) {
            expect(result).to.deep.equal({
                status: 500,
                data: err
            });
        });
    });

    it("should return 404 if no error but result is undefined", function() {
        ResponseService.buildResponse(undefined, undefined, function(result) {
            expect(result).to.deep.equal({
                status: 404
            });
        });
    });

    it("should return 200 with data if the result is undefined", function() {
        var value = {
            great: "success"
        };

        ResponseService.buildResponse(undefined, value, function(result) {
            expect(result).to.deep.equal({
                status: 200,
                data: value
            });
        });
    });
});