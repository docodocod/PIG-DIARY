const Room=require("../models/room.js");
const Chat=require("../models/chat.js");

exports.renderMainRoom=async(req, res, next)=>{ //채팅방 목록 불러오기
    try {
        const rooms = await Room.findAll({});
        res.render('main', { rooms, title: 'GIF 채팅방' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.renderRoom=(req, res)=>{ //채팅방 생성 페이지
    res.render('room', { title: '채팅방 생성' });
};

exports.createRoom=async(req, res, next)=>{ //채팅방 생성
    try {
        const newRoom = await Room.create({
            id:req.body.id,
            title: req.body.title,
            max: req.body.max,
            owner: req.session.color,
            password: req.body.password,
        });
        const io = req.app.get('io');
        io.of('/room').emit('newRoom', newRoom);
        if (req.body.password) { // 비밀번호가 있는 방이면
            res.redirect(`/room/${newRoom.id}?password=${req.body.password}`);
        } else {
            res.redirect(`/room/${newRoom.id}`);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.enterRoom=async(req, res, next)=>{ //채팅방 입장
    try {
        const room = await Room.findOne({ id: req.params.id });
        if (!room) {
            return res.redirect('/?error=존재하지 않는 방입니다.');
        }
        if (room.password && room.password !== req.query.password) {
            return res.redirect('/?error=비밀번호가 틀렸습니다.');
        }
        const io = req.app.get('io');
        const { rooms } = io.of('/chat').adapter;
        console.log(rooms, rooms.get(req.params.id), rooms.get(req.params.id));
        if (room.max <= rooms.get(req.params.id)?.size) {
            return res.redirect('/?error=허용 인원이 초과하였습니다.');
        }
        const chats = await Chat.find({ room: room.id }).sort('createdAt');
        return res.render('chat', {
            room,
            title: room.title,
            chats,
            user: req.session.color,
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
            user: req.session.color,
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
            user: req.session.color,
            gif: req.file.filename,
        });
        req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
};