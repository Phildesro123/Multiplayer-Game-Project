let express = require('express')
let app = express()

let server = require('http').createServer(app)

let io = require('socket.io').listen(server)

app.set('port',process.env.PORT || 3000)


//Remember there is a login for a reason
let clients = [];

 /* app.get('/',(req,res)=>{
    res.send(`<h1>Hello World</h1><script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = io();
    </script>`)
})  */
io.on("connection", (socket) => {
    let currentUser;
    console.log("A client connected")
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