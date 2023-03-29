const express = require('express')
// Create an App
const app = express();

// Set the Middleware for static Files
app.use(express.static(__dirname + '/public'))

// Create a HTTP server and link the App
const http = require('http').createServer(app)

// Asssign the Port 
const PORT = process.env.PORT || 3000

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})


// Socket IO 
 const io = require('socket.io')(http)

 io.on('connection', (socket)=>{
    console.log(`Connection establish..`);

    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })
 })


// Listen the HTTP App.
http.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
})
