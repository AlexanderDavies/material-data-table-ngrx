const expect = require("chai").expect;
const superTest = require("supertest");
const server = require("../../server");

const app = superTest(server);

describe("Integration: Unknown Route", function() {
  it(`It should return status 404, with message: 'resource does not exist', if no route found`, function(done) {
    app.get("/apples").end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("resource does not exist");
      done();
    });
  });
});
