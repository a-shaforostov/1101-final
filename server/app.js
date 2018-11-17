var os = require('os');
const addrs = require('local-ip-addresses-and-hostnames');
const WebSocket = require('ws');
const sessions = require('./sessions');

const wss = new WebSocket.Server({
  port: 3002
});

const wsHandlers = require('./wsHandlers')(wss);

wss.on('connection', (ws) => {
  sessions.addConnection(ws);
  ws.on('message', processMessage);
  ws.on('close', function (code) {
    sessions.removeConnection(this.id);
  });
});

function processMessage(message) {
  const { action, payload } = JSON.parse(message);
  wsHandlers[action](this, payload);
}

console.log(`ws server is working on:`);
const ips = addrs.getLocalIpAddresses();
ips.forEach(ip => console.log(`${ip}:3002`));
