const express = require('express')
const app = express();

const server = require('http').createServer(app);
const cors = require('cors')

const rooms = [
    {
        room : 'VideoJuegos',
        messages : 0
    },
    {
        room : 'Deportes',
        messages : 0
    },
    {
        room : 'Series',
        messages : 0
    },
    {
        room : 'Off-Topic',
        messages : 0
    },

]
const PORT = 3000
const options = { 
    cors: {
        origin : '*'
    }
};

// app.use(cors)

const io = require('socket.io')(server,options)
let users = []


app.get('/checkStatus',cors(), (req, res) => { 
    res.send(true);
})

app.get('/roomsAviable', cors(), (req, res) => { 
    res.send(rooms)
})




io.on('connection', (socket) => {
    //TODO create a token in order to prevent disconnection from username and lose the data!
    users.push(socket.id)
    socket.on('disconnect', () => {
        console.log(`The user ${socket.id} has been disconnected`)

        users.splice(
            users.indexOf(socket.id),
            1
        )
        
    })

    socket.on('login', (arg) => {
        console.log(`The username ${arg} has been connected`)
        socket.username = arg
        console.log(socket.username)
        io.to(socket.id).emit("login", `Welcomed ${arg}`)
    })

    socket.on('message', (arg, callback) => {
        console.log(arg)
        io.to(socket.id).emit('message', "We are listening u!")
    })
})




server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})



