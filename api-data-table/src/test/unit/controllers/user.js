const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();

const userService = require('../../../services/user');
const userController = require('../../../controllers/user');
const validateErrorsUtil = require('../../../utils/validate-errors');

describe('Controllers: User', function() {
  let createUserStub;
  let getUsersStub;
  let getUserCountStub;
  let user;
  let req;
  let res;
  let next;

  beforeEach(() => {
    createUserStub = sandbox.stub(userService, 'createUser');
    getUsersStub = sandbox.stub(userService, 'getUsers');
    getUserCountStub = sandbox.stub(userService, 'getUserCount');
    validateErrorsStub = sandbox.stub(validateErrorsUtil, 'validateErrors');
    user = {
      _id: 1,
      email: 'test@test.com.au',
      firstName: 'Homer',
      surname: 'Simpson'
    };
    req = {
      body: {
        user: user
      }
    };
    res = {
      _status: null,
      _user: null,
      _message: null,
      status: function(status) {
        this._status = status;
        return this;
      },
      json: function({ message, user }) {
        this._message = message;
        this._user = user;
        return this;
      }
    };
    next = err => {
      throw err;
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Create User Controller', function() {
    it("should return status 200, user object and message 'user created'", async () => {
      createUserStub.resolves(user);
      validateErrorsStub.returns(true);

      const result = await userController.createUser(req, res, next);
      expect(result._status).to.equal(200);
      expect(result._user).to.equal(user);
      expect(result._message).to.equal('user created');
    });

    it('should return an error if middleware identified errors', done => {
      validateErrorsStub.callsFake(() => {
        throw new Error('user already exists');
      });
      userController.createUser(req, res, next).catch(err => {
        expect(err.message).to.equal('user already exists');
        done();
      });
    });

    it('should return an error if user was unable to be created', done => {
      createUserStub.throws(new Error('unable to create user'));
      userController.createUser(req, res, next).catch(err => {
        expect(err.message).to.equal('unable to create user');
        done();
      });
    });

    describe('Get Users Controller', function() {
      beforeEach(() => {
        res = {
          _status: null,
          _users: null,
          _userCount: null,
          status: function(status) {
            this._status = status;
            return this;
          },
          json: function({ users, userCount }) {
            this._users = users;
            this._userCount = userCount;
            return this;
          }
        };
        req['query'] = {};
      });

      it('should return the users in an array and the user count', async () => {
        getUsersStub.returns([user]);
        getUserCountStub.returns(1);

        const result = await userController.getUsers(req, res, next);

        expect(result._status).to.equal(200);
        expect(result._users).to.deep.equal([user]);
        expect(result._userCount).to.equal(1);
      });
    });
  });
});
