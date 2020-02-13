const expect = require('chai').expect;
const _ = require('lodash');

const {handleErrors} = require('../../../middleware/error');

describe("Middleware: Error", function() {
    const _user = {
        _id: 1,
        email: "test@test.com.au",
        firstName: "Homer",
        surname: "Simpson"
      };
      const _req = {
        body: {

        }
      };
      const _res = {
        _status: null,
        _message: null,
        status: function(status) {
          this._status = status;
          return this;
        },
        json: function({message}) {
          this._message = message;
          return this;
        }
      };
      const next = () => {
        return 'called next';
      };

      it(`should return status 500 with message 'Oops, something went wrong!' if error is provided with no message or status`, function() {

        const req = _.cloneDeep(_req);
        const res = _.cloneDeep(_res);

        const error = new Error()
        const result = handleErrors(error, req, res, next);

        expect(result._status).to.equal(500);
        expect(result._message).to.equal('Oops, something went wrong!');

      });

      it(`should return status and message if error with status and message is provided`, function() {
        const req = _.cloneDeep(_req);
        const res = _.cloneDeep(_res);
         
        const error = new Error('user not found');
        error.status = 404;

        const result = handleErrors(error, req, res, next);

        expect(result._status).to.equal(404);
        expect(result._message).to.equal("user not found");

      });

      it('should return next if no error is found', function(){

        const req = _.cloneDeep(_req);
        const res = _.cloneDeep(_res);

        const result  = handleErrors(null, req, res, next);
        expect(result).to.equal('called next');

      });

});
