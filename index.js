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
    console.log(`Nuevo usuario contectado ${socket.id}`)
    users.push(socket.id)
    
    rooms.map(({room}) => {
        socket.join(room)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} ha sido desconectado por recargar la pagina en este caso`)

        users.splice(
            users.indexOf(socket.id),
            1
        )
        
    })

    socket.on('login', (arg) => {
        console.log(`The username ${arg} has been connected`)
        socket.username = arg
    })
    
    socket.on('join room', (arg) => {
        socket.join(arg)
        console.log(`${socket.username} se ha unido a la sala ${arg}`)
    })

    socket.on('message', (arg, callback) => {
        arg = JSON.parse(arg)
        console.log("Mensaje recibido desde el cliente")
        switch(arg.room){
            case rooms[0].room:
                io.to(arg.room).emit(`Hola mundo desde la sala ${arg.room}`)
                break;
            
            case rooms[1].room:
                io.to(arg.room).emit(`Hola mundo desde la sala ${arg.room}`)
                break;

            case rooms[2].room:
                io.to(arg.room).emit(`Hola mundo desde la sala ${arg.room}`)
                break;

            case rooms[3].room:
                io.to(arg.room).emit(`Hola mundo desde la sala ${arg.room}`)
                break;
        }
        
        
    })
})



server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})



