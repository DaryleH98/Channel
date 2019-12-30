const express = require('express')
const socketio = require('socket.io')
const app = express()

let namespaces = require('./data/namespaces')

namespaces.forEach((namespace) => {
    console.log(namespace)
})
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 9000
const expressServer = app.listen(port, () => console.log(`Listening on port ${port}`))
const io = socketio(expressServer)

io.on('connection', (socket)=>{
    socket.emit('messageFromServer', {data:'Welcome to the socketio server'})
    socket.on('messageToServer', (dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.join('level1')
    io.of('/').to('level1').emit('joined',`${socket.id} says I  have joined the level 1 room`)
})
io.of('/admin').on('connection',(socket)=>{
    console.log("Someone connected to the admin namespace!")
    io.of('/admin').emit('welcome', "welcome to the admin channel!")
})