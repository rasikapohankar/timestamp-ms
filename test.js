var assert  = require('assert'),
    request = require('request'),
    expect  = require('chai').expect;


describe('timestamp microservice', function() {
    it('should return the unix and date format', function(done) {

        var url = 'http://localhost:8081/timestamp/1st%20Jan%202017';

        request(url, function(error, response, body) {
            var parsedBody = JSON.parse(body);
            expect(parsedBody).to.deep.equal({"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});
            done();
        });
    });
});