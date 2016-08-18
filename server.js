const restify = require('restify');
const histories = require('./server/histories');
const server = restify.createServer();

server.post('/api/:token', histories.setLyftAccessToken);
server.get('/api/history', histories.findAll);
// server.get('/api/history/:id', histories.findById);


server.listen(1234, () => {
	console.log('%s listening at %s', server.name, server.url);
});


module.exports = 'api';
