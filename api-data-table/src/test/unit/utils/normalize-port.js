const expect = require("chai").expect;

const { normalizePort } = require("../../../utils/normalize-port");

describe("Util: normalize-port", function() {
  it("should return false if not a number", function() {
    expect(normalizePort("false")).to.equal("false");
    expect(normalizePort(false)).to.be.false;
  });

  it("should return false if the port is a negative number", function() {
    expect(normalizePort(-1)).to.be.false;
  });

  it("should return the port if the port can be cast to a positive integer", function() {
    expect(normalizePort("3000")).to.equal(3000);
    expect(normalizePort(3000)).to.equal(3000);
  });
});
