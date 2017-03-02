var assert  = require('assert'),
    request = require('request'),
    expect  = require('chai').expect,
    url     = 'http://localhost:8081/timestamp/';


describe('timestamp microservice', function() {

    it('should return 200 OK', function(done) {
        var reqUrl = url + '1st%20Jan%202017';
        request(reqUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    var expectation = 'should support ';
    //should support
    testcase(expectation, 'Do MMM YYYY', '1st Jan 2017', {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});
    testcase(expectation, 'Do MMMM YYYY', '1st January 2017', {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});
    testcase(expectation, 'Do MMM, YYYY', '1st Jan, 2017', {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});
    testcase(expectation, 'Do MMMM, YYYY', '1st January, 2017', {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});
    testcase(expectation, 'MMMM Do, YYYY', 'January 1st, 2017', {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});
    testcase(expectation, 'MMM Do, YYYY', 'Jan 1st, 2017', {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});
    testcase(expectation, 'DD-MM-YYYY', '01-01-2017', {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});
    testcase(expectation, 'DD/MM/YYYY', '01/01/2017', {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"});


    expectation = 'should not support ';
    //should not support
    testcase(expectation, 'Do MMM DDD', '1st Jan 202', {"unix":null,"date":null});

});

function testcase(expectation, format, input, expected) {
    it(expectation + format, function(done) {
        var reqUrl = url + encodeURIComponent(input);
        makeRequest(reqUrl, expected, done);
    });
}


function makeRequest(reqUrl, expected, done) {
    request(reqUrl, function(error, response, body) {
        var parsedBody = JSON.parse(body);
        expect(parsedBody).to.deep.equal(expected);
        done();
    });
}