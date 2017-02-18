var express = require('express');

var app = express();

app.get('/', function(request, response) {
    console.log('started!');
});

app.listen(8081, function() {
    console.log('Listening on port 8081..');
});
