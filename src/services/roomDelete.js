const Room=require("../models/room.js");
const Chat=require( "../models/chat.js");

exports.removeRoom=async(roomId)=>{
    try {
        await Room.destroy({where:  { id: roomId }});
        await Chat.destroy({where:  { room: roomId }});
    } catch (error) {
        throw error;
    }
};