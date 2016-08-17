const restify = require('restify');
const lyft = require('./server/lyft');
const server = restify.createServer();



function respond(req, res, next) {
	res.send(`hello+${req.params.name}`);
	next();
}

//initial history pull
server.post('/API/:token', lyft.initialHistoryPull);
//return single history

server.listen(1234, () => {
	console.log('%s listening at %s', server.name, server.url);
});


module.exports = 'API';
