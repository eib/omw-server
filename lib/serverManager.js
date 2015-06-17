var serversByName = {};

function keyForServer(server) {
  return server.name || server.id;
}

exports.getServers = function () {
  var servers = [];
  for (var name in serversByName) {
    if (serversByName.hasOwnProperty(name)) {
      var server = serversByName[name];
      servers.push({
        id: server.id,
        name: server.name,
        items: server.items,
      });
    }
  }
  return servers;
};

exports.updateServer = function (server) {
  serversByName[server.name] = server;
  console.log('updated:', JSON.stringify(server));
};

exports.removeServer = function (server) {
  if (serversByName.hasOwnProperty(server.name)) {
    delete serversByName[server.name];
    console.log('removed:', server.name);
  }
};
