const Room=require("../models/room.js");
const Chat=require("../models/chat.js");
const {removeRoom} = require("../services/roomDelete");


exports.renderAllRoom=async(req, res, next)=>{ //채팅방 목록 불러오기
    try {
        const rooms = await Room.findAll({}); //현재 생성되어 있는 모든 방 찾아서 담기
        res.render('chattingRoom', { rooms, title: 'GIF 채팅방' }); //데이터 담아서 채팅방 목록 페이지에 뿌려주기
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.renderRoom=(req, res)=>{ //채팅방 목록페이지
    res.render('roomList', { title: '채팅방 생성' });
};

exports.createRoom=async(req, res, next)=>{ //채팅방 생성
    try {
        const newRoom=await Room.create({ //새로운 방 만들기
            opponent: req.body.title,
            owner: req.session.user,
        });
        console.log(newRoom.id);
        const io = req.app.get('io'); //채팅방 기능을 위해 socket.io에서 받아온거 담기
        io.of('/room').emit('newRoom', newRoom); //네임스페이스를 이용하여 /room 에 새로운 채팅방 data 담기
        res.redirect(`/room/${newRoom.id}`);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.enterRoom=async(req, res, next)=>{ //채팅방 입장
    try {
        const room = await Room.findOne({where:{ id: req.params.id }}); //해당 아이디 채팅방 찾기
        if (!room) { //room data 없으면
            return res.redirect('/?error=존재하지 않는 방입니다.');
        }
        const io = req.app.get('io'); //socket.io 사용하기
        const chats = await Chat.findAll(
            { room: room.id },
            {order: "createdAt"});
        return res.render('chattingRoom', { //채팅 창에 데이터 뿌려주기
            room,
            opponent: room.opponent,
            chats,
            user: req.session.user,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
exports.removeRoom=async(req, res, next)=>{ //채팅방 제거
    try {
        await removeRoom(req.params.id);
        res.send('채팅방을 나갔습니다.');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.sendChat=async(req, res, next)=>{ //채팅 전송
    try {
        const chat = await Chat.create({
            room: req.params.id,
            user: req.session.user,
            chat: req.body.chat,
        });
        req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        res.send('채팅을 정상적으로 전송');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.sendGif=async(req, res, next)=>{ //채팅방 사진 보내기
    try {
        const chat = await Chat.create({
            room: req.params.id,
            user: req.session.user,
            gif: req.file.filename,
        });
        req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
};