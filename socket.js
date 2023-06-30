
let readyPlayerCount = 0;

function listen(io) {
    const  pongNameSpace = io.of('/pong');
    //connecting to socket
    pongNameSpace.on('connection', (socket) => {
      let room;
        console.log('A user connected', socket.id)
        //creating the ready event
        socket.on('ready', () => {
         room = 'room' + Math.floor(readyPlayerCount / 2);
          socket.join(room)
          console.log('Player ready', socket.id, room)
    
          readyPlayerCount++;
           //Broadcasting the player room to all connected client
          if(readyPlayerCount % 2 === 0) {
            pongNameSpace.in(room).emit('startGame', socket.id)
          }
        })
        //Broadcasting the paddleMove event to all connected client except the sender
        socket.on('paddleMove', (paddleData) => {
          socket.to(room).emit('paddleMove', paddleData)
        })
        //Broadcasting the ballMove event to all connected client except the sender
        socket.on('ballMove', (ballData) => {
          socket.to(room).emit('ballMove', ballData)
        });
        //The disconnect event
        socket.on('disconnect', (reason) => {
          console.log(`Client ${socket.id} disconnected: ${reason}`)
          socket.leave(room)
        });
    });
}

module.exports = {
    listen,
}