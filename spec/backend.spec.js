var request = require("request");
var backend = require("../app.js");
var base_url = "http://localhost:8080/sudoku/board";
var testVal = [0,1,2,3,4,5,6,7,8];

describe("Sudoku API Exists", function() {
    describe("GET /sudoku/board", function() {
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("Test horizontal rule", function(done) {
            request.get(base_url, function(error, response, body) {

                var t = JSON.parse(body);

                var line = [];

                for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++) {
                        line.push(t[j + (i * 9)]);
                    }
                    expect(line.sort().join() == testVal).toBeTruthy();
                    line = [];
                }

                done();
            });
        });

        it("Test vertical rule", function(done) {
            request.get(base_url, function(error, response, body) {

                var t = JSON.parse(body);

                var line = [];

                for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++) {
                        line.push(t[i + (j * 9)]);
                    }
                    expect(line.sort().join() == testVal).toBeTruthy();
                    line = [];
                }
                backend.closeServer();
                done();
            });
        });
    });
});
