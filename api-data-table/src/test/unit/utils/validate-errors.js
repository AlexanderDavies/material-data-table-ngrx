const expect = require("chai").expect;
const sinon = require("sinon");
const validator = require("express-validator");

const { validateErrors } = require("../../../utils/validate-errors");

describe("Util: Validate Errors", function() {
  let validatorStub;

  beforeEach(() => {
    validatorStub = sinon.stub(validator, "validationResult");
  });

  afterEach(() => {
    validatorStub.restore();
  });

  it("should throw an error if errors object is not null", function() {
    try {
      const returnedErrors = {
        array: () => ["invalid email"],
        isEmpty: () => false
      };
      validatorStub.returns(returnedErrors);

      validateErrors({}, {}, () => {});
    } catch (err) {
      expect(err.status).to.equal(422);
      expect(err.message).to.equal("invalid email");
    }
  });

  it("should return true if no errors are found", function() {
    const returnedErrors = {
      array: () => [],
      isEmpty: () => true
    };
    validatorStub.returns(returnedErrors);

    expect(validateErrors({}, {}, () => {})).to.be.true;
  });
});
