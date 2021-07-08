const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
const date = new Date() // Date implementation

socket.on('newMessage', data => {
    addMessage(data, false)
})

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// Post message to board
const postMessage = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const newMessage = { Message: messageEl.value, Time: date + " " + time, User: user.value };
    console.log("Send Message: ", newMessage);
    socket.emit('message', newMessage); // This will emit the event to all connected sockets

    messageEl.value = "";
    addMessage(newMessage, true);
}

// Add message from any user to chatbox, determine if added
// by current user.
const addMessage = (data = {}, user = false) => {
    console.log("New Message: ", data);

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(data.User + " @" + data.Time + ": " + data.Message));
    chatBox.appendChild(li);
}
