var sinon = require("sinon"),
    chai = require("chai"),
    express = require("express"),
    expect = chai.expect,
    request = require("supertest"),
    router,
    app,
    ReposController = require("../../src/repos/repos.controller"),
    getStub,
    postStub;


describe("repo routes", function() {
    before(function() {
        getStub = sinon.stub(ReposController, "get").callsFake(function(req, res) {
            res.send("kthx");
        });

        postStub = sinon.stub(ReposController, "post").callsFake(function(req, res) {
            res.send("kthx");
        });

        router = require("../../src/router");

        app = express();
        app.use("/api", router);
    });

    after(function() {
        getStub.restore();
        postStub.restore();
    });

    it("should have a GET route", function() {
        request(app).get('/api/repos/lol').end(function(err, res) {
            expect(ReposController.get).to.have.been.called;
        });
    });

    it("should have a POST route", function() {
        request(app).post('/api/repos/lol').end(function(err, res) {
            expect(ReposController.post).to.have.been.called;
        });
    });
});