const expect = require("chai").expect;

const User = require("../../../models/user");

describe("Model: User", function() {
  it("should throw an error if email is not provided", function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it("should throw an error if firstName is not provided", function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.firstName).to.exist;
      done();
    });
  });

  it("should throw an error if surname is not provided", function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.surname).to.exist;
      done();
    });
  });

  it("should throw an error if role is not provided", function(done) {
    const user = new User();

    user.validate(function(err) {
      expect(err.errors.role).to.exist;
      done();
    });
  });
});
