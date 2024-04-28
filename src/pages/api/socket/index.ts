import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

function ioHandler(req: NextApiRequest, res: NextApiResponse) {
    var sendMessage=(message:string)=>{}
    if (!(res.socket as any).server.io) {
        console.log('*First use, starting socket.io');
    
        const io = new Server((res.socket as any).server);
        
        io.on('connection', socket => {
          console.log(`${socket.id} connected`);

        });
        
        sendMessage=(message:string)=>{
            io.emit('chat',message);
        }
        (res.socket as any).server.io = io;
    } else {
        console.log('socket.io already running');
        let io=(res.socket as any).server.io;
        if(io){
            sendMessage=(message:string)=>{
                io.emit('chat',message);
            }
        }
    }

    return { sendMessage}

    res.end();
}

export const config = {
    api: {
      bodyParser: false
    }
}

export default ioHandler;
