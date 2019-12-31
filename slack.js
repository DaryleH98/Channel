const express = require('express')
const socketio = require('socket.io')
const app = express()

let namespaces = require('./data/namespaces')
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 9000
const expressServer = app.listen(port, () => console.log(`Listening on port ${port}`))
const io = socketio(expressServer)

io.on('connection', (socket)=>{
    let nsData = namespaces.map((ns)=>{
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    socket.emit('nsList', nsData)
})

namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (socket)=>{
        console.log(`${socket.id} has join ${namespace.endpoint}`)
    })
})

