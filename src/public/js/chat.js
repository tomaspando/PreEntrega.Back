const message = document.getElementById("message")
const received_messages = document.getElementById("received_messages")
const socket = io() // Cliente de Socket.io

socket.on("messageLogs", data => {
    let messages = ""
    data.forEach(message => {
        messages += `${message.user} dice ${message.message} <br/>`
    })

    received_messages.innerHTML = messages
})

const sendMessage = () => {
    if(message.value.trim() !== "") {
        socket.emit("message", {user: user, message: message.value.trim()})
        message.value = ""
    }
}

let user
Swal.fire({
    title:"Login",
    input: "text",
    text: "Ingresa tu nombre de Usuario:",
    inputValidator: value => {
        return !value && "Por favor ingresar usuario!"
    },
    allowOutsideClick: false
}).then(res => {
    user = res.value
    console.log(user)
})