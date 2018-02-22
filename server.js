const fs = require('fs');
const express = require('express')
const app = express()
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080});


eval(String(fs.readFileSync("rx.all.js")));

app.get('/', (req, res) => res.send('Hello World!'))


const users = exports.Observable.interval(100);

function handle(ws, x)
{
    console.log("handle: " + x);
    const o = JSON.parse(x);
    const cmd = o.cmd;
    const obs = eval(cmd);
    obs.subscribe(function (x)
    {
        console.log("sending " + x);
        ws.send(JSON.stringify({x}));
    })
}

wss.on('connection', function connection(ws) {
    console.log("Connected new client: %s!", ws);
    ws.on('message', msg => handle(ws, msg));

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))