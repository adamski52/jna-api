var ReposService,
    Repos,
    sinon = require("sinon"),
    expect = require("chai").expect;

const name = "My Repo",
      error = {
          error: "oh no"
      };

function create(name) {
    Repos.push(new ReposService.Model({
        name: name
    }));
}

describe("Repos service", function() {
    beforeEach(function() {
        ReposService = require("../../src/repos/repos.service");
        Repos = [];
    });

    afterEach(function() {
        Repos.forEach(function(repo) {
            delete repo;
        });
    });

    describe("model", function() {
        it("should require name", function(done) {
            Repos.push(new ReposService.Model());

            Repos[0].validate(function(err) {
                expect(err.errors.name).to.exist;
                done();
            });
        });

        it("should create", function() {
            create(name);
            expect(Repos[0].name).to.equal(name);
        });

        it("should require name to be a string", function(done) {
            create({
                wut: "lol"
            });

            Repos[0].validate(function(err) {
                expect(err.errors.name).to.exist;
                done();
            });
        });

        it("should require name to be unique", function(done) {
            create(name);
            create(name);

            sinon.stub(ReposService.Model, "count").callsFake(function(props, callback) {
                callback(undefined, 1);
            });

            Repos[1].validate(function (err) {
                expect(err.errors.name).to.exist;
                done();
            });
        });

        it("should set hearts to 1 by default", function() {
            create(name);

            expect(Repos[0].hearts).to.equal(1);
        });

        it("should treat hearts as numeric", function() {
            Repos.push(new ReposService.Model({
                name: name,
                hearts: "wat"
            }));

            Repos[0].validate(function(err) {
                expect(err.errors.hearts).to.exist;
            });
        });
    });

    describe("selecting", function() {
        it("should return the item if found", function(done) {
            create(name);

            var stub = sinon.stub(ReposService.Model, "findOne").callsFake(function(selector, callback) {
                callback(undefined, Repos[0]);
            });

            ReposService.select(name, function(err, result) {
                expect(result).to.equal(Repos[0]);
                done();
            });

            stub.restore();
        });

        it("should return err if the item is not found", function(done) {
            var stub = sinon.stub(ReposService.Model, "findOne").callsFake(function(selector, callback) {
                callback({
                    error: "oh no"
                });
            });

            ReposService.select(name, function(err, result) {
                expect(err).to.deep.equal({
                    error: "oh no"
                });
                done();
            });

            stub.restore();
        });
    });

    describe("liking", function() {
        it("should error if selection errors", function(done) {
            var stub = sinon.stub(ReposService.Model, "findOne").callsFake(function(selector, callback) {
                callback(error);
            });

            ReposService.heart(name, function(err, repo) {
                expect(err).to.deep.equal(error);
                done();
            });

            stub.restore();
        });

        it("should error if creation errors", function(done) {
            var findStub = sinon.stub(ReposService.Model, "findOne").callsFake(function(selector, callback) {
                callback(undefined, undefined);
            });

            var createStub = sinon.stub(ReposService.Model, "create").callsFake(function(model, callback) {
                callback(error);
            });

            ReposService.heart(name, function(err, repo) {
                expect(err).to.deep.equal(error);
                done();
            });

            findStub.restore();
            createStub.restore();
        });

        it("should error if hearting fails", function(done) {
            create(name);

            var saveStub = sinon.stub(Repos[0], "save").callsFake(function(callback) {
                callback(error);
            });

            var findStub = sinon.stub(ReposService.Model, "findOne").callsFake(function(selector, callback) {
                callback(undefined, Repos[0]);
            });

            ReposService.heart(name, function(err, repo) {
                expect(err).to.deep.equal(error);
                done();
            });

            findStub.restore();
            saveStub.restore();
        });

        it("should create if repo does not yet exist", function(done) {
            create(name);

            var findStub = sinon.stub(ReposService.Model, "findOne").callsFake(function(selector, callback) {
                callback(undefined, undefined);
            });

            var createStub = sinon.stub(ReposService.Model, "create").callsFake(function(model, callback) {
                callback(undefined, Repos[0]);
            });

            ReposService.heart(name, function(err, repo) {
                expect(repo).to.deep.equal(Repos[0]);
                done();
            });

            findStub.restore();
            createStub.restore();
        });

        it("should add a heart if repo already exists", function(done) {
            create(name);

            var saveStub = sinon.stub(Repos[0], "save").callsFake(function(callback) {
                callback(undefined);
            });

            var findStub = sinon.stub(ReposService.Model, "findOne").callsFake(function(selector, callback) {
                callback(undefined, Repos[0]);
            });

            ReposService.heart(name, function(err, repo) {
                expect(repo).to.deep.equal(Repos[0]);
                expect(repo.hearts).to.equal(2);
                done();
            });

            findStub.restore();

            saveStub.restore();
        });
    });
});