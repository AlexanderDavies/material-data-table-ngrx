const expect = require("chai").expect;
const _ = require('lodash');

const User = require("../../../models/user");

describe("Model: User", function() {

  const _userdata = {
    email: 'test@test.com',
    firstName: 'Test',
    surname: 'user',
    role: 'User'
  }
  it("should throw an error if email is not provided", function(done) {
    const userData = _.cloneDeep(_userdata);
    delete userData.email;
    const user = new User({userData});

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
