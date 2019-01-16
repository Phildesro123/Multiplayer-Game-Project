let express = require('express')
let app = express()

let server = require('http').createServer(app)

let io = require('socket.io').listen(server)

app.set('port',process.env.PORT || 3000)

//Custom story
let Player = require('./Classes/Player.js');


//Remember there is a login for a reason
let players = [];
let sockets = []; 
 /* app.get('/',(req,res)=>{
    res.send(`<h1>Hello World</h1><script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = io();
    </script>`)
})  */
io.on("connection", (socket) => {
    let player = new Player();
    let thisplayerID = player.id;
    console.log("A client connected")

    players[thisplayerID] = player;
    sockets[thisplayerID] = socket;


    socket.emit('register',{id: thisplayerID})
    socket.emit('spawn', player)

    socket.broadcast.emit('spawn',player)

    for(let playersID in players){
        if(playersID != thisplayerID)
            socket.emit('spawn',players[playersID])
    }
    socket.on("disconnect",() =>{
        console.log("User disconnected")
        delete players[thisplayerID];
        delete sockets[thisplayerID];
        socket.broadcast.emit("disconnected",player)
    })
})
server.listen(app.get('port'),()=>{
    console.log("=== SERVER IS RUNNING ==="
    )
})