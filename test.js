const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const db = require('./models');
const expect = chai.expect;

// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

  // set a variable for making http requests.
let request;



describe('GET api/visitors', function() {
  // clear the test db 
  beforeEach(function () {
    request = chai.request(server);
    server = sinon.fakeServer.create();
    return db.sequelize.sync({ force: true });
  });

  afterEach(function() {
    server.restore();
  })

  
  data = { first_name: 'Robert', last_name: 'Duncan', image_url: 'image.jpg'};

  it('should get all authenticated users', function() {
    server.respondWith('GET', 'api/visitors', [
      200, { 'Content-Type': 'application/json' }, JSON.stringify(data)
    ])
    .then(function () {

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