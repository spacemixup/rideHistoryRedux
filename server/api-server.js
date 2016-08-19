const restify = require('restify');
const histories = require('./histories');


// const PORT = process.env.PORT || 8080;

export default (PORT) => {
  const server = restify.createServer();

  server.post('/api/:token', histories.setLyftAccessToken);
  server.get('/api/history', histories.findAll);
  server.get('/api/history/:id', histories.findById);

  server.listen(PORT, () => {
    console.log('%s listening at %s', server.name, server.url);
  });
};
