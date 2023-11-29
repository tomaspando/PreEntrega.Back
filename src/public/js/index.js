const message = document.getElementById("message")

const received_messages = document.getElementById("received_messages")

const socket = io()

socket.on("srv_response", data => {
    console.log(data)
})

const sendMessage = () => {
    if(message.value !== "") {
        socket.emit("client_message", message.value)
    }
}