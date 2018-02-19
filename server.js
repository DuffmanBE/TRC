const express = require('express')
const app = express()
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080});

app.get('/', (req, res) => res.send('Hello World!'))


wss.on('connection', function connection(ws) {
    console.log("Connected new client: %s!", ws);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))