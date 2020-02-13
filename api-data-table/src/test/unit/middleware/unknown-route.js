const expect = require('chai').expect;
const _ = require("lodash");

const unknownRouteMiddleware = require('../../../middleware/unknown-route');

describe("Middleware: Unknown Route", function() {
  const _req = {};
  const _res = {
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
  const _next = data => {
    return data;
  };

  it(`should return status 404 with message 'resource does not exist'`, function(){
    const req = _.cloneDeep(_req);
    const res = _.cloneDeep(_res);
    const next = _.cloneDeep(_next);

    unknownRouteMiddleware.handleUnknownRoute(req, res, next);

    expect(res._status).to.equal(404);
    expect(res._body.message).to.equal('resource does not exist');

  });
});