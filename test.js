const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const db = require('./models');
//const sinon = require('sinon');
const expect = chai.expect;

// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

  // set a variable for making http requests.
let request;



describe('GET /api/visitors', function() {
  // clear the test db 

  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  afterEach(function() {
  })

  
  //data = { first_name: 'Robert', last_name: 'Duncan', image_url: 'image.jpg'};

  it('should get all visitors info', function() {
      db.Visitor.create({
        first_name: 'Robert', last_name: 'Duncan', image_url: 'image.jpg'
      }).then(function() {
      //hit the GET('/api/users') endpoint
      request.get('/api/visitors').end(function (err, res) {
        //Save the response
        let responseStatus = res.status;
        let responseBody = res.body;


        //Write test expectations
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('object')
          .that.includes({first_name: 'Robert', last_name: 'Duncan', image_url: 'image.jpg'});
        done();
      });
    });
  });
});

describe('GET /api/owner', function() {
  // clear the test db 

  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  afterEach(function() {
  })

  
  //data = { first_name: 'Robert', last_name: 'Duncan', image_url: 'image.jpg'};

  it('should get all owners info', function() {
      db.Owner.create({
        first_name: 'Weston', last_name: 'Dease', phone_number: '(404)863-4232'
      }).then(function() {
      //hit the GET('/api/users') endpoint
      request.get('/api/owner').end(function (err, res) {
        //Save the response
        let responseStatus = res.status;
        let responseBody = res.body;


        //Write test expectations
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('object')
          .that.includes({first_name: 'Weston', last_name: 'Dease', phone_number: '(404)863-4232'});
        done();
      });
    });
  });
});