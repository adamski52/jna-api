var ReposController,
    ReposService,
    ResponseService,
    sinon = require("sinon"),
    expect = require("chai").expect,
    stubs,
    repo,
    req,
    response,
    repoName,
    jsonSpy,
    statusSpy,
    error,
    res;

describe("repos controller", function() {
    beforeEach(function() {
        repoName = "My Repo";

        stubs = {};

        repo = {
            repoName: repoName,
            hearts: 100
        };

        response = {
            status: 200,
            data: repo
        };

        req = {
            params: {
                repoName: repoName
            }
        };

        error = {
            error: "oh no"
        };

        jsonSpy = sinon.spy();

        statusSpy = sinon.stub().callsFake(function() {
            return {
                json: jsonSpy
            };
        });

        res = {
            status: statusSpy
        };

        ResponseService = require("../../src/services/response.service");
        ReposService = require("../../src/repos/repos.service");
        ReposController = require("../../src/repos/repos.controller");

        stubs.buildResponse = sinon.stub(ResponseService, "buildResponse").callsFake(function(err, result, callback) {
            callback(response);
        });

        stubs.heart = sinon.stub(ReposService, "heart").callsFake(function(repoName, callback) {
            callback(error, repo);
        });

        stubs.select = sinon.stub(ReposService, "select").callsFake(function(repoName, callback) {
            callback(error, repo);
        });
    });

    afterEach(function() {
        Object.keys(stubs).forEach(function(stub) {
            stubs[stub].restore();
        });
    });

    describe("posting", function() {
        it("should call the service's heart method", function() {
            ReposController.post(req, res);

            expect(ReposService.heart).to.have.been.calledWith(repoName);
        });

        it("should call the the build response handler with the result", function() {
            error = undefined;

            ReposController.post(req, res);

            expect(ResponseService.buildResponse).to.have.been.calledWith(undefined, repo);
        });

        it("should call the the build response handler with the error", function() {
            repo = undefined;

            ReposController.post(req, res);

            expect(ResponseService.buildResponse).to.have.been.calledWith(error, undefined);
        });

        it("should send the response the repo's status/payload", function() {
            error = undefined;

            ReposController.post(req, res);

            expect(statusSpy).to.have.been.calledWith(response.status);
            expect(jsonSpy).to.have.been.calledWith(response);
        });

        it("should send the response the error's status/payload", function() {
            repo = undefined;
            response = {
                status: 500,
                error: error
            };

            ReposController.post(req, res);

            expect(statusSpy).to.have.been.calledWith(response.status);
            expect(jsonSpy).to.have.been.calledWith(response);
        });
    });

    describe("selecting", function() {
        it("should call the service's select method", function() {
            ReposController.get(req, res);

            expect(ReposService.select).to.have.been.calledWith(repoName);
        });

        it("should call the the build response handler with the result", function() {
            error = undefined;

            ReposController.get(req, res);

            expect(ResponseService.buildResponse).to.have.been.calledWith(undefined, repo);
        });

        it("should call the the build response handler with the error", function() {
            repo = undefined;

            ReposController.get(req, res);

            expect(ResponseService.buildResponse).to.have.been.calledWith(error, undefined);
        });

        it("should send the response the repo's status/payload", function() {
            error = undefined;

            ReposController.get(req, res);

            expect(statusSpy).to.have.been.calledWith(response.status);
            expect(jsonSpy).to.have.been.calledWith(response);
        });

        it("should send the response the error's status/payload", function() {
            repo = undefined;
            response = {
                status: 500,
                error: error
            };

            ReposController.get(req, res);

            expect(statusSpy).to.have.been.calledWith(response.status);
            expect(jsonSpy).to.have.been.calledWith(response);
        });
    });

});