var assert  = require('assert'),
    http    = require('http'),
    request = require('request'),
    expect  = require('chai').expect;

describe('timestamp microservice', function() {
    it('should return the unix and date format', function(done) {

        http.get('http://localhost:8081/timestamp/1st%20Jan%202017', function(response) {
            response.setEncoding('utf8');
            response.on('data', function(data) {
                assert.deepStrictEqual(JSON.parse(data), {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"}, "test seems to have failed");
                done();
            });
        }).on('error', function(error) {
            console.log('error');
        });
    });
});