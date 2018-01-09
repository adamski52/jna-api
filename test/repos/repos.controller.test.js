var ReposController,
    ReposService,
    ResponseService,
    sinon = require("sinon"),
    expect = require("chai").expect;

describe("repos controller", function() {
    beforeEach(function() {
        ResponseService = require("../../src/services/response.service");
        ReposService = require("../../src/repos/repos.service");
        ReposController = require("../../src/repos/repos.controller");
    });

    describe("posting", function() {
        it("should call the service's heart method", function() {
            var repoName = "My Repo",
                repo = {
                    repoName: repoName,
                    hearts: 100
                },
                response = {
                    status: 123,
                    data: repo
                };

            var buildResponseStub = sinon.stub(ResponseService, "buildResponse").callsFake(function(err, result, callback) {
                callback(response);
            });

            var heartStub = sinon.stub(ReposService, "heart").callsFake(function(repoName, callback) {
                callback(undefined, repo);
            });

            var req = {
                params: {
                    repoName: repoName
                }
            };

            var jsonSpy = sinon.spy(),
                statusSpy = sinon.stub().callsFake(function() {
                    return {
                        json: jsonSpy
                    };
                });

            var res = {
                status: statusSpy
            };

            ReposController.post(req, res);

            expect(ReposService.heart).to.have.been.calledWith(repoName);
            expect(ResponseService.buildResponse).to.have.been.calledWith(undefined, repo);
            expect(statusSpy).to.have.been.calledWith(response.status);
            expect(jsonSpy).to.have.been.calledWith(response);

            buildResponseStub.restore();
            heartStub.restore();
        });
    });
});