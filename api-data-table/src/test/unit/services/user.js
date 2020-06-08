const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();

const User = require('../../../models/user');
const userService = require('../../../services/user');

describe('Service: User', function () {
  let findUsersStub;
  let findOneUserStub;
  let saveUserStub;
  let countUsersStub;
  let user;

  beforeEach(() => {
    findUsersStub = sandbox.stub(User, 'find');
    findOneUserStub = findOneUserStub = sandbox.stub(User, 'findOne');
    saveUserStub = sandbox.stub(User.prototype, 'save');
    countUsersStub = sandbox.stub(User, 'countDocuments');
    user = {
      _id: '1234',
      email: 'test@test.com',
      firstName: 'Test',
      surname: 'User',
      role: 'General'
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Create User', function () {
    it('should return the user if user was saved to the DB', async () => {
      saveUserStub.resolves(user);

      const result = await userService.createUser({
        email: user.email,
        firstName: user.firstName,
        surname: user.surname,
        role: user.role
      });

      expect(result).to.deep.equal(user);
    });

    it('should throw an error if unable to save user', done => {
      saveUserStub.rejects(new Error('unable to save user'));

      userService
        .createUser({
          email: user.email,
          firstName: user.firstName,
          surname: user.surname,
          role: user.role
        })
        .catch(err => {
          expect(err.message).to.equal('unable to save user');
          done();
        });
    });
  });

  describe('Get Users', async function () {
    it('should return users even if empty object is passed', async () => {
      findUsersStub.resolves([user]);

      const result = await userService.getUsers({});

      expect(result).to.deep.equal([user]);
    });

    it('should return an empty array if no users found', async () => {
      findUsersStub.resolves([]);

      const result = await userService.getUsers({});

      expect(result).to.deep.equal([]);
    });

    it('should throw an error if error in fetching users from DB', done => {
      findUsersStub.rejects(new Error('db error'));

      userService.getUsers({}).catch(err => {
        expect(err.message).to.equal('db error');
        done();
      });
    });
  });

  describe('Get User Count', () => {
    it('should return the user count if users is greater than one', async () => {
      countUsersStub.resolves(1);

      const result = await userService.getUserCount();

      expect(result).to.equal(1);
    });

    it('should throw an error if error fetching user count from the DB', done => {
      countUsersStub.rejects(new Error('db error'));

      userService.getUserCount().catch(err => {
        expect(err.message).to.equal('db error');
        done();
      });
    });
  });

  describe('Get User', () => {
    it('should return the user', async () => {
      findOneUserStub.resolves(user);

      const result = await userService.getUser(user.email);

      expect(result).to.deep.equal(user);
    });

    it('should throw an error if error fetching the user from the db', done => {
      findOneUserStub.rejects(new Error('db error'));

      userService.getUser(user.email).catch(err => {
        expect(err.message).to.equal('db error');
        done();
      });
    });
  });
});
