var express = require('express');
var app = express();

app.get('/api/whoami', function (req, res) {
  var IP = req.headers['x-forwarded-for'].split(', ').pop() || req.connection.remoteAddress;
  var languages = req.acceptsLanguages();
  var userAgent = req.get('user-agent');
  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    ipaddress: IP,
    language: languages[0],
    software: userAgent.substring(userAgent.indexOf('(') + 1, userAgent.indexOf(')'))
  }));
});

app.listen(8080, function () {
  console.log('Request Header Parser Microservice on port 8080...');
});