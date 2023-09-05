import { Server } from 'socket.io';
import { removeRoomService } from "../service/roomDelete.js";
import cookieParser from "cookie-parser";

export function webSocket(server, app/*, sessionMiddleware*/) {
    const io =new Server(server, { path: '/socket.io' });
    app.set('io', io); //라우터와 웹소켓을 연결해주기 위하여 app.js에서 app을 넘겨줌
    const room = io.of('/room'); //네임스페이스 사용을 위해 io.of를 사용했다.
    const chat = io.of('/chat');

    io.use((socket,next)=>{
        cookieParser()
        next();
    });
  /*  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    chat.use(wrap(sessionMiddleware));*/

    room.on('connection', (socket) => {
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속');
        socket.on('join', (data) => {
            socket.join(data);
            socket.to(data).emit('join', {
                user: 'system',
                chat: `${socket.request.session.color}님이 입장하셨습니다.`,
            });
        });

        socket.on('disconnect', async () => {
            console.log('chat 네임스페이스 접속 해제');
            const { referer } = socket.request.headers; // 브라우저 주소가 들어있음
            const roomId = new URL(referer).pathname.split('/').at(-1);
            const currentRoom = chat.adapter.rooms.get(roomId);
            const userCount = currentRoom?.size || 0;
            if (userCount === 0) { // 유저가 0명이면 방 삭제
                await removeRoomService(roomId); // 컨트롤러 대신 서비스를 사용
                room.emit('removeRoom', roomId);
                console.log('방 제거 요청 성공');
            } else {
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
                });
            }
        });
    });
};