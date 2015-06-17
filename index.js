var http = require('http'),
  express = require('express'),
  bodyParser = require('body-parser'),
  socketIO = require('socket.io'),
  port = Number(process.env.PORT) || 8000,
  secret = process.env.SECRET,
  app = express(),
  server = http.createServer(app),
  io = socketIO(server);

if (!secret) {
  throw new Exception('SECRET not defined.');
}

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('"Hello, world!"');
});

io.on('connection', function (socket) {
  console.log('got a connection');
  socket.on('message', function (message) {
    console.log('message: ' + message);
    io.emit('message', message);
  });
  socket.on('disconnect', function () {
    console.log('disconnected');
  });
});

server.listen(port, function () {
  var address = server.address();
  console.log('Server started on port ' + address.port);
});
