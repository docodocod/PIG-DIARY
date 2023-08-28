import {createRoom,selectAllRoom} from "../dao/room.js";
import Chat from "../dao/chat.js";


export async function renderMain(req, res, next){
    try {
        const rooms = await selectAllRoom();
        res.render('main', { rooms, title: 'GIF 채팅방' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};;

export async function renderRoom(req, res){
    res.render('room', { title: 'GIF 채팅방 생성' });
};

export async function createRoom(req, res, next) {
    try {
        const title=req.body.title
        const max=req.body.max
        const owner=req.session.color
        const password=req.body.password
        const newRoom = await createRoom(title,max,owner,password);
        const io = req.app.get('io');
        io.of('/room').emit('newRoom', newRoom);
        if (req.body.password) { // 비밀번호가 있는 방이면
            res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
        } else {
            res.redirect(`/room/${newRoom._id}`);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};