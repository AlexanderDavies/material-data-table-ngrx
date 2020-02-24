expect = require('chai').expect;

const { handleErrors } = require('../../../middleware/error');

describe('Middleware: Error', function() {
  let user;
  let req;
  let res;
  let next;

  beforeEach(() => {
    user = {
      _id: 1,
      email: 'test@test.com.au',
      firstName: 'Homer',
      surname: 'Simpson'
    };
    req = {
      body: {}
    };
    res = {
      _status: null,
      _message: null,
      status: function(status) {
        this._status = status;
        return this;
      },
      json: function({ message }) {
        this._message = message;
        return this;
      }
    };
    next = () => {
      return 'called next';
    };
  });

  it(`should return status 500 with message 'Oops, something went wrong!' if error is provided with no message or status`, () => {
    error = new Error();
    result = handleErrors(error, req, res, next);

    expect(result._status).to.equal(500);
    expect(result._message).to.equal('Oops, something went wrong!');
  });

  it(`should return status and message if error with status and message is provided`, () => {
    error = new Error('user not found');
    error.status = 404;

    result = handleErrors(error, req, res, next);

    expect(result._status).to.equal(404);
    expect(result._message).to.equal('user not found');
  });

  it('should return next if no error is found', () => {
    result = handleErrors(null, req, res, next);
    expect(result).to.equal('called next');
  });
});
