var assert = require('assert'),
    http  = require('http');


// function test(url) {
//     var result;

//     http.get(url, function(response) {
//         response.setEncoding('utf8');
        
//         response.on('data', function(data) {
//             console.log("data = " + data);
//             result = data;
//             return result;
//         });
        
//         response.on('error', function(error) {
//             console.log('error');
//             return result;
//         });
//     }).on('error', function(error) {
//         console.log('error');
//         result = error;
//     });
// }


describe('timestamp microservice', function() {
    it('should return the unix and date format', function() {
        superagent
        .get('http://localhost:8081/timestamp/1st%20Jan%202017')
        .end(function(response) {
            console.log(response);            
        });
    });
});

//console.log("return value == " + test('http://localhost:8081/timestamp/1st%20Jan%202017'));

//assert.deepStrictEqual(test('http://localhost:8081/timestamp/-4'), {unix:null, date: null}, 'message');
//assert.deepStrictEqual(test('http://localhost:8081/timestamp/1st%20Jan%202017'), {"unix":1483209000000,"date":"2016-12-31T18:30:00.000Z"}, 'message');
//assert.deepStrictEqual(test('http://localhost:8081/timestamp/v'), {unix:null, date: null}, 'message');