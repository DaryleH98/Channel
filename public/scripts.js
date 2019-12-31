const socket = io('http://localhost:9000')

console.log(socket.io)
socket.on('connect', ()=>{
    console.log(socket.id)
})

socket.on('nsList', (nsData)=>{
    console.log("The list of namespaces has arrived!")
})
socket.on('messageFromServer', (dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit('dataToServer', {data: "Data from the Client!"})
})
socket.on('joined',(msg) => {
    console.log(msg)
})

socket2.on('welcome', (dataFromServer)=>{
    console.log(dataFromServer)
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log("Form Submited!!")
    const newMessage = document.querySelector('#user-message').value
    console.log(newMessage)
    socket.emit('newMessageToServer', {text: newMessage})

})
