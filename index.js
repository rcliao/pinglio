var request = require('request');
var express = require('express');

var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

// serving up the www static contents
app.use('/', express.static('www'));

app.get('/pinglio/test', function(req, res) {
    res.send('Hello Pinglio');
});

io.on('connection', function(socket) {
    console.log('A user is connected');
    socket.emit('hello', 'Hello from pinglio');
});

var Website = require('./models/Website');

var hosts = [
    new Website('Edlio High School', 'http://edliohs.org'),
    new Website('Edlio Middle School', 'http://edlioms.org'),
    new Website('Edlio High School Admin', 'http://admin.edliohs.org'),
    new Website('Edlio Middle School Admin', 'http://admin.edliohs.org'),
    new Website('LAUSD', 'http://home.lausd.net'),
    new Website('LISD', 'http://www.lisd.net')
];

hosts.forEach(function(host) {
    setInterval(function() {
        request(host.address, function(err, res, body) {
            if (err) {
                host.isAlive = false;
                host.deadSince = new Date();
                console.log('%s is dead', host.name);
            } else {
                host.isAlive = true;
                host.deadSince = null;
                console.log('%s is alive', host.name);
            }

           io.emit('website', hosts);
        });
    }, host.timeout);
})

server.listen(3000);
console.log('Start server at lcoalhost:3000/');
