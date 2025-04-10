const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { wss } = require('./websocket'); // Import WebSocket server

// ...existing code...

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Attach WebSocket server to the HTTP server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});