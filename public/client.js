const socket = io();

let name;
let textArea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do {
    name = prompt('Please Enter your name :')
} while (!name);

textArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // append Message
    appendMessage(msg, 'outgoing')

    // Send message to server
    socket.emit('message', msg)

    textArea.value = ''
    scrollToBottom()

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recived message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}