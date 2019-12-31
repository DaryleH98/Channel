const socket = io('http://localhost:9000')

console.log(socket.io)
socket.on('connect', ()=>{
    console.log(socket.id)
})

//Listen for a list of namespaces
socket.on('nsList', (nsData)=>{
    console.log("The list of namespaces has arrived!")
    let namespacesDiv = document.querySelector('.namespaces')
    namespacesDiv.innerHTML = ""
    nsData.forEach((ns)=>{
        namespacesDiv.innerHTML +=  `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"/></div>`
    })
    //Add a click listener for each NS
    Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        elem.addEventListener('click',(e)=>{
            const nsEndpoint = elem.getAttribute('ns')
            console.log(`${nsEndpoint}`)
        })
    })
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
