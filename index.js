var request = require('request');
var Website = require('./models/Website');

var hosts = [
    new Website('Edlio High School', 'http://edliohs.org'),
    new Website('LAUSD', 'http://home.lausd.net'),
    new Website('LISD', 'http://www.lisd.net')
];

hosts.forEach(function(host) {
    setInterval(function() {
        request(host.address, function(err, res, body) {
            if (err) {
                console.log('%s is dead', host.name);
            } else {
                console.log('%s is alive', host.name);
            }
        });
    }, host.timeout);
})
