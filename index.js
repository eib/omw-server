var http = require('http'),
  express = require('express'),
  bodyParser = require('body-parser'),
  socketIO = require('socket.io'),
  basicAuth = require('basic-auth-connect'),
  socketHandler = require('./lib/socketHandler'),
  port = Number(process.env.PORT) || 8001,
  secret = process.env.SECRET,
  app = express(),
  server = http.createServer(app),
  io = socketIO(server);

if (!secret) {
  throw new Exception('SECRET not defined.');
}

app.use(basicAuth(function (user, password) {
  return password === secret;
}));

app.use(express.static('public'));

io.sockets.on('connection', socketHandler(io));

server.listen(port, function () {
  var address = server.address();
  console.log('Server started on port ' + address.port);
});
