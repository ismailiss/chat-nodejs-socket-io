var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    io.emit('chat message', "new user connected");
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', (socket) => {
        io.emit('chat message', "new  disconnect");
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});