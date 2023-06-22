const app = require('express')();
const server = require('http').createServer(app);
const PORT = 3000
const options = { 
    cors: {
        origin : '*'
    }
};
const io = require('socket.io')(server,options)
let users = []

io.on('connection', (socket) => {
    console.log(socket.id)
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
        io.to(socket.id).emit("welcomed", `Welcomed ${arg}`)
    })

    socket.on('message', (arg, callback) => {
        console.log(arg)
    })
})




server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})



