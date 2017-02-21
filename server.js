var express = require('express'),
    moment  = require('moment'),
    parseFormat = require('moment-parseformat');



function test(ip) {
    var format = parseFormat(ip);
    console.log(format + '-->' + moment(ip, format).isValid());
}


test('January 1st, 2016');
test('January 32nd, 2016');
test('January 31st, 2016');
test('1st January, 2016');

var app = express();

app.get('/timestamp/:input', function(request, response) {

    var input = request.params.input,
        output = {unix: null, date: null};

    if(isUnixTimestamp(input)) {
        output.unix = input;
    } else if(isDate(input)) {
        output.unix = toUnixTimestamp(input);
    }

    output.date = toDate(input);
    response.json(output);
});


function isUnixTimestamp(input) {
    return !isNaN(input) && parseInt(Number(input)) == input;
}

function isDate(input) {
    return moment(input).isValid();
}

function toUnixTimeStamp(input) {
    return new Date(input).getTime();
}

function toDate(input) {
    return new Date(Number(input)).toDateString();
}

app.listen(8081, function() {
    console.log('Listening on port 8081..');
});
