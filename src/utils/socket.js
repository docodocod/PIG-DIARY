const SocketIO=require('socket.io');
const {removeRoom}=require("../services/roomDelete.js");

exports.webSocket=(server, app)=>{
    const io =SocketIO(server, { path: '/socket.io' });
    app.set('io', io); //라우터와 웹소켓을 연결해주기 위하여 app.js에서 app을 넘겨줌
    const room = io.of('/room'); //네임스페이스 사용을 위해 io.of를 사용했다.
    const chat = io.of('/chat');

    room.on('connection', (socket) => { // websocket 연결하기 위한 단계
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket,req,res) => { // websocket 연결하기 위한 단계
        console.log('chat 네임스페이스에 접속');
        socket.on('join', (data) => { //chat.html 에서 'join' 이벤트명으로 보낸 data를 받는다.
            socket.join(data);
            socket.to(data).emit('join', {
                user: "system",
                chat: "입장하셨습니다."
            });
        });

        socket.on('disconnect', async (req,res,next) => {
            console.log('chat 네임스페이스 접속 해제');
            const { referer } = socket.request.headers; // 브라우저 주소가 들어있음
            const roomId = new URL(referer).pathname.split('/').at(-1); //roomId 추출하기
            const currentRoom = chat.adapter.rooms.get(roomId); //현재 채팅방 데이터를 가져온다.
            const userCount = currentRoom?.size || 0;
            /*if (userCount === 0) { // 유저가 0명이면 방 삭제
                await removeRoom(roomId); // 컨트롤러 대신 서비스를 사용
                room.emit('removeRoom', roomId);
                console.log('방 제거 요청 성공');
            } else {
                socket.to(roomId).emit('exit', {
                    user: req.user.id,
                    chat: `${req.user.nick}님이 퇴장하셨습니다.`,
                });
            }*/
        });
    });
};