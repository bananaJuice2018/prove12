const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

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

// Login user to access chat room.
const login = async () => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    //let response = await postData('http://192.168.1.107:5000/login', {Name: usernameInput.value})
    let response = await postData('https://socket-live-chat.herokuapp.com/login', {Name: usernameInput.value})

    console.log("Response: ", response);
    if(response.Success) {
        socket.emit('newUser', response.Name); // This will emit the event to all connected sockets

        console.log("Redirect To Chat");
        window.location = '/chat?user=' + response.Name;
    } else {
        alert(response.Message);
    }
}
