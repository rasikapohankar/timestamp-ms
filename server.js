var express     = require('express'),
    moment      = require('moment'),
    parseFormat = require('moment-parseformat'),
    port = process.argv[2];

var app = express();

app.get('/timestamp/:input', function(request, response) {

    var input = request.params.input,
        output = {unix: null, date: null};

    if(isUnixTimestamp(input)) {
        output.unix = input;
        input = Number(input);
    } else if(isDate(input)) {
        output.unix = toUnixTimestamp(input);
    }

    output.date = toDate(input);
    response.json(output);
});


function isUnixTimestamp(input) {
    return !isNaN(input) && parseInt(Number(input)) == input && input >= 0;
}

function isDate(input) {
    if(Number(input) < 0) {
        return false;
    }
    return moment(input, parseFormat(input)).isValid();
}

function toUnixTimestamp(input) {
    return moment(input, parseFormat(input)).valueOf();
}

function toDate(input) {
    if(isDate(input)) {
        return moment(input, parseFormat(input)).toDate();
    }
    return null;
}

app.listen(port);