var express     = require('express'),
    moment      = require('moment'),
    parseFormat = require('moment-parseformat');

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
    if(Number(input) < 0)
        return false;

    var format = parseFormat(input);
    return moment(input, format).isValid();
}

function toUnixTimestamp(input) {
    return moment(input, 'DD-MM-YYYY').valueOf();
}

function toDate(input) {
    if(isDate(input)) {
        return moment(input, 'DD-MM-YYYY').toDate();
    }
    return null;
}

app.listen(8081);