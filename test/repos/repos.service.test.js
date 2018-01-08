var ReposService,
    Repos,
    sinon = require("sinon"),
    expect = require("chai").expect;

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
            var name = "My Repo";

            Repos.push(new ReposService.Model({
                name: name
            }));

            expect(Repos[0].name).to.equal(name);
        });

        it("should require name to be a string", function(done) {
            var name = {wut: "lol"};

            Repos.push(new ReposService.Model({
                name: name
            }));

            Repos[0].validate(function(err) {
                expect(err.errors.name).to.exist;
                done();
            });
        });

        it.only("should require name to be unique", function(done) {
            var name = "My Repo";

            Repos.push(new ReposService.Model({
                name: name
            }));

            Repos.push(new ReposService.Model({
                name: name
            }));

            Repos[1].validate(function(err) {
                expect(err.errors.name).to.exist;
                done();
            });
        });

        it("should set hearts to 1 by default", function() {
            Repos.push(new ReposService.Model());

            expect(Repos[0].hearts).to.equal(1);
        });

        it("should treat hearts as numeric", function() {
            Repos.push(new ReposService.Model({
                name: "Heart Repo",
                hearts: "wat"
            }));

            Repos[0].validate(function(err) {
                expect(err.errors.hearts).to.exist;
            });
        });
    });
});