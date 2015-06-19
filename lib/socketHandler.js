var manager = require('./serverManager');

module.exports = function (io) {

  function notifyClients(emitter, callback) {
    emitter.emit('serverUpdate', manager.getServers(), callback);
  }

  return function (socket) {
    var id = socket.id,
      server = {
        id: id,
        name: null,
        items: [],
      };

    console.log('got a connection from', JSON.stringify(server));

    socket.on('fetchServers', function (callback) {
      callback(manager.getServers());
    });

    socket.on('register', function (data, callback) {
      console.log('Got items:', JSON.stringify(data));
      server.name = data.name;
      server.items = data.items;
      manager.updateServer(server, data.items);
      notifyClients(io);
      callback({ status: 'OK' });
    });

    socket.on('selectItem', function (data, callback) {
      console.log('Item selected:', JSON.stringify(data));
      var server = data.server,
        item = data.item;
      io.to(server.id).emit('selectItem', { item: item });
      callback({ status: 'OK' });
    });

    socket.on('disconnect', function () {
      manager.removeServer(server);
    });

    socket.on('error', function (err) {
      console.log('Error:', err.message || err);
    });
  };
};
