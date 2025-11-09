const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

let nextPlayerId = 1;

wss.on('connection', (ws) => {
  const pid = nextPlayerId++;
  ws.pid = pid;
  ws.send(JSON.stringify({ type: 'welcome', id: pid }));

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.type === 'pos') {
        wss.clients.forEach(c => {
          if (c.readyState === WebSocket.OPEN) {
            c.send(JSON.stringify({ type: 'player-pos', id: pid, pos: data.pos }));
          }
        });
      }
    } catch(e) { /* ignore parse errors */ }
  });

  ws.on('close', () => {
    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) c.send(JSON.stringify({ type: 'player-left', id: pid }));
    });
  });
});

console.log('WS server rodando na porta 4000');
