const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const db = require('./models');
const expect = chai.expect;

// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

// set a variable for making http requests.
let request;

describe('receiver', function() {
    it('should return true when receiving auth text', function() {
        expect(receiver()).to.equal(true);
    });
});

describe('servo turner', function() {
    it('should return the angle of servo turn', function() {
        expect(turner()).to.equal();
    });
});