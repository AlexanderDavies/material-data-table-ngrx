const expect = require("chai").expect;
const { stub } = require("sinon");
const _ = require("lodash");

const User = require("../../../models/user");

const userService = require("../../../services/user");

describe("Service: User", function() {
  let findUserStub;
  let findOneUserStub;
  let saveUserStub;
  let countUsersStub;
  const _user = {
    _id: "1234",
    email: "test@test.com",
    firstName: "Test",
    surname: "User",
    role: "General"
  };

  beforeEach(() => {
    findUsersStub = stub(User, "find");
    findOneUserStub = findOneUserStub = stub(User, "findOne");
    saveUserStub = stub(User.prototype, "save");
    countUsersStub = stub(User, "countDocuments");
  });

  afterEach(() => {
    findUsersStub.restore();
    findOneUserStub.restore();
    saveUserStub.restore();
    countUsersStub.restore();
  });

  describe("Create User", function() {
    it("should return the user if user was saved to the DB", async function() {
      const user = _.cloneDeep(_user);

      saveUserStub.resolves(user);

      const result = await userService.createUser({
        email: user.email,
        firstName: user.firstName,
        surname: user.surname,
        role: user.role
      });

      expect(result).to.deep.equal(user);
    });

    it("should throw an error if unable to save user", async function() {
      try {
        const user = _.cloneDeep(_user);

        saveUserStub.rejects(new Error("unable to save user"));

        await userService.createUser({
          email: user.email,
          firstName: user.firstName,
          surname: user.surname,
          role: user.role
        });
      } catch (err) {
        expect(err.message).to.equal("unable to save user");
      }
    });
  });

  describe("Get Users", async function() {
    it("should return users even if empty object is passed", async function() {
      const user = _.cloneDeep(_user);
      findUsersStub.resolves([user]);

      const result = await userService.getUsers({});

      expect(result).to.deep.equal([user]);
    });

    it("should return an empty array if no users found", async function() {
      findUsersStub.resolves([]);

      const result = await userService.getUsers({});

      expect(result).to.deep.equal([]);
    });

    it("should throw an error if error in fetching users from DB", async function() {
      try {
        findUsersStub.rejects(new Error("db error"));

        await userService.getUsers({});
      } catch (err) {
        expect(err.message).to.equal('db error');
      }
    });
  });

  describe("Get User Count", async function() {
    it("should return the user count if users is greater than one", async function() {
      countUsersStub.resolves(1);

      const result = await userService.getUserCount();

      expect(result).to.equal(1);
    });

    it("should throw an error if error fetching user count from the DB", async function() {
      try {
        countUsersStub.rejects(new Error("db error"));

        await userService.getUserCount();
      
      } catch (err) {
        expect(err.message).to.equal('db error');
      }
    });
  });
  describe("Get User", async function() {
    it("should return the user", async function() {
      const user = _.clone(_user);
      findOneUserStub.resolves(user);

      const result = await userService.getUser(user.email);

      expect(result).to.deep.equal(user);
    });

    it("should throw an error if error fetching the user from the db", async function() {
      try {
        const user = _.clone(_user);
        findOneUserStub.rejects(new Error("db error"));

        await userService.getUser(user.email);

      } catch(err) {
        expect(err.message).to.equal("db error");
      }
    });
  });
});
