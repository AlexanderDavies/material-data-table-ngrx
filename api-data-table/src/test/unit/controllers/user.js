const expect = require("chai").expect
const sinon = require("sinon");
const _ = require('lodash');

const userService = require("../../../services/user");
const userController = require("../../../controllers/user");
const validateErrorsUtil = require("../../../utils/validate-errors");

describe("Controllers: User", function() {
  let createUserStub;
  let getUsersStub;
  let getUserCountStub;
  const _user = {
    _id: 1,
    email: "test@test.com.au",
    firstName: "Homer",
    surname: "Simpson"
  };
  const _req = {
    body: {
      user: _user
    }
  };
  const _res = {
    _status: null,
    _user: null,
    _message: null,
    status: function(status) {
      this._status = status;
      return this;
    },
    json: function({ message, user, }) {
      this._message = message;
      this._user = user;
      return this;
    }
  };
  const next = err => {
    throw err;
  };

  beforeEach(() => {
    createUserStub = sinon.stub(userService, "createUser");
    getUsersStub = sinon.stub(userService, "getUsers");
    getUserCountStub = sinon.stub(userService, "getUserCount");
    validateErrorsStub = sinon.stub(validateErrorsUtil, "validateErrors");
  });

  afterEach(() => {
    createUserStub.restore();
    getUsersStub.restore();
    getUserCountStub.restore();
    validateErrorsStub.restore();
  });

  describe("Create User Controller", function() {
    it("Should return status 200, user object and message 'user created'", async function() {
      const req = _.cloneDeep(_req);
      const res = _.cloneDeep(_res);

      createUserStub.resolves(_user);
      validateErrorsStub.returns(true);

      const result = await userController.createUser(req, res, next);
      expect(result._status).to.equal(200);
      expect(result._user).to.equal(_user);
      expect(result._message).to.equal("user created");
    });

    it("should return an error if middleware identified errors", async function() {
      try {
        const req = _.cloneDeep(_req);
        const res = _.cloneDeep(_res);

        validateErrorsStub.throws(new Error("user not found"));
        await userController.createUser(req, res, next)
      } catch (err) {
        expect(err.message).to.equal("user not found");
      }
    });

    it("should return an error if user was unable to be created", async function() {
      try {
        const req = _.cloneDeep(_req);
        const res = _.cloneDeep(_res);

        createUserStub.throws(new Error('unable to create user'));
        await userController.createUser(req, res, next);

      } catch (err) {
        expect(err.message).to.equal('unable to create user')
      }
    });
  });

  describe('Get Users Controller', function() {

    it('should return the users in an array and the user count', async function(){
      const req = _.cloneDeep(_req);
      const res = {
        _status: null,
        _users: null,
        _userCount: null,
        status: function(status) {
          this._status = status;
          return this;
        },
        json: function({ users, userCount}) {
          this._users = users;
          this._userCount = userCount;
          return this;
        }
      };

      req['query'] = {}

      getUsersStub.returns([_user]);
      getUserCountStub.returns(1);

      const result = await userController.getUsers(req, res, next);

      expect(result._status).to.equal(200);
      expect(result._users).to.deep.equal([_user]);
      expect(result._userCount).to.equal(1);

    });
  });
});
