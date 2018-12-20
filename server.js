let express = require('express')
let app = express()

let server = require('http').createServer(app)

let io = require('socket.io').listen(server)

app.set('port',process.env.PORT || 3000)


//Remember there is a login for a reason
let clients = [];
io.on("connection", (socket) => {
    let currentUser;

    socket.on("USER_CONNECT",() => {
        console.log("User connected")
        for (let i = 0; i < clients.length; i++)
            socket.emit("USER_CONNECTED")
    })
})
server.listen(app.get('port'),()=>{
    console.log("=== SERVER IS RUNNING ==="
    )
})