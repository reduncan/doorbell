const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const db = require('./models');
const expect = chai.expect;

// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

  // set a variable for making http requests.
let request;

describe('', function() {
    // clear the test db 
    beforeEach(function () {
        request = chai.request(server);
        return db.sequelize.sync({ force: true });
  });
})