const apiServer = require('./api')
const http = require('http')
const io = require('socket.io')

const httpServer = http.createServer(apiServer)
const socketServer = io(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  const sockets = require('./socket')

  httpServer.listen(8080)
console.log('Listening on port 8080')

sockets.listen(socketServer)



