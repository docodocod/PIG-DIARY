const Room=require("../models/room.js");
const Chat=require("../models/chat.js");
const {Op} = require("sequelize");
const User = require("../models/user");
const {formatDate, formatDateWithTime} = require("../utils/dateFormat");
const {toJSON} = require("express-session/session/cookie");


//채팅방 목록 불러오기
exports.renderRoom=async(req, res, next)=>{
    try {
        const rooms = await Room.findAll({
            include: [{
                model: Chat,
                attributes: ['user','chat','gif'],
            },{
                model:User,
                attributes:["id","nick","profileImg"],
                as:"Owner",
            },{
                model:User,
                attributes:['id','nick','profileImg'],
                as:'Friend',
            }],
            where: {
                [Op.or]:[
                    {owner: req.user.id},
                    {friend: req.user.id},
                    ]
            },
            order: [
                ['createdAt', 'DESC'],
                [Chat, 'createdAt', 'DESC']
            ],
        });
        const transFormRoomTime=rooms.map(room=>{
            return{
                ...room.toJSON(),
                createdAt: formatDateWithTime(room.createdAt),
            }
        })
        res.render('roomList', { rooms:transFormRoomTime, title: "채팅방 목록" }); //데이터 담아서 채팅방 목록 페이지에 뿌려주기
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//채팅방 만들기
exports.createRoom=async(req, res, next)=>{
    const room = await Room.findOne({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { owner: req.user.id },
                        { friend: req.body.friend }
                    ]
                },
                {
                    [Op.and]: [
                        { owner:req.body.friend },
                        { friend:req.user.id }
                    ]
                }
            ]
        },
        order: [['createdAt', 'DESC']]
    });
    //채팅방이 있다면
    if(room){
        return res.redirect(`/room/${room.id}`);
    }
    try {
        const newRoom=await Room.create({
            owner: req.user.id,
            friend: req.body.friend,
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

//채팅방 입장
exports.enterRoom=async(req, res, next)=>{
    try {
        const room = await Room.findOne({
            include:[{
                model:User,
                attributes:['id','nick','profileImg'],
                as:"Owner",
            }, {
                model: User,
                attributes: ['id','nick', 'profileImg'],
                as: "Friend",
            }],
            where:{
                id:req.params.id,
            }
        });
        if (!room) { //room data 없으면
            return res.redirect('/?error=존재하지 않는 방입니다.');
        }
        const chats = await Chat.findAll({
            include:[{
                model:User,
                attributes:["nick","profileImg"]
            }],
            where:{
                RoomId:room.id
            }
        });
        const transFormChatTime=chats.map(chat=>{
            return{
                ...chat.toJSON(),
                createdAt: formatDateWithTime(chat.createdAt),
            }
        })
        return res.render('chat', { //채팅 창에 데이터 뿌려주기
            room,
            chats:transFormChatTime,
            user: req.user.id,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

//채팅방 제거
exports.removeRoom=async(req, res, next)=>{
    try {
        await Room.destroy({where:{id:req.params.id}});
        res.send('채팅방을 제거하였습니다.');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//채팅 전송
exports.sendChat=async(req, res, next)=>{
    try {
        const chat = await Chat.create({
            user: req.user.id,
            chat: req.body.chat,
            RoomId: req.params.id,
        });
        const user=await User.findOne({
            where:{id:req.user.id},
        })
        const dateTime= formatDateWithTime(chat.createdAt);
        req.app.get('io').of('/chat').to(req.params.id).emit('chat',chat,user,dateTime);
        res.send('채팅을 정상적으로 전송');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//채팅 GIF 보내기
exports.sendImg=async(req, res, next)=>{
    console.log(req.file.filename);
    try {
        const chat = await Chat.create({
            RoomId: req.params.id,
            user: req.user.id,
            gif: req.file.filename,
        });
        req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
};