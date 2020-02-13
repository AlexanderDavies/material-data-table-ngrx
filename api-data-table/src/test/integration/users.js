const expect = require("chai").expect;
const superTest = require("supertest");
const _ = require("lodash");

const User = require("../../models/user");
const server = require("../../server");

describe("Integration: User Routes", function() {
  //create a user that we can clean up at the end
  const app = superTest(server);
  let userData = {
    email: "test@test.com.au",
    firstName: "Test",
    surname: "User",
    role: "Tester"
  };

  beforeEach(async () => {
    await User.findOneAndDelete({ email: userData.email });
  });

  afterEach(async () => {
    await User.findOneAndDelete({ email: userData.email });
  });

  describe("Create User Route", function() {
    it("should return created user", function(done) {
      app
        .post("/user")
        .send(userData)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.user.email).to.equal(userData.email);
          expect(res.body.user.firstName).to.equal(userData.firstName);
          expect(res.body.user.surname).to.equal(userData.surname);
          expect(res.body.user.role).to.equal(userData.role);
          expect(res.body.message).to.equal("user created");
          done();
        });
    });

    it("should return an error if the email already exists", async function() {
      const user = new User(userData);
      await user.save();

      const res = await app.post("/user").send(userData);

      expect(res.status).to.equal(422);
      expect(res.body.message).to.equal("user already exists: email");
    });

    it("should return an error if the email is not provided", async function() {
      const user = _.cloneDeep(userData);
      delete user.email;

      const res = await app.post("/user").send(user);

      expect(res.status).to.equal(422);
      expect(res.body.message).to.equal("Invalid value: email");
    });

    it("should return an error if the firstName is not provided", async function() {
      const user = _.cloneDeep(userData);
      delete user.firstName;

      const res = await app.post("/user").send(user);

      expect(res.status).to.equal(422);
      expect(res.body.message).to.equal("Invalid value: firstName");
    });

    it("should return an error if the surname is not provided", async function() {
      const user = _.cloneDeep(userData);
      delete user.surname;

      const res = await app.post("/user").send(user);

      expect(res.status).to.equal(422);
      expect(res.body.message).to.equal("Invalid value: surname");
    });
  });

  describe("Get User Route", function() {
    it("should return an array of users", function(done) {
      app
        .get("/user")
        .query({
          sortColumn: "email",
          sortDirection: "asc",
          filter: "",
          pageSize: "",
          pageIndex: ""
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.users).to.be.an("array");
          expect(res.body.userCount).to.be.above(10);
          done();
        });
    });

    it("should return an array of users", function(done) {
      app
        .get("/user")
        .query({
          sortColumn: "email",
          sortDirection: "asc",
          filter: "",
          pageSize: 2,
          pageIndex: 1
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.users).to.be.an("array");
          expect(res.body.users).to.have.lengthOf(2);
          expect(res.body.userCount).to.be.above(10);
          done();
        });
    });

    it("should return one users based on filter criteria", function(done) {
      app
      .get("/user")
      .query({
        sortColumn: "email",
        sortDirection: "asc",
        filter: "homer",
        pageSize: 2,
        pageIndex: 1
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body.users).to.be.an("array");
        expect(res.body.users).to.have.lengthOf(1);
        expect(res.body.userCount).to.be.above(10);
        done();
      });

    });

    it("should return an error if sortDirection is not provided", function(done) {
      app
      .get("/user")
      .query({
        sortColumn: "email",
        filter: "",
        pageSize: 2,
        pageIndex: 1
      })
      .end((err, res) => {
          if(err) {
            done(err);
          }
          expect(res.body.message).to.equal('Invalid value: sortDirection');
          done();
      });
    });

    it("should return an error if sortColumn Direction is not provided", function(done) {
      app
      .get("/user")
      .query({
        filter: "",
        sortDirection: "asc",
        pageSize: 2,
        pageIndex: 1
      })
      .end((err, res) => {
          if(err) {
            done(err);
          }
          expect(res.body.message).to.equal('Invalid value: sortColumn');
          done();
      });
    });

    it("should return an error if filter is not provided", function(done) {
      app
      .get("/user")
      .query({
        sortColumn: "email",
        sortDirection: 'asc',
        pageSize: 2,
        pageIndex: 1
      })
      .end((err, res) => {
          if(err) {
            done(err);
          }
          expect(res.body.message).to.equal('Invalid value: filter');
          done();
      });
    });

    it("should return an error if pageSize is not provided", function(done) {
      app
      .get("/user")
      .query({
        sortColumn: "email",
        sortDirection: "asc",
        filter: "",
        pageIndex: 1
      })
      .end((err, res) => {
          if(err) {
            done(err);
          }
          expect(res.body.message).to.equal('Invalid value: pageSize');
          done();
      });
    });

    it("should return an error if pageIndex is not provided", function(done) {
      app
      .get("/user")
      .query({
        sortColumn: "email",
        sortDirection: 'asc',
        filter: "",
        pageSize: 2
      })
      .end((err, res) => {
          if(err) {
            done(err);
          }
          expect(res.body.message).to.equal('Invalid value: pageIndex');
          done();
      });
    });
  });
});
