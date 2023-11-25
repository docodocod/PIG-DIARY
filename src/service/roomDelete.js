const Room=require("../models/room.js");
const Chat=require( "../models/chat.js");

exports.removeRoom=async(roomId)=>{
    try {
        await Room.deleteOne({ id: roomId });
        await Chat.deleteMany({ room: roomId });
    } catch (error) {
        throw error;
    }
};