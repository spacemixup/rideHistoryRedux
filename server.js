let restify = require('restify'), 
		lyft = require('./server/lyft');

const server = restify.createServer();

function respond(req, res, next) {
	res.send('hello ' + req.params.name);
	next(); 
}
// server.get('/API/:name', respond);
server.get('/API/:token', lyft.makeCall);

server.listen(1234, function () {
	console.log('%s listening at %s', server.name, server.url);
});

module.exports = 'API';
