// import { NextApiRequest,NextApiResponse } from "next";

// const http = require('http');
// const cors = require('cors');
// let serverInstance:any;
// export function initializeSocketServer() {
//   if (serverInstance) {
//     console.log('WebSocket server is already running.');
//     return {sendMessage};
//   }
// const server = http.createServer((req:NextApiRequest, res:NextApiResponse) => {
//   // Handle HTTP requests if needed
// });

// const { Server } = require('socket.io');
// const io = new Server(server);

// io.on('connection', (socket:any) => {
//   io.use((socket:any, next:any) => {
//     cors()(socket.request, socket.request.res, next);
//   });
//   console.log('A user connected');

//   // socket.on('chat message', (message) => {
//   //   io.emit('chat message', message); 
//   // });


//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });
// server.on('error', (error:any) => {
//   if (error.code === 'EADDRINUSE') {
//     console.log(`Port is already in use.`);
//   } else {
//     console.error('Error starting WebSocket server:', error);
//   }
// });
// server.listen(4001, () => {
//   console.log('WebSocket server listening on port 3001');
// });
// serverInstance=server
// function sendMessage(message: string) {
//   console.log("Somebody called is here",message)
//   io.emit('chat message', message); 
// }

// return {sendMessage};

// }




