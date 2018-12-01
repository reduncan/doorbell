const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const db = require('./models');
const expect = chai.expect;

// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

// set a variable for making http requests.
let request;

describe('GET/routes', function () {
  // clear the test db 
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should get all authenticated users', function () {
    db.User.bulkCreate([
      { username: 'Sally', password: 'test' },
      { username: 'Lane', password: 'sample' }
    ])
      .then(function () {

        //hit the GET('/api/users') endpoint
        request.get('/api/users').end(function (err, res) {
          //Save the response
          let responseStatus = res.status;
          let responseBody = res.body;


          //Write test expectations
          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an('array')
            .that.has.lengthOf(2);

          expect(responseBody[0])
            .to.be.an('object')
            .that.includes({ username: 'Sally', password: 'test' });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({ username: 'Lane', password: 'sample' });
        done();
      });
    });
  });
});

describe('GET /api/owner', function() {

  this.beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should find all examples', function() {
    db.Owner.bulkCreate([
      { first_name: 'Robert', last_name: 'Duncan', phone_number: '7067615273' },
      { first_name: 'Casey', last_name: 'Hampton', phone_number: '9048604457' }
    ]).then(function () {

      request.get('/api/owner').end(function (err, res) {
        let responseStatus = res.status;
        let responseBody = res.body;

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('array').that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an('object').that.includes({ first_name: 'Robert', last_name: 'Duncan', phone_number: '7067615273' });

          expect(responseBody[1])
          .to.be.an('object').that.includes({ first_name: 'Casey', last_name: 'Hampton', phone_number: '9048604457' });
      });
    });
  });
});
