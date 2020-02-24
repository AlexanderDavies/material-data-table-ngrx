const expect = require('chai').expect;

const unknownRouteMiddleware = require('../../../middleware/unknown-route');

describe("Middleware: Unknown Route", function() {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {};
    res = {
      _status: null,
      _body: null,
      status: function(status) {
        this._status = status;
        return this;
      },
      json: function(body) {
        this._body = body;
        return this;
      }
    };
    next = data => {
      return data;
    };
  
  })
 
  it(`should return status 404 with message 'resource does not exist'`, () => {

    unknownRouteMiddleware.handleUnknownRoute(req, res, next);

    expect(res._status).to.equal(404);
    expect(res._body.message).to.equal('resource does not exist');

  });
});